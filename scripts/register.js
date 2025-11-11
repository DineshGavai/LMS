document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    // Check if already registered
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("This email is already registered!");
      return;
    }

    // Store user in localStorage
    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "login.html"; // redirect to login page
  });
