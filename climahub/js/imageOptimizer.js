// Image optimization and lazy loading
document.addEventListener('DOMContentLoaded', function() {
  // Lazy load all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
  
  // Helper function to load image with optimal quality
  function loadImage(img) {
    const src = img.dataset.src;
    
    // If it's an Unsplash image, optimize the URL
    if (src.includes('unsplash.com')) {
      // Extract the photo ID and create an optimized URL
      const baseUrl = src.split('?')[0];
      const width = Math.ceil(img.offsetWidth * window.devicePixelRatio);
      const optimizedUrl = `${baseUrl}?w=${width}&q=75&auto=format`;
      img.src = optimizedUrl;
    } else {
      img.src = src;
    }
    
    img.removeAttribute('data-src');
  }
  
  // Handle hero background images
  const heroElements = document.querySelectorAll('[data-hero-bg]');
  
  heroElements.forEach(hero => {
    const bgUrl = hero.dataset.heroBg;
    if (bgUrl.includes('unsplash.com')) {
      const baseUrl = bgUrl.split('?')[0];
      const width = Math.ceil(window.innerWidth * window.devicePixelRatio);
      const optimizedUrl = `${baseUrl}?w=${width}&q=75&auto=format`;
      hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${optimizedUrl})`;
    } else {
      hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgUrl})`;
    }
  });
  
  // Handle responsive images
  const responsiveImages = document.querySelectorAll('img[data-srcset]');
  
  responsiveImages.forEach(img => {
    const srcset = img.dataset.srcset.split(',').map(src => {
      const [url, size] = src.trim().split(' ');
      if (url.includes('unsplash.com')) {
        const baseUrl = url.split('?')[0];
        const width = parseInt(size);
        return `${baseUrl}?w=${width}&q=75&auto=format ${size}`;
      }
      return src;
    }).join(',');
    
    img.srcset = srcset;
    img.removeAttribute('data-srcset');
  });
}); 