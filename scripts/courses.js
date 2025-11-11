// JSON data categorized by grade
const coursesByGrade = {
  5: [
    {
      title: "English",
      description:
        "Improve your reading, writing, and speaking skills with fun grammar lessons and short stories.",
      chapters: 8,
    },
    {
      title: "Mathematics",
      description:
        "Learn addition, subtraction, multiplication, and division with real-world examples.",
      chapters: 10,
    },
    {
      title: "Science",
      description:
        "Explore animals, plants, and the environment to understand how nature works.",
      chapters: 9,
    },
  ],

  6: [
    {
      title: "English",
      description:
        "Build your vocabulary and grammar with story-based learning and simple writing exercises.",
      chapters: 10,
    },
    {
      title: "Mathematics",
      description:
        "Study fractions, decimals, and geometry while solving interesting puzzles and problems.",
      chapters: 12,
    },
    {
      title: "Science",
      description:
        "Understand force, motion, and basic concepts of energy and the human body.",
      chapters: 11,
    },
  ],

  7: [
    {
      title: "English",
      description:
        "Learn composition, tenses, and comprehension through stories, poems, and activities.",
      chapters: 11,
    },
    {
      title: "Mathematics",
      description:
        "Master integers, simple equations, and basic geometry with clear explanations.",
      chapters: 13,
    },
    {
      title: "Science",
      description:
        "Discover the world of cells, light, and heat through experiments and illustrations.",
      chapters: 12,
    },
  ],

  8: [
    {
      title: "English",
      description:
        "Explore literature, improve grammar, and strengthen writing skills with engaging lessons.",
      chapters: 12,
    },
    {
      title: "Mathematics",
      description:
        "Dive into algebra, geometry, and data handling with simple and clear examples.",
      chapters: 14,
    },
    {
      title: "Science",
      description:
        "Learn about the human body, chemical reactions, and the universe in an easy way.",
      chapters: 13,
    },
  ],

  9: [
    {
      title: "English",
      description:
        "Focus on essays, grammar, and literary analysis to develop your academic English skills.",
      chapters: 15,
    },
    {
      title: "Mathematics",
      description:
        "Understand polynomials, coordinate geometry, and trigonometry with step-by-step logic.",
      chapters: 16,
    },
    {
      title: "Science",
      description:
        "Study atoms, motion, and living organisms to connect science with real-life concepts.",
      chapters: 14,
    },
  ],

  10: [
    {
      title: "English",
      description:
        "Prepare for exams with grammar revision, comprehension practice, and advanced writing lessons.",
      chapters: 16,
    },
    {
      title: "Mathematics",
      description:
        "Master quadratic equations, statistics, and trigonometry for your board exams.",
      chapters: 17,
    },
    {
      title: "Science",
      description:
        "Deepen your understanding of physics, chemistry, and biology with experiments and examples.",
      chapters: 15,
    },
  ],
};

// Function to render courses for selected grade
function renderCourses(grade) {
  const container = document.getElementById("courses");
  container.innerHTML = ""; // Clear old content

  const courses = coursesByGrade[grade];
  courses.forEach((course) => {
    const courseTile = document.createElement("a");
    courseTile.href = `subject.html?subject=${encodeURIComponent(course.title)}&grade=${grade}`;
    courseTile.className = "tile";
    courseTile.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="badges">
        <span class="badge">Grade ${grade}</span>
        <span class="badge chapters">${course.chapters} Chapters</span>
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