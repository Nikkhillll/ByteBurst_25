// ===== Configurable Dropdowns =====
const branches = ["CSE", "ECE", "ME", "Civil", "EEE"];
const years = ["1st", "2nd", "3rd", "4th"];

// ===== Society Data =====
const societies = [
  {
    name: "Coder and Developer Groups",
    category: "Technical",
    description: "Fosters coding skills and promotes passion for technology.",
    image: "WhatsApp Image 2025-08-01 at 19.25.40_cd0acbd5.jpg",
    events: [
      { name: "Syntax Siege", date: "2025-08-20", open: true },
      { name: "Code Cascade", date: "2025-09-10", open: false }
    ],
    induction: "Coming Soon",
    aboutPage: "cdc.html",
    themeColor: "#2563eb"

  },
  {
    name: "The Editorial Board",
    category: "Literary",
    description: "Manages content creation and ensures quality and accuracy.",
    image: "WhatsApp Image 2025-08-01 at 19.25.40_0277b643.jpg",
    events: [
      { name: "Arunoday", date: "2025-08-25", open: true },
      { name: "Annual Debate Competition", date: "2025-09-15", open: false }
    ],
    induction: "Coming Soon",
    aboutPage: "editorial.html",
    themeColor: "#9333ea"
  },
  {
    name: "NSS (National Service Scheme)",
    category: "Social",
    description: "Promotes community service and leadership.",
    image: "WhatsApp Image 2025-08-01 at 19.42.26_f83aa4e6.jpg",
    events: [
      { name: "Aayansh", date: "2025-09-05", open: true }
    ],
    induction: "Coming Soon",
    aboutPage: "nss.html",
    themeColor: "#22c55e"
  },
  {
    name: "Cultural Synod",
    category: "Cultural",
    description: "Celebrates diversity and creativity through events.",
    image: "WhatsApp Image 2025-08-01 at 19.42.27_0c72a53f.jpg",
    events: [
      { name: "Heats", date: "2025-08-30", open: true },
      { name: "Abhyudaya", date: "2025-09-20", open: false }
    ],
    induction: "Coming Soon",
    aboutPage: "culture.html",
    themeColor: "#f97316"
  }
];

// ===== DOM Elements =====
const grid = document.getElementById("society-grid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");
const timelineContainer = document.getElementById("timeline-container");
const registerModal = document.getElementById("registerModal");
const registerClose = document.getElementById("registerClose");
const registrationForm = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

// ===== State =====
let selectedSociety = "";
let selectedEvent = "";

// ===== Render Societies =====
grid.innerHTML = "";
timelineContainer.innerHTML = "";
societies.forEach((soc, index) => {
  const card = document.createElement("div");
  card.className = "society-card";
 card.innerHTML = `
  <div class="society-image-container">
    <img src="${soc.image}" alt="${soc.name}">
  </div>
  <h3>${soc.name}</h3>
  <p>${soc.description}</p>
  <button onclick="openModal(${index})">View Events</button>
  <a href="${soc.aboutPage}" class="btn" style="text-decoration:none;">About</a>
`;

  grid.appendChild(card);

  const timelineItem = document.createElement("div");
  timelineItem.className = "timeline-item";
  timelineItem.innerHTML = `
    <h4>${soc.name}</h4>
    <p>Induction Dates: ${soc.induction}</p>
  `;
  timelineContainer.appendChild(timelineItem);
});

// ===== Modal for Society Details =====
window.openModal = function(index) {
  const soc = societies[index];
  selectedSociety = soc.name;
  let eventsHtml = soc.events.map(event => `
    <div>
      <p><strong>${event.name}</strong> (${event.date})</p>
      <button 
        style="background:${soc.themeColor}; padding:8px 12px; border:none; color:white; border-radius:6px;" 
        onclick="openRegisterModal('${soc.name}', '${event.name}', ${event.open})"
        ${event.open ? "" : "disabled"}>${event.open ? "Register" : "Not Open Yet"}</button>
    </div>
  `).join("<hr>");
  
  modalBody.innerHTML = `
    <img src="${soc.image}" style="width:100%; border-radius:8px; margin-bottom:10px;">
    <h2 style="color:${soc.themeColor}">${soc.name}</h2>
    <p><strong>Category:</strong> ${soc.category}</p>
    <p>${soc.description}</p>
    <h3> Upcoming Events</h3>
    ${eventsHtml}
  `;
  modal.style.display = "flex";
};

closeModal.addEventListener("click", () => modal.style.display = "none");
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
  if (e.target === registerModal) registerModal.style.display = "none";
};

// ===== Registration Modal =====
const branchSelect = document.getElementById("branch");
branches.forEach(b => {
  const opt = document.createElement("option");
  opt.value = b; opt.textContent = b;
  branchSelect.appendChild(opt);
});
const yearSelect = document.getElementById("year");
years.forEach(y => {
  const opt = document.createElement("option");
  opt.value = y; opt.textContent = y;
  yearSelect.appendChild(opt);
});

window.openRegisterModal = function(socName, eventName, isOpen) {
  if (!isOpen) return;
  selectedSociety = socName;
  selectedEvent = eventName;
  document.getElementById("registerEventTitle").textContent = `Register for ${eventName}`;
  registerModal.style.display = "flex";
};

registerClose.addEventListener("click", () => registerModal.style.display = "none");

registrationForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    roll: document.getElementById("roll").value,
    branch: document.getElementById("branch").value,
    year: document.getElementById("year").value,
    society: selectedSociety,
    event: selectedEvent
  };

  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push(data);
  localStorage.setItem("registrations", JSON.stringify(registrations));

  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    registerModal.style.display = "none";
    registrationForm.reset();
    loadRegistrations();
  }, 1500);
});

// ===== My Registrations Section =====
function loadRegistrations() {
  const container = document.getElementById("registration-list");
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  container.innerHTML = registrations.length ? registrations.map(r => `
    <div class="registration-item">
      <strong>${r.event}</strong> - ${r.society} <br>
      ${r.name} (${r.branch}, ${r.year})
    </div>
  `).join("") : "<p>No registrations yet.</p>";
}
loadRegistrations();

// ===== Carousel Logic =====
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

function showSlide(idx) {
  if (idx >= slides.length) index = 0;
  if (idx < 0) index = slides.length - 1;
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index++;
  showSlide(index);
});

prevBtn.addEventListener('click', () => {
  index--;
  showSlide(index);
});

setInterval(() => {
  index++;
  showSlide(index);
}, 3000);
