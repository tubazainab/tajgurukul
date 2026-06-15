require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/tajgurukul";
mongoose.connect(mongoURI).then(() => {
  console.log("Connected to MongoDB successfully!");
  seedDb();
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Schemas & Models
const courseSchema = new mongoose.Schema({
  id: String, name: String, category: String, badge: String, desc: String, features: [String], img: String
});
const Course = mongoose.model('Course', courseSchema);

const announcementSchema = new mongoose.Schema({ text: String });
const Announcement = mongoose.model('Announcement', announcementSchema);

const testimonialSchema = new mongoose.Schema({
  id: String, name: String, role: String, stars: Number, text: String
});
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

const gallerySchema = new mongoose.Schema({
  id: String, category: String, title: String, url: String
});
const Gallery = mongoose.model('Gallery', gallerySchema);

const facultySchema = new mongoose.Schema({
  id: String, name: String, role: String, qual: String, img: String
});
const Faculty = mongoose.model('Faculty', facultySchema);

const leadSchema = new mongoose.Schema({
  id: String, type: String, name: String, phone: String, class: String,
  exam: String, course: String, message: String, date: String, status: String
});
const Lead = mongoose.model('Lead', leadSchema);

// MOCK DATA SEEDING
async function seedDb() {
  const count = await Course.countDocuments();
  if (count > 0) return; // Already seeded

  console.log("Seeding initial database...");
  await Course.insertMany([
    { id: "course_1", name: "NEET (UG) - Medical Preparation", category: "neet", badge: "NEET", desc: "Complete Medical Entrance preparation focusing on Biology, Chemistry, and Physics concept mastery.", features: ["Physics & Chemistry drills", "Detailed Biology visualization", "All India Test Series mapping"], img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" },
    { id: "course_2", name: "IIT-JEE (Main & Advanced)", category: "jee", badge: "IIT-JEE", desc: "Comprehensive engineering entrance preparation designed to crack advanced level concepts.", features: ["Advanced Mathematics modules", "Concept-based Physics sheets", "Organic & Physical chemistry tricks"], img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80" },
    { id: "course_3", name: "MHT-CET State Entrance Prep", category: "cet", badge: "MHT-CET", desc: "Rigorous state level entrance course specializing in speed, recall and board exams synergy.", features: ["Speed calculation worksheets", "Full-length CET Mock Tests", "Formula sheet memory packs"], img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80" },
    { id: "course_4", name: "NDA Foundation - Defence Entry", category: "nda", badge: "Defence", desc: "Dual curriculum targeting both UPSC written exams and physical-interview guidance.", features: ["General Ability paper tutoring", "English language bootcamps", "UPSC Mathematics shortcut keys"], img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
    { id: "course_5", name: "Foundation Courses (8th-10th)", category: "foundation", badge: "School Foundation", desc: "Strong foundational learning for CBSE & State Boards, Olympiads, and early competitive prep.", features: ["NTSE & Olympiad modules", "Board exam mock papers", "Critical-thinking puzzle labs"], img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" }
  ]);

  await Announcement.insertMany([
    { text: "🔥 Admissions Open for NEET, JEE & NDA Batches 2026-27! Register for Scholarship Tests up to 50% off." },
    { text: "✨ Book a Free Career Counselling 1-on-1 mentorship session with our expert directors this week." },
    { text: "🏆 Congratulating our board toppers on amazing academic scores!" }
  ]);

  await Testimonial.insertMany([
    { id: "test_1", name: "Rahul Meshram", role: "JEE Main Selected Aspirant", stars: 5, text: "Taj Gurukul provided an amazing platform. The small batch sizes meant that the Physics teachers noticed my mistakes instantly. Mock test analysis helped me improve my pacing." },
    { id: "test_2", name: "Dr. Sandeep Deshmukh", role: "Parent of NEET Batch Student", stars: 5, text: "Extremely pleased with the personal tracking system. The directors themselves updated us about our child's test scores, conceptual gaps, and emotional well-being regularly. Very professional." },
    { id: "test_3", name: "Alok Dwivedi", role: "NDA Merit Selected Cadet", stars: 5, text: "The combination of basic mathematics clearing with general knowledge practice was excellent. Taj Gurukul's environment is highly motivated and competitive." }
  ]);

  await Gallery.insertMany([
    { id: "gal_1", category: "classroom", title: "Smart Screen Classroom Sessions", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
    { id: "gal_2", category: "seminars", title: "1-on-1 Student Career Counsel Session", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" },
    { id: "gal_3", category: "events", title: "Parent Teacher Review Assembly", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" },
    { id: "gal_4", category: "achievements", title: "Felicitation Ceremony of Selected Candidates", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" },
    { id: "gal_5", category: "classroom", title: "Interactive Doubt Solving Core Groups", url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80" },
    { id: "gal_6", category: "events", title: "Cultural Meet & Independence Day", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" }
  ]);

  await Faculty.insertMany([
    { id: "fac_1", name: "Prof. Amit Mishra", role: "Physics Expert", qual: "M.Tech (VNIT Nagpur) | 8+ Years Exp.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
    { id: "fac_2", name: "Prof. Rajesh Patil", role: "Mathematics Mentor", qual: "B.Tech (IIT Bombay) | 12+ Years Exp.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    { id: "fac_3", name: "Dr. Shalini Sharma", role: "Biology & Chemistry Head", qual: "Ph.D. in Organic Chemistry | 10+ Years Exp.", img: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=600&q=80" }
  ]);
  console.log("Database seeded.");
}

app.use(express.json());
app.use(express.static(__dirname));

const ADMIN_PASSWORD = "admin@tajgurukul";
function verifyAdmin(req, res, next) {
  const reqPassword = req.headers['x-admin-password'];
  if (reqPassword === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access: Invalid security key" });
  }
}

// --- COURSES ---
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/api/courses', verifyAdmin, async (req, res) => {
  const { name, category, badge, desc, features, img } = req.body;
  if (!name || !category || !badge || !desc || !img) {
    return res.status(400).json({ error: "Missing required course fields" });
  }
  const newCourse = new Course({
    id: "course_" + Date.now(),
    name, category, badge, desc, features: Array.isArray(features) ? features : [features], img
  });
  await newCourse.save();
  res.status(201).json(newCourse);
});

app.delete('/api/courses/:id', verifyAdmin, async (req, res) => {
  const deleted = await Course.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Course not found" });
  res.json({ success: true, message: "Course deleted successfully" });
});

// --- ANNOUNCEMENTS ---
app.get('/api/announcements', async (req, res) => {
  const announcements = await Announcement.find();
  // frontend expects array of strings
  res.json(announcements.map(a => a.text));
});

app.post('/api/announcements', verifyAdmin, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Empty content" });
  await new Announcement({ text }).save();
  const all = await Announcement.find();
  res.status(201).json(all.map(a => a.text));
});

app.delete('/api/announcements/:index', verifyAdmin, async (req, res) => {
  // admin.js passes the index of the array
  const index = parseInt(req.params.index, 10);
  const announcements = await Announcement.find();
  if (isNaN(index) || index < 0 || index >= announcements.length) {
    return res.status(400).json({ error: "Invalid index" });
  }
  const toDelete = announcements[index];
  await Announcement.findByIdAndDelete(toDelete._id);
  
  const all = await Announcement.find();
  res.json(all.map(a => a.text));
});

// --- TESTIMONIALS ---
app.get('/api/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

app.post('/api/testimonials', verifyAdmin, async (req, res) => {
  const { name, role, stars, text } = req.body;
  if (!name || !role || !stars || !text) return res.status(400).json({ error: "Missing fields" });
  const newTest = new Testimonial({
    id: "test_" + Date.now(), name, role, stars: parseInt(stars, 10) || 5, text
  });
  await newTest.save();
  res.status(201).json(newTest);
});

app.delete('/api/testimonials/:id', verifyAdmin, async (req, res) => {
  const deleted = await Testimonial.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Testimonial not found" });
  res.json({ success: true });
});

// --- GALLERY ---
app.get('/api/gallery', async (req, res) => {
  const gallery = await Gallery.find();
  res.json(gallery);
});

app.post('/api/gallery', verifyAdmin, async (req, res) => {
  const { title, category, url } = req.body;
  if (!title || !category || !url) return res.status(400).json({ error: "Missing fields" });
  const newImg = new Gallery({ id: "gal_" + Date.now(), title, category, url });
  await newImg.save();
  res.status(201).json(newImg);
});

app.delete('/api/gallery/:id', verifyAdmin, async (req, res) => {
  const deleted = await Gallery.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// --- FACULTY ---
app.get('/api/faculty', async (req, res) => {
  const faculty = await Faculty.find();
  res.json(faculty);
});

app.post('/api/faculty', verifyAdmin, async (req, res) => {
  const { name, role, qual, img } = req.body;
  if (!name || !role || !qual || !img) return res.status(400).json({ error: "Missing fields" });
  const newFac = new Faculty({ id: "fac_" + Date.now(), name, role, qual, img });
  await newFac.save();
  res.status(201).json(newFac);
});

app.delete('/api/faculty/:id', verifyAdmin, async (req, res) => {
  const deleted = await Faculty.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// --- LEADS ---
app.post('/api/leads', async (req, res) => {
  const { type, name, phone, class: className, exam, course, message } = req.body;
  if (!type || !name || !phone) return res.status(400).json({ error: "Required fields missing" });
  
  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  
  const newLead = new Lead({
    id: "lead_" + Date.now(), type, name, phone, class: className || null,
    exam: exam || null, course: course || null, message: message || "No message left.",
    date: dateStr, status: "New"
  });
  await newLead.save();
  res.status(201).json(newLead);
});

app.get('/api/leads', verifyAdmin, async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.put('/api/leads/:id/status', verifyAdmin, async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Status value required" });
  const lead = await Lead.findOneAndUpdate({ id: req.params.id }, { status }, { new: true });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
});

app.delete('/api/leads/:id', verifyAdmin, async (req, res) => {
  const deleted = await Lead.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`Taj Gurukul Express Server is active on port: ${PORT}`);
  console.log(`Database: Connected to MongoDB`);
  console.log(`Public homepage accessible at: http://localhost:${PORT}`);
  console.log(`========================================================`);
});
