import { coursesData } from "./global.js";


// --- STEP 2: Get elements ---
const gradeSelect = document.getElementById("gradeSelect");
const courseList = document.getElementById("courseList");
const targetDateInput = document.getElementById("targetDate");
const createBtn = document.getElementById("createScheduleBtn");
const studySchedule = document.getElementById("studySchedule");

// --- Load user info ---
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { email: "guest" };

// --- Save planner data ---
function savePlannerData() {
  const allCards = studySchedule.querySelectorAll(".study-card");
  const dataToSave = {
    grade: gradeSelect.value,
    targetDate: targetDateInput.value,
    courses: [],
  };

  allCards.forEach((card) => {
    const title = card.querySelector(".study-header h3").textContent;
    const progressText = card.querySelector(".progress-small").textContent;
    const [completed, total] = progressText.split("/").map(Number);
    dataToSave.courses.push({ title, completed, total });
  });

  // save to both loggedInUser and user's email key
  const userEmail = loggedInUser.email;
  if (userEmail) {
    const userData = JSON.parse(localStorage.getItem(userEmail)) || {};
    userData.plannerData = dataToSave;
    localStorage.setItem(userEmail, JSON.stringify(userData));
  }

  loggedInUser.plannerData = dataToSave;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

// --- Load planner data ---
function loadPlannerData() {
  return loggedInUser?.plannerData || null;
}

// --- STEP 3: Load Courses ---
function loadCourses(grade) {
  courseList.innerHTML = "";

  const courses = coursesData[grade] || coursesData[8];

  courses.forEach((course, index) => {
    const div = document.createElement("div");
    div.className = "course-item";
    div.innerHTML = `
      <label class="course-label">
        <input type="checkbox" value="${course.title}" data-index="${index}" />
        <div class="course-content">
          <div class="course-title">${course.title}</div>
          <div class="course-info">
            <span>${course.chapters.length} chapters</span> • 
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
  const selectedGrade = gradeSelect.value;
  const courses = coursesData[selectedGrade] || coursesData[8];
  const selectedCourses = [];

  const checkboxes = courseList.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const index = checkbox.getAttribute("data-index");
      selectedCourses.push(courses[index]);
    }
  });

  const targetDate = targetDateInput.value;
  if (selectedCourses.length === 0) return alert("Please select a course!");
  if (!targetDate) return alert("Please choose a target date!");

  const today = new Date();
  const endDate = new Date(targetDate);
  const daysLeft = Math.max(1, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

  studySchedule.innerHTML = "";

  selectedCourses.forEach((course) => {
    let completed = 0;
    const totalHours = course.chapters.length * course.hoursPerChapter;
    const hoursPerDay = (totalHours / daysLeft).toFixed(1);

    const card = document.createElement("div");
    card.className = "tile study-card";

    const header = document.createElement("div");
    header.className = "study-header";
    header.innerHTML = `
      <h3>${course.title}</h3>
      <span class="deadline">⏰ ${daysLeft} days left</span>
    `;
    card.appendChild(header);

    const chapterLabel = document.createElement("p");
    chapterLabel.className = "chapter-label";
    chapterLabel.textContent = "Chapters:";
    card.appendChild(chapterLabel);

    const chapterRow = document.createElement("div");
    chapterRow.className = "chapter-row";

    const chapterContainer = document.createElement("div");
    chapterContainer.className = "chapter-container";
    for (let i = 1; i <= course.chapters.length; i++) {
      const circle = document.createElement("div");
      circle.className = "chapter-circle";
      circle.textContent = i;
      chapterContainer.appendChild(circle);
    }

    const controlBox = document.createElement("div");
    controlBox.className = "chapter-controls";
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = `<i class="bi bi-dash"></i>`;
    const addBtn = document.createElement("button");
    addBtn.innerHTML = `<i class="bi bi-plus"></i>`;
    const progressText = document.createElement("span");
    progressText.className = "progress-small";
    progressText.textContent = `0/${course.chapters.length}`;
    controlBox.append(removeBtn, progressText, addBtn);

    chapterRow.append(chapterContainer, controlBox);
    card.appendChild(chapterRow);

    const routine = document.createElement("div");
    routine.className = "routine";
    routine.innerHTML = `
    <div>
      <div class="top">
        <p>${course.chapters.length} chapters × ${course.hoursPerChapter} Hrs each</p>
        <p class="remain">${totalHours.toFixed(1)} Hrs remaining</p>
      </div>
      <div class="bottom">
        <h4>${totalHours} Hrs total</h4>
        <h5>${hoursPerDay} Hrs/day</h5>
      </div>
      </div>
    `;
    card.appendChild(routine);

    const timerBtnBox = document.createElement("div");
    timerBtnBox.className = "timer-btn-box";
    const startTimerBtn = document.createElement("button");
    startTimerBtn.innerHTML = `<i class="bi bi-stopwatch"></i> Start Timer`;
    startTimerBtn.className = "start-timer-btn";
    timerBtnBox.appendChild(startTimerBtn);
    card.querySelector(".routine").appendChild(timerBtnBox);

    startTimerBtn.addEventListener("click", () => {
      if (isRunning && timerSubject.textContent && timerSubject.textContent !== course.title) {
        const confirmSwitch = confirm(
          `A timer is already running for "${timerSubject.textContent}".\nDo you want to stop it and start "${course.title}" instead?`
        );
        if (!confirmSwitch) return;
      }
      timerBox.classList.remove("minimized");
      timerBox.classList.add("expanded");
      stopCurrentTimer();
      remainingAtPause = 0;
      startSubjectTimer(course);
      playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      miniPlayPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    });

    const updateProgress = () => {
      const circles = chapterContainer.querySelectorAll(".chapter-circle");
      circles.forEach((c, i) => c.classList.toggle("done", i < completed));
      const remainingHours = (totalHours - completed * course.hoursPerChapter).toFixed(1);
      progressText.textContent = `${completed}/${course.chapters.length}`;
      routine.querySelector(".remain").textContent = `${remainingHours} Hrs remaining`;
      savePlannerData();
    };

    addBtn.addEventListener("click", () => {
      if (completed < course.chapters.length) {
        completed++;
        updateProgress();
      }
    });

    removeBtn.addEventListener("click", () => {
      if (completed > 0) {
        completed--;
        updateProgress();
      }
    });

    studySchedule.appendChild(card);
  });

  savePlannerData();
});

// --- STUDY TIMER (unchanged logic) ---
const timerBox = document.getElementById("studyTimer");
const minimizeBtn = document.getElementById("minimizeBtn");
const maximizeBtn = document.getElementById("maximizeBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const endTimerBtn = document.getElementById("endTimerBtn");
const endBreakBtn = document.getElementById("endBreakBtn");
const miniTimerDisplay = document.getElementById("miniTimerDisplay");
const miniPlayPauseBtn = document.getElementById("miniPlayPauseBtn");
const miniSubject = document.getElementById("miniSubject");
const timerDisplay = document.getElementById("timerDisplay");
const totalTimeEl = document.getElementById("totalTime");
const timerSubject = document.getElementById("timerSubject");
const timerBody = document.querySelector(".timer-body");
const breakTask = document.getElementById("breakTask");

let timerInterval;
let isRunning = false;
let isBreak = false;
let currentSessionEnd = null;
let totalTimeLeft = 0;
let subjectTotalSeconds = 0;
let currentPhase = "study";
let pomodoroPlan = [];
let currentPomodoroIndex = 0;
let paused = false;
let remainingAtPause = 0;

function stopCurrentTimer() {
  if (timerInterval) clearInterval(timerInterval);
  isRunning = false;
  paused = false;
}

// --- Break Activities ---
const breakActivities = [
  "👁️ Eye Exercise",
  "💪 Body Movement",
  "🚶 Move Away From Screen",
  "☕ Stretch & Hydrate",
];

// Add small title + breakTask into timerBody for unified UI if not present
let timerTitle = document.getElementById("timerTitle");

// Add a break task paragraph inside timerBody for unified display
let unifiedBreakTask = document.getElementById("unifiedBreakTask");
if (!unifiedBreakTask) {
  unifiedBreakTask = document.createElement("p");
  unifiedBreakTask.id = "unifiedBreakTask";
  timerBody.insertBefore(unifiedBreakTask, timerBody.querySelector(".timer-buttons"));
}

minimizeBtn.addEventListener("click", () => {
  timerBox.classList.add("minimized");
  timerBox.classList.remove("expanded");
});

maximizeBtn.addEventListener("click", () => {
  timerBox.classList.remove("minimized");
  timerBox.classList.add("expanded");
});

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (hrs > 0) {
    // show H:MM:SS if more than hour
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// NOTE: updateTimerUI only updates the current phase countdown UI
function updateTimerUI() {
  const now = Date.now();
  const remaining = Math.max(0, Math.round((currentSessionEnd - now) / 1000));
  timerDisplay.textContent = formatTime(remaining);
  if (miniTimerDisplay) miniTimerDisplay.textContent = formatTime(remaining);
  if (miniSubject) miniSubject.textContent = timerSubject.textContent || "No Subject";
}

// Build pomodoro plan for the *today's minutes*; study blocks of 25 min and 5 min breaks
function buildPomodoroPlan(totalMinutes) {
  const plan = [];
  let remaining = totalMinutes;
  // support fractional minutes
  while (remaining > 0.1) {
    const studyBlock = Math.min(0.1, remaining);
    plan.push({ type: "study", minutes: studyBlock });
    remaining -= studyBlock;
    if (remaining > 0.1) {
      // break is always 5 minutes (or min(5, remaining) if remaining smaller)
      const breakBlock = Math.min(5, remaining);
      plan.push({ type: "break", minutes: breakBlock });
      // Note: we DO NOT subtract break time from remaining study minutes
      // because remaining represents study minutes only
      // but here we're building a per-day loop: remaining already counts study minutes,
      // so we subtract only the studyBlock above.
    }
  }
  return plan;
}

// Start timer for the subject — uses per-day hours (not whole-course hours)
function startSubjectTimer(course) {
  // compute per-day share (handles hoursPerChapter being number or object)
  const getHrsPerChapter = (hp) =>
    typeof hp === "object" ? (hp.hrs || 0) + ((hp.min || 0) / 60) : Number(hp || 0);

  const totalHours = getHrsPerChapter(course.hoursPerChapter) * course.chapters.length;

  const targetDateVal = document.getElementById("targetDate").value;
  const targetDate = targetDateVal ? new Date(targetDateVal) : new Date();
  const today = new Date();
  const daysLeft = Math.max(
    1,
    Math.ceil((targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24))
  );
  const hoursPerDay = totalHours / daysLeft;

  // Convert to seconds for today's timer
  subjectTotalSeconds = Math.max(0, Math.floor(hoursPerDay * 60 * 60));
  totalTimeLeft = subjectTotalSeconds * 1000;

  // Build pomodoro for today's minutes only
  pomodoroPlan = buildPomodoroPlan(hoursPerDay * 60);
  currentPomodoroIndex = 0;

  timerSubject.textContent = course.title;
  if (miniSubject) miniSubject.textContent = course.title;

  // Static summary — will not count down
  const studyHours = Number(hoursPerDay.toFixed(2));
  // compute number of 5-min breaks that will occur for the study blocks
  const studyMinutes = Math.round(hoursPerDay * 60);
  totalTimeEl.innerHTML = `Today's Study:<br>${hoursPerDay.toFixed(1)} Hrs + 5 Min breaks`;

  // ensure the main timer UI shows study mode
  timerTitle.textContent = "⏰ Study Timer";
  timerBody.style.background = ""; // reset any break styling
  unifiedBreakTask.style.display = "none";

  startPomodoroPhase();
}

function startPomodoroPhase() {
  if (currentPomodoroIndex >= pomodoroPlan.length) {
    endStudySession();
    return;
  }

  const phase = pomodoroPlan[currentPomodoroIndex];
  const durationSec = Math.max(1, Math.round(phase.minutes * 60));
  currentPhase = phase.type;
  isBreak = phase.type === "break";
  currentSessionEnd = Date.now() + durationSec * 1000;

  const timerButtons = document.querySelector(".timer-buttons");
  const endBreakBtnExisting = document.getElementById("endBreakBtn");

  if (isBreak) {
    // --- 🟡 BREAK MODE ---
    timerBox.classList.add("break-mode"); // 👈 NEW: activate yellow tone
    timerBody.style.backgroundColor = "transparent";

    // Activity third (big & bold)
    unifiedBreakTask.style.display = "block";
    unifiedBreakTask.innerHTML =
      breakActivities[Math.floor(Math.random() * breakActivities.length)];

    // Study summary fourth
    totalTimeEl.style.order = "4";
    totalTimeEl.style.marginTop = "10px";
    totalTimeEl.style.opacity = "0.9";

    // Hide pause & end timer buttons
    playPauseBtn.style.display = "none";
    endTimerBtn.style.display = "none";

    // Add or show End Break button
    let endBreakBtn = endBreakBtnExisting;
    if (!endBreakBtn) {
      endBreakBtn = document.createElement("button");
      endBreakBtn.id = "endBreakBtn";
      endBreakBtn.textContent = "End Break";
      endBreakBtn.style.background = "#1f2937";
      endBreakBtn.style.color = "#fff";
      endBreakBtn.style.fontWeight = "600";
      endBreakBtn.style.borderRadius = "8px";
      endBreakBtn.style.padding = "10px 18px";
      endBreakBtn.style.marginTop = "12px";
      endBreakBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        currentPomodoroIndex++;
        startPomodoroPhase();
      });
      timerButtons.appendChild(endBreakBtn);
    }
    endBreakBtn.style.display = "inline-block";
    endBreakBtn.style.order = "5";

    // Show break duration
    timerDisplay.textContent = formatTime(durationSec);
    if (miniTimerDisplay) miniTimerDisplay.textContent = formatTime(durationSec);
  } else {
    // --- 🔹 STUDY MODE ---
    timerBox.classList.remove("break-mode"); // 👈 NEW: return to blue study mode
    timerTitle.textContent = "⏰ Study Timer";
    timerBody.style.backgroundColor = "";
    unifiedBreakTask.style.display = "none";

    // Show study buttons
    playPauseBtn.style.display = "inline-block";
    endTimerBtn.style.display = "inline-block";

    // Hide End Break button
    const endBreakBtn = document.getElementById("endBreakBtn");
    if (endBreakBtn) endBreakBtn.style.display = "none";
  }

  // --- Start countdown ---
  if (timerInterval) clearInterval(timerInterval);
  isRunning = true;
  paused = false;

  timerInterval = setInterval(() => {
    const now = Date.now();
    const remaining = Math.max(0, Math.round((currentSessionEnd - now) / 1000));
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
  isRunning = false;
  if (timerInterval) clearInterval(timerInterval);

  // Reset UI to default study state
  timerTitle.textContent = "⏰ Study Timer";
  timerBody.style.backgroundColor = "";
  unifiedBreakTask.style.display = "none";

  timerDisplay.textContent = "00:00";
  // Keep static summary, don't show a changing total
  // If you want to reset the summary, uncomment the next line:
  // totalTimeEl.textContent = "Total Time: --";
  if (miniTimerDisplay) miniTimerDisplay.textContent = "00:00";
  alert("🎉 Study session complete!");
  timerBox.classList.add("minimized");
  timerBox.classList.remove("expanded");
}

playPauseBtn.addEventListener("click", togglePauseResume);
if (miniPlayPauseBtn) miniPlayPauseBtn.addEventListener("click", togglePauseResume);

function togglePauseResume() {
  if (!isRunning) return;

  if (!paused) {
    paused = true;
    if (timerInterval) clearInterval(timerInterval);
    remainingAtPause = currentSessionEnd - Date.now();
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  } else {
    paused = false;
    currentSessionEnd = Date.now() + remainingAtPause;
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    timerInterval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.round((currentSessionEnd - now) / 1000);
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

endTimerBtn.addEventListener("click", () => {
  if (timerInterval) clearInterval(timerInterval);
  endStudySession();
});

// If the separate End Break button still exists in HTML, make it act like 'skip break'.
// It will just advance to the next phase.
if (endBreakBtn) {
  endBreakBtn.addEventListener("click", () => {
    if (timerInterval) clearInterval(timerInterval);
    currentPomodoroIndex++;
    startPomodoroPhase();
  });
}

// --- Load saved planner on page load ---
window.addEventListener("DOMContentLoaded", () => {
  const saved = loadPlannerData();
  if (!saved) return;

  gradeSelect.value = saved.grade || "8";
  targetDateInput.value = saved.targetDate || "";
  loadCourses(gradeSelect.value);

  if (Array.isArray(saved.courses) && saved.courses.length > 0) {
    const boxes = courseList.querySelectorAll("input[type='checkbox']");
    boxes.forEach((box) => {
      const title = box.parentElement.querySelector(".course-title")?.textContent;
      const found = saved.courses.find((c) => c.title === title);
      box.checked = !!found;
    });

    // Build schedule
    createBtn.click();

    // Apply saved progress properly
    saved.courses.forEach((sc) => {
      const card = Array.from(studySchedule.querySelectorAll(".study-card")).find(
        (c) => c.querySelector(".study-header h3")?.textContent === sc.title
      );
      if (!card) return;

      const circles = card.querySelectorAll(".chapter-circle");
      const progressText = card.querySelector(".progress-small");
      const total = Number(sc.total) || circles.length;
      const completed = Math.min(sc.completed, total);

      // ✅ Update UI
      circles.forEach((c, i) => c.classList.toggle("done", i < completed));
      progressText.textContent = `${completed}/${total}`;

      // ✅ Fix the local variable inside event listeners by storing in dataset
      card.dataset.completed = completed;

      // Patch add/remove buttons to use dataset value
      const addBtn = card.querySelector(".chapter-controls button:nth-child(3)");
      const removeBtn = card.querySelector(".chapter-controls button:nth-child(1)");
      const routine = card.querySelector(".routine");

      const updateProgress = () => {
        // Determine hours per chapter from the routine text or studyData
        const courseTitle = card.querySelector(".study-header h3")?.textContent;
        // find meta from studyData based on current grade
        const grade = gradeSelect.value || "8";
        const meta = (coursesData[grade] || coursesData[8]).find((x) => x.title === courseTitle);
        let courseHoursPerChapter = 1.5;
        if (meta) {
          if (typeof meta.hoursPerChapter === "object") {
            courseHoursPerChapter = (meta.hoursPerChapter.hrs || 0) + ((meta.hoursPerChapter.min || 0) / 60);
          } else {
            courseHoursPerChapter = Number(meta.hoursPerChapter);
          }
        } else {
          // fallback parse from routine text if meta not found
          const totalHoursText = routine.querySelector(".bottom h4")?.textContent || "";
          const parsed = totalHoursText.match(/(\d+(\.\d+)?)/);
          if (parsed) courseHoursPerChapter = Number(parsed[1]) / (total || 1);
        }

        const totalChapters = total;
        const currentCompleted = Number(card.dataset.completed);
        circles.forEach((c, i) => c.classList.toggle("done", i < currentCompleted));
        progressText.textContent = `${currentCompleted}/${totalChapters}`;
        const remainingHours = ((totalChapters - currentCompleted) * courseHoursPerChapter).toFixed(1);
        const remainEl = routine.querySelector(".remain");
        if (remainEl) remainEl.textContent = `${remainingHours} hrs remaining`;
        savePlannerData();
      };

      addBtn.onclick = () => {
        let c = Number(card.dataset.completed);
        if (c < total) {
          card.dataset.completed = c + 1;
          updateProgress();
        }
      };

      removeBtn.onclick = () => {
        let c = Number(card.dataset.completed);
        if (c > 0) {
          card.dataset.completed = c - 1;
          updateProgress();
        }
      };
    });
  }
});

// --- Save before unload ---
window.addEventListener("beforeunload", savePlannerData);
