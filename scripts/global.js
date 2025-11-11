// Render user name
export const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

let profileName = document.getElementById("profile_name");
let profileEmail = document.getElementById("profile_email");

if (loggedInUser) {

  if (profileName) profileName.textContent = loggedInUser.name;
  if (profileEmail) profileEmail.textContent = loggedInUser.email;
} else {
  // If no user is logged in, redirect to login page
  if (!/index\.html|login\.html|register\.html/.test(window.location.href))
  window.location.href = "index.html";
}

document.getElementById("quizSelect").addEventListener("change", function () {
  const subject = this.value;
  if (subject) {
    window.location.href = `subject.html?subject=${encodeURIComponent(
      subject
    )}#quiz-anchor`;
  }
});
