// Get form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');

// Email validation regex pattern
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Character counter for message
messageInput.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = length;
    
    if (length > 500) {
        charCount.style.color = '#ff0080';
    } else if (length > 450) {
        charCount.style.color = '#ffff00';
    } else {
        charCount.style.color = 'rgba(0, 255, 255, 0.6)';
    }
});

// Real-time validation on blur
nameInput.addEventListener('blur', function() {
    validateName(false);
});

emailInput.addEventListener('blur', function() {
    validateEmail(false);
});

messageInput.addEventListener('blur', function() {
    validateMessage(false);
});

// Clear error on input
nameInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError('name');
    }
});

emailInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError('email');
    }
});

messageInput.addEventListener('input', function() {
    if (this.value.trim()) {
        clearError('message');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide success message if visible
    successMessage.classList.remove('show');
    
    // Validate all fields
    const isNameValid = validateName(true);
    const isEmailValid = validateEmail(true);
    const isMessageValid = validateMessage(true);
    
    // If all validations pass
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show success message
        successMessage.classList.add('show');
        
        // Clear form
        form.reset();
        charCount.textContent = '0';
        
        // Clear any remaining error states
        clearAllErrors();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Optional: Log form data (in real scenario, would send to server)
        console.log('Transmission complete:', {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
    }
});

// Validation functions
function validateName(showError) {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    
    if (name === '') {
        if (showError) {
            showErrorMessage(nameInput, nameError, 'Identity field cannot be empty');
        }
        return false;
    } else if (name.length < 2) {
        if (showError) {
            showErrorMessage(nameInput, nameError, 'Identity requires minimum 2 characters');
        }
        return false;
    } else if (name.length > 50) {
        if (showError) {
            showErrorMessage(nameInput, nameError, 'Identity exceeds maximum length');
        }
        return false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        if (showError) {
            showErrorMessage(nameInput, nameError, 'Invalid characters detected in identity');
        }
        return false;
    }
    
    clearError('name');
    nameInput.classList.add('input-success');
    return true;
}

function validateEmail(showError) {
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    
    if (email === '') {
        if (showError) {
            showErrorMessage(emailInput, emailError, 'Communication channel required');
        }
        return false;
    } else if (!emailRegex.test(email)) {
        if (showError) {
            showErrorMessage(emailInput, emailError, 'Invalid channel format detected');
        }
        return false;
    } else if (email.length > 100) {
        if (showError) {
            showErrorMessage(emailInput, emailError, 'Channel address exceeds limit');
        }
        return false;
    }
    
    clearError('email');
    emailInput.classList.add('input-success');
    return true;
}

function validateMessage(showError) {
    const message = messageInput.value.trim();
    const messageError = document.getElementById('messageError');
    
    if (message === '') {
        if (showError) {
            showErrorMessage(messageInput, messageError, 'Transmission data required');
        }
        return false;
    } else if (message.length < 10) {
        if (showError) {
            showErrorMessage(messageInput, messageError, 'Insufficient data - minimum 10 bytes required');
        }
        return false;
    } else if (message.length > 500) {
        if (showError) {
            showErrorMessage(messageInput, messageError, 'Data overflow - maximum 500 bytes');
        }
        return false;
    }
    
    clearError('message');
    messageInput.classList.add('input-success');
    return true;
}

// Helper functions
function showErrorMessage(input, errorElement, message) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(fieldName) {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    input.classList.remove('input-error');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
}

function clearAllErrors() {
    ['name', 'email', 'message'].forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('input-error', 'input-success');
        clearError(field);
    });
}