// Toggle between login and register forms
document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.querySelector(".form-box");
  const registerBox = document.getElementById("registerBox");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");

  showRegister.addEventListener("click", () => {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
  });

  showLogin.addEventListener("click", () => {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
  });

  // Simple alert to simulate login/register
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login Successful! (Demo)");
  });

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registration Successful! (Demo)");
  });
});
