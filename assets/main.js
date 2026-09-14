document.addEventListener('DOMContentLoaded', () => {
  // mobile nav
  const menuBtn = document.getElementById('menuBtn');
  const navlist = document.getElementById('navlist');
  if (menuBtn && navlist) {
    menuBtn.addEventListener('click', () => {
      const open = navlist.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navlist.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navlist.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // hero background slideshow (cross-fade)
  const slideshow = document.querySelector('.hero-slideshow');
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (slides.length > 1 && !reduceMotion) {
      let current = 0;
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 4500);
    }
  }

  // contact form -> mailto fallback
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent(form.subject ? form.subject.value : 'Website enquiry');
      const name = `${form.fname ? form.fname.value : ''} ${form.lname ? form.lname.value : ''}`.trim();
      const body = encodeURIComponent(`${form.message.value}\n\n— ${name} (${form.email.value}${form.phone && form.phone.value ? ', ' + form.phone.value : ''})`);
      window.location.href = `mailto:info@thembilefoodsecuritysa.org.za?subject=${subject}&body=${body}`;
    });
  }

  // footer / other simple newsletter forms: no-op with a small confirmation
  document.querySelectorAll('form.foot-newsletter').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = f.querySelector('button');
      if (btn) { const orig = btn.textContent; btn.textContent = 'Subscribed!'; setTimeout(() => btn.textContent = orig, 2200); }
      f.reset();
    });
  });

  // ============ DONATE PAGE ============
  const amountGrid = document.querySelector('.amount-grid');
  const customInput = document.getElementById('customAmount');
  const summaryAmt = document.querySelector('.donation-summary .amt');
  const donateCtaAmt = document.getElementById('donateCtaAmount');
  const donateCtaBtn = document.getElementById('donateCtaBtn');

  function setAmount(val) {
    if (summaryAmt) summaryAmt.textContent = 'R' + Number(val).toLocaleString('en-ZA');
    if (donateCtaAmt) donateCtaAmt.textContent = Number(val).toLocaleString('en-ZA');
  }

  if (amountGrid) {
    amountGrid.querySelectorAll('.amount-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!btn.dataset.amount) { if (customInput) customInput.focus(); return; }
        amountGrid.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (customInput) customInput.value = '';
        setAmount(btn.dataset.amount);
      });
    });
  }
  if (customInput) {
    customInput.addEventListener('input', () => {
      if (customInput.value) {
        amountGrid.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        setAmount(customInput.value || 0);
      }
    });
  }

  const giveTabs = document.querySelectorAll('.give-tab');
  giveTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      giveTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  const payOptions = document.querySelectorAll('.pay-option');
  payOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      payOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  if (donateCtaBtn) {
    donateCtaBtn.addEventListener('click', () => {
      alert('Online payment processing is being finalised. Please use the EFT details below, or contact us directly to complete your donation.');
    });
  }
});
