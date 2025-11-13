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

document.getElementById("subject_title").textContent = `Grade ${grade} - ${subjectData.title}`;
document.getElementById("subject_description").textContent =
  subjectData.description;

// ------------------ Render Chapters ------------------
const resourcesContainer = document.getElementById("resources");

subjectData.chapters.forEach((chapter, i) => {
  const chapterDiv = document.createElement("div");
  chapterDiv.className = "chapter";

  const header = document.createElement("button");
  header.className = "accordion";
  header.textContent = `Chapter ${i + 1}: ${chapter.title}`;

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