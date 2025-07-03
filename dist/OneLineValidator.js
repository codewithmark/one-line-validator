class OneLineValidator {
  constructor(formSelector, customErrors = {}) {
    this.form = document.querySelector(formSelector);
    this.customErrors = customErrors;
    this.formData = {};
    this.isValid = true;
    this.firstInvalidField = null;

    if (!this.form) {
      console.warn(`Form not found: ${formSelector}`);
      return;
    }

    this.injectStyles();
    this.attachLiveValidation();
  }

  injectStyles() {
    if (document.getElementById('OneLineValidatorStyles')) return;

    const style = document.createElement('style');
    style.id = 'OneLineValidatorStyles';
    style.innerHTML = `
      .field-error {
        border: 2px solid #dc3545 !important;
        background-color: #fff0f0;
      }
      .error-message {
        color: #dc3545;
        font-size: 0.875em;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        animation: fadeIn 0.3s ease-in-out;
      }
      .error-icon {
        font-weight: bold;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-2px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  getErrorMessage(field, fallback) {
    return this.customErrors[field.id] || fallback;
  }

  validateField(field) {
    const type = field.type;
    const value = field.value;
    const required = field.required;
    let errorMsg = '';

    if (required && !value && type !== 'checkbox') {
      errorMsg = this.getErrorMessage(field, 'This field is required.');
    } else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = this.getErrorMessage(field, 'Please enter a valid email address.');
      }
    } else if (type === 'password' && field.id === 'password') {
      if (value.length < 6) {
        errorMsg = this.getErrorMessage(field, 'Password must be at least 6 characters.');
      }
    } else if (field.id === 'confirmPassword') {
      const original = this.form.querySelector('#password')?.value;
      if (value !== original) {
        errorMsg = this.getErrorMessage(field, 'Passwords do not match.');
      }
    } else if (type === 'tel' && value) {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(value)) {
        errorMsg = this.getErrorMessage(field, 'Please enter a valid phone number.');
      }
    } else if (type === 'checkbox' && required && !field.checked) {
      errorMsg = this.getErrorMessage(field, 'You must agree to continue.');
    }

    field.classList.remove('field-error');
    const next = field.nextElementSibling;
    if (next?.classList.contains('error-message')) next.remove();

    if (errorMsg) {
      field.classList.add('field-error');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `<span class="error-icon">❌</span> ${errorMsg}`;
      field.insertAdjacentElement('afterend', errorDiv);
      if (!this.firstInvalidField) this.firstInvalidField = field;
      return false;
    }

    return true;
  }

  attachLiveValidation() {
    const allFields = this.form.querySelectorAll('input, textarea, select');
    allFields.forEach(field => {
      field.addEventListener('input', () => this.validateField(field));
      field.addEventListener('change', () => this.validateField(field));
    });
  }

  validate() {
    this.isValid = true;
    this.formData = {};
    this.firstInvalidField = null;

    this.form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    this.form.querySelectorAll('.error-message').forEach(el => el.remove());

    const allFields = this.form.querySelectorAll('input, textarea, select');
    allFields.forEach(field => {
      if (field.disabled || !field.offsetParent) return;

      const isFieldValid = this.validateField(field);
      if (!isFieldValid) this.isValid = false;

      const id = field.id;
      const type = field.type;

      if (isFieldValid && id) {
        this.formData[id] = type === 'checkbox' ? field.checked : field.value;
      }
    });

    if (!this.isValid && this.firstInvalidField) {
      this.firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      this.firstInvalidField.focus({ preventScroll: true });
    }

    return this.isValid ? this.formData : false;
  }
}

// ✅ UMD-style export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OneLineValidator;
} else {
  window.OneLineValidator = OneLineValidator;
}
