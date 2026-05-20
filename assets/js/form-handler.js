/* =============================================
   FORM-HANDLER.JS — EmailJS async submit
   Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY
   with your actual EmailJS credentials.
   ============================================= */

// EmailJS CDN is loaded in HTML via script tag
// https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js

document.addEventListener('DOMContentLoaded', () => {
  const EMAILJS_SERVICE_ID  = 'service_4rl3r7o';
  const EMAILJS_TEMPLATE_ID = 'template_qfry5q9';
  const EMAILJS_PUBLIC_KEY  = 'd2QDe1Y6oerjjHQcj';

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn     = form.querySelector('.btn-submit');
  const msgEl   = form.querySelector('.form-message');
  const btnText = btn.querySelector('.btn-text');
  const btnIcon = btn.querySelector('.btn-icon');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    btn.classList.add('loading');
    if (btnText) btnText.textContent = 'Sending...';
    if (btnIcon) btnIcon.textContent = '⏳';
    hideMessage();

    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        showMessage('Message sent! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        // Fallback — EmailJS not loaded (dev mode)
        await simulateDelay(1200);
        showMessage('(Dev mode) Form would be sent in production. EmailJS not configured yet.', 'success');
        form.reset();
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      showMessage('Something went wrong. Try emailing me directly.', 'error');
    } finally {
      btn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Send it. I read everything.';
      if (btnIcon) btnIcon.textContent = '→';
    }
  });

  function showMessage(text, type) {
    msgEl.textContent = text;
    msgEl.className = `form-message ${type}`;
    msgEl.style.display = 'block';
  }

  function hideMessage() {
    msgEl.style.display = 'none';
    msgEl.className = 'form-message';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
