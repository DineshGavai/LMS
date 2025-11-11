// Get logged-in user
export const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Elements
const profileName = document.getElementById("profile_name");
const profileEmail = document.getElementById("profile_email");
const studyLink = document.getElementById("studyLink");
const announcementLink = document.getElementById("announcementLink");
const authButtonContainer = document.getElementById("authButtonContainer");

// Public pages (accessible without login)
const public_routes = [
  "index.html",
  "courses.html",
  "subject.html",
  "login.html",
  "register.html",
];

// Current page name
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// ✅ Navbar visibility and auth button handling
if (loggedInUser) {
  // Populate profile data if elements exist
  if (profileName) profileName.textContent = loggedInUser.name || "User";
  if (profileEmail)
    profileEmail.textContent = loggedInUser.email || "user@example.com";

  // Show private links
  if (studyLink) studyLink.style.display = "inline-block";
  if (announcementLink) announcementLink.style.display = "inline-block";

  // Show logout button
  if (authButtonContainer) {
    authButtonContainer.innerHTML = `<button id="navLogoutBtn" class="nav-btn">Logout</button>`;
    document.getElementById("navLogoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  // ✅ If user tries to visit login or register while logged in → redirect home
  if (["login.html", "register.html"].includes(currentPage)) {
    window.location.href = "index.html";
  }

} else {
  // Hide private links
  if (studyLink) studyLink.style.display = "none";
  if (announcementLink) announcementLink.style.display = "none";

  // ✅ Redirect to login if user tries to open a private page
  if (!public_routes.includes(currentPage)) {
    window.location.href = "login.html";
  }

  // Show login button
  if (authButtonContainer) {
    authButtonContainer.innerHTML = `<a href="login.html" class="nav-btn">Login</a>`;
  }
}

// ✅ Quiz dropdown navigation
const quizSelect = document.getElementById("quizSelect");

if (quizSelect) {
  quizSelect.addEventListener("change", function () {
    const selectedValue = this.value;
    if (!selectedValue) return;

    const [subject, grade] = selectedValue.split("|");
    const url = `subject.html?subject=${encodeURIComponent(
      subject
    )}&grade=${encodeURIComponent(grade)}#quiz-anchor`;

    window.location.href = url;
  });
}

// ✅ Fix browser back button cache (recheck login)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});
  