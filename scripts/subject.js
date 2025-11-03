// All course data
const courseData = {
  English: {
    title: "English",
    description: "Welcome to English! Here you'll learn about grammar, vocabulary, and writing skills. You will also read stories and poems that help you understand the beauty of language and communication. The goal is to help you speak and write English clearly and confidently.",
    resources: [
      {
        title: "Grammar Basics PDF",
        type: "pdf",
        url: "https://www.tutorialspoint.com/english_grammar/english_grammar_tutorial.pdf",
      },
      {
        title: "Learn English Grammar - BBC Learning",
        type: "website",
        url: "https://www.bbc.co.uk/learningenglish/english/course/lower-intermediate",
      },
      {
        title: "Learn English Grammar - BBC Learning",
        type: "website",
        url: "https://www.bbc.co.uk/learningenglish/english/course/lower-intermediate",
      },
      {
        title: "English Grammar for Beginners (Video)",
        type: "video",
        url: "https://www.youtube.com/watch?v=7LmgyjM2m8Y",
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
        question: "Identify the adjective in this sentence: 'The tall boy runs fast.'",
        options: ["boy", "runs", "tall", "fast"],
        answer: 3,
      },
      {
        question: "Choose the correct plural form of 'child':",
        options: ["childs", "childes", "children", "childrens"],
        answer: 3,
      },
    ],
  },

  Mathematics: {
    title: "Mathematics",
    description: "Mathematics helps us understand the world through numbers, shapes, and patterns. It develops problem-solving and logical thinking skills. In this course, you’ll learn arithmetic, geometry, and basic algebra to build a strong foundation for higher studies.",
    resources: [
      {
        title: "Basic Mathematics Notes (PDF)",
        type: "pdf",
        url: "https://ncert.nic.in/textbook/pdf/hesc101.pdf",
      },
      {
        title: "Khan Academy – Arithmetic and Pre-Algebra",
        type: "website",
        url: "https://www.khanacademy.org/math/arithmetic",
      },
      {
        title: "Learn Math Fast – Simple Tricks (Video)",
        type: "video",
        url: "https://www.youtube.com/watch?v=3a3K0N3xAEY",
      },
    ],
    quiz: [
      {
        question: "What is the value of (8 × 5) ÷ 2?",
        options: ["10", "20", "25", "30"],
        answer: 2, // 20
      },
      {
        question: "If a triangle has sides 3 cm, 4 cm, and 5 cm, what type of triangle is it?",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        answer: 4, // Right-angled
      },
      {
        question: "Which of these fractions is equal to 1/2?",
        options: ["2/3", "3/6", "2/5", "4/5"],
        answer: 2, // 3/6
      },
    ],
  },

  Science: {
    title: "Science",
    description:
      "Science helps us understand how things around us work — from the air we breathe to the stars in the sky. This subject includes topics from physics, chemistry, and biology. You’ll learn through simple explanations, experiments, and real-life examples.",
    resources: [
      {
        title: "NCERT Science Class 8 Book (PDF)",
        type: "pdf",
        url: "https://ncert.nic.in/textbook/pdf/hesc101.pdf",
      },
      {
        title: "Science Experiments for Kids - National Geographic",
        type: "website",
        url: "https://kids.nationalgeographic.com/science",
      },
      {
        title: "Photosynthesis Explained (Video)",
        type: "video",
        url: "https://www.youtube.com/watch?v=D1Ymc311XS8",
      },
    ],
    quiz: [
      {
        question: "Which gas do plants use during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: 3,
      },
      {
        question: "Which part of the human body controls all other parts?",
        options: ["Heart", "Brain", "Lungs", "Liver"],
        answer: 2,
      },
      {
        question: "Water changes into vapor during which process?",
        options: ["Condensation", "Evaporation", "Freezing", "Melting"],
        answer: 2,
      },
    ],
  },
};


// Get subject name from URL
const subject = new URLSearchParams(window.location.search).get("subject");
const subjectData = courseData[subject];

// If subject missing or invalid, go back
if (!subject || !subjectData) {
  window.location.href = "courses.html";
}

// Set title and description
document.getElementById("subject_title").textContent = subjectData.title;
document.getElementById("subject_description").textContent = subjectData.description;

// Example resource data

subjectData.resources.forEach((res) => {
  const tile = document.createElement("div");
  tile.className = "tile";

  let btnText = "";

  if (res.type === "pdf") {
    btnText = `<i class="bi bi-file-earmark-pdf"></i> View PDF`;
  } else if (res.type === "website") {
    btnText = `<i class="bi bi-globe2"></i> Visit Website`;
  } else if (res.type === "video") {
    btnText = `<i class="bi bi-play-btn"></i> Watch Video`;
  }

  tile.innerHTML = `
    <p>${res.title}</p>
    <div class="buttons">
      <a href="${res.url}" target="_blank">
      <button class="${res.type}">${btnText}</button>
      </a>
    </div>
  `;

  document.getElementById("resources").appendChild(tile);
});


// Get quiz box
subjectData.quiz?.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.className = "question tile";

  // Set question text
  questionDiv.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;

  // Create options div and set options
  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  q.options.forEach((option) => {
    optionsDiv.innerHTML += `
        <label>
          <input
            type="radio"
            name="question_${index}"
            value="${option}"
          />
          ${option}
        </label><br>
      `;
  });

  questionDiv.appendChild(optionsDiv);
  document.getElementById("quiz").appendChild(questionDiv);
});

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

    if (userAnswer === correctAnswer) {
      score++;
    }

    options.forEach((option) => {
      const label = option.parentElement;

      option.disabled = true

      // Reset all styles first
      label.classList.remove("correct", "wrong");

      // Correct option
      if (option.value === correctAnswer) {
        label.classList.add("correct");
      }

      // Wrong chosen option
      if (option.checked && option.value !== correctAnswer) {
        label.classList.add("wrong");
      }
    });
  });

  // Show score in box
  scoreBox.innerHTML = `Score: ${score}/${subjectData.quiz.length}`;


  // Change the button to retake
  const checkAnswerBtn = document.getElementById("check_answer_btn");
  checkAnswerBtn.innerHTML = "<i class='bi bi-arrow-clockwise'></i>Retake Quiz";
  checkAnswerBtn.onclick = () => {
    window.location.reload();
  };

});
