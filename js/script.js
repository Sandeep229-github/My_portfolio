/* ============================================
   SANDEEP BUKKA - PORTFOLIO JAVASCRIPT
   Handles: Loader, Cursor, Navbar, Typing,
   Scroll Reveal, Skill Bars, Contact Form
   ============================================ */

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Hide loader after 2 seconds
  setTimeout(() => {
    loader.classList.add('hidden');
    // Allow body scroll after loader
    document.body.style.overflow = '';
  }, 2000);
});

// Prevent scroll during loader
document.body.style.overflow = 'hidden';


/* ---- NAVBAR SCROLL EFFECT ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});


/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ---- ACTIVE NAV LINK ON SCROLL ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}


/* ---- TYPING ANIMATION ---- */
const typedText  = document.getElementById('typedText');
const textArray  = [
  'Full Stack Developer',
  'Frontend Enthusiast',
  'Python Developer',
  'Problem Solver',
  'Django Developer',
];
let textIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
let typeDelay    = 100;

function typeWriter() {
  const current = textArray[textIndex];

  if (!isDeleting) {
    // Type forward
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      // Pause at end
      isDeleting = true;
      typeDelay  = 1800;
    } else {
      typeDelay = 90;
    }
  } else {
    // Delete
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      textIndex   = (textIndex + 1) % textArray.length;
      typeDelay   = 400;
    } else {
      typeDelay = 50;
    }
  }

  setTimeout(typeWriter, typeDelay);
}

// Start typing after loader
setTimeout(typeWriter, 2300);


/* ---- SCROLL REVEAL ANIMATION ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children
      const delay = (i % 3) * 0.1;
      entry.target.style.transitionDelay = delay + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


/* ---- SKILL BARS ANIMATION ---- */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find all bar-fill elements and animate
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBarsSection = document.querySelector('.skill-bars');
if (skillBarsSection) barObserver.observe(skillBarsSection);


/* ---- CONTACT FORM ---- */
const formSubmit  = document.getElementById('formSubmit');
const formSuccess = document.getElementById('formSuccess');
const nameInput   = document.getElementById('name');
const emailInput  = document.getElementById('email');
const subjectInput= document.getElementById('subject');
const messageInput= document.getElementById('message');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    // Basic validation
    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Remove any previous error states
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.style.borderColor = '';
    });

    let hasError = false;

    if (!name) { nameInput.style.borderColor = '#ff5f57'; hasError = true; }
    if (!validateEmail(email)) { emailInput.style.borderColor = '#ff5f57'; hasError = true; }
    if (!subject) { subjectInput.style.borderColor = '#ff5f57'; hasError = true; }
    if (!message) { messageInput.style.borderColor = '#ff5f57'; hasError = true; }

    if (hasError) return;

    // Simulate sending
    formSubmit.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
    formSubmit.disabled  = true;

    setTimeout(() => {
      formSubmit.innerHTML = '<i class="ri-send-plane-fill"></i> Send Message';
      formSubmit.disabled  = false;
      formSuccess.classList.add('show');

      // Reset form
      nameInput.value    = '';
      emailInput.value   = '';
      subjectInput.value = '';
      messageInput.value = '';

      // Hide success after 4s
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1500);
  });
}


/* ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


/* ---- PROJECT CARD HOVER TILT EFFECT ---- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width)  - 0.5) *  8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ---- STRENGTH CARDS HOVER GLOW ---- */
document.querySelectorAll('.strength-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });
});


/* ---- YEAR IN FOOTER (AUTO-UPDATE) ---- */
// Optionally update year dynamically
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.innerHTML = yearEl.innerHTML.replace('2024', new Date().getFullYear());
}


/* ---- NAVBAR LOGO CLICK → SCROLL TOP ---- */
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
