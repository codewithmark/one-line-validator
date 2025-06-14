# One Line Validator

A super simple, 1-line form validation library. Designed for beginners and fast prototyping.

## ✅ Features

- Validates form fields with one function call
- Adds error messages and red borders
- Returns valid form data as a JSON object
- Requires only jQuery

## 🚀 Usage

```html
<script src="https://cdn.jsdelivr.net/gh/codewithmark/one-line-validator@main/dist/OneLineValidator.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/codewithmark/one-line-validator@main/dist/OneLineValidator.js"></script>
<script>
  $('#submitBtn').on('click', function (e) {
    e.preventDefault();
    const result = OneLineValidator('#commonForm');
    if (result) {
      console.log(result);
      alert('Form is valid!');
    }
  });
</script>
