import { coursesData } from "./global.js";

// ------------------ Load Subject ------------------
const urlParams = new URLSearchParams(window.location.search);
const grade = urlParams.get("grade");
const subject = urlParams.get("subject");

const subjectData = coursesData[grade].find((sub => sub.subject === subject));

console.log(subjectData);


if (!subjectData) {
  document.body.innerHTML = "<h2>Invalid subject selected!</h2>";
  throw new Error("Invalid subject");
}

document.getElementById("subject_title").innerHTML = `Grade ${grade} - ${subjectData.title} Quiz!`;

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
  btn.innerHTML = `<i class="bi bi-arrow-clockwise"></i> Retake Quiz`;
  btn.onclick = () => window.location.reload();
});
