/* ==========================================================================
   Taj Gurukul - Hybrid Offline/Online Admin Panel Dashboard Controller
   ========================================================================== */

const isBackendActive = window.location.protocol.startsWith('http') && !window.location.search.includes('offline=true');
const ADMIN_PASSWORD = "admin@tajgurukul";

// Default Mock Data for Offline fallbacks
const DEFAULT_COURSES = [
  {
    id: "course_1",
    name: "NEET (UG) - Medical Preparation",
    category: "neet",
    badge: "NEET",
    desc: "Complete Medical Entrance preparation focusing on Biology, Chemistry, and Physics concept mastery.",
    features: ["Physics & Chemistry drills", "Detailed Biology visualization", "All India Test Series mapping"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "course_2",
    name: "IIT-JEE (Main & Advanced)",
    category: "jee",
    badge: "IIT-JEE",
    desc: "Comprehensive engineering entrance preparation designed to crack advanced level concepts.",
    features: ["Advanced Mathematics modules", "Concept-based Physics sheets", "Organic & Physical chemistry tricks"],
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "course_3",
    name: "MHT-CET State Entrance Prep",
    category: "cet",
    badge: "MHT-CET",
    desc: "Rigorous state level entrance course specializing in speed, recall and board exams synergy.",
    features: ["Speed calculation worksheets", "Full-length CET Mock Tests", "Formula sheet memory packs"],
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "course_4",
    name: "NDA Foundation - Defence Entry",
    category: "nda",
    badge: "Defence",
    desc: "Dual curriculum targeting both UPSC written exams and physical-interview guidance.",
    features: ["General Ability paper tutoring", "English language bootcamps", "UPSC Mathematics shortcut keys"],
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "course_5",
    name: "Foundation Courses (8th-10th)",
    category: "foundation",
    badge: "School Foundation",
    desc: "Strong foundational learning for CBSE & State Boards, Olympiads, and early competitive prep.",
    features: ["NTSE & Olympiad modules", "Board exam mock papers", "Critical-thinking puzzle labs"],
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  "🔥 Admissions Open for NEET, JEE & NDA Batches 2026-27! Register for Scholarship Tests up to 50% off.",
  "✨ Book a Free Career Counselling 1-on-1 mentorship session with our expert directors this week.",
  "🏆 Congratulating our board toppers on amazing academic scores!"
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "test_1",
    name: "Rahul Meshram",
    role: "JEE Main Selected Aspirant",
    stars: 5,
    text: "Taj Gurukul provided an amazing platform. The small batch sizes meant that the Physics teachers noticed my mistakes instantly. Mock test analysis helped me improve my pacing."
  },
  {
    id: "test_2",
    name: "Dr. Sandeep Deshmukh",
    role: "Parent of NEET Batch Student",
    stars: 5,
    text: "Extremely pleased with the personal tracking system. The directors themselves updated us about our child's test scores, conceptual gaps, and emotional well-being regularly. Very professional."
  },
  {
    id: "test_3",
    name: "Alok Dwivedi",
    role: "NDA Merit Selected Cadet",
    stars: 5,
    text: "The combination of basic mathematics clearing with general knowledge practice was excellent. Taj Gurukul's environment is highly motivated and competitive."
  }
];

const DEFAULT_GALLERY = [
  { id: "gal_1", category: "classroom", title: "Smart Screen Classroom Sessions", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
  { id: "gal_2", category: "seminars", title: "1-on-1 Student Career Counsel Session", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" },
  { id: "gal_3", category: "events", title: "Parent Teacher Review Assembly", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" },
  { id: "gal_4", category: "achievements", title: "Felicitation Ceremony of Selected Candidates", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" },
  { id: "gal_5", category: "classroom", title: "Interactive Doubt Solving Core Groups", url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80" },
  { id: "gal_6", category: "events", title: "Cultural Meet & Independence Day", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" }
];

const DEFAULT_FACULTY = [
  {
    id: "fac_1",
    name: "Prof. Amit Mishra",
    role: "Physics Expert",
    qual: "M.Tech (VNIT Nagpur) | 8+ Years Exp.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac_2",
    name: "Prof. Rajesh Patil",
    role: "Mathematics Mentor",
    qual: "B.Tech (IIT Bombay) | 12+ Years Exp.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac_3",
    name: "Dr. Shalini Sharma",
    role: "Biology & Chemistry Head",
    qual: "Ph.D. in Organic Chemistry | 10+ Years Exp.",
    img: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=600&q=80"
  }
];

// Offline LocalStorage Database initializer
function dbInitOffline() {
  if (!localStorage.getItem("tg_courses")) {
    localStorage.setItem("tg_courses", JSON.stringify(DEFAULT_COURSES));
  }
  if (!localStorage.getItem("tg_faculty")) {
    localStorage.setItem("tg_faculty", JSON.stringify(DEFAULT_FACULTY));
  }
  if (!localStorage.getItem("tg_announcements")) {
    localStorage.setItem("tg_announcements", JSON.stringify(DEFAULT_ANNOUNCEMENTS));
  }
  if (!localStorage.getItem("tg_testimonials")) {
    localStorage.setItem("tg_testimonials", JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem("tg_gallery")) {
    localStorage.setItem("tg_gallery", JSON.stringify(DEFAULT_GALLERY));
  }
  if (!localStorage.getItem("tg_leads")) {
    localStorage.setItem("tg_leads", JSON.stringify([]));
  }
}

// 1. Authentication Gate
async function checkAuth() {
  const loginOverlay = document.getElementById("loginOverlay");
  
  if (isBackendActive) {
    const adminKey = sessionStorage.getItem("tg_admin_key") || "";
    if (!adminKey) {
      if (loginOverlay) loginOverlay.classList.remove("hidden");
      return;
    }
    
    // Test API connection
    try {
      const res = await fetch('/api/leads', { headers: { 'x-admin-password': adminKey } });
      if (res.status === 401) {
        sessionStorage.removeItem("tg_admin_key");
        if (loginOverlay) loginOverlay.classList.remove("hidden");
      } else {
        if (loginOverlay) loginOverlay.classList.add("hidden");
        initDashboard();
      }
    } catch (err) {
      console.error("Backend Server offline:", err);
      alert("Backend Server Error. Verify that the server is running on localhost.");
    }
  } else {
    // Offline mode auth check
    dbInitOffline();
    const isLogged = sessionStorage.getItem("tg_logged_in");
    if (isLogged === "true") {
      if (loginOverlay) loginOverlay.classList.add("hidden");
      initDashboard();
    } else {
      if (loginOverlay) loginOverlay.classList.remove("hidden");
    }
  }
}

// Login form submit
const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const enteredPass = document.getElementById("adminPassword").value;
    const errorMsg = document.getElementById("loginErrorMsg");
    
    if (isBackendActive) {
      try {
        const res = await fetch('/api/leads', { headers: { 'x-admin-password': enteredPass } });
        if (res.ok) {
          sessionStorage.setItem("tg_admin_key", enteredPass);
          if (errorMsg) errorMsg.style.display = "none";
          const loginOverlay = document.getElementById("loginOverlay");
          if (loginOverlay) loginOverlay.classList.add("hidden");
          document.getElementById("adminPassword").value = "";
          initDashboard();
        } else {
          if (errorMsg) errorMsg.style.display = "block";
        }
      } catch (err) {
        alert("Failed to connect to backend server.");
      }
    } else {
      // Offline password comparison
      if (enteredPass === ADMIN_PASSWORD) {
        sessionStorage.setItem("tg_logged_in", "true");
        if (errorMsg) errorMsg.style.display = "none";
        const loginOverlay = document.getElementById("loginOverlay");
        if (loginOverlay) loginOverlay.classList.add("hidden");
        document.getElementById("adminPassword").value = "";
        initDashboard();
      } else {
        if (errorMsg) errorMsg.style.display = "block";
      }
    }
  });
}

// Logout btn
const logoutBtn = document.getElementById("adminLogoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("tg_admin_key");
      sessionStorage.removeItem("tg_logged_in");
      checkAuth();
    }
  });
}

// ==========================================================================
// 2. Tab Navigation
// ==========================================================================
const TAB_DETAILS = {
  analytics: { title: "Dashboard Overview", desc: "Real-time statistics, conversion analysis, and content directories." },
  enquiries: { title: "Course Admission Enquiries", desc: "View and manage course admission leads." },
  counselling: { title: "Counselling Requests", desc: "Track students requesting 1-on-1 career counselling mentorship." },
  courses: { title: "Manage Academic Courses", desc: "Add, review, or delete active JEE, NEET, MHT-CET, and NDA courses." },
  testimonials: { title: "Manage Student Testimonials", desc: "Update student success reviews in the homepage slider." },
  gallery: { title: "Manage Campus Gallery", desc: "Link classroom, seminar, events, and student achievement photos." },
  announcements: { title: "Announcements Marquee", desc: "Publish and update floating ticker notifications visible to site visitors." },
  faculty: { title: "Manage Campus Faculty", desc: "Add, review, or delete active faculty members." }
};

function initTabNavigation() {
  const navItems = document.querySelectorAll(".admin-nav-item");
  const sections = document.querySelectorAll(".admin-section");
  const headerTitle = document.getElementById("currentTabTitle");
  const headerDesc = document.getElementById("currentTabDesc");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
      
      const tabId = item.getAttribute("data-tab");
      sections.forEach(s => s.classList.remove("active"));
      
      const targetSec = document.getElementById(`tab-${tabId}`);
      if (targetSec) targetSec.classList.add("active");
      
      if (headerTitle && headerDesc && TAB_DETAILS[tabId]) {
        headerTitle.innerText = TAB_DETAILS[tabId].title;
        headerDesc.innerText = TAB_DETAILS[tabId].desc;
      }
      
      refreshTabContent(tabId);
    });
  });
}

function refreshTabContent(tabId) {
  if (tabId === "analytics") {
    renderAnalyticsDashboard();
  } else if (tabId === "enquiries") {
    renderLeadsTable("enquiry");
  } else if (tabId === "counselling") {
    renderLeadsTable("counselling");
  } else if (tabId === "courses") {
    renderCoursesTable();
  } else if (tabId === "testimonials") {
    renderTestimonialsTable();
  } else if (tabId === "gallery") {
    renderGalleryTable();
  } else if (tabId === "announcements") {
    renderAnnouncementsTable();
  } else if (tabId === "faculty") {
    renderFacultyTable();
  }
}

// ==========================================================================
// 3. API Fetch Helper with Offline Fallbacks
// ==========================================================================
async function getLeadsList() {
  if (isBackendActive) {
    const key = sessionStorage.getItem("tg_admin_key");
    const res = await fetch('/api/leads', { headers: { 'x-admin-password': key } });
    if (res.status === 401) return handleSessionExpiry();
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_leads")) || [];
  }
}

async function getCoursesList() {
  if (isBackendActive) {
    const res = await fetch('/api/courses');
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_courses")) || [];
  }
}

async function getTestimonialsList() {
  if (isBackendActive) {
    const res = await fetch('/api/testimonials');
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_testimonials")) || [];
  }
}

async function getGalleryList() {
  if (isBackendActive) {
    const res = await fetch('/api/gallery');
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_gallery")) || [];
  }
}

async function getAnnouncementsList() {
  if (isBackendActive) {
    const res = await fetch('/api/announcements');
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_announcements")) || [];
  }
}

async function getFacultyList() {
  if (isBackendActive) {
    const res = await fetch('/api/faculty');
    return await res.json();
  } else {
    return JSON.parse(localStorage.getItem("tg_faculty")) || [];
  }
}

function handleSessionExpiry() {
  alert("Session expired. Logging out.");
  sessionStorage.removeItem("tg_admin_key");
  checkAuth();
  return [];
}

// ==========================================================================
// 4. Analytics Board Calculations
// ==========================================================================
async function renderAnalyticsDashboard() {
  try {
    const leadsList = await getLeadsList();
    const coursesList = await getCoursesList();
    const testimonialsList = await getTestimonialsList();
    const galleryList = await getGalleryList();
    const announcementsList = await getAnnouncementsList();
    const facultyList = await getFacultyList();
    
    const enquiries = leadsList.filter(l => l.type === "enquiry");
    const counselling = leadsList.filter(l => l.type === "counselling");
    const enrolled = leadsList.filter(l => l.status === "Enrolled");
    
    document.getElementById("countEnquiries").innerText = enquiries.length;
    document.getElementById("countCounselling").innerText = counselling.length;
    document.getElementById("countEnrolled").innerText = enrolled.length;
    
    if (leadsList.length === 0) {
      document.getElementById("conversionRate").innerText = "0%";
    } else {
      const percentage = Math.round((enrolled.length / leadsList.length) * 100);
      document.getElementById("conversionRate").innerText = percentage + "%";
    }
    
    document.getElementById("cardActiveCourses").innerText = coursesList.length;
    document.getElementById("cardActiveReviews").innerText = testimonialsList.length;
    document.getElementById("cardActivePhotos").innerText = galleryList.length;
    document.getElementById("cardActiveAnnouncements").innerText = announcementsList.length;
    
    const cardActiveFaculty = document.getElementById("cardActiveFaculty");
    if (cardActiveFaculty) {
      cardActiveFaculty.innerText = facultyList.length;
    }
    
    // Funnel Update
    const statusCounts = { New: 0, Contacted: 0, Enrolled: 0, Archived: 0 };
    leadsList.forEach(l => {
      if (statusCounts[l.status] !== undefined) statusCounts[l.status]++;
    });
    
    const totalLeads = leadsList.length || 1;
    document.getElementById("valNew").innerText = statusCounts.New;
    document.getElementById("valContacted").innerText = statusCounts.Contacted;
    document.getElementById("valEnrolled").innerText = statusCounts.Enrolled;
    document.getElementById("valArchived").innerText = statusCounts.Archived;
    
    document.getElementById("barNew").style.width = (statusCounts.New / totalLeads * 100) + "%";
    document.getElementById("barContacted").style.width = (statusCounts.Contacted / totalLeads * 100) + "%";
    document.getElementById("barEnrolled").style.width = (statusCounts.Enrolled / totalLeads * 100) + "%";
    document.getElementById("barArchived").style.width = (statusCounts.Archived / totalLeads * 100) + "%";
    
  } catch (err) {
    console.error(err);
  }
}

// ==========================================================================
// 5. Leads Table Rendering & Status Modifiers
// ==========================================================================
async function renderLeadsTable(typeFilter) {
  const tableId = typeFilter === "enquiry" ? "enquiriesTable" : "counsellingTable";
  const filterSelect = document.getElementById(`${typeFilter}StatusFilter`);
  const tbody = document.querySelector(`#${tableId} tbody`);
  
  if (!tbody || !filterSelect) return;
  
  try {
    let leads = await getLeadsList();
    const statusFilter = filterSelect.value;
    
    leads = leads.filter(l => l.type === typeFilter);
    if (statusFilter !== "all") {
      leads = leads.filter(l => l.status === statusFilter);
    }
    
    if (leads.length === 0) {
      const colSpan = typeFilter === "enquiry" ? 6 : 7;
      tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align: center; color: var(--text-light); padding: 30px;">No leads found.</td></tr>`;
      return;
    }
    
    leads.sort((a, b) => b.id.split("_")[1] - a.id.split("_")[1]);
    
    let html = "";
    leads.forEach(l => {
      const statusOptions = ["New", "Contacted", "Enrolled", "Archived"].map(st => {
        return `<option value="${st}" ${l.status === st ? 'selected' : ''}>${st}</option>`;
      }).join("");
      
      const targetQuery = typeFilter === "enquiry" ? l.course : l.exam;
      const whatsAppMessage = `Hello ${l.name}, this is Taj Gurukul Kamptee Nagpur. We received your request regarding ${targetQuery} preparation guidance. How can we assist you today?`;
      const encodedMsg = encodeURIComponent(whatsAppMessage);
      
      if (typeFilter === "enquiry") {
        html += `
          <tr>
            <td><strong>${l.name}</strong></td>
            <td><a href="tel:${l.phone}">${l.phone}</a></td>
            <td><span class="badge badge-archived" style="background-color:rgba(15, 41, 82, 0.1); color: var(--primary-navy);">${l.course}</span></td>
            <td>${l.date}</td>
            <td>
              <select class="filter-select" onchange="updateLeadStatus('${l.id}', this.value, 'enquiry')" style="border-color: var(--accent-gold-bright);">
                ${statusOptions}
              </select>
            </td>
            <td>
              <div class="action-btns">
                <a href="https://wa.me/91${l.phone}?text=${encodedMsg}" target="_blank" class="action-btn btn-whatsapp-action" title="WhatsApp Lead"><i class="fa-brands fa-whatsapp"></i></a>
                <button onclick="deleteLead('${l.id}', 'enquiry')" class="action-btn btn-delete" title="Delete Lead"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `;
      } else {
        html += `
          <tr>
            <td><strong>${l.name}</strong></td>
            <td><a href="tel:${l.phone}">${l.phone}</a></td>
            <td>${l.class}</td>
            <td><span class="badge badge-archived" style="background-color:rgba(15, 41, 82, 0.1); color: var(--primary-navy);">${l.exam}</span></td>
            <td>${l.date}</td>
            <td>
              <select class="filter-select" onchange="updateLeadStatus('${l.id}', this.value, 'counselling')" style="border-color: var(--accent-gold-bright);">
                ${statusOptions}
              </select>
            </td>
            <td>
              <div class="action-btns">
                <a href="https://wa.me/91${l.phone}?text=${encodedMsg}" target="_blank" class="action-btn btn-whatsapp-action" title="WhatsApp Lead"><i class="fa-brands fa-whatsapp"></i></a>
                <button onclick="deleteLead('${l.id}', 'counselling')" class="action-btn btn-delete" title="Delete Lead"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `;
      }
    });
    tbody.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

window.updateLeadStatus = async function(leadId, newStatus, tabType) {
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) renderLeadsTable(tabType);
    } catch (err) {
      alert("Failed to update status.");
    }
  } else {
    // Offline status update
    const leads = JSON.parse(localStorage.getItem("tg_leads")) || [];
    const idx = leads.findIndex(l => l.id === leadId);
    if (idx !== -1) {
      leads[idx].status = newStatus;
      localStorage.setItem("tg_leads", JSON.stringify(leads));
      renderLeadsTable(tabType);
    }
  }
};

window.deleteLead = async function(leadId, tabType) {
  if (!confirm("Delete this lead?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderLeadsTable(tabType);
    } catch (err) {
      alert("Delete failed.");
    }
  } else {
    // Offline lead deletion
    let leads = JSON.parse(localStorage.getItem("tg_leads")) || [];
    leads = leads.filter(l => l.id !== leadId);
    localStorage.setItem("tg_leads", JSON.stringify(leads));
    renderLeadsTable(tabType);
  }
};

function initLeadsFilters() {
  const enqFilter = document.getElementById("enquiryStatusFilter");
  const counsFilter = document.getElementById("counsellingStatusFilter");
  if (enqFilter) enqFilter.addEventListener("change", () => renderLeadsTable("enquiry"));
  if (counsFilter) counsFilter.addEventListener("change", () => renderLeadsTable("counselling"));
}

// ==========================================================================
// 6. Course CMS Operations
// ==========================================================================
async function renderCoursesTable() {
  const tbody = document.querySelector("#adminCoursesTable tbody");
  if (!tbody) return;
  
  try {
    const courses = await getCoursesList();
    if (courses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-light); padding: 30px;">No courses listed.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = courses.map(c => `
      <tr>
        <td><img src="${c.img}" alt="Preview" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);"></td>
        <td><strong>${c.name}</strong></td>
        <td><span class="badge badge-new" style="background-color:rgba(220,38,38,0.1); color:var(--accent-gold-bright);">${c.category.toUpperCase()}</span></td>
        <td><span class="badge badge-archived" style="background-color:rgba(15, 41, 82, 0.1); color: var(--primary-navy);">${c.badge}</span></td>
        <td>
          <button onclick="deleteCourse('${c.id}')" class="action-btn btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

const addCourseForm = document.getElementById("addCourseForm");
if (addCourseForm) {
  addCourseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("newCourseName").value.trim();
    const cat = document.getElementById("newCourseCategory").value;
    const badge = document.getElementById("newCourseBadge").value.trim();
    const img = document.getElementById("newCourseImg").value.trim();
    const desc = document.getElementById("newCourseDesc").value.trim();
    const feat1 = document.getElementById("newCourseFeat1").value.trim();
    const feat2 = document.getElementById("newCourseFeat2").value.trim();
    
    const features = [feat1];
    if (feat2) features.push(feat2);
    
    if (isBackendActive) {
      try {
        const key = sessionStorage.getItem("tg_admin_key");
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
          body: JSON.stringify({ name, category: cat, badge, desc, img, features })
        });
        if (res.ok) {
          alert("Course added successfully!");
          addCourseForm.reset();
          renderCoursesTable();
        }
      } catch (err) {
        alert("Failed to submit.");
      }
    } else {
      // Offline Course Addition
      const courses = JSON.parse(localStorage.getItem("tg_courses")) || [];
      courses.push({ id: "course_" + Date.now(), name, category: cat, badge, desc, features, img });
      localStorage.setItem("tg_courses", JSON.stringify(courses));
      alert("New course listing saved to local storage!");
      addCourseForm.reset();
      renderCoursesTable();
    }
  });
}

window.deleteCourse = async function(id) {
  if (!confirm("Remove this course?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderCoursesTable();
    } catch (err) {
      alert("Failed to delete.");
    }
  } else {
    // Offline course deletion
    let courses = JSON.parse(localStorage.getItem("tg_courses")) || [];
    courses = courses.filter(c => c.id !== id);
    localStorage.setItem("tg_courses", JSON.stringify(courses));
    renderCoursesTable();
  }
};

// ==========================================================================
// 7. Testimonials CMS Operations
// ==========================================================================
async function renderTestimonialsTable() {
  const tbody = document.querySelector("#adminTestimonialsTable tbody");
  if (!tbody) return;
  
  try {
    const list = await getTestimonialsList();
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-light); padding: 30px;">No reviews found.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = list.map(t => {
      const snippet = t.text.length > 55 ? t.text.substring(0, 55) + "..." : t.text;
      return `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td>${t.role}</td>
          <td style="color:var(--accent-gold-bright); font-weight:700;">${t.stars} ★</td>
          <td style="font-style: italic; color: var(--text-light);">"${snippet}"</td>
          <td>
            <button onclick="deleteTestimonial('${t.id}')" class="action-btn btn-delete"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join("");
  } catch (err) {
    console.error(err);
  }
}

const addTestForm = document.getElementById("addTestimonialForm");
if (addTestForm) {
  addTestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("newTestName").value.trim();
    const role = document.getElementById("newTestRole").value.trim();
    const stars = parseInt(document.getElementById("newTestStars").value, 10);
    const text = document.getElementById("newTestText").value.trim();
    
    if (isBackendActive) {
      try {
        const key = sessionStorage.getItem("tg_admin_key");
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
          body: JSON.stringify({ name, role, stars, text })
        });
        if (res.ok) {
          alert("Testimonial review added!");
          addTestForm.reset();
          renderTestimonialsTable();
        }
      } catch (err) {
        alert("Failed to submit review.");
      }
    } else {
      // Offline Testimonial Addition
      const list = JSON.parse(localStorage.getItem("tg_testimonials")) || [];
      list.push({ id: "test_" + Date.now(), name, role, stars, text });
      localStorage.setItem("tg_testimonials", JSON.stringify(list));
      alert("New review feedback saved to local storage!");
      addTestForm.reset();
      renderTestimonialsTable();
    }
  });
}

window.deleteTestimonial = async function(id) {
  if (!confirm("Delete testimonial?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderTestimonialsTable();
    } catch (err) {
      alert("Delete failed.");
    }
  } else {
    // Offline testimonial deletion
    let list = JSON.parse(localStorage.getItem("tg_testimonials")) || [];
    list = list.filter(t => t.id !== id);
    localStorage.setItem("tg_testimonials", JSON.stringify(list));
    renderTestimonialsTable();
  }
};

// ==========================================================================
// 8. Gallery CMS Operations
// ==========================================================================
async function renderGalleryTable() {
  const tbody = document.querySelector("#adminGalleryTable tbody");
  if (!tbody) return;
  
  try {
    const images = await getGalleryList();
    if (images.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-light); padding: 30px;">Gallery is empty.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = images.map(g => `
      <tr>
        <td><img src="${g.url}" alt="Preview" style="width: 50px; height: 38px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);"></td>
        <td><strong>${g.title}</strong></td>
        <td><span class="badge badge-archived" style="background-color:rgba(15, 41, 82, 0.1); color: var(--primary-navy);">${g.category}</span></td>
        <td>
          <button onclick="deleteGalleryImage('${g.id}')" class="action-btn btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

const addGalForm = document.getElementById("addGalleryForm");
if (addGalForm) {
  addGalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newGalTitle").value.trim();
    const cat = document.getElementById("newGalGroup").value;
    const url = document.getElementById("newGalUrl").value.trim();
    
    if (isBackendActive) {
      try {
        const key = sessionStorage.getItem("tg_admin_key");
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
          body: JSON.stringify({ title, category: cat, url })
        });
        if (res.ok) {
          alert("Gallery photo linked!");
          addGalForm.reset();
          renderGalleryTable();
        }
      } catch (err) {
        alert("Failed to submit.");
      }
    } else {
      // Offline Gallery Addition
      const images = JSON.parse(localStorage.getItem("tg_gallery")) || [];
      images.push({ id: "gal_" + Date.now(), title, category: cat, url });
      localStorage.setItem("tg_gallery", JSON.stringify(images));
      alert("New photo linked to local storage!");
      addGalForm.reset();
      renderGalleryTable();
    }
  });
}

window.deleteGalleryImage = async function(id) {
  if (!confirm("Delete photo?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderGalleryTable();
    } catch (err) {
      alert("Delete failed.");
    }
  } else {
    // Offline gallery deletion
    let images = JSON.parse(localStorage.getItem("tg_gallery")) || [];
    images = images.filter(g => g.id !== id);
    localStorage.setItem("tg_gallery", JSON.stringify(images));
    renderGalleryTable();
  }
};

// ==========================================================================
// 9. Announcements CMS Operations
// ==========================================================================
async function renderAnnouncementsTable() {
  const tbody = document.querySelector("#adminAnnouncementsTable tbody");
  if (!tbody) return;
  
  try {
    const marquee = await getAnnouncementsList();
    if (marquee.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: var(--text-light); padding: 30px;">No ticker notifications active.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = marquee.map((text, i) => `
      <tr>
        <td style="font-weight: 500;">${text}</td>
        <td>
          <button onclick="deleteAnnouncement(${i})" class="action-btn btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

const addAnnounceForm = document.getElementById("addAnnouncementForm");
if (addAnnounceForm) {
  addAnnounceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = document.getElementById("newAnnounceText").value.trim();
    
    if (isBackendActive) {
      try {
        const key = sessionStorage.getItem("tg_admin_key");
        const res = await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
          body: JSON.stringify({ text })
        });
        if (res.ok) {
          alert("Ticker notification published!");
          addAnnounceForm.reset();
          renderAnnouncementsTable();
        }
      } catch (err) {
        alert("Failed to publish ticker.");
      }
    } else {
      // Offline Ticker Addition
      const marquee = JSON.parse(localStorage.getItem("tg_announcements")) || [];
      marquee.push(text);
      localStorage.setItem("tg_announcements", JSON.stringify(marquee));
      alert("New marquee headline saved to local storage!");
      addAnnounceForm.reset();
      renderAnnouncementsTable();
    }
  });
}

window.deleteAnnouncement = async function(index) {
  if (!confirm("Delete announcement headline?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/announcements/${index}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderAnnouncementsTable();
    } catch (err) {
      alert("Delete failed.");
    }
  } else {
    // Offline ticker deletion
    const marquee = JSON.parse(localStorage.getItem("tg_announcements")) || [];
    marquee.splice(index, 1);
    localStorage.setItem("tg_announcements", JSON.stringify(marquee));
    renderAnnouncementsTable();
  }
};

// ==========================================================================
// 9b. Faculty CMS Operations
// ==========================================================================
async function renderFacultyTable() {
  const tbody = document.querySelector("#adminFacultyTable tbody");
  if (!tbody) return;
  
  try {
    const faculty = await getFacultyList();
    if (faculty.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted); padding: 30px;">No faculty members linked.</td></tr>`;
      return;
    }
    
    tbody.innerHTML = faculty.map(f => `
      <tr>
        <td><img src="${f.img}" alt="Preview" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--admin-border);"></td>
        <td><strong>${f.name}</strong></td>
        <td><span class="badge badge-archived" style="background-color:rgba(15, 41, 82, 0.1); color: var(--admin-primary);">${f.role}</span></td>
        <td>${f.qual}</td>
        <td>
          <button onclick="deleteFaculty('${f.id}')" class="action-btn btn-delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error(err);
  }
}

const addFacultyForm = document.getElementById("addFacultyForm");
if (addFacultyForm) {
  addFacultyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("newFacName").value.trim();
    const role = document.getElementById("newFacRole").value.trim();
    const qual = document.getElementById("newFacQual").value.trim();
    const img = document.getElementById("newFacImg").value.trim();
    
    if (isBackendActive) {
      try {
        const key = sessionStorage.getItem("tg_admin_key");
        const res = await fetch('/api/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': key },
          body: JSON.stringify({ name, role, qual, img })
        });
        if (res.ok) {
          alert("Faculty member added!");
          addFacultyForm.reset();
          renderFacultyTable();
        }
      } catch (err) {
        alert("Failed to submit.");
      }
    } else {
      // Offline Faculty Addition
      const list = JSON.parse(localStorage.getItem("tg_faculty")) || [];
      list.push({ id: "fac_" + Date.now(), name, role, qual, img });
      localStorage.setItem("tg_faculty", JSON.stringify(list));
      alert("Faculty member saved to local storage!");
      addFacultyForm.reset();
      renderFacultyTable();
    }
  });
}

window.deleteFaculty = async function(id) {
  if (!confirm("Remove this faculty member?")) return;
  if (isBackendActive) {
    try {
      const key = sessionStorage.getItem("tg_admin_key");
      const res = await fetch(`/api/faculty/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': key }
      });
      if (res.ok) renderFacultyTable();
    } catch (err) {
      alert("Delete failed.");
    }
  } else {
    // Offline deletion
    let list = JSON.parse(localStorage.getItem("tg_faculty")) || [];
    list = list.filter(f => f.id !== id);
    localStorage.setItem("tg_faculty", JSON.stringify(list));
    renderFacultyTable();
  }
};

// ==========================================================================
// 10. Dashboard Initializer
// ==========================================================================
function initDashboard() {
  initTabNavigation();
  initLeadsFilters();
  renderAnalyticsDashboard();
  
  const statusEl = document.getElementById("adminServerStatus");
  if (statusEl) {
    if (isBackendActive) {
      statusEl.innerText = "Status: Server Active (API)";
      statusEl.style.color = "var(--admin-success)";
    } else {
      statusEl.innerText = "Status: Local Storage Mode";
      statusEl.style.color = "var(--admin-warning)";
    }
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);
