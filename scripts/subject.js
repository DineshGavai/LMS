// ------------------ Course Data ------------------
const courseData = {
  English: {
    title: "English",
    description:
      "Welcome to English! Learn grammar, vocabulary, and writing through structured chapters.",
    chapters: [
      {
        title: "Chapter 1: Grammar Basics",
        description: "Learn about nouns, verbs, and sentence structure.",
        resources: [
          {
            title: "Grammar Basics PDF",
            type: "pdf",
            url: "https://example.com/grammar.pdf",
          },
          {
            title: "English Grammar Video",
            type: "video",
            url: "https://www.youtube.com/watch?v=7LmgyjM2m8Y",
          },
        ],
      },
      {
        title: "Chapter 2: Vocabulary Building",
        description: "Expand your vocabulary through practice and reading.",
        resources: [
          {
            title: "Vocabulary Builder Website",
            type: "website",
            url: "https://www.bbc.co.uk/learningenglish",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Which sentence uses the correct article?",
        options: [
          "I saw a elephant in the zoo.",
          "I saw an elephant in the zoo.",
          "I saw the elephant in zoo.",
          "I saw elephant in zoo.",
        ],
        answer: 2,
      },
      {
        question: "Identify the adjective: 'The tall boy runs fast.'",
        options: ["boy", "runs", "tall", "fast"],
        answer: 3,
      },
    ],
  },

  Science: {
    title: "Science",
    description:
      "Science helps us understand how things work — from atoms to galaxies.",
    chapters: [
      {
        title: "Chapter 1: Living Things",
        description: "Discover how plants and animals live and grow.",
        resources: [
          {
            title: "Life Processes (PDF)",
            type: "pdf",
            url: "https://ncert.nic.in/textbook/pdf/hesc101.pdf",
          },
          {
            title: "Photosynthesis Explained (Video)",
            type: "video",
            url: "https://www.youtube.com/watch?v=D1Ymc311XS8",
          },
        ],
      },
      {
        title: "Chapter 2: Matter and Energy",
        description: "Explore solids, liquids, gases, and energy forms.",
        resources: [
          {
            title: "Science Experiments Website",
            type: "website",
            url: "https://kids.nationalgeographic.com/science",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "Which gas do plants use during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: 3,
      },
      {
        question: "Which part of the human body controls all others?",
        options: ["Heart", "Brain", "Lungs", "Liver"],
        answer: 2,
      },
    ],
  },

  Mathematics: {
    title: "Mathematics",
    description:
      "Mathematics builds logical and analytical skills through problem solving.",
    chapters: [
      {
        title: "Chapter 1: Arithmetic",
        description:
          "Learn addition, subtraction, multiplication, and division.",
        resources: [
          {
            title: "Basic Math Notes (PDF)",
            type: "pdf",
            url: "https://ncert.nic.in/textbook/pdf/hesc101.pdf",
          },
          {
            title: "Khan Academy Arithmetic",
            type: "website",
            url: "https://www.khanacademy.org/math/arithmetic",
          },
        ],
      },
      {
        title: "Chapter 2: Geometry",
        description: "Understand shapes, lines, and angles.",
        resources: [
          {
            title: "Geometry Basics (Video)",
            type: "video",
            url: "https://www.youtube.com/watch?v=3a3K0N3xAEY",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is (8 × 5) ÷ 2?",
        options: ["10", "20", "25", "30"],
        answer: 2,
      },
      {
        question: "A triangle with sides 3, 4, 5 cm is:",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        answer: 4,
      },
    ],
  },
};

// ------------------ Load Subject ------------------
const subject = new URLSearchParams(window.location.search).get("subject");
const subjectData = courseData[subject];

if (!subjectData) {
  document.body.innerHTML = "<h2>Invalid subject selected!</h2>";
  throw new Error("Invalid subject");
}

document.getElementById("subject_title").textContent = subjectData.title;
document.getElementById("subject_description").textContent =
  subjectData.description;

// ------------------ Render Chapters ------------------
const resourcesContainer = document.getElementById("resources");

subjectData.chapters.forEach((chapter) => {
  const chapterDiv = document.createElement("div");
  chapterDiv.className = "chapter";

  const header = document.createElement("button");
  header.className = "accordion";
  header.textContent = chapter.title;

  const content = document.createElement("div");
  content.className = "panel";

  const desc = document.createElement("p");
  desc.textContent = chapter.description;
  content.appendChild(desc);

  // Add resources inside the chapter
  chapter.resources.forEach((res) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    let btnText = "";
    if (res.type === "pdf")
      btnText = `<i class="bi bi-file-earmark-pdf"></i> View PDF`;
    else if (res.type === "website")
      btnText = `<i class="bi bi-globe2"></i> Visit Website`;
    else if (res.type === "video")
      btnText = `<i class="bi bi-play-btn"></i> Watch Video`;

    tile.innerHTML = `
      <p>${res.title}</p>
      <div class="buttons">
        <a href="${res.url}" target="_blank">
          <button class="${res.type}">${btnText}</button>
        </a>
      </div>
    `;
    content.appendChild(tile);
  });

  chapterDiv.appendChild(header);
  chapterDiv.appendChild(content);
  resourcesContainer.appendChild(chapterDiv);
});

// ------------------ Accordion Toggle ------------------
document.querySelectorAll(".accordion").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.classList.contains("open")) {
      panel.classList.remove("open");
    } else {
      panel.classList.add("open");
    }
  });
});

// ------------------ Render Quiz ------------------
const quizContainer = document.getElementById("quiz");

subjectData.quiz.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.className = "question tile";
  questionDiv.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  q.options.forEach((option) => {
    optionsDiv.innerHTML += `
      <label>
        <input type="radio" name="question_${index}" value="${option}" />
        ${option}
      </label><br>
    `;
  });

  questionDiv.appendChild(optionsDiv);
  quizContainer.appendChild(questionDiv);
});

// ------------------ Quiz Logic ------------------
const form = document.querySelector("form");
const scoreBox = document.getElementById("score");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  const formData = new FormData(form);

  subjectData.quiz.forEach((q, index) => {
    const userAnswer = formData.get(`question_${index}`);
    const correctAnswer = q.options[q.answer - 1];
    const options = form.querySelectorAll(`input[name="question_${index}"]`);

    if (userAnswer === correctAnswer) score++;

    options.forEach((option) => {
      const label = option.parentElement;
      option.disabled = true;
      label.classList.remove("correct", "wrong");
      if (option.value === correctAnswer) label.classList.add("correct");
      else if (option.checked) label.classList.add("wrong");
    });
  });

  scoreBox.textContent = `Score: ${score}/${subjectData.quiz.length}`;

  const btn = document.getElementById("check_answer_btn");
  btn.textContent = "Retake Quiz";
  btn.onclick = () => window.location.reload();
});
