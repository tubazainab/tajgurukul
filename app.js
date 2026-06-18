/* ==========================================================================
   Taj Gurukul - Hybrid Static/Dynamic Interactive Script
   ========================================================================== */

const WHATSAPP_CONTACT_PHONE = "919595972517";
const isBackendActive = window.location.protocol.startsWith('http') && !window.location.search.includes('offline=true') && !window.location.hostname.includes('github.io') && !window.location.hostname.includes('vercel.app'); // True if served from HTTP/HTTPS and not overridden

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

// ==========================================================================
// 1. Navigation & Sticky Header
// ==========================================================================
function initNavbarLogic() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-links a");
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });
  }
  
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.querySelector("i").className = "fa-solid fa-bars";
      }
    });
  });
  
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 50) {
        header.style.backgroundColor = "rgba(10, 25, 47, 0.96)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.backgroundColor = "var(--primary-navy)";
        header.style.backdropFilter = "none";
      }
    }
    
    let currentSectionId = "home";
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (window.scrollY >= secTop) {
        currentSectionId = sec.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
}

// ==========================================================================
// 2. Stats Count-Up Animation
// ==========================================================================
function initStatsCounter() {
  const counterElements = document.querySelectorAll(".stat-number");
  
  const countUp = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = progress * (2 - progress);
      const val = Math.floor(easedProgress * target);
      
      if (target >= 100) {
        el.innerText = val + "+";
      } else if (el.getAttribute("data-target") === "95") {
        el.innerText = val + "%";
      } else {
        el.innerText = val;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (target >= 100) el.innerText = target + "+";
        else if (el.getAttribute("data-target") === "95") el.innerText = target + "%";
        else el.innerText = target;
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
  } else {
    counterElements.forEach(el => {
      const tgt = el.getAttribute("data-target");
      el.innerText = tgt + (tgt >= 100 ? "+" : "");
    });
  }
}

// ==========================================================================
// 3. Dynamic API Data Renderers (Active in Server mode)
// ==========================================================================

async function loadBackendData() {
  try {
    let faculty = [];
    let siteContent = null;
    let features = [];
    let facilities = [];

    if (isBackendActive) {
      // Fetch from Server API
      try {
        const annRes = await fetch('/api/announcements');
        if (annRes.ok) announcements = await annRes.json();
      } catch (e) { console.error("Error fetching announcements:", e); }

      try {
        const coursesRes = await fetch('/api/courses');
        if (coursesRes.ok) courses = await coursesRes.json();
      } catch (e) { console.error("Error fetching courses:", e); }

      try {
        const testRes = await fetch('/api/testimonials');
        if (testRes.ok) testimonials = await testRes.json();
      } catch (e) { console.error("Error fetching testimonials:", e); }

      try {
        const galRes = await fetch('/api/gallery');
        if (galRes.ok) gallery = await galRes.json();
      } catch (e) { console.error("Error fetching gallery:", e); }

      try {
        const facRes = await fetch('/api/faculty');
        if (facRes.ok) faculty = await facRes.json();
      } catch (e) { console.error("Error fetching faculty:", e); }

      try {
        const siteRes = await fetch('/api/content');
        if (siteRes.ok) siteContent = await siteRes.json();
      } catch (e) { console.error("Error fetching site content:", e); }

      try {
        const featRes = await fetch('/api/features');
        if (featRes.ok) features = await featRes.json();
      } catch (e) { console.error("Error fetching features:", e); }

      try {
        const facilRes = await fetch('/api/facilities');
        if (facilRes.ok) facilities = await facilRes.json();
      } catch (e) { console.error("Error fetching facilities:", e); }
    } else {
      // Load from LocalStorage
      announcements = JSON.parse(localStorage.getItem("tg_announcements")) || [];
      courses = JSON.parse(localStorage.getItem("tg_courses")) || [];
      testimonials = JSON.parse(localStorage.getItem("tg_testimonials")) || [];
      gallery = JSON.parse(localStorage.getItem("tg_gallery")) || [];
      faculty = JSON.parse(localStorage.getItem("tg_faculty")) || [];
      siteContent = JSON.parse(localStorage.getItem("tg_sitecontent")) || null;
      features = JSON.parse(localStorage.getItem("tg_features")) || [];
      facilities = JSON.parse(localStorage.getItem("tg_facilities")) || [];
    }

    // A. Announcements marquee
    const marqueeContainer = document.getElementById("announcementsMarquee");
    if (marqueeContainer && announcements.length > 0) {
      marqueeContainer.innerHTML = announcements.map(text => {
        return `<span class="ticker-item"><i class="fa-solid fa-bullhorn"></i> ${text}</span>`;
      }).join("");
    }
    
    // B. Courses
    const coursesGrid = document.getElementById("coursesGrid");
    if (coursesGrid && courses.length > 0) {
      coursesGrid.innerHTML = courses.map(c => {
        const featHtml = c.features.map(f => `
          <div class="course-feat-item">
            <i class="fa-solid fa-square-check"></i>
            <span>${f}</span>
          </div>
        `).join("");
        
        return `
          <div class="course-card" data-category="${c.category}">
            <div class="course-img-wrapper">
              <img src="${c.img}" alt="${c.name} Image" loading="lazy">
              <span class="course-badge">${c.badge}</span>
            </div>
            <div class="course-content">
              <h3 class="course-title">${c.name}</h3>
              <div class="course-desc">${c.desc}</div>
              <div class="course-features">
                ${featHtml}
              </div>
              <div class="course-footer">
                <a href="javascript:void(0)" class="btn btn-outline-navy" style="font-size: 0.85rem; padding: 8px 18px;" onclick="openEnquiryModal('${c.name}')">Enquire Program</a>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
    initCourseFilterEvents(); // Setup tab events on loaded courses
    
    // C. Testimonials
    const track = document.getElementById("testimonialTrack");
    if (track && testimonials.length > 0) {
      track.innerHTML = testimonials.map(t => {
        let starsHtml = "";
        for (let s = 0; s < t.stars; s++) starsHtml += `<i class="fa-solid fa-star"></i>`;
        
        return `
          <div class="slide">
            <div class="testimonial-card">
              <div class="testimonial-rating">
                ${starsHtml}
              </div>
              <div class="testimonial-text">${t.text}</div>
              <div class="student-info">
                <span class="student-name">${t.name}</span>
                <span class="student-class">${t.role}</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
    initTestimonialsSlider(); // Setup slider dots and timers
    
    // D. Gallery
    const galleryGrid = document.getElementById("galleryGrid");
    if (galleryGrid && gallery.length > 0) {
      galleryGrid.innerHTML = gallery.map(img => `
        <div class="gallery-item" data-group="${img.category}" onclick="openLightbox('${img.url}', '${img.title}')">
          <img src="${img.url}" alt="${img.title}" loading="lazy">
          <div class="gallery-overlay">
            <span class="gallery-tag">${img.category}</span>
            <span class="gallery-title">${img.title}</span>
          </div>
        </div>
      `).join("");
    }
    initGalleryFilters();
    initLightboxEvents();
    
    // E. Faculty
    const facultyGrid = document.getElementById("facultyGrid");
    if (facultyGrid && faculty.length > 0) {
      facultyGrid.innerHTML = faculty.map(f => `
        <div class="faculty-card">
          <div class="faculty-img-box">
            <img src="${f.img}" alt="${f.name} - ${f.role}" loading="lazy">
          </div>
          <div class="faculty-info">
            <h3 class="faculty-name">${f.name}</h3>
            <p class="faculty-role">${f.role}</p>
            <p class="faculty-qual">${f.qual}</p>
          </div>
        </div>
      `).join("");
    }
    
    // F. Why Choose Us Features
    const whyChooseGrid = document.getElementById("whyChooseGrid");
    if (whyChooseGrid && features.length > 0) {
      whyChooseGrid.innerHTML = features.map(f => `
        <div class="why-card">
          <div class="why-icon"><i class="fa-solid ${f.icon}"></i></div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>
      `).join("");
    }

    // G. Campus & Facilities
    const facilitiesGrid = document.getElementById("facilitiesGrid");
    if (facilitiesGrid && facilities.length > 0) {
      facilitiesGrid.innerHTML = facilities.map(f => `
        <div class="facil-card">
          <div class="facil-icon-box"><i class="fa-solid ${f.icon}"></i></div>
          <div class="facil-content">
            <h4>${f.title}</h4>
            <p>${f.desc}</p>
          </div>
        </div>
      `).join("");
    }

    // H. Site Content CMS
    if (siteContent) {
      if (document.getElementById("heroTaglineDisp")) document.getElementById("heroTaglineDisp").innerText = siteContent.heroTagline || "Welcome to Taj Gurukul";
      if (document.getElementById("heroTitleDisp")) document.getElementById("heroTitleDisp").innerHTML = siteContent.heroTitle || "Shape Your <span>Future</span> with Expert Guidance";
      if (document.getElementById("heroDescDisp")) document.getElementById("heroDescDisp").innerText = siteContent.heroDesc || "";
      
      if (document.getElementById("heroCardTitleDisp")) document.getElementById("heroCardTitleDisp").innerText = siteContent.heroCardTitle || "";
      if (document.getElementById("heroCardSubtitleDisp")) document.getElementById("heroCardSubtitleDisp").innerText = siteContent.heroCardSubtitle || "";
      if (document.getElementById("heroCardFeat1Disp")) document.getElementById("heroCardFeat1Disp").innerText = siteContent.heroCardFeat1 || "";
      if (document.getElementById("heroCardFeat2Disp")) document.getElementById("heroCardFeat2Disp").innerText = siteContent.heroCardFeat2 || "";
      if (document.getElementById("heroCardFeat3Disp")) document.getElementById("heroCardFeat3Disp").innerText = siteContent.heroCardFeat3 || "";
      if (document.getElementById("heroCardFeat4Disp")) document.getElementById("heroCardFeat4Disp").innerText = siteContent.heroCardFeat4 || "";

      if (document.getElementById("statExpDisp")) document.getElementById("statExpDisp").setAttribute("data-target", siteContent.statExp || "15");
      if (document.getElementById("statSuccessDisp")) document.getElementById("statSuccessDisp").setAttribute("data-target", siteContent.statSuccess || "95");
      if (document.getElementById("statMentoredDisp")) document.getElementById("statMentoredDisp").setAttribute("data-target", siteContent.statMentored || "1500");
      if (document.getElementById("statBatchDisp")) document.getElementById("statBatchDisp").setAttribute("data-target", siteContent.statBatch || "30");

      if (document.getElementById("aboutTitleDisp")) document.getElementById("aboutTitleDisp").innerText = siteContent.aboutTitle || "";
      if (document.getElementById("aboutDesc1Disp")) document.getElementById("aboutDesc1Disp").innerText = siteContent.aboutDesc1 || "Taj Gurukul is a leading coaching institute...";
      if (document.getElementById("aboutDesc2Disp")) document.getElementById("aboutDesc2Disp").innerText = siteContent.aboutDesc2 || "Our concept-based learning methodology...";
      
      if (document.getElementById("infraSubtitleDisp")) document.getElementById("infraSubtitleDisp").innerText = siteContent.infraSubtitle || "OUR INFRASTRUCTURE";
      if (document.getElementById("infraTitleDisp")) document.getElementById("infraTitleDisp").innerText = siteContent.infraTitle || "Campus & Facilities";

      if (document.getElementById("topPhoneDisp")) {
        document.getElementById("topPhoneDisp").innerHTML = `<i class="fa-solid fa-phone"></i> ${siteContent.contactPhone1 || "+91 95959 72517"}`;
        document.getElementById("topPhoneDisp").href = `tel:${siteContent.contactPhone1 || "+919595972517"}`;
      }
      if (document.getElementById("topEmailDisp")) {
        document.getElementById("topEmailDisp").innerHTML = `<i class="fa-solid fa-envelope"></i> ${siteContent.contactEmail || "tajgurukul.kamptee@gmail.com"}`;
        document.getElementById("topEmailDisp").href = `mailto:${siteContent.contactEmail || "tajgurukul.kamptee@gmail.com"}`;
      }

      if (document.getElementById("footerAddressDisp")) document.getElementById("footerAddressDisp").innerText = siteContent.contactAddress || "Kamptee, Maharashtra";
      if (document.getElementById("footerPhoneDisp")) document.getElementById("footerPhoneDisp").innerHTML = (siteContent.contactPhone1 || "+91 95959 72517") + "<br>" + (siteContent.contactPhone2 || "");
      if (document.getElementById("footerEmailDisp")) document.getElementById("footerEmailDisp").innerText = siteContent.contactEmail || "tajgurukul.kamptee@gmail.com";
      
      if (document.getElementById("socialFacebookDisp") && siteContent.socialFacebook) document.getElementById("socialFacebookDisp").href = siteContent.socialFacebook;
      if (document.getElementById("socialTwitterDisp") && siteContent.socialTwitter) document.getElementById("socialTwitterDisp").href = siteContent.socialTwitter;
      if (document.getElementById("socialInstagramDisp") && siteContent.socialInstagram) document.getElementById("socialInstagramDisp").href = siteContent.socialInstagram;
      if (document.getElementById("socialYoutubeDisp") && siteContent.socialYoutube) document.getElementById("socialYoutubeDisp").href = siteContent.socialYoutube;
    }
  } catch (err) {
    console.error("Error loading dynamic content:", err);
  }
}

// ==========================================================================
// 4. Courses Filter Tabs (Interactive toggles)
// ==========================================================================
function initCourseFilterEvents() {
  const buttons = document.querySelectorAll(".courses-tabs .tab-btn");
  const cards = document.querySelectorAll("#coursesGrid .course-card");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      
      cards.forEach(card => {
        if (filter === "all") {
          card.style.display = "flex";
        } else {
          const cardCat = card.getAttribute("data-category");
          card.style.display = cardCat === filter ? "flex" : "none";
        }
      });
    });
  });
}

window.setCourseFilter = function(filterVal) {
  const tabs = document.querySelectorAll(".courses-tabs .tab-btn");
  tabs.forEach(btn => {
    if (btn.getAttribute("data-filter") === filterVal) {
      btn.click();
    }
  });
};

// ==========================================================================
// 5. Testimonials Slider
// ==========================================================================
let currentTestimonialIdx = 0;
let testimonialAutoTimer = null;

function initTestimonialsSlider() {
  const track = document.getElementById("testimonialTrack");
  const slides = document.querySelectorAll("#testimonialTrack .slide");
  const dotsContainer = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  
  if (!track || slides.length === 0 || !dotsContainer) return;
  
  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    dotsContainer.innerHTML += `<div class="dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></div>`;
  });
  
  window.goToTestimonial = function(idx) {
    currentTestimonialIdx = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    
    const dots = document.querySelectorAll("#testimonialDots .dot");
    dots.forEach((dot, dIdx) => {
      dot.classList.toggle("active", dIdx === idx);
    });
    
    startTestimonialTimer();
  };
  
  function nextTestimonial() {
    currentTestimonialIdx = (currentTestimonialIdx + 1) % slides.length;
    goToTestimonial(currentTestimonialIdx);
  }
  
  function prevTestimonial() {
    currentTestimonialIdx = (currentTestimonialIdx - 1 + slides.length) % slides.length;
    goToTestimonial(currentTestimonialIdx);
  }
  
  if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);
  if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
  
  function startTestimonialTimer() {
    if (testimonialAutoTimer) clearInterval(testimonialAutoTimer);
    testimonialAutoTimer = setInterval(nextTestimonial, 6000);
  }
  
  startTestimonialTimer();
}

// ==========================================================================
// 6. Gallery Filters & Lightbox Image Preview
// ==========================================================================
function initGalleryFilters() {
  const buttons = document.querySelectorAll(".gallery-filters .filter-btn");
  const items = document.querySelectorAll("#galleryGrid .gallery-item");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const group = btn.getAttribute("data-group");
      
      items.forEach(item => {
        if (group === "all") {
          item.style.display = "block";
        } else {
          const itemGroup = item.getAttribute("data-group");
          item.style.display = itemGroup === group ? "block" : "none";
        }
      });
    });
  });
}

window.openLightbox = function(url, caption) {
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCap = document.getElementById("lightboxCaption");
  
  if (!lightbox || !lightboxImg || !lightboxCap) return;
  
  lightboxImg.src = url;
  lightboxCap.innerText = caption;
  lightbox.classList.add("active");
};

function initLightboxEvents() {
  const lightbox = document.getElementById("galleryLightbox");
  const closeBtn = document.getElementById("lightboxClose");
  
  if (!lightbox) return;
  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

// ==========================================================================
// 7. FAQ Accordion
// ==========================================================================
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");
  
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains("active");
      
      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("active");
        other.querySelector(".faq-content").style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        content.style.maxHeight = null;
      }
    });
  });
}

// ==========================================================================
// 8. Lead Submissions (API Sync & WhatsApp routing)
// ==========================================================================

window.openEnquiryModal = function(courseName = "") {
  const modal = document.getElementById("enquiryModal");
  const courseSelect = document.getElementById("enquiryCourse");
  if (!modal) return;
  
  if (courseSelect && courseName) {
    const lower = courseName.toLowerCase();
    if (lower.includes("neet")) courseSelect.value = "NEET (UG)";
    else if (lower.includes("jee")) courseSelect.value = "IIT-JEE";
    else if (lower.includes("cet")) courseSelect.value = "MHT-CET";
    else if (lower.includes("nda") || lower.includes("defence")) courseSelect.value = "NDA Foundation";
    else if (lower.includes("foundation")) courseSelect.value = "Foundation (8th-10th)";
  }
  
  modal.classList.add("active");
};

function initFormSubmissions() {
  const modal = document.getElementById("enquiryModal");
  const counsellingForm = document.getElementById("counselingForm");
  const enquiryForm = document.getElementById("admissionEnquiryForm");
  const closeBtn = document.getElementById("closeEnquiryModal");
  
  if (modal) {
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
  
  // Counselling Form Submit
  if (counsellingForm) {
    counsellingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const name = document.getElementById("studentName").value.trim();
      const phone = document.getElementById("studentMobile").value.trim();
      const className = document.getElementById("studentClass").value;
      const exam = document.getElementById("examTarget").value;
      const msg = document.getElementById("studentMsg").value.trim();
      
      if (!name || !phone || !className || !exam) {
        alert("Please fill in all required fields.");
        return;
      }
      
      const whatsAppText = `Hello Taj Gurukul Kamptee,\n\nI want to book a *Free Career Counselling Session* with your academic experts.\n\n*Student Details*:\n• *Name*: ${name}\n• *Mobile*: ${phone}\n• *Current Class*: ${className}\n• *Target Entrance*: ${exam}\n• *Message*: ${msg || 'None'}`;
      const encodedText = encodeURIComponent(whatsAppText);
      const whatsAppUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodedText}`;
      
      const dateStr = new Date().toLocaleDateString("en-IN", {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      // Save to LocalStorage (always keep a local copy)
      const leads = JSON.parse(localStorage.getItem("tg_leads")) || [];
      leads.push({
        id: "lead_" + Date.now(),
        type: "counselling",
        name: name,
        phone: phone,
        class: className,
        exam: exam,
        message: msg || "No message left.",
        date: dateStr,
        status: "New"
      });
      localStorage.setItem("tg_leads", JSON.stringify(leads));

      // If server is active, post to Database
      if (isBackendActive) {
        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'counselling', name, phone, class: className, exam, message: msg })
          });
        } catch (err) {
          console.error("Failed to save lead to database server:", err);
        }
      }
      
      alert(`Thank you, ${name}! Redirecting to confirm your appointment details on WhatsApp.`);
      counsellingForm.reset();
      window.open(whatsAppUrl, "_blank");
    });
  }
  
  // Enquiry Modal Submit
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const name = document.getElementById("enquiryName").value.trim();
      const phone = document.getElementById("enquiryMobile").value.trim();
      const course = document.getElementById("enquiryCourse").value;
      const msg = document.getElementById("enquiryMsg").value.trim();
      
      if (!name || !phone || !course) {
        alert("Please fill in all required fields.");
        return;
      }
      
      const whatsAppText = `Hello Taj Gurukul Kamptee,\n\nI want to make an *Admission Enquiry* regarding your programs.\n\n*Inquirer Details*:\n• *Name*: ${name}\n• *Mobile*: ${phone}\n• *Course of Interest*: ${course}\n• *Query/Message*: ${msg || 'None'}`;
      const encodedText = encodeURIComponent(whatsAppText);
      const whatsAppUrl = `https://wa.me/${WHATSAPP_CONTACT_PHONE}?text=${encodedText}`;
      
      const dateStr = new Date().toLocaleDateString("en-IN", {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      // Save to LocalStorage (always keep a local copy)
      const leads = JSON.parse(localStorage.getItem("tg_leads")) || [];
      leads.push({
        id: "lead_" + Date.now(),
        type: "enquiry",
        name: name,
        phone: phone,
        course: course,
        message: msg || "No message left.",
        date: dateStr,
        status: "New"
      });
      localStorage.setItem("tg_leads", JSON.stringify(leads));

      // If server active, save lead
      if (isBackendActive) {
        try {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'enquiry', name, phone, course, message: msg })
          });
        } catch (err) {
          console.error("Failed to save lead to database server:", err);
        }
      }
      
      alert(`Thank you, ${name}! Redirecting you to our admissions desk on WhatsApp.`);
      enquiryForm.reset();
      if (modal) modal.classList.remove("active");
      window.open(whatsAppUrl, "_blank");
    });
  }
}

// ==========================================================================
// 9. Startup Routing Orchestration
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
  initNavbarLogic();
  
  if (!isBackendActive) {
    dbInitOffline();
  }
  
  await loadBackendData();
  
  initStatsCounter();
  initFaqAccordion();
  initFormSubmissions();
});
