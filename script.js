// Moon Formations — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === SCROLL REVEAL ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.why-card, .domain-card, .featured-card, .indicator-card, .testi-card, .fo-card, .critere-card, .value-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // === CATALOGUE FILTERS ===
  const filterInputs = document.querySelectorAll('.filter-option input');
  const searchInput = document.querySelector('.filter-search');
  const formationCards = document.querySelectorAll('.formation-card');
  const catalogueCount = document.querySelector('.catalogue-count');

  function filterCatalogue() {
    const activeCategories = [];
    filterInputs.forEach(input => {
      if (input.checked) activeCategories.push(input.value);
    });
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    let count = 0;
    formationCards.forEach(card => {
      const cat = card.dataset.category || '';
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.card-description')?.textContent.toLowerCase() || '';

      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(cat);
      const searchMatch = searchTerm === '' || title.includes(searchTerm) || desc.includes(searchTerm);

      if (categoryMatch && searchMatch) {
        card.classList.remove('hidden');
        count++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (catalogueCount) {
      catalogueCount.textContent = `${count} formation${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
    }
  }

  filterInputs.forEach(input => input.addEventListener('change', filterCatalogue));
  if (searchInput) searchInput.addEventListener('input', filterCatalogue);

  // Filter from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    filterInputs.forEach(input => {
      if (input.value === catParam) {
        input.checked = true;
        // Highlight active filter
        input.closest('.filter-option')?.classList.add('active');
      }
    });
    filterCatalogue();
  }

  // === PROGRAMME ACCORDIONS ===
  document.querySelectorAll('.pm-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const toggle = header.querySelector('.pm-toggle');
      if (content) {
        content.classList.toggle('open');
        if (toggle) toggle.textContent = content.classList.contains('open') ? '−' : '+';
      }
    });
  });

  // === FORM — Web3Forms ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Envoi en cours…';
        btn.disabled = true;
      }
      // Let the form submit naturally to Web3Forms
    });
  }

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.ic-number, .stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        if (!isNaN(num) && num > 0) {
          let start = 0;
          const duration = 1500;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const current = Math.floor(progress * num);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = text; // restore original
          };
          requestAnimationFrame(step);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // === HERO CARD ANIMATION ===
  const hcards = document.querySelectorAll('.hcard');
  hcards.forEach((card, i) => {
    card.style.animationDelay = `${0.5 + i * 0.15}s`;
    card.style.animation = 'fadeUp 0.8s ease both';
  });

  // === SMOOTH ANCHOR SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
