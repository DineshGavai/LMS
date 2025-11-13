// Get logged-in user
export const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Elements
const profileName = document.getElementById("profile_name");
const profileEmail = document.getElementById("profile_email");
const studyLink = document.getElementById("studyLink");
const announcementLink = document.getElementById("announcementLink");
const authButtonContainer = document.getElementById("authButtonContainer");

// Public pages (accessible without login)
const public_routes = [
  "index.html",
  "courses.html",
  "subject.html",
  "quiz.html",
  "login.html",
  "register.html",
];

// Current page name
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// ✅ Navbar visibility and auth button handling
if (loggedInUser) {
  // Populate profile data if elements exist
  if (profileName) profileName.textContent = loggedInUser.name || "User";
  if (profileEmail)
    profileEmail.textContent = loggedInUser.email || "user@example.com";

  // Show private links
  if (studyLink) studyLink.style.display = "inline-block";
  if (announcementLink) announcementLink.style.display = "inline-block";

  // Show logout button
  if (authButtonContainer) {
    authButtonContainer.innerHTML = `<button id="navLogoutBtn" class="nav-btn">Logout</button>`;
    document.getElementById("navLogoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  // ✅ If user tries to visit login or register while logged in → redirect home
  if (["login.html", "register.html"].includes(currentPage)) {
    window.location.href = "index.html";
  }

} else {
  // Hide private links
  if (studyLink) studyLink.style.display = "none";
  if (announcementLink) announcementLink.style.display = "none";

  // ✅ Redirect to login if user tries to open a private page
  if (!public_routes.includes(currentPage)) {
    window.location.href = "login.html";
  }

  // Show login button
  if (authButtonContainer) {
    authButtonContainer.innerHTML = `<a href="login.html" class="nav-btn">Login</a>`;
  }
}

// ✅ Quiz dropdown navigation
const quizSelect = document.getElementById("quizSelect");

if (quizSelect) {
  quizSelect.addEventListener("change", function () {
    const selectedValue = this.value;
    if (!selectedValue) return;

    const [subject, grade] = selectedValue.split("|");
    const url = `quiz.html?subject=${encodeURIComponent(
      subject
    )}&grade=${encodeURIComponent(grade)}`;

    window.location.href = url;
  });
}

// ✅ Fix browser back button cache (recheck login)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

let header = document.querySelector("header");

window.addEventListener("scroll", ()=>{
  header.classList.toggle("scrolled", window.scrollY > 60)
})

export const coursesData = {
  // 6th grade
  6: [
    // 6th grade English
    {
      subject: "English",
      title: "English Literature & Grammar",
      description: "Enhance reading, writing, and grammar skills through interesting stories, vocabulary, and comprehension exercises.",
      hoursPerChapter: 1,
      chapters: [
        {
          title: "Who did Patrick's Homework?", description: "A fun story that teaches the value of self-learning and responsibility.", resources: [
            { title: "Who did Patrick's Homework - YouTube", type: "video", url: "https://youtu.be/jA3izUqyT_Y?si=qqWhADBBumRAJgsC" },
            { title: "Who did Patrick's Homework - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1iPftsRZ3L9SPxCJnCIrvxNoO1DzaHb10/view?usp=drive_link" },
            { title: "Who did Patrick's Homework - Notes", type: "pdf", url: "https://drive.google.com/file/d/1SLVWBt04qZ-4hsg19zWAOavpu8EgyHUg/view?usp=drive_link" }
          ]
        },
        {
          title: "How the Dog Found Himself a New Master", description: "A tale showing how dogs came to live with humans and the idea of loyalty.", resources: [
            { title: "How the Dog Found Himself a New Master - YouTube", type: "video", url: "https://youtu.be/HnsSmOLdLbU?si=pu03AVEWmyzHN6-k" },
            { title: "How the Dog Found Himself a New Master - Textbook", type: "pdf", url: "https://drive.google.com/file/d/105EkQqLb92UER7WyLqSDj8U5UHhe3J_A/view?usp=drive_link" },
            { title: "How the Dog Found Himself a New Master - Notes", type: "pdf", url: "https://drive.google.com/file/d/1qUP1EiDHnSz9Sr414A-9BDkGcw-YvlsF/view?usp=drive_link" }
          ]
        },
        {
          title: "Taro's Reward", description: "A moral story about hard work and devotion, featuring Taro and his magical waterfall.", resources: [
            { title: "Taro's Reward - YouTube", type: "video", url: "https://youtu.be/xJYGrE2qB0A?si=wO-SM0vf3uw9vCmd" },
            { title: "Taro's Reward - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1w1Z2erUcQwI2ROWJGbbqn_UbmCHmWwS0/view?usp=drive_link" },
            { title: "Taro's Reward - Notes", type: "pdf", url: "https://drive.google.com/file/d/1Iu8VER5-XKy56SS-HMiZ5njfT103l93t/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Give the meaning of 'ignoramus'.", options: ["well-educated", "intelligent", "uneducated", "anonymous"], answer: 3 },
        { question: "How did the elf ask Patrick to help him in maths?", options: ["To do the sums", "By reading books for him", "By bringing books", "All of these"], answer: 4 },
        { question: "When Patrick grabbed the little thing, what did he see?", options: ["a big doll", "a teddy bear", "a man of the tiniest size", "a tiny phone"], answer: 3 },
        { question: "What is the meaning of 'Scowled'?", options: ["Senile", "Happiness", "Dirty look", "Sorrow"], answer: 3 },
        { question: "In which subject was Patrick out of luck?", options: ["Maths", "History", "Geography", "English"], answer: 1 },
        { question: "Patrick's semester was of _____.", options: ["25 days", "35 days", "45 days", "65 days"], answer: 2 },
        { question: "The dog decided to leave the wolf and take service with the _____.", options: ["deer", "bear", "rabbit", "elephant"], answer: 2 },
        { question: "Why was the Wolf frightened?", options: ["Because the cow was coming", "Because the bear was coming", "Because the dog was coming", "Because the lion was coming"], answer: 2 },
        { question: "Who were walking side by side along a path?", options: ["A man and his dog", "The lion and the dog", "The well and the dog", "The bear and the dog"], answer: 2 },
        { question: "The bear ran hastily deeper into the _____.", options: ["zoo", "park", "forest", "home"], answer: 3 },
        { question: "How did dogs live in the past?", options: ["Like wolves", "Like elephants in the forest", "Like birds", "In complete freedom"], answer: 1 },
        { question: "Taro was a _____.", options: ["Farmer", "Woodcutter", "Merchant", "Potter"], answer: 2 },
        { question: "What did Taro's father wish for on a cold day?", options: ["Hot soup", "Tea", "A cup of sake (rice wine)", "Coffee"], answer: 3 },
        { question: "The waterfall gave Taro _____.", options: ["Cold water", "Sweet-tasting sake", "Milk", "Honey"], answer: 2 },
        { question: "Where was the waterfall hidden?", options: ["Behind a mountain", "Behind a hill", "Behind a rock", "Behind a tree"], answer: 3 },
        { question: "Why was Taro in need of extra money?", options: ["To buy sake", "To buy a new jacket", "To buy bread", "To buy some food"], answer: 1 }
      ]
    },
    // 6th grade Mathematics
    {
      subject: "Mathematics",
      title: "Mathematics Fundamentals",
      description: "Learn essential mathematical concepts including numbers, operations, and basic arithmetic with problem-solving practice.",
      hoursPerChapter: 1.5,
      chapters: [
        {
          title: "Knowing Our Numbers", description: "Learn about the number system, place values, and large numbers.", resources: [
            { title: "Knowing Our Numbers - YouTube", type: "video", url: "https://youtube.com/watch?v=j9jm3wFMBQs&feature=shared" },
            { title: "Knowing Our Numbers - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1dLyyFWYIOC_tR_RLQ2hzcMitjnrhD5S1/view?usp=drive_link" },
            { title: "Knowing Our Numbers - Notes", type: "pdf", url: "https://drive.google.com/file/d/1RXFb2NI4Wa5S7Zj4WXkJZKCE4FLNAHU8/view?usp=drive_link" }
          ]
        },
        {
          title: "Whole Numbers", description: "Understand whole numbers, their properties, and basic operations.", resources: [
            { title: "Whole Numbers - YouTube", type: "video", url: "https://youtu.be/JUeZwIM5aVI?si=yk0xuZzGWJNTq8ry" },
            { title: "Whole Numbers - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1RI8TXjsWEbo7J_PN1An6F9AYBR9ro_hS/view?usp=drive_link" },
            { title: "Whole Numbers - Notes", type: "pdf", url: "https://drive.google.com/file/d/1_pWbNQ6KxAbL28m7xajWaIf-FGtAA5LQ/view?usp=drive_link" }
          ]
        },
        {
          title: "Playing with Numbers", description: "Learn about divisibility rules, factors, multiples, and prime numbers.", resources: [
            { title: "Playing with Numbers - YouTube", type: "video", url: "https://youtu.be/zY_uLUKWLjM?si=W97F3FNMdwy_Ppbt" },
            { title: "Playing with Numbers - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1EoUAnPSJH7dy0Slhius51cj_-aeFRQWb/view?usp=drive_link" },
            { title: "Playing with Numbers - Notes", type: "pdf", url: "https://drive.google.com/file/d/1sQ9RlEAUoJLhqUmU9dIfqlfnYEYWZngi/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "The smallest 5-digit number is —", options: ["9999", "10000", "99999", "11111"], answer: 2 },
        { question: "The greatest 6-digit number is —", options: ["999999", "100000", "99999", "100001"], answer: 1 },
        { question: "One lakh = _____ thousands.", options: ["10", "100", "1000", "10000"], answer: 2 },
        { question: "1 crore = _____ lakhs.", options: ["100", "10", "1000", "1"], answer: 1 },
        { question: "The place value of 7 in 3764 is _____", options: ["7", "70", "700", "7000"], answer: 3 },
        { question: "The smallest whole number is —", options: ["1", "0", "-1", "2"], answer: 2 },
        { question: "Whole numbers are closed under —", options: ["Addition and multiplication", "Division", "Subtraction", "None"], answer: 1 },
        { question: "The successor of 1999 is —", options: ["2000", "1998", "1997", "2001"], answer: 1 },
        { question: "The identity for addition is _____", options: ["0", "1", "2", "None"], answer: 1 },
        { question: "The predecessor of 3000 is _______", options: ["2999", "3001", "2998", "2000"], answer: 1 },
        { question: "A number divisible by both 2 and 3 is divisible by ____________", options: ["4", "5", "6", "8"], answer: 3 },
        { question: "The smallest prime number is ___", options: ["1", "2", "3", "5"], answer: 2 },
        { question: "The HCF of 12 and 18 is _________", options: ["3", "6", "9", "12"], answer: 2 },
        { question: "The LCM of 4 and 6 is _________", options: ["12", "24", "8", "10"], answer: 1 },
        { question: "81 is divisible by _____________", options: ["2", "5", "9", "4"], answer: 3 }
      ]
    },
    // 6th grade Science
    {
      subject: "Science",
      title: "General Science",
      description: "Understand basic scientific concepts through observation, experiments, and real-world examples.",
      hoursPerChapter: 1.5,
      chapters: [
        {
          title: "Food - Where Does It Come From?", description: "Explore the sources of food and understand the dependency between plants and animals.", resources: [
            { title: "Food - Where Does It Come From? - YouTube", type: "video", url: "https://youtube.com/watch?v=snN29Xi1Fns&feature=shared" },
            { title: "Food - Where Does It Come From? - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1RxM7iWgBGKPc1BiRrA60JNTKtmmXxXVC/view?usp=drive_link" },
            { title: "Food - Where Does It Come From? - Notes", type: "pdf", url: "https://drive.google.com/file/d/1qcOMrw2yL_-wYL46sM9ifnxkPK8pfp7T/view?usp=drive_link" }
          ]
        },
        {
          title: "Components of Food", description: "Study the nutrients that make up our food and their role in a healthy body.", resources: [
            { title: "Components of Food - YouTube", type: "video", url: "https://youtube.com/watch?v=BOKoNRRMDMk&feature=shared" },
            { title: "Components of Food - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1GpaA_7awECfJve24YyTHT6zN8x9_yaL4/view?usp=drive_link" },
            { title: "Components of Food - Notes", type: "pdf", url: "https://drive.google.com/file/d/1ncag-9b8PyqSKko_9TErBWElZeGMPjgB/view?usp=drive_link" }
          ]
        },
        {
          title: "Fibre to Fabric", description: "Learn how natural fibres like cotton, wool, and silk are obtained and processed into fabrics.", resources: [
            { title: "Fibre to Fabric - YouTube", type: "video", url: "https://youtube.com/watch?v=8QCixkRY98M&feature=shared" },
            { title: "Fibre to Fabric - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1V6qCIujOqeE-zPKjiGxkbCxXMT5hABGL/view?usp=drive_link" },
            { title: "Fibre to Fabric - Notes", type: "pdf", url: "https://drive.google.com/file/d/1y8c-Ed4fJ-yLNcKAICjznybBkcVDqYYR/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Plants make their food by —", options: ["Eating soil", "Photosynthesis", "Absorption", "Storing water"], answer: 2 },
        { question: "Animals that eat only plants are —", options: ["Carnivores", "Omnivores", "Herbivores", "Decomposers"], answer: 3 },
        { question: "The part of mustard plant we eat as leaves is —", options: ["Flower", "Root", "Leaf", "Seed"], answer: 3 },
        { question: "Honey bees collect nectar from —", options: ["Leaves", "Flowers", "Fruits", "Seeds"], answer: 2 },
        { question: "Animals depend on plants because —", options: ["For shade", "For food", "For fun", "For air only"], answer: 2 },
        { question: "Carbohydrates provide —", options: ["Energy", "Growth", "Strength", "Vitamins"], answer: 1 },
        { question: "Proteins are needed for —", options: ["Energy", "Growth and repair", "Flavor", "Digestion"], answer: 2 },
        { question: "Deficiency of iodine causes —", options: ["Night blindness", "Goitre", "Anaemia", "Scurvy"], answer: 2 },
        { question: "Which of these is a roughage source?", options: ["Rice", "Milk", "Fruits and vegetables", "Meat"], answer: 3 },
        { question: "Fats give _______", options: ["Less energy", "Same as protein", "More energy than carbohydrates", "No energy"], answer: 3 },
        { question: "Cotton is obtained from —", options: ["Stem", "Fruit", "Seed", "Root"], answer: 3 },
        { question: "Wool is obtained from —", options: ["Silkworm", "Sheep", "Cotton plant", "Camel only"], answer: 2 },
        { question: "The process of removing seeds from cotton is —", options: ["Weaving", "Ginning", "Knitting", "Spinning"], answer: 2 },
        { question: "Silk fibres come from —", options: ["Cocoons", "Sheep", "Plants", "Wool"], answer: 1 },
        { question: "Spinning converts fibres into —", options: ["Cloth", "Yarn", "Fabric", "Silk"], answer: 2 }
      ]
    },
    // 6th grade Social Science
    {
      subject: "Social Science",
      title: "Social Science",
      description: "Learn about history, geography, and civics — exploring ancient civilizations, our planet, and how governments work.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "What, Where, How and When?", description: "Discover how historians study the past and learn about the earliest civilizations.", resources: [
            { title: "What, Where, How and When? - YouTube", type: "video", url: "https://youtube.com/watch?v=_Id1sAEJ5dw&feature=shared" },
            { title: "What, Where, How and When? - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1UXn3OV7uiFzbjKjfL-USuKbH3RfTkx0q/view?usp=drive_link" },
            { title: "What, Where, How and When? - Notes", type: "pdf", url: "https://drive.google.com/file/d/12QQUbeiFDGW1FikDsOnhfbMb-KQ0IyZA/view?usp=drive_link" }
          ]
        },
        {
          title: "Globe: Latitudes and Longitudes", description: "Understand the Earth's shape, hemispheres, and coordinate system using the globe.", resources: [
            { title: "Globe: Latitudes and Longitudes - YouTube", type: "video", url: "https://youtube.com/watch?v=Zpo9ITlZk3c&feature=shared" },
            { title: "Globe: Latitudes and Longitudes - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1lFfoDnO9jcA3dgNuPlphCl3VhuaoFUL_/view?usp=drive_link" },
            { title: "Globe: Latitudes and Longitudes - Notes", type: "pdf", url: "https://drive.google.com/file/d/1K-yXXqNPngGFjaFpbVvY7Y6vZJmrpgpS/view?usp=drive_link" }
          ]
        },
        {
          title: "What is Government?", description: "Learn about different forms of government and their role in society.", resources: [
            { title: "What is Government? - YouTube", type: "video", url: "https://youtube.com/watch?v=5Kvi-5HrfaY&feature=shared" },
            { title: "What is Government? - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1v4fnfjHeRYsji-vDyVU_hd4-Tu8r60Bj/view?usp=drive_link" },
            { title: "What is Government? - Notes", type: "pdf", url: "https://drive.google.com/file/d/1uhNHqqwSiO0XdlqEnL-svG5OLgSQtVb7/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "The word India comes from which river mentioned in the chapter?", options: ["Ganga", "Yamuna", "Indus", "Saraswati"], answer: 3 },
        { question: "The people who lived along the banks of the river Narmada were —", options: ["Farmers", "Herders", "Hunters and gatherers", "Traders"], answer: 3 },
        { question: "The first cities developed along the banks of which river?", options: ["Ganga", "Indus", "Narmada", "Brahmaputra"], answer: 2 },
        { question: "Who are archaeologists?", options: ["People who read old books", "People who study the remains of the past like tools, pottery, and bones", "People who study stars", "People who study maps"], answer: 2 },
        { question: "Inscriptions are _______", options: ["Written records on hard surfaces", "Drawings on paper", "Oral stories", "Objects found underground"], answer: 1 },
        { question: "The globe is a _______", options: ["Flat map", "Model of the Earth", "Drawing", "Chart"], answer: 2 },
        { question: "The Equator divides Earth into _______", options: ["East and West", "North and South Hemispheres", "Poles", "Continents"], answer: 2 },
        { question: "The Tropic of Cancer is at _______", options: ["0°", "23½° N", "23½° S", "66½° N"], answer: 2 },
        { question: "There are total _______", options: ["180 longitudes", "360 longitudes", "90 latitudes", "100 latitudes"], answer: 2 },
        { question: "The Prime Meridian passes through _______", options: ["India", "USA", "Greenwich, England", "Africa"], answer: 3 },
        { question: "Government makes _______", options: ["Friends", "Rules and decisions for people", "Movies", "Books"], answer: 2 },
        { question: "The government has how many levels?", options: ["1", "2", "3", "4"], answer: 3 },
        { question: "A democratic government is one where _______", options: ["Kings rule", "People elect their leaders", "Only rich rule", "Soldiers rule"], answer: 2 },
        { question: "The government builds _______", options: ["Schools and hospitals", "Cars", "Private houses", "Stores"], answer: 1 },
        { question: "Monarchy means _______", options: ["Rule by people", "Rule by one person (king or queen)", "Rule by many", "No rule"], answer: 2 }
      ]
    }
  ],
  // 7th Grade
  7: [
    // 7th grade English
    {
      subject: "English",
      title: "English Literature",
      description: "Enhance comprehension and moral learning through engaging short stories and thoughtful lessons from NCERT Honeycomb.",
      hoursPerChapter: 1.5,
      chapters: [
        {
          title: "Three Questions",
          description: "A story about a king who seeks answers to the most important questions in life, discovering wisdom and kindness.",
          resources: [
            { title: "Three Questions - YouTube", type: "video", url: "https://youtu.be/S2JdSbMQ-4U?si=VHFzCimvxpPDiES8" },
            { title: "Three Questions - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1Ygdcvd6wtc5_6ThXBkENQBQC-M36mxGZ/view?usp=drive_link" },
            { title: "Three Questions - Notes", type: "pdf", url: "https://drive.google.com/file/d/10xrww0pngp-sd23J_hrHYvCOU5bZ5Aha/view?usp=drive_link" }
          ]
        },
        {
          title: "A Gift of Chappals",
          description: "A heartwarming tale about compassion and empathy shown by children towards the poor.",
          resources: [
            { title: "A Gift of Chappals - YouTube", type: "video", url: "https://youtu.be/AxERYXTvT4I?si=nX0mZeOh505hKllk" },
            { title: "A Gift of Chappals - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1wO7hkFoXHSBMiyTPGZDqpdOHla1WalAt/view?usp=drive_link" },
            { title: "A Gift of Chappals - Notes", type: "pdf", url: "https://drive.google.com/file/d/1e8kSuDmN03-9C6AqsgNbPd3jyRpQeRTr/view?usp=drive_link" }
          ]
        },
        {
          title: "Gopal and the Hilsa Fish",
          description: "A humorous story of Gopal's wit and intelligence as he fulfills the king's unusual challenge.",
          resources: [
            { title: "Gopal and the Hilsa Fish - YouTube", type: "video", url: "https://youtu.be/pJzujYKbUkA?si=lmbW-gYVii9w80bO" },
            { title: "Gopal and the Hilsa Fish - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1xoGRvKtoVgu5qUukm07h2v2m4bpMbXky/view?usp=drive_link" },
            { title: "Gopal and the Hilsa Fish - Notes", type: "pdf", url: "https://drive.google.com/file/d/1f72Qu8EKJizLeHABhF9YC-QjISsjtDZL/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Who helped the king dig the ground?", options: ["The hermit", "A soldier", "The bearded man", "The minister"], answer: 1 },
        { question: "What did the king do to save the bearded man's life?", options: ["Left him", "Bandaged his wound", "Gave him medicine", "Called his soldiers"], answer: 2 },
        { question: "The king learned that the most important time is _________", options: ["Past", "Present", "Future", "None"], answer: 2 },
        { question: "Who is the most important person according to the hermit?", options: ["The king", "His ministers", "The one you are with now", "Yourself only"], answer: 3 },
        { question: "What is the most important thing to do according to the hermit?", options: ["Care for others", "Think for yourself", "Eat well", "Sleep enough"], answer: 1 },
        { question: "The children were playing with a _________", options: ["Puppy", "Kitten", "Toy", "Rabbit"], answer: 2 },
        { question: "Who was the music master?", options: ["Ravi's uncle", "A teacher", "Lalli's music teacher", "A beggar"], answer: 3 },
        { question: "What did the children give to the beggar?", options: ["Food", "Money", "A pair of chappals", "Water"], answer: 3 },
        { question: "Whose chappals were given to the beggar?", options: ["Father's", "Ravi's", "The music master's", "The beggar's"], answer: 3 },
        { question: "How did the music master react when his chappals were gone?", options: ["He laughed", "He was angry", "He thanked the children", "He ignored it"], answer: 2 },
        { question: "What was special about the Hilsa fish?", options: ["It was huge and popular", "It was cheap", "It was poisonous", "It was rare"], answer: 1 },
        { question: "Why did the king get annoyed?", options: ["Gopal entered the palace", "Everyone kept talking about Hilsa fish", "The fish was expensive", "He didn't like Gopal"], answer: 2 },
        { question: "What did Gopal do to prove his cleverness?", options: ["Sold fish", "Painted his face and dressed like a madman", "Cooked fish", "Argued with the king"], answer: 2 },
        { question: "Why did people laugh at Gopal in the street?", options: ["He danced", "His clothes and face looked funny", "He was shouting", "He was selling fish"], answer: 2 },
        { question: "What lesson does the story teach?", options: ["Appearance matters most", "Cleverness and wit can solve problems", "Always listen to others", "Eat fish daily"], answer: 2 },
        { question: "Gopal's profession was _________", options: ["Farmer", "Fisherman", "Teacher", "Trader"], answer: 2 },
        { question: "What did Gopal catch?", options: ["Crab", "Hilsa fish", "Shrimp", "Tuna"], answer: 2 },
        { question: "The story teaches us _________", options: ["Honesty and cleverness", "Hard work only", "Luck only", "Courage only"], answer: 1 },
        { question: "Gopal's skill was _________", options: ["Fishing", "Farming", "Trading", "Cooking"], answer: 1 },
        { question: "What did the king challenge Gopal to do?", options: ["Catch the biggest Hilsa fish", "Bring a Hilsa fish to the palace without anyone talking about it", "Cook the best Hilsa dish", "Sell the Hilsa fish in the market"], answer: 2 }
      ]
    },
    // 7th grade Mathematics
    {
      subject: "Mathematics",
      title: "Mathematics",
      description: "Strengthen your understanding of numbers, fractions, and data interpretation with interactive lessons and examples.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "Integers",
          description: "Learn about positive and negative numbers, their properties, and operations involving integers.",
          resources: [
            { title: "Integers - YouTube", type: "video", url: "https://youtu.be/u3HANGB47pA?si=6a777iul7qxvuv6E" },
            { title: "Integers - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1DEAVPI46KsmTAFRrCrCiOWftAWJr7ZtB/view?usp=drive_link" },
            { title: "Integers - Notes", type: "pdf", url: "https://drive.google.com/file/d/1EdXhOtkvv-52dFXt5IvyHd3TYcMAQoWU/view?usp=drive_link" }
          ]
        },
        {
          title: "Fractions and Decimals",
          description: "Understand the concept of fractions and decimals and how to perform basic operations with them.",
          resources: [
            { title: "Fractions and Decimals - YouTube", type: "video", url: "https://youtu.be/Ob25bVs3Tbs?si=h2UoabZ_mDZcKfO3" },
            { title: "Fractions and Decimals - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1H3qGIfflfPEPiDfK9z-VdpKwwLYs3MaP/view?usp=drive_link" },
            { title: "Fractions and Decimals - Notes", type: "pdf", url: "https://drive.google.com/file/d/17SVqaqmi3Z8WJ_kzwjyrm4B-NKBicIxh/view?usp=drive_link" }
          ]
        },
        {
          title: "Data Handling",
          description: "Explore methods to collect, organize, and interpret data using mean, median, mode, and bar graphs.",
          resources: [
            { title: "Data Handling - YouTube", type: "video", url: "https://youtu.be/NE6pudadmJY?si=uvKBdaFXxIbS-qxp" },
            { title: "Data Handling - Textbook", type: "pdf", url: "https://drive.google.com/file/d/18uZfyambQvKkQnYVfI_ikBMGucdI5r-j/view?usp=drive_link" },
            { title: "Data Handling - Notes", type: "pdf", url: "https://drive.google.com/file/d/1BvuLcLLtVWX6L5rmncqF0G9G6S2EJDkM/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "The sum of a number and its additive inverse is —", options: ["1", "0", "-1", "The number itself"], answer: 2 },
        { question: "The product of two negative integers is —", options: ["Positive", "Negative", "Zero", "Undefined"], answer: 1 },
        { question: "-5 + 7 =", options: ["-12", "12", "2", "-2"], answer: 3 },
        { question: "The additive inverse of -9 is —", options: ["9", "-9", "0", "-1"], answer: 1 },
        { question: "When a positive number is added to a negative number, the sign of the result depends on —", options: ["The larger number", "The smaller number", "Always positive", "Always negative"], answer: 1 },
        { question: "½ + ¼ =", options: ["¼", "¾", "½", "1"], answer: 2 },
        { question: "3⁄10 + 2⁄10 =", options: ["1⁄10", "½", "5⁄10", "½"], answer: 3 },
        { question: "0.6 × 0.5 =", options: ["0.3", "0.05", "3.0", "0.06"], answer: 1 },
        { question: "To divide a decimal by 10, we move the decimal point —", options: ["One place to the right", "One place to the left", "Two places to the right", "Nowhere"], answer: 2 },
        { question: "The reciprocal of ¾ is —", options: ["¾", "4⁄3", "3", "7⁄4"], answer: 2 },
        { question: "A bar graph is used to represent —", options: ["Words", "Data using bars", "Lines", "Shapes"], answer: 2 },
        { question: "The average of 5, 10, 15 is —", options: ["10", "15", "5", "20"], answer: 1 },
        { question: "The range of 3, 7, 11, 9 is —", options: ["8", "7", "4", "9"], answer: 1 },
        { question: "The mode is the number that —", options: ["Appears once", "Appears most frequently", "Is the smallest", "Is the largest"], answer: 2 },
        { question: "The sum of all observations divided by the number of observations is —", options: ["Range", "Median", "Mode", "Mean"], answer: 4 }
      ]
    },
    // 7th grade Science
    {
      subject: "Science",
      title: "Science",
      description: "Explore the wonders of living organisms, nutrition, and materials through interactive explanations and examples.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "Nutrition in Plants",
          description: "Learn how plants produce their own food through photosynthesis and store energy for growth and survival.",
          resources: [
            { title: "Nutrition in Plants - YouTube", type: "video", url: "https://youtu.be/Kv0e5usW1w8?si=AqHpIL1DKQZyvsVk" },
            { title: "Nutrition in Plants - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1dGL-xfQWh9VYHyUO7edn8X5WNpQYaP2B/view?usp=drive_link" },
            { title: "Nutrition in Plants - Notes", type: "pdf", url: "https://drive.google.com/file/d/1ATkwIGIwGpdzeXaVRQSWH_tJXYGwrMxh/view?usp=drive_link" }
          ]
        },
        {
          title: "Nutrition in Animals",
          description: "Understand how different animals obtain and digest food, and the process of nutrition in the human body.",
          resources: [
            { title: "Nutrition in Animals - YouTube", type: "video", url: "https://youtu.be/ZiuVy3X6JKI?si=CeO6vXvTo2zD7dYw" },
            { title: "Nutrition in Animals - Textbook", type: "pdf", url: "https://drive.google.com/file/d/16nyNTp6mnSowL8cGb0gB_mONheut1L9H/view?usp=drive_link" },
            { title: "Nutrition in Animals - Notes", type: "pdf", url: "https://drive.google.com/file/d/1XoM03F2htzGZshWIY-1JXCTd3WmjpKeb/view?usp=drive_link" }
          ]
        },
        {
          title: "Fibre to Fabric",
          description: "Discover the process of obtaining fibres from animals and plants and converting them into fabrics.",
          resources: [
            { title: "Fibre to Fabric - YouTube", type: "video", url: "https://youtu.be/Atw9s8AHsR8?si=TzvR_CsFfzm2-xmm" },
            { title: "Fibre to Fabric - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1lJZeWCNvgAT9uinKo2PcWFWyLMKPM0se/view?usp=drive_link" },
            { title: "Fibre to Fabric - Notes", type: "pdf", url: "https://drive.google.com/file/d/1qUna19qmDoBA5Cn1v_z_N5X_g9T-gDLX/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Green plants make their food by __________", options: ["photosynthesis", "eating insects", "absorbing soil", "drinking water only"], answer: 1 },
        { question: "Which pigment helps in photosynthesis?", options: ["Chlorophyll", "Carotene", "Hemoglobin", "Melanin"], answer: 1 },
        { question: "Photosynthesis requires ___________", options: ["carbon dioxide, water, sunlight", "oxygen and water", "nitrogen only", "glucose"], answer: 1 },
        { question: "Stomata are present in ___________", options: ["Leaves", "Roots", "Stem", "Flowers"], answer: 1 },
        { question: "Plants store extra food as ___________", options: ["Proteins", "Starch", "Vitamins", "Fat"], answer: 2 },
        { question: "Animals that eat only plants are called ___________", options: ["Herbivores", "Carnivores", "Omnivores", "Insectivores"], answer: 1 },
        { question: "Animals that eat both plants and animals are ___________", options: ["Herbivores", "Omnivores", "Carnivores", "Parasites"], answer: 2 },
        { question: "A carnivore eats _________", options: ["Plants", "Fruits", "Meat", "Leaves"], answer: 3 },
        { question: "The process of breaking food into smaller molecules is called ____________", options: ["Photosynthesis", "Nutrition", "Digestion", "Absorption"], answer: 3 },
        { question: "Which part of human body absorbs nutrients?", options: ["Stomach", "Small intestine", "Large intestine", "Liver"], answer: 2 },
        { question: "Wool is obtained from ____________", options: ["Cotton", "Sheep", "Jute", "Silk worm"], answer: 2 },
        { question: "Silk is obtained from ____________", options: ["Cocoons", "Cotton seeds", "Jute stems", "Wool"], answer: 1 },
        { question: "Ginning is the process of ___________", options: ["Removing seeds from cotton", "Spinning fibres", "Weaving cloth", "Dyeing fabric"], answer: 1 },
        { question: "Weaving converts ___________", options: ["Yarn into fabric", "Fabric into yarn", "Fibre into seeds", "Fibre into wool"], answer: 1 },
        { question: "Jute is mainly obtained from ____________", options: ["Stem of the plant", "Seeds", "Leaves", "Roots"], answer: 1 }
      ]
    },
    // 7th grade Social Science
    {
      subject: "Social Science",
      title: "Social Science",
      description: "Understand society, history, and geography through engaging lessons that explain how people live, govern, and shape the Earth.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "On Equality",
          description: "Learn about equality, democracy, and the importance of fair treatment and opportunities for all citizens.",
          resources: [
            { title: "On Equality - YouTube", type: "video", url: "https://youtu.be/OYIvmEbDbg4?si=hDNuTMEc3mcJ5AEd" },
            { title: "On Equality - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1wKqLq5DCkecenxNYzIdB2_Jazefdd8aN/view?usp=drive_link" },
            { title: "On Equality - Notes", type: "pdf", url: "https://drive.google.com/file/d/1Vy2XGcyupgqchEVYbypU23h_DbDKy7XF/view?usp=drive_link" }
          ]
        },
        {
          title: "New Kings and Kingdoms",
          description: "Explore how new rulers and kingdoms emerged in India and their contributions to trade, architecture, and governance.",
          resources: [
            { title: "New Kings and Kingdoms - YouTube", type: "video", url: "https://youtu.be/QKabvxbXXBo?si=pauwhBekPaU3XKBm" },
            { title: "New Kings and Kingdoms - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1xE_ZXBv43kxDIKq-nrGOAj9So02Q5hmb/view?usp=drive_link" },
            { title: "New Kings and Kingdoms - Notes", type: "pdf", url: "https://drive.google.com/file/d/1xE_ZXBv43kxDIKq-nrGOAj9So02Q5hmb/view?usp=drive_link" }
          ]
        },
        {
          title: "Our Changing Earth",
          description: "Understand the dynamic nature of Earth's surface, including earthquakes, volcanoes, and the effects of erosion and deposition.",
          resources: [
            { title: "Our Changing Earth - YouTube", type: "video", url: "https://youtu.be/YFTqUMU7gLM?si=KXAT4A4FbbxmbyXs" },
            { title: "Our Changing Earth - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1wsYLuhGpSh5_J88xEsQUn9Iv-pz4ElRB/view?usp=drive_link" },
            { title: "Our Changing Earth - Notes", type: "pdf", url: "https://drive.google.com/file/d/1CWqkl7UM__zqnW1fj9DeTUNBwjH6AJqT/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Equality means —", options: ["Same conditions for everyone", "Treating people fairly and justly", "Everyone looks the same", "Everyone earns the same"], answer: 2 },
        { question: "Inequality occurs when —", options: ["Everyone has the same rights", "People do not have equal opportunities", "Laws are followed", "People help each other"], answer: 2 },
        { question: "Democracy ensures —", options: ["Rule by few", "Freedom and equality", "Discrimination", "Corruption"], answer: 2 },
        { question: "Women in India got voting rights in —", options: ["1950", "1947", "1948", "1960"], answer: 1 },
        { question: "Which of these promotes equality?", options: ["Discrimination", "Fair laws", "Ignoring rules", "Treating some people better"], answer: 2 },
        { question: "Which empire was established by the Cholas?", options: ["Northern India", "Southern India", "Western India", "Eastern India"], answer: 2 },
        { question: "The Cholas were known for —", options: ["Temples and trade", "Writing books", "Only farming", "Fighting British"], answer: 1 },
        { question: "Who ruled the Vijayanagara kingdom?", options: ["Rajputs", "Vijayanagara kings", "Mughals", "British"], answer: 2 },
        { question: "The Rajputs were known for —", options: ["Castles and bravery", "Temples", "Farming only", "Hunting"], answer: 1 },
        { question: "The Delhi Sultanate was —", options: ["A kingdom in South India", "A Muslim kingdom in North India", "A European colony", "A city-state"], answer: 2 },
        { question: "The outermost layer of Earth is called —", options: ["Mantle", "Crust", "Core", "Magma"], answer: 2 },
        { question: "Mountains are formed due to —", options: ["Folding of rocks", "Wind", "Rain", "Sun"], answer: 1 },
        { question: "Volcanoes release —", options: ["Water", "Lava and gases", "Sand", "Ice"], answer: 2 },
        { question: "Earthquakes are caused by —", options: ["Wind", "Tectonic movements", "Rain", "Sun"], answer: 2 },
        { question: "Rivers change course due to —", options: ["Erosion and deposition", "Earthquakes", "Sunlight", "Moon"], answer: 1 }
      ]
    }
  ],
  // 8th Grade
  8: [
    // 8th grade English
    {
      subject: "English",
      title: "English",
      description: "Enhance your English comprehension and vocabulary skills through engaging stories that teach lessons of courage, compassion, and history.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "The Best Christmas Present in the World",
          description: "A heartwarming story about a letter from the First World War that tells of peace and humanity on Christmas Day.",
          resources: [
            { title: "The Best Christmas Present in the World - YouTube", type: "video", url: "https://youtu.be/NHy0H-7hEG4?si=LeF6RDgDGh4KOfuH" },
            { title: "The Best Christmas Present in the World - Textbook", type: "pdf", url: "https://drive.google.com/file/d/17tTDSLl5fuQ9jAehmErbh0R3Ayfs6YuY/view?usp=drive_link" },
            { title: "The Best Christmas Present in the World - Notes", type: "pdf", url: "https://drive.google.com/file/d/1isqBDb8Jfi2GiXWaCLameBrQwgiGqhan/view?usp=drive_link" }
          ]
        },
        {
          title: "The Tsunami",
          description: "A collection of true stories about courage and survival during one of nature's most powerful disasters — the tsunami.",
          resources: [
            { title: "The Tsunami - YouTube", type: "video", url: "https://youtu.be/FvJThsPePrQ?si=5FOZ1Ziz5BV8XOgm" },
            { title: "The Tsunami - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1hKGdXEU-ZMyRxuzO-u7feEyH_A0r23h4/view?usp=drive_link" },
            { title: "The Tsunami - Notes", type: "pdf", url: "https://drive.google.com/file/d/1cyPcTodHWWyiiKrLcCn_Olr-F2oOrjaP/view?usp=drive_link" }
          ]
        },
        {
          title: "Glimpses of the Past",
          description: "A historical story that revisits India's struggle against British rule between 1757 and 1857.",
          resources: [
            { title: "Glimpses of the Past - YouTube", type: "video", url: "https://youtu.be/T4qq7HrxQgU?si=5GKmH8SN03BbPreT" },
            { title: "Glimpses of the Past - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1il8kv8D4OqiQEtHWsNBp4KGjoqOX4rrP/view?usp=drive_link" },
            { title: "Glimpses of the Past - Notes", type: "pdf", url: "https://drive.google.com/file/d/1ptppBrAR9miLq28LUfiVTJ2qLvShGb5z/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "What did Jim write in his letter to Connie?", options: ["He would return soon", "He would never come back", "He was angry", "He lost his way"], answer: 1 },
        { question: "What did the author find inside the desk drawer?", options: ["A letter", "A book", "A coin", "A photograph"], answer: 1 },
        { question: "Who was the letter written to?", options: ["Jim's mother", "Connie", "A friend", "A soldier"], answer: 2 },
        { question: "What event was described in Jim's letter?", options: ["The Christmas truce", "The end of the war", "A victory", "His marriage"], answer: 1 },
        { question: "What did Connie believe when she saw the narrator?", options: ["He was Jim", "He was a soldier", "He was a ghost", "He was a doctor"], answer: 1 },
        { question: "What natural disaster is described in the story?", options: ["Earthquake", "Flood", "Tsunami", "Cyclone"], answer: 3 },
        { question: "Who was Meghna?", options: ["A student", "A girl who survived the tsunami", "A teacher", "A journalist"], answer: 2 },
        { question: "What happened to Tilly Smith's family?", options: ["They were lost", "They were saved because Tilly warned them", "They drowned", "They left the country"], answer: 2 },
        { question: "What did Tilly notice before the tsunami came?", options: ["Fish floating", "Sea water rising and forming bubbles", "Loud thunder", "Rainfall"], answer: 2 },
        { question: "Which animal is known to have sensed the tsunami early?", options: ["Cat", "Dog", "Elephant", "Horse"], answer: 3 },
        { question: "The story shows events between which years?", options: ["1757-1857", "1857-1947", "1900-1950", "1700-1800"], answer: 1 },
        { question: "Who introduced the Doctrine of Lapse?", options: ["Lord Mountbatten", "Lord Dalhousie", "Lord Wellesley", "Lord Curzon"], answer: 2 },
        { question: "Why did Indian industries decline under British rule?", options: ["Lack of interest", "Heavy taxes and cheap British goods", "Wars", "Floods"], answer: 2 },
        { question: "Who were the first to rebel against British rule in 1857?", options: ["Farmers", "Soldiers", "Traders", "Teachers"], answer: 2 },
        { question: "What was the result of the 1857 revolt?", options: ["India got freedom", "British rule ended", "The East India Company's rule ended and the Crown took over", "The king of Delhi became ruler"], answer: 3 }
      ]
    },
    // 8th grade Mathematics
    {
      subject: "Mathematics",
      title: "Mathematics",
      description: "Master key mathematical concepts like rational numbers, equations, and shapes through logic and practical understanding.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "Rational Numbers",
          description: "Understand the properties, operations, and applications of rational numbers through examples and exercises.",
          resources: [
            { title: "Rational Numbers - YouTube", type: "video", url: "https://youtu.be/0LXACUqRUWo?si=ejGhBxCgEbvhPnsb" },
            { title: "Rational Numbers - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1L0iUlu9RNRm7JO95EOWEcBQa1KCltd_e/view?usp=drive_link" },
            { title: "Rational Numbers - Notes", type: "pdf", url: "https://drive.google.com/file/d/163rmGco1zg__KLRDbPGbug18OkJAB29e/view?usp=drive_link" }
          ]
        },
        {
          title: "Linear Equations in One Variable",
          description: "Learn how to form and solve equations with one variable and understand their real-life applications.",
          resources: [
            { title: "Linear Equations in One Variable - YouTube", type: "video", url: "https://youtu.be/GQe79mPsaHI?si=eGMHc5u1538vNx6O" },
            { title: "Linear Equations in One Variable - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1Og7qQl-RJ6wHaTqjSF6bKCROQAf9oq5H/view?usp=drive_link" },
            { title: "Linear Equations in One Variable - Notes", type: "pdf", url: "https://drive.google.com/file/d/14hgQ9d0m-7nd31jtbi9WvzjI228VsImQ/view?usp=drive_link" }
          ]
        },
        {
          title: "Understanding Quadrilaterals",
          description: "Explore the properties and types of quadrilaterals and their geometric relationships.",
          resources: [
            { title: "Understanding Quadrilaterals - YouTube", type: "video", url: "https://youtu.be/zTXeIkwbtzs?si=ows9Mj6brnY6nSIF" },
            { title: "Understanding Quadrilaterals - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1OfX7_49KGmW2t_8BfFFFdW8Nnq2Tjq5v/view?usp=drive_link" },
            { title: "Understanding Quadrilaterals - Notes", type: "pdf", url: "https://drive.google.com/file/d/18NYvUEZ22XKjDFAIIeu6URYNJXN7dB21/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "The reciprocal of a rational number x/y is _______", options: ["y/x", "x", "-y/x", "-x/y"], answer: 1 },
        { question: "The additive inverse of 3/7 is _______", options: ["3/7", "-3/7", "7/3", "-7/3"], answer: 2 },
        { question: "Which number is a rational number?", options: ["√2", "π", "2/5", "√3"], answer: 3 },
        { question: "The product of a rational number and its reciprocal is _______", options: ["0", "1", "-1", "Infinite"], answer: 2 },
        { question: "Rational numbers are closed under _______", options: ["Addition and subtraction", "Multiplication and division (except by 0)", "Both", "None"], answer: 3 },
        { question: "An equation with one variable and degree 1 is called _______", options: ["Linear equation", "Quadratic equation", "Cubic equation", "Polynomial equation"], answer: 1 },
        { question: "If 3x + 7 = 16, then x =", options: ["2", "3", "4", "5"], answer: 2 },
        { question: "The value of x in 5x - 2 = 18 is _______", options: ["3", "4", "5", "6"], answer: 2 },
        { question: "In a linear equation, the variable has _______", options: ["Power 2", "Power 1", "Power 3", "Power 0"], answer: 2 },
        { question: "Solving a linear equation means _______", options: ["Finding the value of the variable", "Adding terms", "Subtracting terms", "None"], answer: 1 },
        { question: "A quadrilateral has how many sides?", options: ["3", "4", "5", "6"], answer: 2 },
        { question: "The sum of interior angles of a quadrilateral is _______", options: ["90°", "180°", "270°", "360°"], answer: 4 },
        { question: "A rectangle has _______", options: ["2 right angles", "3 right angles", "4 right angles", "No right angles"], answer: 3 },
        { question: "A parallelogram has opposite sides _______", options: ["Equal and parallel", "Unequal", "Equal but not parallel", "Perpendicular"], answer: 1 },
        { question: "The diagonals of a rectangle are _______", options: ["Unequal", "Equal", "Parallel", "Curved"], answer: 2 }
      ]
    },
    // 8th grade Science
    {
      subject: "Science",
      title: "Science",
      description: "Explore the fundamentals of agriculture, microorganisms, and materials to understand how science shapes our daily life and environment.",
      hoursPerChapter: 2,
      chapters: [
        {
          title: "Crop Production and Management",
          description: "Learn about the process of growing crops, the tools used in agriculture, and modern irrigation methods that improve productivity.",
          resources: [
            { title: "Crop Production and Management - YouTube", type: "video", url: "https://youtu.be/xR2DPnyLEE0?si=piRfJ_erxw0-gF1Q" },
            { title: "Crop Production and Management - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1-SxAIgZfjvvi-HM4YHzPv0DoFo1o2EJJ/view?usp=drive_link" },
            { title: "Crop Production and Management - Notes", type: "pdf", url: "https://drive.google.com/file/d/1VOMqHX3PLCUXE2M37-52-ejU713_jBWw/view?usp=drive_link" }
          ]
        },
        {
          title: "Microorganisms: Friend and Foe",
          description: "Discover how microorganisms help in food production, nitrogen fixation, and also how they can cause diseases.",
          resources: [
            { title: "Microorganisms: Friend and Foe - YouTube", type: "video", url: "https://youtu.be/qO8uyBXY4vo?si=RtKQVSo1NFWE7F_k" },
            { title: "Microorganisms: Friend and Foe - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1SaVWaO7XLMsUnUcEtAGVYR7lGV2cbP3u/view?usp=drive_link" },
            { title: "Microorganisms: Friend and Foe - Notes", type: "pdf", url: "https://drive.google.com/file/d/1PSmXTSDOyCsS7ORNaocvpXbW-CnLz6S1/view?usp=drive_link" }
          ]
        },
        {
          title: "Synthetic Fibres and Plastics",
          description: "Understand synthetic fibres, their types, uses, and the environmental impact of plastics.",
          resources: [
            { title: "Synthetic Fibres and Plastics - YouTube", type: "video", url: "https://youtu.be/hYlXU4NmSN4?si=YkgE_sm-f4NxuNbd" },
            { title: "Synthetic Fibres and Plastics - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1UgAeT1KcFO5xiCjklcrfqOSb6zZRLSR8/view?usp=drive_link" },
            { title: "Synthetic Fibres and Plastics - Notes", type: "pdf", url: "https://drive.google.com/file/d/1rR9LeG3ViYwn-KUPVn3TIbDiR8LIIuYB/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "Which practice involves growing plants in a field?", options: ["Sericulture", "Agriculture", "Apiculture", "Horticulture"], answer: 2 },
        { question: "The process of loosening and turning the soil is called —", options: ["Weeding", "Sowing", "Ploughing", "Irrigation"], answer: 3 },
        { question: "Which tool is used for sowing seeds?", options: ["Hoe", "Seed drill", "Plough", "Shovel"], answer: 2 },
        { question: "Which nutrient is provided by fertilizers?", options: ["Nitrogen", "Hydrogen", "Carbon dioxide", "Oxygen"], answer: 1 },
        { question: "Which method helps save water during irrigation?", options: ["Sprinkler system", "Bucket", "Pipe irrigation", "Tank irrigation"], answer: 1 },
        { question: "Which microorganism causes tuberculosis?", options: ["Virus", "Bacterium", "Fungus", "Protozoa"], answer: 2 },
        { question: "Yeast is used in baking because it —", options: ["Adds flavor", "Makes dough rise", "Adds color", "Makes food last longer"], answer: 2 },
        { question: "Which microorganism fixes nitrogen in soil?", options: ["Rhizobium", "Amoeba", "Plasmodium", "Virus"], answer: 1 },
        { question: "Which disease is caused by protozoa?", options: ["Malaria", "Cholera", "Measles", "Influenza"], answer: 1 },
        { question: "Which of the following is used in the production of curd?", options: ["Yeast", "Lactobacillus", "Rhizobium", "Amoeba"], answer: 2 },
        { question: "Rayon is obtained from —", options: ["Cotton", "Wood pulp", "Wool", "Silk"], answer: 2 },
        { question: "Which of these is a synthetic fibre?", options: ["Cotton", "Wool", "Nylon", "Silk"], answer: 3 },
        { question: "Which plastic is used for making non-stick cookware?", options: ["PVC", "Polythene", "Teflon", "Bakelite"], answer: 3 },
        { question: "Which of these materials is non-biodegradable?", options: ["Cotton cloth", "Jute bag", "Plastic bottle", "Paper"], answer: 3 },
        { question: "Which of the following is a thermosetting plastic?", options: ["Polythene", "PVC", "Bakelite", "Nylon"], answer: 3 },
        { question: "Which fibre is known as artificial silk?", options: ["Rayon", "Nylon", "Polyester", "Acrylic"], answer: 1 }
      ]
    },
    // 8th grade Social Science
    {
      subject: "Social Science",
      title: "Social Science",
      description: "Gain a deeper understanding of India's Constitution, natural resources, and colonial history through geography, civics, and history lessons.",
      hoursPerChapter: 2.5,
      chapters: [
        {
          title: "The Indian Constitution",
          description: "Learn about the framework that defines India's democratic structure, its key principles, and the vision of equality and justice.",
          resources: [
            { title: "The Indian Constitution - YouTube", type: "video", url: "https://youtu.be/RpcySvm2nIo?si=eWNce-mqV3qtkPBd" },
            { title: "The Indian Constitution - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1ZHpFOGD3pmFIHRuKpgSFMDHA5FIfiD6c/view?usp=drive_link" },
            { title: "The Indian Constitution - Notes", type: "pdf", url: "https://drive.google.com/file/d/1jauiqec1TMQA1o_QuGO3V3xvaPdPQHgt/view?usp=drive_link" }
          ]
        },
        {
          title: "Land, Soil, Water, Natural Vegetation and Wildlife Resources",
          description: "Understand the relationship between natural resources and human life, and learn how conservation sustains ecological balance.",
          resources: [
            { title: "Land, Soil, Water, Natural Vegetation and Wildlife - YouTube", type: "video", url: "https://youtu.be/QU0B9T82NCE?si=Ftm2ZQSBF9K2j6sh" },
            { title: "Land, Soil, Water, Natural Vegetation and Wildlife - Textbook", type: "pdf", url: "https://drive.google.com/file/d/13YqSGqi5keGEpur_AWxzBSJWuJFrNO32/view?usp=drive_link" },
            { title: "Land, Soil, Water, Natural Vegetation and Wildlife - Notes", type: "pdf", url: "https://drive.google.com/file/d/13SMxtZPQWKfx4okNnhTSkqUujAQmIUzv/view?usp=drive_link" }
          ]
        },
        {
          title: "Ruling the Countryside",
          description: "Explore how British economic policies transformed India's agricultural system and led to resistance among peasants.",
          resources: [
            { title: "Ruling the Countryside - YouTube", type: "video", url: "https://youtu.be/JFQ0DppCTNA?si=Tp26F3vHGEv8LCFR" },
            { title: "Ruling the Countryside - Textbook", type: "pdf", url: "https://drive.google.com/file/d/1ceI04BQxSDjvzXuHD-GG1MAeLa6fdS9g/view?usp=drive_link" },
            { title: "Ruling the Countryside - Notes", type: "pdf", url: "https://drive.google.com/file/d/1i9PB_yE2JkJzhwL8ONSoWuxZGHfZ4OTa/view?usp=drive_link" }
          ]
        }
      ],
      quiz: [
        { question: "When did the Indian Constitution come into effect?", options: ["15 August 1947", "26 January 1950", "2 October 1948", "14 November 1947"], answer: 2 },
        { question: "Who is known as the Father of the Indian Constitution?", options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], answer: 2 },
        { question: "What is the main purpose of the Constitution?", options: ["To govern foreign trade", "To define how a country will be governed", "To list festivals", "To record population"], answer: 2 },
        { question: "What type of government does India have?", options: ["Monarchy", "Dictatorship", "Democratic Republic", "Military rule"], answer: 3 },
        { question: "The Constitution guarantees equality, liberty, and —", options: ["War", "Justice", "Power", "Wealth"], answer: 2 },
        { question: "The Indian Constitution lays down the framework for —", options: ["How the government will function", "Only how laws are made", "Foreign relations", "Trade and business"], answer: 1 },
        { question: "Which factor affects the type of vegetation in an area?", options: ["Population", "Climate", "Language", "Culture"], answer: 2 },
        { question: "What percentage of the Earth's water is fresh?", options: ["97%", "10%", "3%", "50%"], answer: 3 },
        { question: "Which practice helps in preventing soil erosion?", options: ["Deforestation", "Terrace farming", "Overgrazing", "Mining"], answer: 2 },
        { question: "What are natural resources?", options: ["Things made by humans", "Gifts of nature", "Machines", "Tools"], answer: 2 },
        { question: "Which type of vegetation is found in areas with heavy rainfall?", options: ["Desert vegetation", "Grasslands", "Tropical rainforests", "Alpine vegetation"], answer: 3 },
        { question: "Who introduced the Permanent Settlement?", options: ["Lord Mountbatten", "Lord Cornwallis", "Lord Wellesley", "Lord Dalhousie"], answer: 2 },
        { question: "What did the British call the zamindars?", options: ["Tenants", "Landlords", "Farmers", "Soldiers"], answer: 2 },
        { question: "Indigo cultivation was mainly forced upon peasants in —", options: ["Bengal", "Bombay", "Madras", "Punjab"], answer: 1 },
        { question: "What was the main aim of the British revenue system?", options: ["Help farmers", "Increase production", "Collect maximum revenue", "Develop industries"], answer: 3 },
        { question: "Who led the Indigo Revolt?", options: ["Dinabandhu Mitra", "Raja Ram Mohan Roy", "Mahatma Gandhi", "Dadabhai Naoroji"], answer: 1 }
      ]
    }
  ],
};
