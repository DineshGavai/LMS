document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("No account found with this email!");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
      localStorage.setItem("loggedInUser", email);
      window.location.href = "/courses.html"; //  redirect
    } else {
      alert("Incorrect password!");
    }
  });
});
