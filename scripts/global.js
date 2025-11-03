// Render user name
export const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  document.getElementById("profile_name").textContent = loggedInUser.name;
  document.getElementById("profile_email").textContent = loggedInUser.email;
} else {
  // If no user is logged in, redirect to login page
  window.location.href = "login.html";
}
