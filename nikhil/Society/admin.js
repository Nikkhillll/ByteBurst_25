const PASSWORD = "admin123";  // change as needed

// if (localStorage.getItem("adminLoggedIn")) {
//   document.getElementById("loginBox").style.display = "none";
//   document.getElementById("adminPanel").style.display = "block";
//   loadSocieties();
// }

function login() {
  const input = document.getElementById("adminPassword").value;
  if (input === PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadSocieties();
  } else {
    document.getElementById("loginMessage").style.display = "block";
  }
//   localStorage.setItem("adminLoggedIn", true);
//   <button class="btn" onclick="logout()">Logout</button>


}

function getSocieties() {
  return JSON.parse(localStorage.getItem("societies")) || [];
}

function saveSocieties(societies) {
  localStorage.setItem("societies", JSON.stringify(societies));
  loadSocieties();
}

function addSociety() {
  const name = document.getElementById("societyName").value;
  const category = document.getElementById("societyCategory").value;
  const desc = document.getElementById("societyDesc").value;
  const image = document.getElementById("societyImage").value;

  let societies = getSocieties();
  societies.push({ name, category, description: desc, image, events: [] });
  saveSocieties(societies);

  document.getElementById("societyName").value = "";
  document.getElementById("societyCategory").value = "";
  document.getElementById("societyDesc").value = "";
  document.getElementById("societyImage").value = "";
}

function loadSocieties() {
  const container = document.getElementById("societyList");
  const societies = getSocieties();
  container.innerHTML = societies.map((soc, i) => `
    <div class="society-card">
      <h4>${soc.name}</h4>
      <p>${soc.description}</p>
      <button class="btn" onclick="deleteSociety(${i})">Delete</button>
      <h5>Events:</h5>
      <div class="event-list">
        ${soc.events.map((e, idx) => `
          <div class="event-item">${e.name} (${e.open ? "Open" : "Closed"})
            <button onclick="toggleEvent(${i}, ${idx})">${e.open ? "Close" : "Open"}</button>
          </div>`).join("")}
      </div>
      <input type="text" id="eventName${i}" placeholder="Event Name">
      <input type="date" id="eventDate${i}">
      <button class="btn" onclick="addEvent(${i})">Add Event</button>
    </div>
  `).join("");
}

function deleteSociety(index) {
  let societies = getSocieties();
  societies.splice(index, 1);
  saveSocieties(societies);
}

function addEvent(societyIndex) {
  const name = document.getElementById(`eventName${societyIndex}`).value;
  const date = document.getElementById(`eventDate${societyIndex}`).value;

  let societies = getSocieties();
  societies[societyIndex].events.push({ name, date, open: true });
  saveSocieties(societies);
}

function toggleEvent(societyIndex, eventIndex) {
  let societies = getSocieties();
  societies[societyIndex].events[eventIndex].open = !societies[societyIndex].events[eventIndex].open;
  saveSocieties(societies);
}
// function logout() {
//   localStorage.removeItem("adminLoggedIn");
//   location.reload();
// }
