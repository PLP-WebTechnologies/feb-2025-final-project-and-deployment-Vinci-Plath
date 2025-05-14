// Critical CSS and performance optimization
document.addEventListener('DOMContentLoaded', function() {
  // Load non-critical CSS
  const loadCss = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    document.head.appendChild(link);
    
    // Once loaded, switch to all media
    link.onload = function() {
      this.media = 'all';
    };
  };
  
  // Load non-critical stylesheets
  loadCss('css/non-critical.css');
  
  // Preload important images
  const preloadImages = [
    'images/logo.svg',
    'images/logo-white.svg',
    'images/akinyi-sm.jpg'
  ];
  
  preloadImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
  
  // Handle font loading
  const fontLoadPromise = document.fonts.ready;
  
  fontLoadPromise.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
  
  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(el => animationObserver.observe(el));
  
  // Performance monitoring
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    window.addEventListener('load', () => {
      const perfData = window.performance.getEntriesByType('navigation')[0];
      const lcpElement = window.performance.getEntriesByType('largest-contentful-paint')[0];
      
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.startTime);
      console.log('First Contentful Paint:', perfData.getEntriesByName('first-contentful-paint')[0].startTime);
      console.log('Largest Contentful Paint:', lcpElement ? lcpElement.startTime : 'Not available');
    });
  }
}); 