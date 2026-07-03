// Language management
const langData = {
  fr: {
    // Page title
    title: "Boostify — L'Alpha du Branding",
    // Navigation
    nav: {
      services: "Services",
      packs: "Packs",
      portfolio: "Portfolio",
      about: "À propos",
      order: "Commander"
    },
    // Hero
    hero: {
      eyebrow: "Infographie & Branding",
      title1: "L'Alpha",
      title2: "du Branding",
      desc: "Boostify donne vie à votre identité visuelle. Logos, affiches, réseaux sociaux, impressions, sites web — tout ce dont votre marque a besoin pour briller.",
      cta1: "Demander un devis",
      cta2: "Voir nos réalisations",
      stat1: "projets livrés",
      stat2: "clients satisfaits",
      stat3: "années d'expérience"
    },
    // Sections
    sections: {
      servicesTitle: "Des solutions créatives pour chaque besoin",
      servicesEyebrow: "Nos expertises",
      packsTitle: "Choisissez le pack adapté à votre ambition",
      packsEyebrow: "Nos packs",
      processTitle: "Comment nous travaillons",
      processEyebrow: "Notre méthode",
      portfolioTitle: "Quelques créations Boostify",
      portfolioEyebrow: "Portfolio",
      aboutTitle: "Donner du pouvoir à chaque marque",
      aboutEyebrow: "À propos",
      contactTitle: "Lancez votre projet dès maintenant",
      contactEyebrow: "Commander"
    },
    // Services
    services: {
      graphicTitle: "Création graphique",
      graphicDesc: "Logos, affiches, flyers, cartes de visite, bannières, menus et visuels réseaux sociaux.",
      printTitle: "Impression",
      printDesc: "Cartes de visite, flyers, bâches, autocollants, T-shirts personnalisés, facturiers et carnets de reçus.",
      socialTitle: "Réseaux sociaux",
      socialDesc: "Création de pages, contenus mensuels, publicités Facebook/Instagram et optimisation de profils.",
      businessTitle: "Services entreprises",
      businessDesc: "Identité visuelle complète, présentations, brochures, catalogues et signatures e-mail.",
      digitalTitle: "Services numériques",
      digitalDesc: "Sites vitrines, CV professionnels, portfolios, QR codes personnalisés et création de contenu.",
      adsTitle: "Accompagnement publicitaire",
      adsDesc: "Stratégie, création de campagnes, suivi et optimisation pour maximiser votre retour sur investissement."
    },
    // Packs
    packs: {
      starterBadge: "Idéal démarrage",
      businessBadge: "Le plus populaire",
      premiumBadge: "Tout inclus",
      starterBtn: "Choisir ce pack",
      businessBtn: "Choisir ce pack",
      premiumBtn: "Choisir ce pack",
      logo: "1 logo professionnel",
      card: "Carte de visite",
      fbVisual: "Visuel Facebook",
      flyer: "Flyer",
      fbCover: "Couverture Facebook",
      identity: "Identité visuelle complète",
      social10: "10 visuels réseaux sociaux",
      support: "Accompagnement publicitaire"
    },
    // Process
    process: {
      briefTitle: "Brief",
      briefDesc: "Vous décrivez votre projet, vos objectifs et vos inspirations.",
      designTitle: "Conception",
      designDesc: "Nous créons des propositions créatives et affinons ensemble.",
      deliveryTitle: "Livraison",
      deliveryDesc: "Vous recevez vos fichiers prêts à l'impression et au web."
    },
    // Portfolio
    portfolio: {
      card1: "Carte de visite premium",
      card2: "Sacs & packaging",
      card3: "T-shirt personnalisé",
      card4: "Logo & identité visuelle"
    },
    // About
    about: {
      role: "Infographiste & Brand Designer",
      p1: "Je suis Bello Shouaïb, fondateur de Boostify. Je conçois des identités visuelles impactantes et des supports de communication modernes pour entrepreneurs, entreprises et particuliers. Mon objectif : transformer vos idées en designs mémorables qui boostent votre image.",
      p2: "Basé à Conzagüe Ville, je travaille avec des clients en Côte d'Ivoire et au-delà."
    },
    // Testimonials
    testimonials: {
      eyebrow: "Ils nous ont fait confiance",
      title: "Ce que disent nos clients",
      leaveReview: "Laisser un avis",
      shareExperience: "Partagez votre expérience",
      willBeValidated: "Votre avis sera publié après validation.",
      yourName: "Votre nom",
      rating: "Note",
      yourReview: "Votre commentaire",
      sendReview: "Envoyer mon avis",
      success: "✅ Merci ! Votre avis sera publié après validation.",
      error: "❌ Une erreur est survenue. Veuillez réessayer."
    },
    // Contact
    contact: {
      title: "Parlons de votre projet",
      desc: "Remplissez le formulaire pour demander un devis ou commander un pack. Je vous réponds dans les 24 heures.",
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      company: "Entreprise (optionnel)",
      service: "Pack ou service souhaité",
      website: "Création de site web",
      select: "Sélectionnez...",
      message: "Décrivez votre projet",
      language: "Langue de préférence",
      submit: "Envoyer la demande",
      success: "✅ Demande envoyée avec succès ! Je vous réponds dans les 24 heures.",
      error: "❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement."
    },
    // Footer
    footer: {
      tagline: "L'Alpha du Branding. Votre identité visuelle, notre mission.",
      services: "Services",
      packs: "Packs",
      contact: "Contact",
      rights: "Tous droits réservés."
    }
  },
  en: {
    title: "Boostify — The Alpha of Branding",
    nav: {
      services: "Services",
      packs: "Packs",
      portfolio: "Portfolio",
      about: "About",
      order: "Order"
    },
    hero: {
      eyebrow: "Graphic Design & Branding",
      title1: "The Alpha",
      title2: "of Branding",
      desc: "Boostify brings your visual identity to life. Logos, posters, social media, printing, websites — everything your brand needs to shine.",
      cta1: "Request a quote",
      cta2: "See our work",
      stat1: "projects delivered",
      stat2: "happy clients",
      stat3: "years of experience"
    },
    sections: {
      servicesTitle: "Creative solutions for every need",
      servicesEyebrow: "Our expertise",
      packsTitle: "Choose the pack that fits your ambition",
      packsEyebrow: "Our packs",
      processTitle: "How we work",
      processEyebrow: "Our method",
      portfolioTitle: "Some Boostify creations",
      portfolioEyebrow: "Portfolio",
      aboutTitle: "Empowering every brand",
      aboutEyebrow: "About",
      contactTitle: "Start your project now",
      contactEyebrow: "Order"
    },
    services: {
      graphicTitle: "Graphic design",
      graphicDesc: "Logos, posters, flyers, business cards, banners, menus and social media visuals.",
      printTitle: "Printing",
      printDesc: "Business cards, flyers, banners, stickers, custom T-shirts, invoices and receipt books.",
      socialTitle: "Social media",
      socialDesc: "Page creation, monthly content, Facebook/Instagram ads and profile optimization.",
      businessTitle: "Business services",
      businessDesc: "Complete visual identity, presentations, brochures, catalogs and email signatures.",
      digitalTitle: "Digital services",
      digitalDesc: "Showcase websites, professional CVs, portfolios, custom QR codes and content creation.",
      adsTitle: "Advertising support",
      adsDesc: "Strategy, campaign creation, tracking and optimization to maximize your return on investment."
    },
    packs: {
      starterBadge: "Ideal startup",
      businessBadge: "Most popular",
      premiumBadge: "All inclusive",
      starterBtn: "Choose this pack",
      businessBtn: "Choose this pack",
      premiumBtn: "Choose this pack",
      logo: "1 professional logo",
      card: "Business card",
      fbVisual: "Facebook visual",
      flyer: "Flyer",
      fbCover: "Facebook cover",
      identity: "Complete visual identity",
      social10: "10 social media visuals",
      support: "Advertising support"
    },
    process: {
      briefTitle: "Brief",
      briefDesc: "You describe your project, goals and inspirations.",
      designTitle: "Design",
      designDesc: "We create creative proposals and refine them together.",
      deliveryTitle: "Delivery",
      deliveryDesc: "You receive your files ready for print and web."
    },
    portfolio: {
      card1: "Premium business card",
      card2: "Bags & packaging",
      card3: "Custom T-shirt",
      card4: "Logo & visual identity"
    },
    about: {
      role: "Graphic Designer & Brand Designer",
      p1: "I am Bello Shouaïb, founder of Boostify. I design impactful visual identities and modern communication materials for entrepreneurs, businesses and individuals. My goal: transform your ideas into memorable designs that boost your image.",
      p2: "Based in Conzagüe Ville, I work with clients in Côte d'Ivoire and beyond."
    },
    // Testimonials
    testimonials: {
      eyebrow: "They trusted us",
      title: "What our clients say",
      leaveReview: "Leave a review",
      shareExperience: "Share your experience",
      willBeValidated: "Your review will be published after validation.",
      yourName: "Your name",
      rating: "Rating",
      yourReview: "Your review",
      sendReview: "Send my review",
      success: "✅ Thank you! Your review will be published after validation.",
      error: "❌ An error occurred. Please try again."
    },
    contact: {
      title: "Let's talk about your project",
      desc: "Fill out the form to request a quote or order a pack. I will respond within 24 hours.",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      company: "Company (optional)",
      service: "Desired pack or service",
      website: "Website creation",
      select: "Select...",
      message: "Describe your project",
      language: "Preferred language",
      submit: "Send request",
      success: "✅ Request sent successfully! I will respond within 24 hours.",
      error: "❌ An error occurred. Please try again or contact me directly."
    },
    footer: {
      tagline: "The Alpha of Branding. Your visual identity, our mission.",
      services: "Services",
      packs: "Packs",
      contact: "Contact",
      rights: "All rights reserved."
    }
  }
};

let currentLang = 'fr';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
  document.title = langData[lang].title;

  // Update all elements with data-fr and data-en
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // Update buttons with pack data
  document.querySelectorAll('.select-pack').forEach(btn => {
    btn.textContent = langData[lang].packs[btn.dataset.packKey || 'starterBtn'];
  });

  // Update options in select
  const select = document.getElementById('pack');
  if (select) {
    select.options[0].textContent = langData[lang].contact.select;
    select.options[3].textContent = langData[lang].packs.identity;
    select.options[4].textContent = langData[lang].contact.website || (lang === 'fr' ? "Création de site web" : "Website creation");
    select.options[5].textContent = lang === 'fr' ? "Publicités réseaux sociaux" : "Social media ads";
    select.options[6].textContent = lang === 'fr' ? "Autre (précisez ci-dessous)" : "Other (specify below)";
  }

  // Update language preference select
  const langueSelect = document.getElementById('langue');
  if (langueSelect) {
    langueSelect.options[0].textContent = 'Français';
    langueSelect.options[1].textContent = 'English';
  }

  // Toggle buttons
  const btnFr = document.getElementById('btn-fr');
  const btnEn = document.getElementById('btn-en');
  if (btnFr && btnEn) {
    btnFr.classList.toggle('active', lang === 'fr');
    btnEn.classList.toggle('active', lang === 'en');
  }

  // Store preference
  localStorage.setItem('boostify-lang', lang);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('boostify-lang') || 'fr';
  setLanguage(savedLang);

  const btnFr = document.getElementById('btn-fr');
  const btnEn = document.getElementById('btn-en');
  if (btnFr) btnFr.addEventListener('click', () => setLanguage('fr'));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
});
