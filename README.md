# 🧪 OneLineValidator

**A simple JavaScript class for validating HTML forms with live feedback and custom error messages — perfect for beginner web developers.**

---

## 🚀 Features

* ✅ One-line form validation
* 🔍 Custom error messages via `id` or `class`
* 📧 Validates email, password, phone, confirm password, and checkboxes
* 🎨 Styled error messages with animation
* 🔄 Live validation on input and change events

---

## 🛠️ Installation

Include the script in your HTML:

```html
<script src="OneLineValidator.js"></script>
``` 

---

## ✅ Quick Start

### 1. HTML Form Example

```html
<form id="myForm">
  <input type="email" id="email" required />
  <input type="password" class="password" required />
  <input type="password" id="confirmPassword" required />
  <input type="tel" class="phone" />
  <input type="checkbox" id="terms" required />
  <button type="submit">Submit</button>
</form>
```

### 2. Define Custom Error Messages

```js
const customErrors = [
  { id: "email", msg: "Please enter a valid email address." },
  { class: "password", msg: "Password must be at least 6 characters." },
  { id: "confirmPassword", msg: "Passwords must match." },
  { class: "phone", msg: "Enter a valid phone number (10–15 digits)." },
  { id: "terms", msg: "You must accept the terms to continue." }
];
```

### 3. Validate on Form Submit

```js
document.querySelector('#myForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = OneLineValidator.validate('#myForm', customErrors);

  if (data) {
    console.log('✅ Form is valid:', data);
    // Handle form data here
  } else {
    console.log('❌ Form has errors.');
  }
});
```

---

## 📦 Output Example (If Valid)

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

## 📚 License

MIT License. Free to use, modify, and share.
