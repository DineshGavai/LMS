// JSON for 4 such announcements
const announcements = [
    {
        title: "📕 Exam dates for 10th and 12th Grade for 2026 are Announced!",
        content: "All students are informed that the exam dates for 10th and 12th Grade for the year 2026 have been announced. Please check the school website for detailed schedule.",
        date: "15th November 2025"
    },
    {
        title: "📕 Open Book Test for Grade 8!",
        content: "All students are informed that there will be an open book test on 21th to 24th November 2025. Please prepare accordingly.",
        date: "12th November 2025"
    }
];


announcements.forEach(announcement => {
    const announcementDiv = document.createElement('div');
    announcementDiv.className = 'tile';
    announcementDiv.classList.add('announcement');
    announcementDiv.innerHTML = `
        <h3>${announcement.title}</h3>
        <p>${announcement.content}</p>
        <span class="date">${announcement.date}</span>
    `;
    document.getElementById('announcements').appendChild(announcementDiv);
});