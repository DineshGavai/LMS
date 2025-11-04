// JSON for 4 such announcements
const announcements = [
  {
    title: "🎉 Science Exhibition Coming Soon!",
    content:
      "All students are encouraged to participate. Topics on Clean Energy and Recycling are preferred.",
    date: "5th November 2025",
  },
  {
    title: "📚 New Library Books Arrived!",
    content:
      "We have added over 200 new books to our library collection. Check them out!",
    date: "12th October 2025",
  },
  {
    title: "🏆 Sports Day Results Announced!",
    content:
      "Congratulations to all participants! The results are now available on the notice board.",
    date: "20th September 2025",
  },
  {
    title: "🖼️ Art Competition Winners!",
    content:
      "The winners of the annual art competition have been announced. Visit the art room to see their work.",
    date: "15th August 2025",
  },
];

announcements.forEach((announcement) => {
  const announcementDiv = document.createElement("div");
  announcementDiv.className = "tile";
  announcementDiv.classList.add("announcement");
  announcementDiv.innerHTML = `
        <h3>${announcement.title}</h3>
        <p>${announcement.content}</p>
        <span class="date">${announcement.date}</span>
    `;
  document.getElementById("announcements").appendChild(announcementDiv);
});
