// Device detection utilities
export const detectDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua);
  const isLowPerformance = /android [1-4]|iphone os [1-8]|cpu os [1-8]|safari\/[1-5]/i.test(ua);
  
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isLowPerformance,
    supportsWebGL: checkWebGLSupport(),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
};

const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

export const shouldUse3D = () => {
  const device = detectDevice();
  
  // Only disable 3D on mobile devices or if user prefers reduced motion or no WebGL support
  if (device.isMobile || device.reducedMotion || !device.supportsWebGL) {
    return false;
  }
  
  return true;
};
