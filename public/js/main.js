// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');
  const navLinks = nav.querySelectorAll('a');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.service-card, .pack-card, .step, .portfolio-item, .testimonial-card, .about-grid, .contact-grid');
  window.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    window.revealObserver.observe(el);
  });

  // Load dynamic config
  loadConfig();

  // Load testimonials
  loadTestimonials();

  // Load portfolio
  loadPortfolio();

  // Pack selection
  const packButtons = document.querySelectorAll('.select-pack');
  const packSelect = document.getElementById('pack');

  packButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPack = btn.dataset.pack;
      if (packSelect) {
        packSelect.value = selectedPack;
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Order form submission
  const orderForm = document.getElementById('orderForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
      formMessage.className = 'form-message';
      formMessage.style.display = 'none';

      const formData = new FormData(orderForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          formMessage.textContent = currentLang === 'fr'
            ? '✅ Demande envoyée avec succès ! Je vous réponds dans les 24 heures.'
            : '✅ Request sent successfully! I will respond within 24 hours.';
          formMessage.className = 'form-message success';
          orderForm.reset();
        } else {
          throw new Error(result.message || 'Erreur serveur');
        }
      } catch (error) {
        console.error('Erreur:', error);
        formMessage.textContent = currentLang === 'fr'
          ? '❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement.'
          : '❌ An error occurred. Please try again or contact me directly.';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // Testimonial modal
  const openTestimonialBtn = document.getElementById('openTestimonialBtn');
  const testimonialModal = document.getElementById('testimonialModal');
  const closeTestimonialModal = document.getElementById('closeTestimonialModal');
  const testimonialForm = document.getElementById('testimonialForm');
  const testimonialMessage = document.getElementById('testimonialMessage');

  if (openTestimonialBtn && testimonialModal) {
    openTestimonialBtn.addEventListener('click', () => {
      testimonialModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeTestimonialModal && testimonialModal) {
    closeTestimonialModal.addEventListener('click', () => {
      testimonialModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    testimonialModal.addEventListener('click', (e) => {
      if (e.target === testimonialModal) {
        testimonialModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = testimonialForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
      testimonialMessage.className = 'form-message';
      testimonialMessage.style.display = 'none';

      const formData = new FormData(testimonialForm);
      const data = Object.fromEntries(formData.entries());
      data.lang = currentLang;

      try {
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          testimonialMessage.textContent = currentLang === 'fr'
            ? '✅ Merci ! Votre avis sera publié après validation.'
            : '✅ Thank you! Your review will be published after validation.';
          testimonialMessage.className = 'form-message success';
          testimonialForm.reset();
          setTimeout(() => {
            testimonialModal.classList.remove('active');
            document.body.style.overflow = '';
          }, 2000);
        } else {
          throw new Error(result.message || 'Erreur serveur');
        }
      } catch (error) {
        console.error('Erreur:', error);
        testimonialMessage.textContent = currentLang === 'fr'
          ? '❌ Une erreur est survenue. Veuillez réessayer.'
          : '❌ An error occurred. Please try again.';
        testimonialMessage.className = 'form-message error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});

// Load site configuration
async function loadConfig() {
  try {
    const response = await fetch('/api/config');
    const result = await response.json();

    if (!result.success || !result.config) return;

    const config = result.config;

    // Update logo images
    const logoIds = ['siteLogo', 'heroLogo', 'aboutLogo', 'footerLogo'];
    logoIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && config.logoPath) {
        el.src = config.logoPath;
      }
    });

    // Update favicon
    const favicon = document.getElementById('favicon');
    if (favicon && config.faviconPath) {
      favicon.href = config.faviconPath;
    }

    // Update founder info
    if (config.founderName) {
      const founderName = document.getElementById('founderName');
      const footerFounderName = document.getElementById('footerFounderName');
      if (founderName) founderName.textContent = config.founderName;
      if (footerFounderName) footerFounderName.textContent = config.founderName;
    }

    if (config.role) {
      const founderRole = document.getElementById('founderRole');
      if (founderRole) founderRole.textContent = config.role;
    }

    // Update contact info
    if (config.email) {
      updateContactLink('mailto:', config.email, config.email);
    }
    if (config.phone) {
      updateContactLink('tel:', config.phone.replace(/\s/g, ''), config.phone);
    }
    if (config.whatsapp) {
      const cleanWhatsapp = config.whatsapp.replace(/[\s+]/g, '');
      updateContactLink('https://wa.me/', cleanWhatsapp, `WhatsApp : ${config.whatsapp}`);

      // Update WhatsApp float button
      const whatsappFloat = document.getElementById('whatsappFloat');
      if (whatsappFloat) {
        const message = currentLang === 'fr'
          ? `Bonjour ${config.siteName || 'Boostify'}, je souhaite avoir plus d'informations sur vos services.`
          : `Hello ${config.siteName || 'Boostify'}, I would like more information about your services.`;
        whatsappFloat.href = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
      }
    }
    if (config.location) {
      const locationEl = document.querySelector('.info-item:last-child span:last-child');
      if (locationEl) locationEl.textContent = config.location;
    }

    // Update site name and slogan
    if (config.siteName) {
      document.title = config.siteName;
      const footerSiteName = document.getElementById('footerSiteName');
      if (footerSiteName) footerSiteName.textContent = config.siteName;
    }

    if (config.slogan || config.footerText) {
      const sloganEl = document.getElementById('sloganText');
      if (sloganEl) {
        const text = config.footerText || config.slogan;
        sloganEl.textContent = text;
        sloganEl.setAttribute('data-fr', text);
      }
    }

    if (config.description) {
      const heroDesc = document.getElementById('heroDescription');
      if (heroDesc) {
        heroDesc.textContent = config.description;
        heroDesc.setAttribute('data-fr', config.description);
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', config.description);
    }

    if (config.aboutTitle) {
      const aboutTitle = document.getElementById('aboutTitle');
      if (aboutTitle) {
        aboutTitle.textContent = config.aboutTitle;
        aboutTitle.setAttribute('data-fr', config.aboutTitle);
      }
    }

    if (config.aboutText) {
      const aboutText = document.getElementById('aboutText');
      if (aboutText) {
        aboutText.textContent = config.aboutText;
        aboutText.setAttribute('data-fr', config.aboutText);
      }
    }

    if (config.metaKeywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', config.metaKeywords);
    }

    if (config.primaryColor) {
      document.documentElement.style.setProperty('--orange', config.primaryColor);
    }
    if (config.darkColor) {
      document.documentElement.style.setProperty('--black', config.darkColor);
    }

  } catch (error) {
    console.error('Erreur chargement config:', error);
  }
}

function updateContactLink(prefix, value, displayText) {
  const links = document.querySelectorAll(`a[href^="${prefix}"]`);
  links.forEach(link => {
    link.href = `${prefix}${value}`;
    const span = link.querySelector('span:last-child');
    if (span) span.textContent = displayText;
  });
}

// Load testimonials (appends server-approved testimonials to existing static ones)
async function loadTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  try {
    const response = await fetch(`/api/testimonials?_t=${Date.now()}`);
    const result = await response.json();

    if (!result.success || !result.testimonials || result.testimonials.length === 0) {
      // Keep default static testimonials
      return;
    }

    const cards = result.testimonials.map(t => {
      const initials = t.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const stars = '⭐'.repeat(t.rating || 5);
      return `
        <div class="testimonial-card reveal">
          <div class="testimonial-quote">"</div>
          <div class="testimonial-stars">${stars}</div>
          <p class="testimonial-text">${escapeHtml(t.text)}</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${initials}</div>
            <div>
              <div class="testimonial-name">${escapeHtml(t.name)}</div>
              <div class="testimonial-company">${escapeHtml(t.company || '')}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.insertAdjacentHTML('beforeend', cards);
    grid.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));
  } catch (error) {
    console.error('Erreur chargement témoignages:', error);
    // Keep default static testimonials on error
  }
}

// Load portfolio (appends server portfolio items to existing static ones)
async function loadPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  try {
    const response = await fetch(`/api/portfolio?_t=${Date.now()}`);
    const result = await response.json();

    if (!result.success || !result.items || result.items.length === 0) {
      // Keep default static portfolio
      return;
    }

    const items = result.items.map(item => {
      const title = currentLang === 'en' && item.titleEn ? item.titleEn : item.title;
      const imageSrc = item.imagePath.startsWith('data:') ? item.imagePath : `${item.imagePath}?_t=${Date.now()}`;
      return `
        <div class="portfolio-item reveal">
          <div class="portfolio-img">
            <img src="${imageSrc}" alt="${escapeHtml(title)}" loading="lazy">
          </div>
          <p>${escapeHtml(title)}</p>
        </div>
      `;
    }).join('');

    grid.insertAdjacentHTML('beforeend', items);
    grid.querySelectorAll('.reveal').forEach(el => window.revealObserver.observe(el));
  } catch (error) {
    console.error('Erreur chargement portfolio:', error);
    // Keep default static portfolio on error
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
