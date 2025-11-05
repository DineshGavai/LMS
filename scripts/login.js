let form = document.getElementById("loginForm");

form.onsubmit = function (event) {
  event.preventDefault();

  let email = document.getElementById("login-email").value.trim();
  let pass = document.getElementById("login-password").value.trim();

  let saved = localStorage.getItem(email);

  if (!saved) {
    alert("No account found with this email!");
    return;
  }

  let user = JSON.parse(saved);

  if (user.password === pass) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "/index.html";
  } else {
    alert("Wrong password!");
  }
};
