# 🧪 OneLineValidator

**A lightweight, beginner-friendly JavaScript class for validating HTML forms with custom error messages and clean visual feedback.**

---

## 🚀 Features

* ✅ One-line validation with `OneLineValidator.validate(...)`
* 🎯 Custom error messages via `id` or `class`
* 🔄 Live field validation on input/change
* ✨ Styled error messages with animation
* 📦 Returns form data object when valid, `false` when not
* 💡 Treats any field with a custom error as required (no `required` attribute needed)

---

## 🛠️ Installation

Download or copy `OneLineValidator.js` into your project.

Then include it:

```html
<script src="OneLineValidator.js"></script>
```

Or import via module (if using bundlers like Vite/Webpack):

```js
import OneLineValidator from './OneLineValidator.js';
```

---

## ✅ Usage Example

### HTML Form

```html
IMPORTANT NOTE > all the input fields need to have id assigned to it otherwise return object will be null

<form id="myForm">
  <input type="email" id="email" />
  <input type="password" class="password" id="password" />
  <input type="password" id="confirmPassword" />
  <input type="tel" class="phone"  id="phone" />
  <input type="checkbox" id="terms" />
  <button type="submit">Submit</button>
</form>
```

### JavaScript

```js

//IMPORTANT NOTE > all the input fields need to have id assigned to it otherwise return object will be null
const customErrors = [
  { id: "email", msg: "Please enter a valid email address." },
  { class: "password", msg: "Password must be at least 6 characters." },
  { id: "confirmPassword", msg: "Passwords must match." },
  { class: "phone", msg: "Enter a valid phone number (10–15 digits)." },
  { id: "terms", msg: "You must accept the terms to continue." }
];

document.querySelector('#myForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = OneLineValidator.validate('#myForm', customErrors);

  if (data) {
    console.log('✅ Form is valid!', data);
    // Submit or use data
  } else {
    console.log('❌ Form has errors');
  }
});
```

---

## 📦 Return Format (If Valid)

```json
{
  "email": "user@example.com",
  "password": "abc123",
  "confirmPassword": "abc123",
  "phone": "+1234567890",
  "terms": true
}
```

---

## 🎨 Styling

Styles are automatically injected:

* `.field-error` adds a red border and light red background
* `.error-message` shows an animated message with an ❌ icon

---

## 📚 License

MIT — free to use, modify, and share.

---

## 💬 Author

Built by \[Code With Mark].
Contributions, suggestions, and issues welcome!
