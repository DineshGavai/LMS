// All course data
const courseData = {
  English: {
    title: "English",
    description: "Welcome to English! Here you'll study grammar, writing, and literature.",
    quiz: [
      {
        question: "What is a noun?",
        options: [
          "A person, place, or thing",
          "An action word",
          "A descriptive word",
          "A word that connects clauses",
        ],
        answer: 1,
      },
      {
        question: "Choose the correct sentence:",
        options: [
          "She don't like apples.",
          "She doesn't like apples.",
          "She isn't like apples.",
          "She no like apples.",
        ],
        answer: 2,
      },
    ],
  },

  Mathematics: {
    title: "Mathematics",
    description: "Master numbers, equations, and real-world problem-solving.",
    quiz: [
      {
        question: "What is 7 + 5?",
        options: ["10", "11", "12", "13"],
        answer: 3, // 12
      },
      {
        question: "Which of these is an even number?",
        options: ["3", "7", "9", "8"],
        answer: 4, // 8
      },
    ],
  },

  Science: {
    title: "Science",
    description: "Explore biology, chemistry, physics, and more through experiments and theory.",
    quiz: [
      {
        question: "What do plants need to make food?",
        options: [
          "Sunlight, water, and air",
          "Milk and sugar",
          "Oil and salt",
          "None of these",
        ],
        answer: 1,
      },
      {
        question: "Which part of the body helps us to breathe?",
        options: ["Lungs", "Heart", "Stomach", "Brain"],
        answer: 1,
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
