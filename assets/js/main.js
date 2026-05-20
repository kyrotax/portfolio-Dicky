/* =============================================
   MAIN.JS — Scroll, Nav, Marquee, Cursor,
   IntersectionObserver, Scroll-to-top
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     CUSTOM CURSOR
  ------------------------------------------ */
  const cursorDot  = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left  = mouseX + 'px';
      cursorDot.style.top   = mouseY + 'px';
    });

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover effects
    const interactives = document.querySelectorAll('a, button, [role="button"], .bento-card, .project-card, .work-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform  = 'translate(-50%, -50%) scale(2.5)';
        cursorRing.style.width     = '56px';
        cursorRing.style.height    = '56px';
        cursorRing.style.borderColor = 'rgba(255,59,0,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform  = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.width     = '36px';
        cursorRing.style.height    = '36px';
        cursorRing.style.borderColor = 'rgba(255,59,0,0.4)';
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* ------------------------------------------
     NAV — Scroll behavior
  ------------------------------------------ */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ------------------------------------------
     MOBILE NAV TOGGLE
  ------------------------------------------ */
  const toggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ------------------------------------------
     SCROLL-TO-TOP BUTTON
  ------------------------------------------ */
  const scrollBtn = document.querySelector('.scroll-top-btn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     ACTIVE NAV LINK
  ------------------------------------------ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = '#F5F0E8';
    }
  });

  /* ------------------------------------------
     HERO — Animated entrance
  ------------------------------------------ */
  const heroElements = document.querySelectorAll('.hero-animate');
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.12}s`;
    el.classList.add('fade-up-active');
  });

});
