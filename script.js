"use strict";
const D = {
  student: {
    name: "Anuj Sharma",
    id: "25MCAN0184",
    program: "Master of Computer Applications",
    semester: "Semester 3",
    cgpa: 8.42,
    sgpa: 8.67,
    attendance: 86.4,
    readiness: 78,
  },
  subjects: [
    {
      name: "Web Technology",
      faculty: "Dr. Mehta",
      credits: 4,
      attendance: 92,
      grade: "A",
      score: 88,
    },
    {
      name: "Advanced DSA",
      faculty: "Prof. Sharma",
      credits: 4,
      attendance: 88,
      grade: "A-",
      score: 82,
    },
    {
      name: "Information Security",
      faculty: "Dr. Kapoor",
      credits: 4,
      attendance: 84,
      grade: "B+",
      score: 76,
    },
    {
      name: "Salesforce",
      faculty: "Mr. Verma",
      credits: 3,
      attendance: 81,
      grade: "B+",
      score: 74,
    },
    {
      name: "Operating Systems",
      faculty: "Dr. Singh",
      credits: 4,
      attendance: 86,
      grade: "A-",
      score: 81,
    },
    {
      name: "Research Methodology",
      faculty: "Dr. Joshi",
      credits: 3,
      attendance: 90,
      grade: "A",
      score: 87,
    },
  ],
  timetable: [
    ["Monday", "09:00 AM", "Web Technology", "Dr. Mehta", "Lab 204"],
    ["Monday", "11:00 AM", "Advanced DSA", "Prof. Sharma", "Room 301"],
    ["Tuesday", "10:00 AM", "Information Security", "Dr. Kapoor", "Room 208"],
    ["Tuesday", "01:00 PM", "Salesforce", "Mr. Verma", "Lab 102"],
    ["Wednesday", "09:00 AM", "Operating Systems", "Dr. Singh", "Room 303"],
    ["Wednesday", "11:00 AM", "Research Methodology", "Dr. Joshi", "Room 202"],
    ["Thursday", "10:00 AM", "Advanced DSA", "Prof. Sharma", "Room 301"],
    ["Friday", "09:00 AM", "Web Technology Lab", "Dr. Mehta", "Lab 204"],
  ],
  applications: [
    ["Accenture", "Software Associate", "6.5 LPA", "Interview"],
    ["TCS", "System Engineer", "7.2 LPA", "Applied"],
    ["Infosys", "Technology Analyst", "8 LPA", "Selected"],
    ["Wipro", "Project Engineer", "6 LPA", "Applied"],
  ],
  skills: [
    ["HTML & CSS", 90],
    ["JavaScript", 85],
    ["C++ & DSA", 78],
    ["DBMS & MySQL", 72],
    ["UI/UX Design", 68],
    ["Python", 61],
  ],
  events: [
    [
      "Tech Symposium 2026",
      "2026-10-12",
      "10:00 AM",
      "Auditorium",
      "Talks, student projects and technology showcases.",
      "Technology",
    ],
    [
      "Hackathon 3.0",
      "2026-10-16",
      "09:00 AM",
      "Innovation Lab",
      "A team-based build challenge for creative solutions.",
      "Competition",
    ],
    [
      "Placement Drive",
      "2026-10-21",
      "11:00 AM",
      "Seminar Hall",
      "Recruitment activities and employer interactions.",
      "Career",
    ],
    [
      "Campus Fest",
      "2026-10-25",
      "05:00 PM",
      "Main Ground",
      "Music, performances and student club activities.",
      "Culture",
    ],
  ],
  notices: [
    [
      "Mid-Semester Examination Schedule Released",
      "Check the examination timetable and plan revision for each subject.",
      "Oct 10, 2026",
      "Academic",
    ],
    [
      "Web Technology assignment deadline extended",
      "The sample portal deadline is October 12, 2026.",
      "Oct 09, 2026",
      "Deadline",
    ],
    [
      "Registrations open for Hackathon 3.0",
      "Register with your team before the event begins.",
      "Oct 08, 2026",
      "Events",
    ],
    [
      "Infosys recruitment results available",
      "Review your placement application status in Career & Placements.",
      "Oct 07, 2026",
      "Placement",
    ],
  ],
  assignments: [
    ["Responsive Web Page", "Web Technology", "Oct 12", "In progress"],
    ["Sorting Algorithms Practice", "Advanced DSA", "Oct 14", "Not started"],
    ["Security Case Study", "Information Security", "Oct 17", "In progress"],
  ],
};
const S = {
  page: "dashboard",
  tasks: [
    ["Revise JavaScript DOM", false],
    ["Solve 5 DSA problems", false],
    ["Review placement resume", true],
  ],
  registered: new Set(),
  history: [],
  key: "",
  model: "gemini-3.8-flash",
  busy: false,
};
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const names = {
  dashboard: "Overview",
  academics: "Academics",
  attendance: "Attendance",
  results: "Results & Grades",
  timetable: "Timetable",
  placements: "Career & Placements",
  skills: "Skills",
  events: "Campus Events",
  notices: "Notices",
  profile: "My Profile",
};
const today = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());
function toast(s) {
  let n = document.createElement("div");
  n.className = "toast";
  n.textContent = s;
  $("#toasts").append(n);
  setTimeout(() => n.remove(), 3000);
}
function heading(t, sub, actions = "") {
  return `<div class="heading"><div><p class="eyebrow">CAMPUS360 / ${esc(t.toUpperCase())}</p><h1>${t}</h1><p class="subtitle">${sub}</p></div><div class="actions">${actions}</div></div>`;
}
function panel(t, sub, body, link = "") {
  return `<section class="panel"><div class="panelhead"><div><h3>${t}</h3><p>${sub || ""}</p></div>${link}</div>${body}</section>`;
}
function btnPage(p, label) {
  return `<button class="textlink" data-page="${p}">${label} ↗</button>`;
}
function stat(label, val, note, icon, extra = "") {
  return `<article class="stat"><div class="statlabel">${label}<span class="staticon">${icon}</span></div><div class="statvalue">${val}</div><div class="statfoot">${extra ? `<span class="good">${extra}</span> · ` : ""}${note}</div></article>`;
}
function bar(value, color = "") {
  return `<div class="track"><i style="width:${value}%;${color ? `background:${color}` : ""}"></i></div>`;
}
function barRows(rows) {
  return `<div class="bars">${rows.map((s) => `<div class="barrow"><span>${esc(s.name)}</span>${bar(s.attendance)}<b>${s.attendance}%</b></div>`).join("")}</div>`;
}
function ring() {
  return `<div class="ringrow"><div class="ring" style="--pct:${D.student.attendance}"><div><strong>${D.student.attendance}%</strong><small>Attendance</small></div></div><div class="ringcopy"><b>You're on track</b><p>Overall sample attendance is above the illustrative 75% target. Keep it consistent.</p><span class="badge green">+11.4% above target</span></div></div>`;
}
function subjectTable() {
  return `<div class="tablewrap"><table class="table"><thead><tr><th>SUBJECT</th><th>FACULTY</th><th>CREDITS</th><th>ATTENDANCE</th><th>GRADE</th></tr></thead><tbody>${D.subjects.map((s, i) => `<tr><td><div class="subjectname"><i class="stripe s${i + 1}"></i><b>${esc(s.name)}</b></div></td><td>${esc(s.faculty)}</td><td>${s.credits}</td><td><span class="badge ${s.attendance < 75 ? "pink" : s.attendance < 85 ? "orange" : "green"}">${s.attendance}%</span></td><td><span class="badge purplebadge">${s.grade}</span></td></tr>`).join("")}</tbody></table></div>`;
}
function applications() {
  return `<div class="tablewrap"><table class="table"><thead><tr><th>COMPANY</th><th>ROLE</th><th>PACKAGE</th><th>STATUS</th></tr></thead><tbody>${D.applications.map((a) => `<tr><td><b>${esc(a[0])}</b></td><td>${esc(a[1])}</td><td>${esc(a[2])}</td><td><span class="badge ${a[3] === "Selected" ? "green" : a[3] === "Interview" ? "blue" : "orange"}">${esc(a[3])}</span></td></tr>`).join("")}</tbody></table></div>`;
}
function noticeList(limit = 4) {
  return `<div class="list">${D.notices
    .slice(0, limit)
    .map(
      (n, i) =>
        `<div class="listitem"><div class="listicon">${["▤", "◷", "✦", "↗"][i]}</div><div class="listbody"><b>${esc(n[0])}</b><p>${esc(n[1])}</p></div><span class="date">${esc(n[2])}</span></div>`,
    )
    .join("")}</div>`;
}
function assignmentList() {
  return `<div class="list">${D.assignments.map((a, i) => `<div class="listitem"><div class="listicon">${["⌘", "▤", "◈"][i]}</div><div class="listbody"><b>${esc(a[0])}</b><p>${esc(a[1])} · Due ${esc(a[2])}</p></div><span class="badge ${a[3] === "In progress" ? "blue" : "orange"}">${esc(a[3])}</span></div>`).join("")}</div>`;
}
function chart() {
  let a = [55, 62, 59, 72, 67, 78, 74, 83, 79, 87, 82, 90],
    b = [43, 50, 48, 58, 54, 63, 61, 70, 67, 74, 72, 79],
    x = (i) => 10 + i * 26,
    y = (v) => 170 - v * 1.55,
    pts = (v) => v.map((n, i) => `${x(i)},${y(n)}`).join(" "),
    grid = [35, 70, 105, 140]
      .map(
        (y) =>
          `<line x1="0" y1="${y}" x2="300" y2="${y}" stroke="#eef0f7" stroke-dasharray="3 4"/>`,
      )
      .join("");
  return `<div class="chart"><svg viewBox="0 0 300 180" preserveAspectRatio="none" aria-label="Illustrative performance trend">${grid}<polyline points="${pts(b)}" fill="none" stroke="#c6c8ff" stroke-width="2.5"/><polyline points="${pts(a)}" fill="none" stroke="#5d5fef" stroke-width="2.5"/>${a.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="2.2" fill="#5d5fef"/>`).join("")}</svg></div><div class="chartlabels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span><span>Week 6</span></div>`;
}
function tasks() {
  return `<div>${S.tasks.map((t, i) => `<label class="task ${t[1] ? "done" : ""}"><input type="checkbox" data-task="${i}" ${t[1] ? "checked" : ""}><span>${esc(t[0])}</span></label>`).join("")}</div><form id="taskForm" class="taskform"><input class="field" id="taskText" placeholder="Add a personal task..."><button class="primary">Add</button></form>`;
}
function dashboard() {
  return `${heading("Overview", `Welcome back, Anuj. Here's your academic snapshot for ${today}.`, `<button class="secondary" data-export>↓ Export summary</button><button class="primary" data-ask>✦ Ask Campus AI</button>`)}<section class="banner"><div><p class="eyebrow">YOUR SEMESTER AT A GLANCE</p><h2>Keep building your future, Anuj.</h2><p>Track your academic progress, manage campus activities and prepare for your next opportunity — all in one place.</p></div><button class="primary" data-page="academics">View academics ↗</button></section><div class="stats">${stat("Current CGPA", D.student.cgpa, "Cumulative performance", "▥", "+0.32")}${stat("Attendance", D.student.attendance + "%", "Across all subjects", "◷", "On track")}${stat("Placement readiness", D.student.readiness + "%", "Based on sample skills", "↗", "+8% this month")}${stat("Applications", D.applications.length, "Tracked opportunities", "✳", "Active")}</div><div class="grid2">${panel("Academic performance", "Illustrative weekly progress trend", `<div class="subtitle">● Current term　 <span style="color:#b9bbfa">● Previous baseline</span></div>${chart()}`, btnPage("results", "View results"))}${panel("Attendance overview", "Your current attendance status", `${ring()}${barRows(D.subjects)}`, btnPage("attendance", "Details"))}</div><div class="grid2">${panel("Upcoming assignments", "Stay ahead of deadlines", assignmentList(), `<button class="textlink" data-page="academics">View planner ↗</button>`)}${panel("Latest campus notices", "Important announcements", noticeList(3), btnPage("notices", "All notices"))}</div><div class="grid2">${panel("Placement activity", "Example application pipeline", applications(), btnPage("placements", "View all"))}${panel(
    "Coming up on campus",
    "Events worth adding to your calendar",
    `<div class="list">${D.events
      .slice(0, 3)
      .map(
        (e) =>
          `<div class="listitem"><div class="listicon">✦</div><div class="listbody"><b>${esc(e[0])}</b><p>${esc(e[1])} · ${esc(e[2])} · ${esc(e[3])}</p></div></div>`,
      )
      .join("")}</div>`,
    btnPage("events", "Explore events"),
  )}</div>`;
}
function academics() {
  return `${heading("Academics", "Your course load, instructors and attendance in one view.", `<button class="primary" data-export>↓ Export academic summary</button>`)}<div class="stats">${stat("Enrolled subjects", D.subjects.length, "This semester", "▤")}${stat(
    "Total credits",
    D.subjects.reduce((a, s) => a + s.credits, 0),
    "Across enrolled courses",
    "◈",
  )}${stat("Current SGPA", D.student.sgpa, "Semester performance", "▥")}${stat("Attendance", D.student.attendance + "%", "Sample data", "◷")}</div>${panel("Enrolled subjects", "Course and faculty information", subjectTable())}<div class="grid2" style="margin-top:18px">${panel("Learning checklist", "Only kept until you reload this page", tasks())}${panel("Academic tips", "Suggestions based on the sample records", `<div class="list"><div class="listitem"><div class="listicon">✦</div><div class="listbody"><b>Protect your attendance</b><p>Salesforce has the lowest sample attendance. Attend upcoming classes consistently.</p></div></div><div class="listitem"><div class="listicon">↗</div><div class="listbody"><b>Build consistency</b><p>Short daily practice sessions can be easier to maintain than last-minute revision.</p></div></div></div>`)}</div>`;
}
function attendance() {
  let low = [...D.subjects].sort((a, b) => a.attendance - b.attendance);
  return `${heading("Attendance", "Review subject-wise attendance and focus on classes that need attention.")}<div class="stats">${stat("Overall attendance", D.student.attendance + "%", "All enrolled subjects", "◷")}${stat("Illustrative target", "75%", "Not an official policy", "◎")}${stat("Subjects below 85%", D.subjects.filter((s) => s.attendance < 85).length, "Consider improving consistency", "!")}${stat("Lowest attendance", low[0].attendance + "%", low[0].name, "↘")}</div><div class="grid2">${panel("Attendance by subject", "Sample percentages", `<div class="bars">${D.subjects.map((s) => `<div><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:7px"><b>${esc(s.name)}</b><span>${s.attendance}%</span></div>${bar(s.attendance, s.attendance < 85 ? "#e99b43" : "#5d5fef")}</div>`).join("")}</div>`)}${panel(
    "Recommended focus",
    "Subjects with lowest sample attendance",
    `<div class="list">${low
      .slice(0, 3)
      .map(
        (s) =>
          `<div class="listitem"><div class="listicon">◷</div><div class="listbody"><b>${esc(s.name)}</b><p>${s.attendance}% attendance · ${esc(s.faculty)}</p></div><span class="badge ${s.attendance < 83 ? "orange" : "blue"}">${s.attendance < 83 ? "Priority" : "Monitor"}</span></div>`,
      )
      .join(
        "",
      )}</div><button class="primary" data-ask style="margin-top:16px">Ask AI for an attendance plan</button>`,
  )}</div><p class="subtitle">Attendance shown here is sample data, not an official university record.</p>`;
}
function results() {
  let avg = Math.round(
    D.subjects.reduce((a, s) => a + s.score, 0) / D.subjects.length,
  );
  return `${heading("Results & Grades", "Understand your performance across the current semester.")}<div class="stats">${stat("CGPA", D.student.cgpa, "Cumulative grade point average", "▥")}${stat("SGPA", D.student.sgpa, "Current semester", "▤")}${stat("Subjects with A/A-", D.subjects.filter((s) => ["A", "A-"].includes(s.grade)).length, "Sample grade distribution", "✦")}${stat("Average assessment", avg + "%", "Illustrative scores", "↗")}</div><div class="grid2">${panel("Subject results", "Sample grades and assessment scores", `<div class="tablewrap"><table class="table"><thead><tr><th>SUBJECT</th><th>SCORE</th><th>GRADE</th><th>CREDITS</th></tr></thead><tbody>${D.subjects.map((s) => `<tr><td><b>${esc(s.name)}</b></td><td>${s.score}%</td><td><span class="badge purplebadge">${s.grade}</span></td><td>${s.credits}</td></tr>`).join("")}</tbody></table></div>`)}${panel("Improve your next result", "Practical next steps", `<div class="list"><div class="listitem"><div class="listicon">1</div><div class="listbody"><b>Identify weak topics</b><p>Use practice questions to find concepts that need revision.</p></div></div><div class="listitem"><div class="listicon">2</div><div class="listbody"><b>Review weekly</b><p>Revisit lecture notes and correct previous mistakes.</p></div></div></div><button class="primary" data-ask style="margin-top:17px">Create study plan with AI</button>`)}</div><p class="subtitle">Grades and scores are illustrative demo data.</p>`;
}
function timetable() {
  return `${heading("Timetable", "Your sample weekly schedule. Use it to organise study time and deadlines.", `<button class="secondary" data-export>↓ Export schedule</button>`)}<div class="grid2">${[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]
    .map((day) =>
      panel(
        day,
        "Scheduled sample classes",
        `<div class="schedule">${
          D.timetable
            .filter((t) => t[0] === day)
            .map(
              (t, i) =>
                `<div class="schedrow"><span class="schedtime">${t[1]}</span><i class="schedline ${i === 0 ? "active" : ""}"></i><div class="schedinfo"><b>${esc(t[2])}</b><p>${esc(t[3])} · ${esc(t[4])}</p></div></div>`,
            )
            .join("") || `<div class="empty">No classes listed.</div>`
        }</div>`,
      ),
    )
    .join("")}</div>`;
}
function placements() {
  return `${heading("Career & Placements", "Track opportunities and build the skills employers ask for.", `<button class="primary" data-ask>✦ Get AI career advice</button>`)}<div class="stats">${stat("Readiness score", D.student.readiness + "%", "Illustrative checklist", "↗")}${stat("Companies tracked", "24", "Demo opportunity pool", "▣")}${stat("Interviews", "3", "Sample count", "◷")}${stat("Highest listed package", "18 LPA", "Illustrative campus statistic", "✦")}</div>${panel("Application tracker", "Example records — not connected to recruiters", applications())}<div class="grid2" style="margin-top:18px">${panel("Recommended next steps", "Based on sample skills", `<div class="list"><div class="listitem"><div class="listicon">⌘</div><div class="listbody"><b>Practise DSA consistently</b><p>Solve focused problems daily and explain the approach before coding.</p></div></div><div class="listitem"><div class="listicon">▤</div><div class="listbody"><b>Revise DBMS and SQL</b><p>Practise joins, grouping, indexes and normalization.</p></div></div><div class="listitem"><div class="listicon">✦</div><div class="listbody"><b>Prepare interview stories</b><p>Explain project decisions, trade-offs and what you learned.</p></div></div></div>`)}${panel(
    "Skills at a glance",
    "Strongest sample skills",
    `<div class="bars">${[...D.skills]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(
        (s) =>
          `<div><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:6px"><span>${esc(s[0])}</span><b>${s[1]}%</b></div>${bar(s[1])}</div>`,
      )
      .join(
        "",
      )}</div><button class="textlink" data-page="skills" style="margin-top:15px">View skills ↗</button>`,
  )}</div>`;
}
function skills() {
  return `${heading("Skills", "Review your profile and identify the next area to practise.")}<div class="grid2">${panel("Skill proficiency", "Self-assessed sample values", D.skills.map((s) => `<div class="skillrow"><span>${esc(s[0])}</span>${bar(s[1])}<b>${s[1]}%</b></div>`).join(""))}${panel("AI skill-gap review", "Compare your skills with a target role", `<p class="muted">Ask Campus AI to compare this sample profile with a role you want and suggest a realistic learning sequence.</p><button class="primary" data-prompt="Review my skill profile and make a four-week improvement plan for a junior software developer role. Prioritise the most important gaps.">✦ Analyse my skill gaps</button><hr style="border:0;border-top:1px solid var(--line);margin:20px 0"><div class="list"><div class="listitem"><div class="listicon">1</div><div class="listbody"><b>Learn</b><p>Choose one concept and take concise notes.</p></div></div><div class="listitem"><div class="listicon">2</div><div class="listbody"><b>Practise</b><p>Build a small feature or solve problems.</p></div></div><div class="listitem"><div class="listicon">3</div><div class="listbody"><b>Review</b><p>Explain what you learned without notes.</p></div></div></div>`)}</div>`;
}
function events() {
  return `${heading("Campus Events", "Explore activities and mark your interest. Selections reset when the page reloads.")}<div class="eventgrid">${D.events
    .map((e) => {
      let d = new Date(e[1] + "T12:00:00"),
        registered = S.registered.has(e[0]);
      return `<article class="card"><div class="cardtop"><div class="datebox"><small>${d.toLocaleString("en", { month: "short" }).toUpperCase()}</small><b>${d.getDate()}</b></div><span class="badge purplebadge">${esc(e[5])}</span></div><h3>${esc(e[0])}</h3><p>${esc(e[4])}</p><div class="cardfoot"><span>◷ ${esc(e[2])}</span><span>⌖ ${esc(e[3])}</span></div><button class="${registered ? "secondary" : "primary"}" data-event="${esc(e[0])}" style="width:100%;margin-top:15px">${registered ? "Interest marked ✓" : "Register interest"}</button></article>`;
    })
    .join(
      "",
    )}</div><p class="subtitle" style="margin-top:16px">This is a frontend demonstration. Event selections are not sent to the university.</p>`;
}
function notices() {
  return `${heading("Notices", "Sample academic announcements, events and placement updates.")}${D.notices.map((n, i) => `<article class="notice"><div class="noticeicon">${["▤", "◷", "✦", "↗"][i]}</div><div style="flex:1"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:7px"><span class="badge ${n[3] === "Deadline" ? "orange" : n[3] === "Placement" ? "blue" : "purplebadge"}">${esc(n[3])}</span><span class="date">${esc(n[2])}</span></div><h3>${esc(n[0])}</h3><p>${esc(n[1])}</p></div></article>`).join("")}<p class="subtitle">Verify real deadlines through official university channels.</p>`;
}
function profile() {
  return `${heading("My Profile", "A snapshot of the student profile used in this demo.")}<div class="profile"><div class="avatar">AS</div><div><h2>${esc(D.student.name)}</h2><p>${esc(D.student.program)} · ${esc(D.student.semester)}</p><span class="badge purplebadge">Student demo profile</span></div></div><div class="details" style="margin-top:15px">${[
    ["Student ID", D.student.id],
    ["Programme", D.student.program],
    ["CGPA", D.student.cgpa],
    ["SGPA", D.student.sgpa],
    ["Attendance", D.student.attendance + "%"],
    ["Placement readiness", D.student.readiness + "%"],
  ]
    .map(
      (a) =>
        `<div class="detail"><small>${a[0]}</small><b>${esc(a[1])}</b></div>`,
    )
    .join(
      "",
    )}</div><div class="panel" style="margin-top:15px"><h3>About this profile</h3><p class="muted">This is a sample student profile for demonstration purposes only.</p></div>`;
}
const renderers = {
  dashboard,
  academics,
  attendance,
  results,
  timetable,
  placements,
  skills,
  events,
  notices,
  profile,
};
function render(page = S.page) {
  S.page = page;
  $("#crumb").textContent = names[page] || "Overview";
  $$(".navitem[data-page]").forEach((b) =>
    b.classList.toggle("active", b.dataset.page === page),
  );
  $("#content").innerHTML = (renderers[page] || dashboard)();
  $("#sidebar").classList.remove("open");
  bindPage();
}
function bindPage() {
  $$("[data-page]").forEach(
    (b) =>
      (b.onclick = (e) => {
        e.preventDefault();
        render(b.dataset.page);
      }),
  );
  $$("[data-ask]").forEach((b) => (b.onclick = openChat));
  $$("[data-export]").forEach((b) => (b.onclick = exportSummary));
  $$("[data-prompt]").forEach(
    (b) =>
      (b.onclick = () => {
        openChat();
        send(b.dataset.prompt);
      }),
  );
  $$("[data-event]").forEach(
    (b) =>
      (b.onclick = () => {
        let n = b.dataset.event;
        S.registered.has(n) ? S.registered.delete(n) : S.registered.add(n);
        toast(
          S.registered.has(n)
            ? `Interest marked for ${n}.`
            : `Removed interest in ${n}.`,
        );
        render("events");
      }),
  );
  $$("[data-task]").forEach(
    (b) =>
      (b.onchange = () => {
        S.tasks[+b.dataset.task][1] = b.checked;
        render("academics");
      }),
  );
  let f = $("#taskForm");
  if (f)
    f.onsubmit = (e) => {
      e.preventDefault();
      let v = $("#taskText").value.trim();
      if (v) {
        S.tasks.push([v, false]);
        render("academics");
        toast("Task added for this session.");
      }
    };
}
function exportSummary() {
  let lines = [
    "Campus360 — Student Summary",
    `Student: ${D.student.name}`,
    `Programme: ${D.student.program}`,
    `Semester: ${D.student.semester}`,
    `CGPA: ${D.student.cgpa}`,
    `SGPA: ${D.student.sgpa}`,
    `Attendance: ${D.student.attendance}%`,
    "",
    "Subjects:",
    ...D.subjects.map(
      (s) => `- ${s.name}: ${s.attendance}% attendance, grade ${s.grade}`,
    ),
    "",
    "NOTE: All records are sample data.",
  ];
  let a = document.createElement("a"),
    url = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/plain" }),
    );
  a.href = url;
  a.download = "campus360-sample-summary.txt";
  a.click();
  URL.revokeObjectURL(url);
  toast("Sample summary exported.");
}

function openChat() {
  $("#chat").classList.add("open");
  $("#chat").setAttribute("aria-hidden", "false");
  $("#hint").hidden = true;
  setTimeout(() => $("#chatInput").focus(), 150);
}
function closeChat() {
  $("#chat").classList.remove("open");
  $("#chat").setAttribute("aria-hidden", "true");
}
function settings() {
  $("#apiKey").value = "";
  $("#model").value = S.model;
  $("#keyError").hidden = true;
  $("#modalShade").classList.add("open");
}
function closeSettings() {
  $("#modalShade").classList.remove("open");
}
function message(role, text) {
  let welcome = $(".welcome"),
    suggestions = $(".suggestions");
  if (welcome) welcome.remove();
  if (suggestions) suggestions.remove();
  let el = document.createElement("div");
  el.className = `message ${role}`;
  el.textContent = text;
  $("#messages").append(el);
  $("#messages").scrollTop = $("#messages").scrollHeight;
  return el;
}
function localAnswer(q) {
  let m = q.toLowerCase(),
    lowest = [...D.subjects].sort((a, b) => a.attendance - b.attendance);
  if (/attendance|bunk|classes/.test(m))
    return `Your overall sample attendance is ${D.student.attendance}%. Lowest is ${lowest[0].name} at ${lowest[0].attendance}%, followed by ${lowest[1].name} at ${lowest[1].attendance}%. The demo target is 75%. These are sample records, not official university data.`;
  if (/cgpa|sgpa|grade|result|marks|score/.test(m))
    return `Your sample CGPA is ${D.student.cgpa} and SGPA is ${D.student.sgpa}. Subjects with sample grades A/A-: ${D.subjects
      .filter((s) => ["A", "A-"].includes(s.grade))
      .map((s) => s.name)
      .join(", ")}. All figures are illustrative.`;
  if (/placement|career|company|job|resume|interview|skill/.test(m))
    return `Your sample placement readiness is ${D.student.readiness}%. Applications: ${D.applications.map((a) => `${a[0]} (${a[3]})`).join(", ")}. Skills to practise further include ${[
      ...D.skills,
    ]
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .map((s) => `${s[0]} ${s[1]}%`)
      .join(", ")}. These records are illustrative.`;
  if (/event|hackathon|campus fest|symposium|upcoming/.test(m))
    return `Sample events: ${D.events.map((e) => `${e[0]} on ${new Date(e[1] + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}, ${e[2]} at ${e[3]}`).join("; ")}. Verify actual campus schedules with official channels.`;
  if (/notice|announcement|deadline|assignment/.test(m))
    return `Latest sample notices: ${D.notices.map((n) => `${n[0]} (${n[2]})`).join("; ")}. Verify real deadlines through official university channels.`;
  if (/timetable|schedule|class|lecture/.test(m))
    return `Sample timetable: ${D.timetable
      .slice(0, 5)
      .map((t) => `${t[0]} ${t[1]} — ${t[2]} (${t[4]})`)
      .join("; ")}. Open Timetable to see the full week.`;
  return "Hi! I’m Campus360 AI. Without an API key I can answer common questions using sample attendance, grades, timetable, notices, events and placement data. Connect a Gemini API key with the ⚙ button for open-ended questions, study plans and career guidance.";
}
async function send(q) {
  q = String(q || "").trim();
  if (!q || S.busy) return;
  $("#chatInput").value = "";
  message("user", q);
  S.history.push({ role: "user", content: q });
  if (!S.key) {
    let a = localAnswer(q);
    message("ai", a);
    S.history.push({ role: "assistant", content: a });
    return;
  }
  S.busy = true;
  $("#sendBtn").disabled = true;
  $("#typing").hidden = false;
  try {
    const systemInstruction = `You are Campus360 AI, a helpful student assistant. This is a frontend-only demonstration with hard-coded SAMPLE data. Never claim access to a university system, live student records, external database or official current notices. Use the supplied JSON as the only source of student-specific facts. If information is absent, say so. Do not claim event registrations, assignments or applications were sent to a real university. Help with study planning, explaining concepts, interpreting sample data and career preparation. Current page: ${S.page}. Current sample campus data: ${JSON.stringify(D)}. Session tasks: ${JSON.stringify(S.tasks)}. Session event interests: ${JSON.stringify([...S.registered])}.`;
    const contents = S.history
      .slice(-12)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(S.model || "gemini-3.8-flash")}:generateContent`;
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": S.key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 700 },
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      const apiMessage =
        data?.error?.message || `Request failed (${r.status}).`;
      let hint =
        "Check the Gemini API key, model, free-tier quota and internet connection.";
      if (r.status === 400) hint = "Check the API key and request format.";
      if (r.status === 401 || r.status === 403)
        hint =
          "The Gemini API key may be invalid, restricted, or not permitted to use this API.";
      if (r.status === 404)
        hint =
          "The selected model ID may not be available. Try gemini-3.8-flash or verify available models in Google AI Studio.";
      if (r.status === 429)
        hint =
          "The free-tier request/token limit may have been reached. Check quota in Google AI Studio and try again later.";
      throw new Error(`${apiMessage} ${hint}`);
    }
    const a = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();
    if (!a)
      throw new Error(
        "Gemini returned no text. The response may have been blocked or the model may be temporarily unavailable.",
      );
    message("ai", a);
    S.history.push({ role: "assistant", content: a });
  } catch (e) {
    message(
      "system",
      `AI connection problem: ${e.message} Built-in sample-data answers still work.`,
    );
  } finally {
    S.busy = false;
    $("#sendBtn").disabled = false;
    $("#typing").hidden = true;
    $("#messages").scrollTop = $("#messages").scrollHeight;
  }
}
$("#launcher").onclick = () =>
  $("#chat").classList.contains("open") ? closeChat() : openChat();
$("#sideAI").onclick = openChat;
$("#closeChat").onclick = closeChat;
$("#settingsBtn").onclick = settings;
$("#connectBtn").onclick = settings;
$("#xclose").onclick = closeSettings;
$("#cancelKey").onclick = closeSettings;
$("#modalShade").onclick = (e) => {
  if (e.target === $("#modalShade")) closeSettings();
};
$("#saveKey").onclick = () => {
  let k = $("#apiKey").value.trim(),
    model = $("#model").value.trim() || "gemini-3.8-flash";
  if (!k) {
    $("#keyError").textContent = "Paste your Gemini API key first.";
    $("#keyError").hidden = false;
    return;
  }
  S.key = k;
  S.model = model;
  closeSettings();
  $("#keyNotice").hidden = true;
  toast("AI key active in memory for this tab.");
  message(
    "system",
    `AI connected using ${model}. The key is not saved; reload clears it.`,
  );
};
$("#chatForm").onsubmit = (e) => {
  e.preventDefault();
  send($("#chatInput").value);
};
$("#chatInput").onkeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    $("#chatForm").requestSubmit();
  }
};
$("#chatInput").oninput = () => {
  $("#chatInput").style.height = "auto";
  $("#chatInput").style.height =
    Math.min($("#chatInput").scrollHeight, 95) + "px";
};
$("#clearChat").onclick = () => {
  S.history = [];
  $("#messages").innerHTML =
    `<div class="welcome"><div class="welcomespark">✦</div><p class="eyebrow">YOUR CAMPUS COPILOT</p><h3>Let's start fresh.</h3><p>Ask about sample campus data, studying or career preparation.</p></div><div class="suggestions"><button data-prompt="Analyse my attendance and tell me which subject needs the most attention.">Check my attendance ↗</button><button data-prompt="Create a realistic 7-day study plan based on my subjects and skills.">Build a study plan ↗</button><button data-prompt="Review my placement readiness and suggest the top three things to improve.">Improve placement readiness ↗</button><button data-prompt="Summarise the upcoming campus events and latest notices.">Campus updates ↗</button></div>`;
  $$("[data-prompt]").forEach(
    (b) => (b.onclick = () => send(b.dataset.prompt)),
  );
};
$("#menuBtn").onclick = () => $("#sidebar").classList.toggle("open");
$("#noticeBtn").onclick = () => {
  render("notices");
  toast("Showing sample campus notices.");
};
$("#search").onkeydown = (e) => {
  if (e.key === "Enter") {
    let q = e.target.value.trim().toLowerCase();
    if (!q) return;
    let found = Object.entries(names).find(
      ([k, v]) => k.includes(q) || v.toLowerCase().includes(q),
    );
    if (found) render(found[0]);
    else {
      openChat();
      send("Help me find information about: " + e.target.value.trim());
    }
  }
};
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    $("#search").focus();
  }
  if (e.key === "Escape") {
    closeChat();
    closeSettings();
    $("#sidebar").classList.remove("open");
  }
});
render("dashboard");
