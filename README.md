# OneLineValidator

A simple, lightweight, and beginner-friendly JavaScript form validator class.
✅ No dependencies
✅ Custom error messages
✅ Real-time validation
✅ Works with plain HTML forms
✅ Supports both browser and Node environments

---

## 🚀 Features

* Validates common HTML input types (`email`, `password`, `tel`, `checkbox`, etc.)
* Highlights invalid fields with red borders
* Displays animated error messages below each field
* Scrolls to the first invalid field
* Supports custom error messages by input `id`
* Automatically listens for changes to validate live

---

## 🧠 Requirements

* Your fields must have an `id`
* Include the script in your page or bundle it
* Use standard HTML input types (no frameworks needed)

---

## 📦 Installation

### Option 1: Use in browser (via `<script>`)

```html
<script src="OneLineValidator.js"></script>
```

### Option 2: Use with Node / Webpack / Vite

```bash
npm install
```

Then in your JS:

```js
const OneLineValidator = require('./OneLineValidator');
// or
import { OneLineValidator } from './OneLineValidator.js';
```

---

## ✅ How to Use

### Step 1: Create your form

```html
<form id="myForm">
  <label>Email</label>
  <input type="email" id="email" required>

  <label>Password</label>
  <input type="password" id="password" required>

  <label>Confirm Password</label>
  <input type="password" id="confirmPassword" required>

  <label>Phone Number</label>
  <input type="tel" id="phone">

  <label>
    <input type="checkbox" id="terms" required>
    I agree to the terms
  </label>

  <button id="submitBtn">Submit</button>
</form>
```

---

### Step 2: Add script

```html
<script>
                                                👇👇👇👇
  //element id = email ---> <input type="email" id="email" required>
  /*
  //syntax
  const customErrors = {
    element_id: "error message you want to show"
  };
  
  */
  const customErrors = {
    email: "Please enter a valid email address.",
    password: "Password must be at least 6 characters.",
    confirmPassword: "Passwords must match.",
    phone: "Enter a valid phone number (10–15 digits).",
    terms: "You must accept the terms to continue."
  };

  const validator = new OneLineValidator('#myForm', customErrors);

  document.getElementById('submitBtn').addEventListener('click', function () {
    const result = validator.validate();

    if (result) {
      alert('Form submitted successfully!');
      console.log(result); // You can now send this to your server
    } else {
      console.warn('Form has errors. Please fix them.');
    }
  });
</script>
```

---

## 🧪 Validation Rules Supported

| Input Type        | Validation Logic                                |
| ----------------- | ----------------------------------------------- |
| `required`        | Must not be empty                               |
| `email`           | Valid email format                              |
| `password`        | At least 6 characters (only if `id="password"`) |
| `confirmPassword` | Must match `#password` field                    |
| `tel`             | 10–15 digits, optionally starts with `+`        |
| `checkbox`        | Must be checked if required                     |

---

## 🎯 Custom Error Messages

Use the `customErrors` object with keys matching the input field `id`:

```js
const customErrors = {
  email: "Custom email error message",
  password: "Custom password message"
};
```

If an `id` is not listed, a default message will be used.

---

## 📜 Return Value

If the form is valid, `.validate()` returns an object like this:

```js
{
  email: "user@example.com",
  password: "abc123",
  confirmPassword: "abc123",
  phone: "+1234567890",
  terms: true
}
```

If invalid, it returns `false`.

---

## 🧼 Resetting the Form (Optional)

Want to reset errors and clear the form?

```js
document.getElementById('myForm').reset();
validator.validate(); // will clear any previous errors
```

---

## 🔄 Supported Environments

This validator supports both **browser** and **Node.js**:

```js
// Browser global
window.OneLineValidator

// Node/CommonJS
const OneLineValidator = require('./OneLineValidator');

// ESM
import { OneLineValidator } from './OneLineValidator.js';
```

---

## 💡 Tips for Beginners

* Make sure every input has a **unique `id`**
* Put your JS code **after** the form in HTML or inside `window.onload`
* You don’t need jQuery or any libraries
* Works great with plain HTML and vanilla JS

---

## 🔒 License

MIT – free to use, modify, or contribute.

---

## 🙋‍♀️ Need Help?

Open an issue or reach out with questions — happy to support beginners!
