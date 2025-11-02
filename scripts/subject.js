// Get query parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get("course");

// Select elements to update (you can adjust IDs/classes)
const titleEl = document.querySelector("h1");
const descEl = document.getElementById("subject_description");

// Example data (you could also reuse your course array or fetch it)
const courseData = {
  English: {
    title: "English",
    content:
      "Welcome to English! Here you’ll study grammar, writing, and literature.",
  },
  Mathematics: {
    title: "Mathematics",
    content: "Master numbers, equations, and real-world problem-solving.",
  },
  Science: {
    title: "Science",
    content:
      "Explore biology, chemistry, physics, and more through experiments and theory.",
  },
};

if (courseName) {
  titleEl.textContent = courseName;

  if (courseData[courseName]) {
    descEl.textContent = courseData[courseName].content;
  } else {
    descEl.textContent = "Course details not available.";
  }
} else {
  titleEl.textContent = "Course not found";
  descEl.textContent = "No course selected.";
}
