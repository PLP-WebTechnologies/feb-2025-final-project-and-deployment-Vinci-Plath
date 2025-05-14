// Animations and interactions
class AnimationHandler {
  constructor() {
    this.setupScrollAnimations();
    this.setupNavigation();
    this.setupHeroParallax();
    this.setupStoryCards();
    this.setupStatCounters();
  }
  
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          if (entry.target.dataset.delay) {
            entry.target.style.animationDelay = `${entry.target.dataset.delay}ms`;
          }
        }
      });
    }, options);
    
    animatedElements.forEach(el => observer.observe(el));
  }
  
  setupNavigation() {
    const header = document.querySelector('.header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.main-nav');
    
    // Handle header scroll state
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('scroll-up', 'scroll-down');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
    
    // Handle mobile navigation
    mobileNavToggle?.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
    
    // Close mobile nav on click outside
    document.addEventListener('click', (e) => {
      if (nav?.classList.contains('active') && !nav.contains(e.target) && !mobileNavToggle?.contains(e.target)) {
        nav.classList.remove('active');
        mobileNavToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }
  
  setupHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      const speed = 0.5;
      
      hero.style.backgroundPositionY = `${scroll * speed}px`;
    });
  }
  
  setupStoryCards() {
    const cards = document.querySelectorAll('.story-card');
    
    cards.forEach(card => {
      const readMoreBtn = card.querySelector('.btn-read-more');
      const fullStory = card.querySelector('.story-full');
      
      if (readMoreBtn && fullStory) {
        readMoreBtn.addEventListener('click', () => {
          const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
          
          readMoreBtn.setAttribute('aria-expanded', !isExpanded);
          fullStory.classList.toggle('active');
          readMoreBtn.textContent = isExpanded ? 'Read More' : 'Read Less';
          
          if (!isExpanded) {
            fullStory.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }
    });
  }
  
  setupStatCounters() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    const countUp = (element, target) => {
      const duration = 2000;
      const frameDuration = 1000/60;
      const totalFrames = Math.round(duration/frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame/totalFrames;
        const currentCount = Math.round(target * progress);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          element.textContent = target + (element.dataset.suffix || '');
        } else {
          element.textContent = currentCount + (element.dataset.suffix || '');
        }
      }, frameDuration);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
          countUp(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
  }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  new AnimationHandler();
}); 