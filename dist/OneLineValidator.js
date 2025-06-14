function OneLineValidator(formSelector = 'form') {
    const $form = $(formSelector);
    let isValid = true;
    let formData = {};

    // Inject custom styles once
    if (!$('#OneLineValidatorStyles').length) {
      $('head').append(`
        <style id="OneLineValidatorStyles">
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
        </style>
      `);
    }

    function validateField($field) {
      const type = $field.attr('type');
      const value = $field.val();
      const required = $field.prop('required');
      let errorMsg = '';

      if (required && !value) {
        errorMsg = 'This field is required.';
      } else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (type === 'password' && $field.attr('id') === 'password') {
        if (value.length < 6) {
          errorMsg = 'Password must be at least 6 characters.';
        }
      } else if ($field.attr('id') === 'confirmPassword') {
        const original = $('#password').val();
        if (value !== original) {
          errorMsg = 'Passwords do not match.';
        }
      } else if (type === 'tel' && value) {
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(value)) {
          errorMsg = 'Please enter a valid phone number.';
        }
      } else if (type === 'date' && required && !value) {
        errorMsg = 'This field is required.';
      } else if (type === 'checkbox' && required && !$field.prop('checked')) {
        errorMsg = 'You must agree to continue.';
      }

      // Clear previous error
      $field.removeClass('field-error');
      $field.next('.error-message').remove();

      // Add error
      if (errorMsg) {
        $field.addClass('field-error');
        $field.after(`<div class="error-message"><span class="error-icon">❌</span> ${errorMsg}</div>`);
        return false;
      }

      return true;
    }

    // Attach live validation
    $form.find('input, textarea, select').each(function () {
      const $field = $(this);
      $field.off('input.OneLineValidator change.OneLineValidator')
        .on('input.OneLineValidator change.OneLineValidator', function () {
          validateField($field);
        });
    });

    // Clear all previous errors
    $form.find('.field-error').removeClass('field-error');
    $form.find('.error-message').remove();

    // Validate and collect values
    $form.find('input, textarea, select').each(function () {
      const $field = $(this);
      if ($field.prop('disabled') || !$field.is(':visible')) return;

      const isFieldValid = validateField($field);
      if (!isFieldValid) isValid = false;

      const id = $field.attr('id');
      const type = $field.attr('type');

      if (isFieldValid && id) {
        if (type === 'checkbox') {
          formData[id] = $field.prop('checked');
        } else {
          formData[id] = $field.val();
        }
      }
    });

    return isValid ? formData : false;
  }