// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');

mobileNavToggle.addEventListener('click', () => {
  const visibility = mainNav.getAttribute('data-visible');
  
  if (visibility === "false") {
    mainNav.setAttribute('data-visible', true);
    mobileNavToggle.setAttribute('aria-expanded', true);
  } else {
    mainNav.setAttribute('data-visible', false);
    mobileNavToggle.setAttribute('aria-expanded', false);
  }
});

// Team card animation
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.team-image img').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.team-image img').style.transform = 'scale(1)';
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });



// Story Expansion Functionality

function toggleStory(storyId) {
    const storyCard = document.getElementById(storyId);
    const excerpt = storyCard.querySelector('.story-excerpt');
    const fullStory = storyCard.querySelector('.story-full');
    
    if (fullStory.style.display === 'none') {
      excerpt.style.display = 'none';
      fullStory.style.display = 'block';
    } else {
      excerpt.style.display = 'block';
      fullStory.style.display = 'none';
    }
  }
  
  // Story reactions
  function reactToStory(storyId, reaction) {
    const likeButton = document.querySelector(`#${storyId} .btn-like`);
    const likeCount = document.querySelector(`#${storyId} .like-count`);
    
    if (reaction === 'like') {
      likeButton.classList.toggle('liked');
      likeButton.innerHTML = likeButton.classList.contains('liked') ? 
        '<i class="fas fa-heart"></i> <span class="like-count">' + (parseInt(likeCount.textContent) + 1) + '</span>' :
        '<i class="far fa-heart"></i> <span class="like-count">' + (parseInt(likeCount.textContent) - 1) + '</span>';
    }
  }
  
  // Comment toggle
  function toggleComments(storyId) {
    const commentsSection = document.getElementById(`${storyId}-comments`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
  }
  
  // Form submission
  document.querySelector('.story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for sharing your story. Our team will review it before publishing.');
    this.reset();
  });
  
  // Post comment functionality
  document.querySelectorAll('.btn-post-comment').forEach(button => {
    button.addEventListener('click', function() {
      const textarea = this.parentElement.querySelector('textarea');
      if (textarea.value.trim() !== '') {
        const commentsList = this.closest('.story-comments').querySelector('.comments-list');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
          <p class="comment-author">You</p>
          <p class="comment-text">${textarea.value}</p>
        `;
        commentsList.appendChild(newComment);
        textarea.value = '';
      }
    });
  });

// Chatbot Simulation
const chatbotForm = document.querySelector('.chatbot-form');
if (chatbotForm) {
  const chatbotMessages = document.querySelector('.chatbot-messages');
  const chatbotInput = document.querySelector('.chatbot-input input');
  
  const botResponses = [
    "I'm here to listen. Can you tell me more about how you're feeling?",
    "That sounds difficult. Many women in our community have felt similarly after climate events.",
    "Would you like to try a grounding exercise together?",
    "Remember to breathe. You're not alone in this.",
    "Would you like me to connect you with a therapist in your area?"
  ];
  
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatbotInput.value.trim();
    
    if (message) {
      // Add user message
      const userMessage = document.createElement('div');
      userMessage.classList.add('message', 'user-message');
      userMessage.textContent = message;
      chatbotMessages.appendChild(userMessage);
      
      // Clear input
      chatbotInput.value = '';
      
      // Simulate bot thinking
      setTimeout(() => {
        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        botMessage.textContent = randomResponse;
        chatbotMessages.appendChild(botMessage);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 1000);
    }
  });
}

// Tab System for Resources Page
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding tab pane
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Event Comment Toggle
document.querySelectorAll('.comment-btn').forEach(button => {
  button.addEventListener('click', () => {
    const eventCard = button.closest('.event-card');
    const commentSection = eventCard.querySelector('.comment-section');
    commentSection.classList.toggle('hidden');
  });
});

// RSVP Modal
const rsvpButtons = document.querySelectorAll('.rsvp-btn');
const rsvpModal = document.querySelector('.rsvp-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

if (rsvpButtons.length > 0) {
  rsvpButtons.forEach(button => {
    button.addEventListener('click', () => {
      rsvpModal.classList.remove('hidden');
    });
  });
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      rsvpModal.classList.add('hidden');
    });
  });
  
  // Close modal when clicking outside
  rsvpModal.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      rsvpModal.classList.add('hidden');
    }
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const successModal = document.querySelector('.success-modal');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation would go here
    const isValid = true; // Simplified for demo
    
    if (isValid) {
      contactForm.reset();
      successModal.classList.remove('hidden');
    }
  });
  
  // Close success modal
  document.querySelector('.close-success-btn').addEventListener('click', () => {
    successModal.classList.add('hidden');
  });
}

// Ambassador Modal
const ambassadorBtn = document.querySelector('.ambassador-btn');
const ambassadorModal = document.querySelector('.ambassador-modal');

if (ambassadorBtn) {
  ambassadorBtn.addEventListener('click', () => {
    ambassadorModal.classList.remove('hidden');
  });
  
  // Close modal when clicking outside
  ambassadorModal.addEventListener('click', (e) => {
    if (e.target === ambassadorModal) {
      ambassadorModal.classList.add('hidden');
    }
  });
}

// Quote Builder Tool
const generateQuoteBtn = document.querySelector('.generate-btn');
const copyQuoteBtn = document.querySelector('.copy-btn');
const storySelect = document.getElementById('story-select');
const quoteText = document.getElementById('quote-text');

if (generateQuoteBtn) {
  const storyQuotes = {
    flood: "My books floated away when the river broke its banks. But I remembered what my mother said — 'You carry your future inside you.'",
    drought: "I didn't know grief could feel like fire in the chest. When I found ClimaHub, I wrote my story. I wasn't a victim anymore — I was a witness, a warrior.",
    cyclone: "Through ClimaHub's AI chatbot and therapist referrals, I learned how to breathe again. And I met other women online who knew my pain."
  };
  
  generateQuoteBtn.addEventListener('click', () => {
    const selectedStory = storySelect.value;
    if (selectedStory) {
      quoteText.value = storyQuotes[selectedStory];
    }
  });
  
  copyQuoteBtn.addEventListener('click', () => {
    if (quoteText.value) {
      quoteText.select();
      document.execCommand('copy');
      copyQuoteBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyQuoteBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  });
}

// Microgrant Application Modal
const applyButtons = document.querySelectorAll('.apply-btn');
const applicationModal = document.querySelector('.application-modal');

if (applyButtons.length > 0) {
  applyButtons.forEach(button => {
    button.addEventListener('click', () => {
      applicationModal.classList.remove('hidden');
    });
  });
  
  // Close modal when clicking outside
  applicationModal.addEventListener('click', (e) => {
    if (e.target === applicationModal) {
      applicationModal.classList.add('hidden');
    }
  });
}

// Initialize first tab as active if on resources page
if (tabPanes.length > 0) {
  tabButtons[0].classList.add('active');
  tabPanes[0].classList.add('active');
}