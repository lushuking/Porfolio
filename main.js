/* ============================================================
   RYAN JAY CASTELLANO PORTFOLIO — main.js
   Handles: Loader, Navbar, Mobile Menu, Typewriter, Particles,
            Scroll Reveal, Counter Animation, Form, Back to Top
   ============================================================ */

'use strict';

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initCounters();
    initParticles();
  }, 2200);
});

document.body.style.overflow = 'hidden';

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar
  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to Top
  if (scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  // Active nav link
  updateActiveNavLink();
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ===== MOBILE MENU ===== */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

/* ===== TYPEWRITER EFFECT ===== */
const roles = [
  'Video Production Specialist',
  'Content Creator',
  'Web Developer',
  'IT Professional',
  'Graphic Designer',
  'System Programmer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  if (!typeEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 50 : 80;
  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 2500);

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = Math.min(siblingIndex * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px',
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = Math.ceil(duration / target);
        let current = 0;

        const timer = setInterval(() => {
          current += Math.ceil(target / 60);
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current;
        }, step);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}

/* ===== CANVAS PARTICLES ===== */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const particles = [];
  const count = Math.min(60, Math.floor(canvas.width / 20));

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life <= 0) {
        this.reset();
      }
    }

    draw() {
      const fadeRatio = this.life / this.maxLife;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(215, 255, 224, ${this.opacity * fadeRatio})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  // Connection lines
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const opacity = (1 - dist / 100) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(215, 255, 224, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  let animFrame;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // Pause when not visible (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      animate();
    }
  });
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const formMailtoBtn = document.getElementById('formMailtoBtn');
const formErrorText = document.getElementById('formErrorText');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput.value.trim();

    let hasError = false;
    [{ el: nameInput, val: name }, { el: emailInput, val: email }, { el: messageInput, val: message }].forEach(f => {
      if (!f.val) {
        f.el.style.borderColor = '#ff6b6b';
        f.el.addEventListener('input', () => { f.el.style.borderColor = ''; }, { once: true });
        hasError = true;
      }
    });

    if (hasError) return;

    // Build mailto fallback URL
    const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const mailBody = encodeURIComponent(`Hi Ryan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:ryancastellano13@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    if (formMailtoBtn) {
      formMailtoBtn.href = mailtoUrl;
    }

    // Loading state
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    const origText = btnSpan.textContent;
    btnSpan.textContent = 'Sending...';
    btnIcon.className = 'ph ph-circle-notch';
    btnIcon.style.animation = 'spin-icon 1s linear infinite';

    if (formError) formError.hidden = true;
    if (formSuccess) formSuccess.hidden = true;

    // Add spin keyframe if not present
    if (!document.getElementById('spin-style')) {
      const style = document.createElement('style');
      style.id = 'spin-style';
      style.textContent = '@keyframes spin-icon { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '1f578a89-763b-4e94-a86b-eba13c9f94e8',
          name: name,
          email: email,
          subject: subject || `New Portfolio Message from ${name}`,
          message: message,
          from_name: 'Ryan Jay Castellano Portfolio'
        })
      });

      const data = await response.json();

      if (data.success || response.status === 200) {
        contactForm.reset();
        if (formSuccess) formSuccess.hidden = false;
        setTimeout(() => {
          if (formSuccess) formSuccess.hidden = true;
        }, 6000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Contact form submission error:', err);

      // If opened locally or fetch blocked, fallback to native submission
      if (window.location.protocol === 'file:') {
        contactForm.submit();
        return;
      }

      if (formErrorText) {
        formErrorText.textContent = 'Service temporarily unreachable. Send directly via email:';
      }
      if (formError) formError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      btnSpan.textContent = origText;
      btnIcon.className = 'ph ph-paper-plane-tilt';
      btnIcon.style.animation = '';
    }
  });
}

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== KEYBOARD ACCESSIBILITY: ESC closes mobile menu ===== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeLightbox();
  }
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowLeft') lightboxPrev();
});

/* ===== LIGHTBOX ===== */
const workImages = [
  { src: 'works/1.png',  caption: 'Work Sample 1'  },
  { src: 'works/2.png',  caption: 'Work Sample 2'  },
  { src: 'works/3.png',  caption: 'Work Sample 3'  },
  { src: 'works/4.png',  caption: 'Work Sample 4'  },
  { src: 'works/5.png',  caption: 'Work Sample 5'  },
  { src: 'works/6.png',  caption: 'Work Sample 6'  },
  { src: 'works/7.png',  caption: 'Work Sample 7'  },
  { src: 'works/8.png',  caption: 'Work Sample 8'  },
  { src: 'works/9.png',  caption: 'Work Sample 9'  },
  { src: 'works/10.png', caption: 'Work Sample 10' },
  { src: 'works/11.png', caption: 'Work Sample 11' },
];

let lightboxCurrentIndex = 0;

const lightboxEl     = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxCap    = document.getElementById('lightboxCaption');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxPrevEl = document.getElementById('lightboxPrev');
const lightboxNextEl = document.getElementById('lightboxNext');
const lightboxBack   = document.getElementById('lightboxBackdrop');

function openLightbox(src, caption) {
  const idx = workImages.findIndex(w => w.src === src);
  lightboxCurrentIndex = idx >= 0 ? idx : 0;
  setLightboxImage(lightboxCurrentIndex);
  lightboxEl.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function setLightboxImage(index) {
  const item = workImages[index];
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCap.textContent = `${item.caption}  (${index + 1} / ${workImages.length})`;
    lightboxImg.style.opacity = '1';
  }, 150);
}

function lightboxNext() {
  if (!lightboxEl || lightboxEl.hasAttribute('hidden')) return;
  lightboxCurrentIndex = (lightboxCurrentIndex + 1) % workImages.length;
  setLightboxImage(lightboxCurrentIndex);
}

function lightboxPrev() {
  if (!lightboxEl || lightboxEl.hasAttribute('hidden')) return;
  lightboxCurrentIndex = (lightboxCurrentIndex - 1 + workImages.length) % workImages.length;
  setLightboxImage(lightboxCurrentIndex);
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBack)  lightboxBack.addEventListener('click', closeLightbox);
if (lightboxNextEl) lightboxNextEl.addEventListener('click', lightboxNext);
if (lightboxPrevEl) lightboxPrevEl.addEventListener('click', lightboxPrev);

