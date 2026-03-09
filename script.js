
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;

        if (user === "admin" && pass === "admin123") {
            
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html"; 
        } else {
            alert("Wrong username or password");
        }
    });
}


const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", async (e) => {
        const query = e.target.value.toLowerCase();
        try {
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const json = await res.json();
            const allIssues = json.data;

            const filteredIssues = allIssues.filter(issue => 
                issue.title.toLowerCase().includes(query) || 
                issue.description.toLowerCase().includes(query)
            );

            displayIssues(filteredIssues);
            
            document.getElementById("currentStatusCount").innerText = filteredIssues.length;
            document.getElementById("currentStatusLabel").innerText = `Search results for "${query}"`;
        } catch (error) {
            console.error("Search error:", error);
        }
    });
}
//---------Spinner maker-----
const manageSpinner = (status) => {
    if (status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issuesContainer").classList.add("hidden");
    } else{
        document.getElementById("issuesContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden")
    }
}

//----------------
const container = document.getElementById("issuesContainer");

async function loadIssues(filterType = "all") {
    if (!container) return; 
    
    container.innerHTML = `<div class="col-span-full text-center py-20 text-slate-400 font-bold">Syncing issues...</div>`;

    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const json = await res.json();
        const allData = json.data;

        updateStatusCounters(allData);

        let filtered = allData;
        if (filterType !== "all") {
            filtered = allData.filter(i => i.status === filterType);
        }

        document.getElementById("currentStatusCount").innerText = filtered.length;
        document.getElementById("currentStatusLabel").innerText = 
            filterType === 'all' ? "Track and manage all project issues" : `Currently showing ${filterType} issues`;

        updateTabUI(filterType);
        displayIssues(filtered);
    } catch (err) {
        container.innerHTML = `<div class="col-span-full text-center text-red-500">Failed to load data.</div>`;
    }
}


function updateStatusCounters(allData) {
    if(!document.getElementById("allCount")) return;
    document.getElementById("allCount").innerText = allData.length;
    document.getElementById("openCount").innerText = allData.filter(i => i.status === 'open').length;
    document.getElementById("closedCount").innerText = allData.filter(i => i.status === 'closed').length;
}


function displayIssues(issues) {
    if (!container) return;
    container.innerHTML = "";
    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? 'border-t-emerald-500' : 'border-t-purple-500';
        const priorityColor = issue.priority === "HIGH" ? "text-red-500" : "text-blue-500";
        
        const card = document.createElement("div");
        card.className = `bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-t-4 ${borderColor} cursor-pointer hover:shadow-xl transition-all flex flex-col gap-4`;

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <img src="./assets/Open-Status.png" class="w-7 h-7 object-contain" onerror="this.src='https://cdn-icons-png.flaticon.com/512/565/565547.png'" />
                <span class="${priorityColor} text-[10px] font-black uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">${issue.priority}</span>
            </div>
            <div>
                <h3 class="font-black text-slate-800 text-lg line-clamp-1">${issue.title}</h3>
                <p class="text-slate-500 text-sm mt-1 line-clamp-2">${issue.description}</p>
            </div>
            <div class="flex flex-wrap gap-2">
                ${issue.labels.map(l => `<span class="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200">${l}</span>`).join('')}
            </div>
            <div class="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-slate-400">
                <span># by ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        `;
        card.onclick = () => openModal(issue.id);
        container.appendChild(card);
    });
}


async function openModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const json = await res.json();
    const issue = json.data;

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalLine2").innerHTML = `<span>${issue.status}</span> • <span>${issue.author}</span> • <span>${new Date(issue.createdAt).toLocaleDateString()}</span>`;
    document.getElementById("modalLabels").innerHTML = issue.labels.map(l => `<span class="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-100 uppercase">${l}</span>`).join('');
    document.getElementById("modalDesc").innerText = issue.description;
    document.getElementById("modalAssignee").innerText = issue.author;
    
    const pBadge = document.getElementById("modalPriority");
    pBadge.innerText = issue.priority;
    pBadge.className = `px-4 py-1 rounded-lg text-white font-black text-xs uppercase ${issue.priority === 'HIGH' ? 'bg-red-500' : 'bg-blue-500'}`;

    document.getElementById("modal").classList.replace("hidden", "flex");
}

function closeModal() {
    document.getElementById("modal").classList.replace("flex", "hidden");
}


function updateTabUI(activeType) {
    document.querySelectorAll(".tabBtn").forEach(btn => {
        if (btn.innerText.toLowerCase().includes(activeType)) {
            btn.className = "tabBtn bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2";
        } else {
            btn.className = "tabBtn bg-white border border-slate-200 text-slate-600 px-8 py-2.5 rounded-lg font-bold hover:bg-slate-50 transition-all flex items-center gap-2";
        }
    });
}


if (container) loadIssues("all");
