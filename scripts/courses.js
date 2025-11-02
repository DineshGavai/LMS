// Render user name
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    document.getElementById('profile_name').textContent = loggedInUser.name;
    document.getElementById('profile_email').textContent = loggedInUser.email;
} else {
    // If no user is logged in, redirect to login page
    window.location.href = 'login.html';
}

// JSON For Courses (Example Data)
const courses = [
    {
        title: "English",
        description: "Explore the world of literature, language, and communication. This course covers grammar, writing skills, reading comprehension, and critical analysis to enhance your proficiency in English."
    },
    {
        title: "Mathematics",
        description: "Dive into the fascinating world of numbers, equations, and problem-solving. This course covers algebra, geometry, calculus, and statistics to build a strong foundation in mathematical concepts."
    },
    {
        title: "Science",
        description: "Uncover the mysteries of the natural world through this comprehensive science course. Topics include biology, chemistry, physics, and earth sciences, fostering a deep understanding of scientific principles and inquiry."
    }
];

// Render Courses like this in #courses

courses.forEach(course => {
    const courseTile = document.createElement('a');
    courseTile.href = 'subject.html';
    courseTile.className = 'tile';
    courseTile.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button>
            <i class="bi bi-chevron-right"></i>
        </button>
    `;
    document.getElementById('courses').appendChild(courseTile);
});



// Log Out
document.getElementById('logout_btn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});