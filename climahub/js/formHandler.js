// Form validation and error handling
class FormHandler {
  constructor(formElement) {
    this.form = formElement;
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.inputs = Array.from(this.form.querySelectorAll('input, textarea, select'));
    this.setupValidation();
  }
  
  setupValidation() {
    // Add validation on input
    this.inputs.forEach(input => {
      input.addEventListener('input', () => this.validateInput(input));
      input.addEventListener('blur', () => this.validateInput(input));
    });
    
    // Add form submission handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }
  
  validateInput(input) {
    const errorElement = this.getErrorElement(input);
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing states
    input.classList.remove('error-state', 'success-state');
    
    // Check validity
    if (!input.value.trim() && input.required) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    } else if (input.minLength && input.value.length < input.minLength) {
      isValid = false;
      errorMessage = `Must be at least ${input.minLength} characters`;
    }
    
    // Update UI
    if (!isValid) {
      input.classList.add('error-state');
      errorElement.textContent = errorMessage;
      errorElement.classList.remove('hidden');
    } else {
      input.classList.add('success-state');
      errorElement.classList.add('hidden');
    }
    
    return isValid;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  getErrorElement(input) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message hidden';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    return errorElement;
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all inputs
    const isValid = this.inputs.every(input => this.validateInput(input));
    
    if (!isValid) {
      const firstError = this.form.querySelector('.error-state');
      firstError.focus();
      return;
    }
    
    // Show loading state
    this.submitButton.classList.add('loading');
    this.submitButton.disabled = true;
    
    try {
      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      
      // Send data to server
      const response = await fetch(this.form.action, {
        method: this.form.method || 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Show success message
      this.showMessage('success', 'Form submitted successfully!');
      this.form.reset();
      
    } catch (error) {
      console.error('Error:', error);
      this.showMessage('error', 'Something went wrong. Please try again.');
      
    } finally {
      // Reset button state
      this.submitButton.classList.remove('loading');
      this.submitButton.disabled = false;
    }
  }
  
  showMessage(type, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = text;
    
    this.form.insertBefore(messageElement, this.form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => new FormHandler(form));
}); 