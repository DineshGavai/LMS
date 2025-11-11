import { coursesData } from "./global.js";

// Function to render courses for selected grade
function renderCourses(grade) {
  const container = document.getElementById("courses");
  container.innerHTML = ""; // Clear old content

  const courses = coursesData[grade];
  courses.forEach((course) => {
    const courseTile = document.createElement("a");
    courseTile.href = `subject.html?subject=${encodeURIComponent(course.subject)}&grade=${grade}`;
    courseTile.className = "tile";
    courseTile.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="badges">
        <span class="badge">Grade ${grade}</span>
        <span class="badge chapters">${course.chapters.length} Chapters</span>
        <button><i class="bi bi-chevron-right"></i></button>
      </div>
    `;
    container.appendChild(courseTile);
  });
}

// Handle grade change
const gradeSelect = document.getElementById("gradeSelect");
gradeSelect.addEventListener("change", (e) => {
  const selectedGrade = e.target.value;
  renderCourses(selectedGrade);
});

// Render default grade (8)
renderCourses(8);