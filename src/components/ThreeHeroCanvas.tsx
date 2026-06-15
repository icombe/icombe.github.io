import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const terminalLines = [
  'ProjectGrid.tsx',
  'const visibleProjects =',
  '  limit ? projects.slice(0, limit) : projects;',
  'visibleProjects.map((project, index) => (',
  '  <ProjectCard key={project.slug} />',
  '))',
];

function trackMaterial(materials: Set<THREE.Material>, material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((item) => materials.add(item));
    return;
  }

  materials.add(material);
}

function createRoundedPanelGeometry(width: number, height: number, depth: number, radius: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const safeRadius = Math.min(radius, halfWidth, halfHeight);
  const shape = new THREE.Shape();

  shape.moveTo(-halfWidth + safeRadius, -halfHeight);
  shape.lineTo(halfWidth - safeRadius, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + safeRadius);
  shape.lineTo(halfWidth, halfHeight - safeRadius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - safeRadius, halfHeight);
  shape.lineTo(-halfWidth + safeRadius, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - safeRadius);
  shape.lineTo(-halfWidth, -halfHeight + safeRadius);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + safeRadius, -halfHeight);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    bevelSegments: 3,
    curveSegments: 10,
  });
  geometry.center();
  return geometry;
}

export default function ThreeHeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let frameId = 0;
    let disposed = false;
    let hovered = false;
    let lastTextureUpdate = 0;

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.32, 8.4);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      queueMicrotask(() => setStatus('error'));
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 640;
    const screenContext = screenCanvas.getContext('2d');
    if (!screenContext) {
      queueMicrotask(() => setStatus('error'));
      renderer.dispose();
      renderer.domElement.remove();
      return;
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.generateMipmaps = false;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.NearestFilter;
    screenTexture.anisotropy = 4;
    textures.add(screenTexture);

    const drawTerminal = (time: number) => {
      screenContext.fillStyle = '#020502';
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);

      const gradient = screenContext.createLinearGradient(0, 0, screenCanvas.width, screenCanvas.height);
      gradient.addColorStop(0, 'rgba(124, 254, 45, 0.14)');
      gradient.addColorStop(0.55, 'rgba(124, 254, 45, 0.03)');
      gradient.addColorStop(1, 'rgba(45, 226, 255, 0.08)');
      screenContext.fillStyle = gradient;
      screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);

      screenContext.fillStyle = 'rgba(124, 254, 45, 0.9)';
      screenContext.font = '44px "Courier New", monospace';
      screenContext.textBaseline = 'top';
      screenContext.shadowColor = 'rgba(124, 254, 45, 0.85)';
      screenContext.shadowBlur = 14;

      terminalLines.forEach((line, index) => {
        if (!line) {
          return;
        }

        screenContext.fillStyle = index === 0 ? '#2de2ff' : '#c6ff9e';
        screenContext.fillText(line, 52, 58 + index * 76, 918);
      });
      screenContext.shadowBlur = 0;

      if (Math.floor(time / 420) % 2 === 0) {
        screenContext.fillStyle = '#7cfe2d';
        screenContext.fillRect(52, 58 + terminalLines.length * 76, 24, 46);
      }

      screenContext.fillStyle = 'rgba(124, 254, 45, 0.045)';
      for (let y = 0; y < screenCanvas.height; y += 8) {
        screenContext.fillRect(0, y, screenCanvas.width, 2);
      }

      screenTexture.needsUpdate = true;
    };

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x141718,
      roughness: 0.58,
      metalness: 0.16,
    });
    const bevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x202426,
      roughness: 0.48,
      metalness: 0.2,
    });
    const bezelMaterial = new THREE.MeshStandardMaterial({
      color: 0x050606,
      roughness: 0.44,
      metalness: 0.26,
    });
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const accentMaterial = new THREE.MeshBasicMaterial({ color: 0x7cfe2d });
    const cyanMaterial = new THREE.MeshBasicMaterial({ color: 0x2de2ff });
    const pinkMaterial = new THREE.MeshBasicMaterial({ color: 0xff2f92 });
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x7cfe2d,
      transparent: true,
      opacity: 0.24,
    });

    [
      bodyMaterial,
      bevelMaterial,
      bezelMaterial,
      screenMaterial,
      accentMaterial,
      cyanMaterial,
      pinkMaterial,
      edgeMaterial,
    ].forEach((material) => materials.add(material));

    const monitor = new THREE.Group();
    monitor.position.y = 0.1;
    monitor.rotation.set(-0.05, -0.16, 0);
    scene.add(monitor);

    const addMesh = (mesh: THREE.Mesh, parent: THREE.Object3D = monitor) => {
      parent.add(mesh);
      geometries.add(mesh.geometry);
      trackMaterial(materials, mesh.material);
      return mesh;
    };

    const addRoundedPanel = (
      width: number,
      height: number,
      depth: number,
      radius: number,
      position: [number, number, number],
      material: THREE.Material
    ) => {
      const mesh = new THREE.Mesh(createRoundedPanelGeometry(width, height, depth, radius), material);
      mesh.position.set(...position);
      return addMesh(mesh);
    };

    const addPlane = (
      width: number,
      height: number,
      position: [number, number, number],
      material: THREE.Material
    ) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
      mesh.position.set(...position);
      return addMesh(mesh);
    };

    const addEdges = (mesh: THREE.Mesh) => {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMaterial);
      edges.position.copy(mesh.position);
      edges.rotation.copy(mesh.rotation);
      edges.scale.copy(mesh.scale);
      monitor.add(edges);
      geometries.add(edges.geometry);
      trackMaterial(materials, edges.material);
    };

    const cabinet = addRoundedPanel(4.85, 3.02, 1.18, 0.24, [0, 0.46, -0.04], bodyMaterial);
    addEdges(cabinet);
    const facePlate = addRoundedPanel(4.55, 2.76, 0.18, 0.18, [0, 0.5, 0.6], bevelMaterial);
    addEdges(facePlate);

    const bezel = addRoundedPanel(3.88, 2.18, 0.18, 0.11, [0, 0.7, 0.75], bezelMaterial);
    addEdges(bezel);
    addPlane(3.36, 1.66, [0, 0.8, 1.02], screenMaterial);

    for (let index = 0; index < 4; index += 1) {
      const control = new THREE.Mesh(new THREE.CircleGeometry(0.055, 28), index === 3 ? pinkMaterial : accentMaterial);
      control.position.set(1.2 + index * 0.22, -0.52, 1.03);
      addMesh(control);
    }

    addPlane(1.18, 0.035, [-1.12, -0.52, 1.035], cyanMaterial);

    const neck = addRoundedPanel(0.42, 0.86, 0.48, 0.07, [0, -1.55, -0.02], bodyMaterial);
    addEdges(neck);
    const base = addRoundedPanel(2.32, 0.36, 1.26, 0.16, [0, -2.1, 0.02], bevelMaterial);
    addEdges(base);
    addPlane(1.7, 0.04, [0, -1.9, 0.68], cyanMaterial);

    scene.add(new THREE.AmbientLight(0xffffff, 0.42));
    const keyLight = new THREE.PointLight(0x7cfe2d, 4.2, 12);
    keyLight.position.set(-2.8, 2.8, 4.8);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff2f92, 3.4, 11);
    rimLight.position.set(3.4, -0.5, 4.4);
    scene.add(rimLight);
    const screenGlow = new THREE.PointLight(0x7cfe2d, 0.55, 5);
    screenGlow.position.set(-0.7, 1.35, 2.15);
    scene.add(screenGlow);

    const resize = () => {
      if (disposed) {
        return;
      }

      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = width < 460 ? 8.9 : 8.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const pointerEnter = () => {
      hovered = true;
    };

    const pointerMove = (event: PointerEvent) => {
      hovered = true;
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const y = (event.clientY - rect.top) / Math.max(rect.height, 1);
      targetPointer.x = (x - 0.5) * 1.8;
      targetPointer.y = (y - 0.5) * 1.5;
    };

    const pointerLeave = () => {
      hovered = false;
      targetPointer.set(0, 0);
    };

    const animate = (time = 0) => {
      pointer.lerp(targetPointer, 0.13);

      const hoverWeight = hovered ? 1 : 0.25;
      const targetRotationX = -0.05 - pointer.y * 0.55 * hoverWeight;
      const targetRotationY = -0.16 + pointer.x * 0.78 * hoverWeight;
      const targetRotationZ = pointer.x * 0.08 * hoverWeight;

      monitor.rotation.x += (targetRotationX - monitor.rotation.x) * 0.12;
      monitor.rotation.y += (targetRotationY - monitor.rotation.y) * 0.12;
      monitor.rotation.z += (targetRotationZ - monitor.rotation.z) * 0.12;
      screenGlow.intensity += ((hovered ? 1.05 : 0.55) - screenGlow.intensity) * 0.08;

      if (time - lastTextureUpdate > 120) {
        drawTerminal(time);
        lastTextureUpdate = time;
      }

      camera.lookAt(0, 0.05, 0);
      renderer.render(scene, camera);
      if (!readyRef.current) {
        readyRef.current = true;
        setStatus('ready');
      }
      frameId = window.requestAnimationFrame(animate);
    };

    drawTerminal(0);
    resize();
    animate();
    mount.addEventListener('pointerenter', pointerEnter);
    mount.addEventListener('pointermove', pointerMove);
    mount.addEventListener('pointerleave', pointerLeave);
    window.addEventListener('resize', resize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      mount.removeEventListener('pointerenter', pointerEnter);
      mount.removeEventListener('pointermove', pointerMove);
      mount.removeEventListener('pointerleave', pointerLeave);
      window.removeEventListener('resize', resize);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive 3D render of an old-school computer monitor with green terminal code"
      className="relative h-full min-h-[320px] w-full"
    >
      {status === 'loading' ? (
        <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
          Loading 3D signal...
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="absolute inset-0 grid place-items-center border border-[#7CFE2D]/40 bg-black text-sm text-[#7CFE2D]">
          WebGL unavailable
        </div>
      ) : null}
    </div>
  );
}
