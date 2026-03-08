
const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("login", "true");

      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Login");
    }
  });
}
const container = document.getElementById("issuesContainer");

async function loadIssues(type) {
  container.innerHTML = "Loading...";

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const data = await res.json();

  let issues = data.data;

  if (type === "open") {
    issues = issues.filter((issue) => issue.status === "open");
  }

  if (type === "closed") {
    issues = issues.filter((issue) => issue.status === "closed");
  }

  displayIssues(issues);
}

if (container) {
  loadIssues("all");
}
function displayIssues(issues) {
  container.innerHTML = "";

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    const card = document.createElement("div");

    card.className = `bg-white p-4 rounded shadow border-t-4 ${borderColor}`;

    card.innerHTML = `

<h2 class="font-bold mb-2">${issue.title}</h2>

<p class="text-sm text-gray-500 mb-3">
${issue.description.slice(0, 80)}
</p>

<p class="text-sm">Author: ${issue.author}</p>

<p class="text-sm">Priority: ${issue.priority}</p>

<p class="text-sm">Status: ${issue.status}</p>

<p class="text-sm text-gray-400">
${new Date(issue.createdAt).toLocaleDateString()}
</p>

`;

    card.onclick = () => openModal(issue.id);

    container.appendChild(card);
  });
}
async function openModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );

  const data = await res.json();

  const issue = data.data;

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDesc").innerText = issue.description;
  document.getElementById("modalAuthor").innerText = "Author: " + issue.author;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
async function searchIssue() {
  const text = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );

  const data = await res.json();

  displayIssues(data.data);
}
