import { useEffect, useRef } from 'react';

interface CircuitProps {
  color?: string;
  opacity?: number;
  density?: number;
  speed?: number;
}

export default function CircuitBackground({
  color = '#4ade80', // Default to a techy green, but can be overridden
  opacity = 0.1,
  density = 30,
  speed = 1
}: CircuitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let traces: Trace[] = [];
    
    // Grid settings
    const gridSize = 30;
    
    class Trace {
      x: number;
      y: number;
      history: {x: number, y: number}[];
      maxLength: number;
      life: number;
      direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
      speed: number;
      dead: boolean;

      constructor(w: number, h: number) {
        // Snap to grid
        this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
        this.history = [{x: this.x, y: this.y}];
        this.maxLength = Math.floor(Math.random() * 20) + 10;
        this.life = 1;
        this.speed = 0;
        this.dead = false;
        this.direction = this.getRandomDirection();
      }

      getRandomDirection(): 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' {
        const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
        return dirs[Math.floor(Math.random() * dirs.length)];
      }

      update(w: number, h: number) {
        if (this.dead) return;

        // Move every few frames based on speed
        this.speed++;
        if (this.speed < (5 / speed)) return;
        this.speed = 0;

        // Chance to change direction
        if (Math.random() < 0.3) {
          const newDir = this.getRandomDirection();
          // Don't go backwards
          if (
            (this.direction === 'UP' && newDir !== 'DOWN') ||
            (this.direction === 'DOWN' && newDir !== 'UP') ||
            (this.direction === 'LEFT' && newDir !== 'RIGHT') ||
            (this.direction === 'RIGHT' && newDir !== 'LEFT')
          ) {
            this.direction = newDir;
          }
        }

        // Move
        switch (this.direction) {
          case 'UP': this.y -= gridSize; break;
          case 'DOWN': this.y += gridSize; break;
          case 'LEFT': this.x -= gridSize; break;
          case 'RIGHT': this.x += gridSize; break;
        }

        // Bounds check
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
          this.dead = true;
          return;
        }

        this.history.push({x: this.x, y: this.y});

        // Limit length
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }

        // Random death
        if (Math.random() < 0.02) {
          this.dead = true;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }

        ctx.strokeStyle = color;
        // Fade out tail
        ctx.globalAlpha = opacity * (this.dead ? (this.history.length / this.maxLength) : 1);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw head
        if (!this.dead) {
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity * 2;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Maintain density
      if (traces.length < density) {
        if (Math.random() < 0.1) {
          traces.push(new Trace(canvas.width, canvas.height));
        }
      }

      // Update and draw
      traces.forEach((trace, index) => {
        trace.update(canvas.width, canvas.height);
        trace.draw(ctx);
        
        // Remove dead traces that have fully faded (simulated by empty history or just cleanup)
        if (trace.dead) {
           // Shrink history to simulate fading out tail
           trace.history.shift();
           if (trace.history.length === 0) {
             traces.splice(index, 1);
           }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, opacity, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
