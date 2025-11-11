// --- Break Activities ---
const breakActivities = [
  "👁️ Eye Exercise",
  "💪 Body Movement",
  "🚶 Move Away From Screen",
  "☕ Stretch & Hydrate",
];

// --- STEP 1: Define Courses Data ---
const coursesByGrades = {
  5: [
    { title: "English", chapters: 6, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 8, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 5, hoursPerChapter: 2 },
    { title: "Social Studies", chapters: 4, hoursPerChapter: 1.5 },
  ],

  6: [
    { title: "English", chapters: 7, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 9, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 6, hoursPerChapter: 2 },
    { title: "Geography", chapters: 5, hoursPerChapter: 1.5 },
  ],

  7: [
    { title: "English", chapters: 8, hoursPerChapter: 1.5 },
    { title: "Mathematics", chapters: 9, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 7, hoursPerChapter: 2 },
    { title: "History", chapters: 6, hoursPerChapter: 1.5 },
  ],

  8: [
    { title: "English", chapters: 8, hoursPerChapter: 2 },
    { title: "Mathematics", chapters: 10, hoursPerChapter: 1.5 },
    { title: "Science", chapters: 6, hoursPerChapter: 2.5 },
    { title: "Civics", chapters: 5, hoursPerChapter: 1.5 },
  ],

  9: [
    { title: "English", chapters: 10, hoursPerChapter: 2 },
    { title: "Mathematics", chapters: 12, hoursPerChapter: 2 },
    { title: "Physics", chapters: 6, hoursPerChapter: 2.5 },
    { title: "Chemistry", chapters: 5, hoursPerChapter: 2.5 },
    { title: "Biology", chapters: 5, hoursPerChapter: 2 },
  ],

  10: [
    { title: "English", chapters: 10, hoursPerChapter: 2 },
    { title: "Mathematics", chapters: 13, hoursPerChapter: 2 },
    { title: "Physics", chapters: 7, hoursPerChapter: 2.5 },
    { title: "Chemistry", chapters: 6, hoursPerChapter: 2.5 },
    { title: "Biology", chapters: 6, hoursPerChapter: 2 },
    { title: "History & Civics", chapters: 8, hoursPerChapter: 1.5 },
  ],
};

// --- STEP 2: Get elements ---
const gradeSelect = document.getElementById("gradeSelect");
const courseList = document.getElementById("courseList");
const targetDateInput = document.getElementById("targetDate");
const createBtn = document.getElementById("createScheduleBtn");
const studySchedule = document.getElementById("studySchedule");

// --- Load user info ---
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { email: "guest" };

// --- Get Data from the Subject Progress cards and save to local storage ---
function savePlannerData() {
  const cards = studySchedule.querySelectorAll(".study-card");
  const saveData = {
    grade: gradeSelect.value,
    targetDate: targetDateInput.value,
    courses: []
  };

  cards.forEach(card => {
    const title = card.querySelector(".study-header h3").textContent;
    const [done, total] = card.querySelector(".progress-small").textContent.split("/").map(Number);
    saveData.courses.push({ title, done, total });
  });

  const email = loggedInUser.email;
  if (email) {
    const user = JSON.parse(localStorage.getItem(email)) || {};
    user.plannerData = saveData;
    localStorage.setItem(email, JSON.stringify(user));
  }

  loggedInUser.plannerData = saveData;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

// --- STEP 3: Load Courses ---
function loadCourses(grade) {
  courseList.innerHTML = "";

  const courses = coursesByGrades[grade];

  courses.forEach((course, index) => {
    const div = document.createElement("div");
    div.className = "course-item";
    div.innerHTML = `
      <label class="course-label">
        <input type="checkbox" value="${course.title}" data-index="${index}" checked />
        <div class="course-content">
          <div class="course-title">${course.title}</div>
          <div class="course-info">
            <span>${course.chapters} chapters</span> • 
            <span>${course.hoursPerChapter} Hrs each</span>
          </div>
        </div>
      </label>
    `;
    courseList.appendChild(div);
  });
}

loadCourses(8);

gradeSelect.addEventListener("change", (e) => loadCourses(e.target.value));

// --- STEP 4: Create Schedule ---
createBtn.addEventListener("click", () => {
  const grade = gradeSelect.value;
  const courses = coursesByGrades[grade] || coursesByGrades[8];
  const selected = [...courseList.querySelectorAll("input:checked")].map(
    c => courses[c.dataset.index]
  );

  const target = targetDateInput.value;
  if (!selected.length) return alert("Please select a course!");
  if (!target) return alert("Please choose a target date!");

  const today = new Date();
  const daysLeft = Math.max(
    1,
    Math.ceil((new Date(target) - today) / 86400000)
  );

  studySchedule.innerHTML = "";

  selected.forEach(course => {
    let done = 0;
    const total = course.chapters * course.hoursPerChapter;
    const perDay = (total / daysLeft).toFixed(1);

    // make a study card
    const card = document.createElement("div");
    card.className = "tile study-card";
    card.innerHTML = `
      <div class="study-header">
        <h3>${course.title}</h3><span class="deadline">⏰ ${daysLeft} days left</span>
      </div>
      <p class="chapter-label">Chapters:</p>
      <div class="chapter-row">
        <div class="chapter-container">
          ${Array.from({ length: course.chapters }, (_, i) => `<div class="chapter-circle">${i + 1}</div>`).join("")}
        </div>
        <div class="chapter-controls">
          <button class="minus"><i class="bi bi-dash"></i></button>
          <span class="progress-small">0/${course.chapters}</span>
          <button class="plus"><i class="bi bi-plus"></i></button>
        </div>
      </div>
      <div class="routine">
        <div>
          <div class="top">
            <p>${course.chapters} chapters × ${course.hoursPerChapter} hrs each</p>
            <p class="remain">${total.toFixed(1)} hrs remaining</p>
          </div>
          <div class="bottom">
            <h4>${total} hrs total</h4><h5>${perDay} hrs/day</h5>
          </div>
          </div>
          <div class="timer-btn-box">
            <button class="start-timer-btn"><i class="bi bi-stopwatch"></i> Start Timer</button>
          </div>
      </div>
    `;
    studySchedule.appendChild(card);

    // small helpers
    const circles = card.querySelectorAll(".chapter-circle");
    const remain = card.querySelector(".remain");
    const progress = card.querySelector(".progress-small");

    const update = () => {
      circles.forEach((c, i) => c.classList.toggle("done", i < done));
      remain.textContent = `${(total - done * course.hoursPerChapter).toFixed(1)} hrs remaining`;
      progress.textContent = `${done}/${course.chapters}`;
      savePlannerData();
    };

    card.querySelector(".plus").onclick = () => { if (done < course.chapters) { done++; update(); } };
    card.querySelector(".minus").onclick = () => { if (done > 0) { done--; update(); } };

    card.querySelector(".start-timer-btn").onclick = () => {
      if (isRunning && timerSubject.textContent !== course.title) {
        if (!confirm(`Stop "${timerSubject.textContent}" and start "${course.title}"?`)) return;
      }
      timerBox.classList.replace("minimized", "expanded");
      stopCurrentTimer();
      remainingAtPause = 0;
      startSubjectTimer(course);
      playPauseBtn.innerHTML = miniPlayPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    };
  });

  savePlannerData();
});


// --- STUDY TIMER (unchanged logic) ---
// --- break activities ---
// --- DOM refs ---
const timerBox = document.getElementById("studyTimer");
const minimizeBtn = document.getElementById("minimizeBtn");
const maximizeBtn = document.getElementById("maximizeBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const miniPlayPauseBtn = document.getElementById("miniPlayPauseBtn");
const endTimerBtn = document.getElementById("endTimerBtn");
const endBreakBtn = document.getElementById("endBreakBtn");
const miniTimerDisplay = document.getElementById("miniTimerDisplay");
const miniSubject = document.getElementById("miniSubject");
const timerDisplay = document.getElementById("timerDisplay");
const totalTimeEl = document.getElementById("totalTime");
const timerSubject = document.getElementById("timerSubject");
const breakTask = document.getElementById("breakTask");
const timerTitle = document.getElementById("timerTitle");

let timerInterval = null;
let isRunning = false;
let paused = false;
let remainingAtPause = 0;
let currentSessionEnd = 0;
let pomodoroPlan = [];
let currentPomodoroIndex = 0;

// stop current countdown
function stopCurrentTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  isRunning = false;
  paused = false;
  remainingAtPause = 0;
}

// helpers
function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
           : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateTimerUI() {
  const remaining = Math.max(0, Math.round((currentSessionEnd - Date.now()) / 1000));
  timerDisplay.textContent = formatTime(remaining);
  if (miniTimerDisplay) miniTimerDisplay.textContent = formatTime(remaining);
  if (miniSubject) miniSubject.textContent = timerSubject.textContent || "No Subject";
}

// build a simple pomodoro plan: study 25 min, break 5 min, until minutes used
function buildPomodoroPlan(totalMinutes) {
  const plan = [];
  let rem = Math.max(0, Math.round(totalMinutes));
  while (rem > 0) {
    const study = Math.min(.1, rem);
    plan.push({ type: "study", minutes: study });
    rem -= study;
    if (rem > 0) {
      const br = Math.min(5, rem);
      plan.push({ type: "break", minutes: br });
      // break time does not reduce 'study minutes' here — rem counts study+break
      // This simple version counts minutes as sequential blocks.
      rem -= br;
    }
  }
  return plan;
}

// start timer for a course (main entry)
function startSubjectTimer(course) {
  // get hours per chapter (supports number or object like {hrs, min})
  const getHrs = h => (typeof h === "object" ? (h.hrs || 0) + ((h.min || 0) / 60) : Number(h || 0));
  const totalHours = getHrs(course.hoursPerChapter) * course.chapters;

  const targetVal = document.getElementById("targetDate").value;
  const target = targetVal ? new Date(targetVal) : new Date();
  const today = new Date();
  // days difference (use midnight to avoid partial-day issues)
  const daysLeft = Math.max(1, Math.ceil((new Date(target.setHours(0,0,0,0)) - new Date(today.setHours(0,0,0,0))) / 86400000));
  const hoursPerDay = totalHours / daysLeft;

  // seconds for today's study time
  const studySeconds = Math.max(0, Math.floor(hoursPerDay * 3600));

  // build pomodoro using minutes for today (simple 25/5 blocks)
  pomodoroPlan = buildPomodoroPlan(Math.round(hoursPerDay * 60));
  currentPomodoroIndex = 0;

  timerSubject.textContent = course.title;
  if (miniSubject) miniSubject.textContent = course.title;
  totalTimeEl.innerHTML = `Today's Study:<br>${hoursPerDay.toFixed(1)} hrs (with short breaks)`;
  breakTask.style.display = "none";
  timerBox.classList.remove("minimized");
  timerBox.classList.add("expanded");

  startPomodoroPhase();
}

// start each phase (study or break)
function startPomodoroPhase() {
  if (currentPomodoroIndex >= pomodoroPlan.length) return endStudySession();
  const phase = pomodoroPlan[currentPomodoroIndex];
  const dur = Math.max(1, Math.round(phase.minutes * 60)); // seconds
  const isBreak = phase.type === "break";

  currentSessionEnd = Date.now() + dur * 1000;
  isRunning = true;
  paused = false;

  // UI toggles: show/hide buttons and break text (no color changes)
  if (isBreak) {
    timerBox.classList.add("break-mode");
    breakTask.style.display = "block";
    breakTask.textContent = breakActivities[Math.floor(Math.random() * breakActivities.length)];
    if (playPauseBtn) playPauseBtn.style.display = "none";
    if (endTimerBtn) endTimerBtn.style.display = "none";
    if (endBreakBtn) endBreakBtn.style.display = "inline-block";
  } else {
    timerBox.classList.remove("break-mode");
    breakTask.style.display = "none";
    if (playPauseBtn) playPauseBtn.style.display = "inline-block";
    if (endTimerBtn) endTimerBtn.style.display = "inline-block";
    if (endBreakBtn) endBreakBtn.style.display = "none";
  }

  // start countdown
  if (timerInterval) clearInterval(timerInterval);
  updateTimerUI();
  timerInterval = setInterval(() => {
    const remaining = Math.round((currentSessionEnd - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      currentPomodoroIndex++;
      startPomodoroPhase();
    } else {
      updateTimerUI();
    }
  }, 1000);
}

function endStudySession() {
  stopCurrentTimer();
  timerDisplay.textContent = "00:00";
  if (miniTimerDisplay) miniTimerDisplay.textContent = "00:00";
  breakTask.style.display = "none";
  alert("🎉 Study session complete!");
  timerBox.classList.add("minimized");
  timerBox.classList.remove("expanded");
}

// simple pause/resume
function togglePauseResume() {
  if (!isRunning) return;
  if (!paused) {
    // pause
    paused = true;
    if (timerInterval) clearInterval(timerInterval);
    remainingAtPause = currentSessionEnd - Date.now();
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  } else {
    // resume
    paused = false;
    currentSessionEnd = Date.now() + remainingAtPause;
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    timerInterval = setInterval(() => {
      const remaining = Math.round((currentSessionEnd - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timerInterval);
        currentPomodoroIndex++;
        startPomodoroPhase();
      } else {
        updateTimerUI();
      }
    }, 1000);
  }
}

// --- event listeners ---
minimizeBtn.addEventListener("click", () => timerBox.classList.add("minimized"));
maximizeBtn.addEventListener("click", () => timerBox.classList.remove("minimized"));
if (playPauseBtn) playPauseBtn.addEventListener("click", togglePauseResume);
if (miniPlayPauseBtn) miniPlayPauseBtn.addEventListener("click", togglePauseResume);
if (endTimerBtn) endTimerBtn.addEventListener("click", endStudySession);
if (endBreakBtn) endBreakBtn.addEventListener("click", () => {
  if (timerInterval) clearInterval(timerInterval);
  currentPomodoroIndex++;
  startPomodoroPhase();
});


// --- Load saved planner on page load ---
window.addEventListener("DOMContentLoaded", () => {
  const saved = loggedInUser?.plannerData;
  if (!saved) return;

  gradeSelect.value = saved.grade || "8";
  targetDateInput.value = saved.targetDate || "";
  loadCourses(gradeSelect.value);

  const boxes = courseList.querySelectorAll("input[type='checkbox']");
  boxes.forEach(b => {
    const title = b.parentElement.querySelector(".course-title")?.textContent;
    b.checked = saved.courses.some(c => c.title === title);
  });

  createBtn.click();

  saved.courses.forEach(sc => {
    const card = [...studySchedule.querySelectorAll(".study-card")]
      .find(c => c.querySelector(".study-header h3")?.textContent === sc.title);
    if (!card) return;

    const total = sc.total;
    let done = sc.done;
    const circles = card.querySelectorAll(".chapter-circle");
    const prog = card.querySelector(".progress-small");
    const remain = card.querySelector(".remain");
    const add = card.querySelector(".chapter-controls button:nth-child(3)");
    const sub = card.querySelector(".chapter-controls button:nth-child(1)");

    function update() {
      circles.forEach((c, i) => c.classList.toggle("done", i < done));
      prog.textContent = `${done}/${total}`;
      const hrs = (total - done) * 1.5;
      if (remain) remain.textContent = `${hrs.toFixed(1)} hrs remaining`;
      savePlannerData();
    }

    update();
    add.onclick = () => { if (done < total) { done++; update(); } };
    sub.onclick = () => { if (done > 0) { done--; update(); } };
  });
});

window.addEventListener("beforeunload", savePlannerData);
