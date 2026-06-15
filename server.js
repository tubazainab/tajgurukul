const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Initial Default Mock Data Schema
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

const DB_FILE = path.join(__dirname, 'data.json');

// 2. Database Read/Write Utility Helpers
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        courses: DEFAULT_COURSES,
        faculty: DEFAULT_FACULTY,
        announcements: DEFAULT_ANNOUNCEMENTS,
        testimonials: DEFAULT_TESTIMONIALS,
        gallery: DEFAULT_GALLERY,
        leads: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
      return initialDb;
    }
    const rawData = fs.readFileSync(DB_FILE, 'utf8');
    const db = JSON.parse(rawData);
    // Schema migration for faculty
    if (!db.faculty) {
      db.faculty = DEFAULT_FACULTY;
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    }
    return db;
  } catch (err) {
    console.error("Error reading database file, resetting data.json:", err);
    return { courses: [], faculty: [], announcements: [], testimonials: [], gallery: [], leads: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing to database file:", err);
    return false;
  }
}

// 3. Middlewares
app.use(express.json());
app.use(express.static(__dirname)); // Serve website static assets

// Security Gate middleware for administrative REST queries
const ADMIN_PASSWORD = "admin@tajgurukul";
function verifyAdmin(req, res, next) {
  const reqPassword = req.headers['x-admin-password'];
  if (reqPassword === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access: Invalid security key" });
  }
}

// Initialize database file on boot
readDb();

// ==========================================================================
// 4. REST API ROUTES
// ==========================================================================

// --- COURSES ---
app.get('/api/courses', (req, res) => {
  const db = readDb();
  res.json(db.courses);
});

app.post('/api/courses', verifyAdmin, (req, res) => {
  const db = readDb();
  const { name, category, badge, desc, features, img } = req.body;
  if (!name || !category || !badge || !desc || !img) {
    return res.status(400).json({ error: "Missing required course fields" });
  }
  const newCourse = {
    id: "course_" + Date.now(),
    name,
    category,
    badge,
    desc,
    features: Array.isArray(features) ? features : [features],
    img
  };
  db.courses.push(newCourse);
  writeDb(db);
  res.status(201).json(newCourse);
});

app.delete('/api/courses/:id', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const exists = db.courses.some(c => c.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Course not found" });
  }
  db.courses = db.courses.filter(c => c.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Course listing deleted successfully" });
});

// --- ANNOUNCEMENTS ---
app.get('/api/announcements', (req, res) => {
  const db = readDb();
  res.json(db.announcements);
});

app.post('/api/announcements', verifyAdmin, (req, res) => {
  const db = readDb();
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Announcement content cannot be empty" });
  }
  db.announcements.push(text);
  writeDb(db);
  res.status(201).json(db.announcements);
});

app.delete('/api/announcements/:index', verifyAdmin, (req, res) => {
  const db = readDb();
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= db.announcements.length) {
    return res.status(400).json({ error: "Invalid announcement index" });
  }
  db.announcements.splice(index, 1);
  writeDb(db);
  res.json(db.announcements);
});

// --- TESTIMONIALS ---
app.get('/api/testimonials', (req, res) => {
  const db = readDb();
  res.json(db.testimonials);
});

app.post('/api/testimonials', verifyAdmin, (req, res) => {
  const db = readDb();
  const { name, role, stars, text } = req.body;
  if (!name || !role || !stars || !text) {
    return res.status(400).json({ error: "Missing required testimonial fields" });
  }
  const newTest = {
    id: "test_" + Date.now(),
    name,
    role,
    stars: parseInt(stars, 10) || 5,
    text
  };
  db.testimonials.push(newTest);
  writeDb(db);
  res.status(201).json(newTest);
});

app.delete('/api/testimonials/:id', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const exists = db.testimonials.some(t => t.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Testimonial review not found" });
  }
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Review deleted successfully" });
});

// --- GALLERY ---
app.get('/api/gallery', (req, res) => {
  const db = readDb();
  res.json(db.gallery);
});

app.post('/api/gallery', verifyAdmin, (req, res) => {
  const db = readDb();
  const { title, category, url } = req.body;
  if (!title || !category || !url) {
    return res.status(400).json({ error: "Missing gallery fields" });
  }
  const newImage = {
    id: "gal_" + Date.now(),
    title,
    category,
    url
  };
  db.gallery.push(newImage);
  writeDb(db);
  res.status(201).json(newImage);
});

app.delete('/api/gallery/:id', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const exists = db.gallery.some(g => g.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Photo entry not found" });
  }
  db.gallery = db.gallery.filter(g => g.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Gallery photo deleted successfully" });
});

// --- FACULTY ---
app.get('/api/faculty', (req, res) => {
  const db = readDb();
  res.json(db.faculty || []);
});

app.post('/api/faculty', verifyAdmin, (req, res) => {
  const db = readDb();
  const { name, role, qual, img } = req.body;
  if (!name || !role || !qual || !img) {
    return res.status(400).json({ error: "Missing required faculty fields" });
  }
  const newMember = {
    id: "fac_" + Date.now(),
    name,
    role,
    qual,
    img
  };
  if (!db.faculty) db.faculty = [];
  db.faculty.push(newMember);
  writeDb(db);
  res.status(201).json(newMember);
});

app.delete('/api/faculty/:id', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  if (!db.faculty) db.faculty = [];
  const exists = db.faculty.some(f => f.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Faculty member not found" });
  }
  db.faculty = db.faculty.filter(f => f.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Faculty member deleted successfully" });
});

// --- LEADS MANAGEMENT SYSTEM (CRM) ---

// Public endpoint to register leads
app.post('/api/leads', (req, res) => {
  const db = readDb();
  const { type, name, phone, class: className, exam, course, message } = req.body;
  if (!type || !name || !phone) {
    return res.status(400).json({ error: "Lead type, student name, and mobile number are required" });
  }
  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const newLead = {
    id: "lead_" + Date.now(),
    type, // "enquiry" or "counselling"
    name,
    phone,
    class: className || null,
    exam: exam || null,
    course: course || null,
    message: message || "No message left.",
    date: dateStr,
    status: "New"
  };
  db.leads.push(newLead);
  writeDb(db);
  res.status(201).json(newLead);
});

// Admin-only lead getters
app.get('/api/leads', verifyAdmin, (req, res) => {
  const db = readDb();
  res.json(db.leads);
});

// Admin status toggler
app.put('/api/leads/:id/status', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Status value required" });
  }
  const leadIdx = db.leads.findIndex(l => l.id === id);
  if (leadIdx === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }
  db.leads[leadIdx].status = status;
  writeDb(db);
  res.json(db.leads[leadIdx]);
});

// Admin lead deletion
app.delete('/api/leads/:id', verifyAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const exists = db.leads.some(l => l.id === id);
  if (!exists) {
    return res.status(404).json({ error: "Lead not found" });
  }
  db.leads = db.leads.filter(l => l.id !== id);
  writeDb(db);
  res.json({ success: true, message: "Lead entry deleted from database" });
});

// Start Server Listen
app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`Taj Gurukul Express Server is active on port: ${PORT}`);
  console.log(`Database saved at: ${DB_FILE}`);
  console.log(`Public homepage accessible at: http://localhost:${PORT}`);
  console.log(`========================================================`);
});
