// --- STEP 1: Course data for each grade ---
const studyData = {
  5: [
    { title: "English", chapters: 6, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 8, hoursPerChapter: 1 },
    { title: "Science", chapters: 5, hoursPerChapter: 2 },
  ],
  6: [
    { title: "English", chapters: 7, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 9, hoursPerChapter: 1 },
    { title: "Science", chapters: 6, hoursPerChapter: 2 },
  ],
  7: [
    { title: "English", chapters: 8, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 10, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 7, hoursPerChapter: 2 },
  ],
  8: [
    { title: "English", chapters: 8, hoursPerChapter: 2 },
    { title: "Mathematics", chapters: 10, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 6, hoursPerChapter: 2.5 },
  ],
  9: [
    { title: "English", chapters: 9, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 12, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 8, hoursPerChapter: 2 },
  ],
  10: [
    { title: "English", chapters: 10, hoursPerChapter: 2 },
    { title: "Mathematics", chapters: 12, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 9, hoursPerChapter: 2 },
  ],
};

// --- STEP 2: Get elements from HTML ---
const gradeSelect = document.getElementById("gradeSelect");
const courseList = document.getElementById("courseList");
const targetDateInput = document.getElementById("targetDate");
const createBtn = document.getElementById("createScheduleBtn");
const studySchedule = document.getElementById("studySchedule");

// --- STEP 3: Load courses when grade changes ---
function loadCourses(grade) {
  const courses = studyData[grade];

  courses.forEach((course, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>
        <input type="checkbox" value="${course.title}" data-index="${index}" />
        ${course.title} - ${course.chapters} chapters (${course.hoursPerChapter} hrs each)
      </label>
    `;
    courseList.appendChild(div);
  });
}

// Load Grade 8 by default
loadCourses(8);

// When grade changes → reload courses
gradeSelect.addEventListener("change", (e) => {
  loadCourses(e.target.value);
});

// --- STEP 4: When user clicks "Create Schedule" ---
createBtn.addEventListener("click", () => {
  const selectedGrade = gradeSelect.value;
  const courses = studyData[selectedGrade];
  const selectedCourses = [];

  const checkboxes = courseList.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const index = checkbox.getAttribute("data-index");
      selectedCourses.push(courses[index]);
    }
  });

  const targetDate = targetDateInput.value;
  if (selectedCourses.length === 0) {
    alert("Please select at least one course!");
    return;
  }
  if (!targetDate) {
    alert("Please choose a target date!");
    return;
  }

  // Calculate days left
  const today = new Date();
  const endDate = new Date(targetDate);
  const daysLeft = Math.max(1, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

  // Clear previous results
  studySchedule.innerHTML = "";

  // Create study cards
  selectedCourses.forEach((course) => {
    const totalHours = course.chapters * course.hoursPerChapter;
    const chaptersPerDay = Math.ceil(course.chapters / daysLeft);

    const card = document.createElement("div");
    card.className = "tile";

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.chapters} chapters × ${course.hoursPerChapter} hrs = <b>${totalHours} hrs total</b></p>
      <p><b>Goal:</b> ${chaptersPerDay} chapters per day for ${daysLeft} days</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <p class="progress-text">Progress: 0 / ${course.chapters} chapters</p>
      <button class="mark-btn">✓ Mark Chapter Done</button>
      <p><b>Deadline:</b> ${endDate.toDateString()}</p>
    `;

    let completed = 0;
    const progressBar = card.querySelector(".progress-fill");
    const progressText = card.querySelector(".progress-text");
    const markBtn = card.querySelector(".mark-btn");

    markBtn.addEventListener("click", () => {
      if (completed < course.chapters) {
        completed++;
        const percent = (completed / course.chapters) * 100;
        progressBar.style.width = percent + "%";
        progressText.textContent = `Progress: ${completed} / ${course.chapters} chapters`;

        if (completed === course.chapters) {
          progressText.textContent += " 🎉 Completed!";
          markBtn.disabled = true;
          markBtn.textContent = "Done!";
        }
      }
    });

    studySchedule.appendChild(card);
  });
});
