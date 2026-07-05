const mongoose = require('mongoose');
const Config = require('../models/Config');
const Service = require('../models/Service');
const Pack = require('../models/Pack');
const Portfolio = require('../models/Portfolio');
const Testimonial = require('../models/Testimonial');
const { processImageFile } = require('./image');
const fs = require('fs');
const path = require('path');

const defaultConfig = {
  siteName: 'Boostify',
  slogan: "L'Alpha du Branding",
  founderName: 'Bello Shouaïb',
  role: 'Infographiste & Brand Designer',
  email: 'boostifygraphics@gmail.com',
  phone: '+225 01 61 49 85 23',
  whatsapp: '+225 05 96 19 56 39',
  location: 'Cocody, Abidjan',
  website: 'https://boostify-website.onrender.com',
  logoPath: 'images/logo-boostify.svg',
  darkLogoPath: 'images/logo-boostify-dark.svg',
  faviconPath: 'favicon.svg',
  primaryColor: '#F5A623',
  darkColor: '#111111',
  description: 'Boostify donne vie à votre identité visuelle. Logos, affiches, réseaux sociaux, impressions, sites web — tout ce dont votre marque a besoin pour briller.',
  aboutTitle: "Donner du pouvoir à chaque marque",
  aboutText: "Je suis Bello Shouaïb, fondateur de Boostify. Je conçois des identités visuelles impactantes et des supports de communication modernes pour entrepreneurs, entreprises et particuliers. Mon objectif : transformer vos idées en designs mémorables qui boostent votre image.",
  footerText: "Votre identité visuelle, notre mission.",
  metaDescription: 'Boostify, agence de branding et infographie en Côte d\'Ivoire. Création de logos, flyers, réseaux sociaux, sites web et impression.',
  metaKeywords: 'infographie, branding, logo, flyer, réseaux sociaux, Côte d\'Ivoire, Abidjan, Boostify, Bello Shouaïb',
  heroTitle: "L'Alpha du Branding",
  heroSubtitle: ''
};

const defaultServices = [
  {
    icon: '🎨',
    title: 'Création graphique',
    titleEn: 'Graphic design',
    description: 'Logos, affiches, flyers, cartes de visite, bannières, menus et visuels réseaux sociaux.',
    descriptionEn: 'Logos, posters, flyers, business cards, banners, menus and social media visuals.',
    order: 1,
    active: true
  },
  {
    icon: '🖨️',
    title: 'Impression',
    titleEn: 'Printing',
    description: 'Cartes de visite, flyers, bâches, autocollants, T-shirts personnalisés, facturiers et carnets de reçus.',
    descriptionEn: 'Business cards, flyers, banners, stickers, custom T-shirts, invoices and receipt books.',
    order: 2,
    active: true
  },
  {
    icon: '📱',
    title: 'Réseaux sociaux',
    titleEn: 'Social media',
    description: 'Création de pages, contenus mensuels, publicités Facebook/Instagram et optimisation de profils.',
    descriptionEn: 'Page creation, monthly content, Facebook/Instagram ads and profile optimization.',
    order: 3,
    active: true
  },
  {
    icon: '🏢',
    title: 'Services entreprises',
    titleEn: 'Corporate services',
    description: 'Identité visuelle complète, présentations, brochures, catalogues et signatures e-mail.',
    descriptionEn: 'Complete visual identity, presentations, brochures, catalogs and email signatures.',
    order: 4,
    active: true
  },
  {
    icon: '💻',
    title: 'Services numériques',
    titleEn: 'Digital services',
    description: 'Sites vitrines, CV professionnels, portfolios, QR codes personnalisés et création de contenu.',
    descriptionEn: 'Showcase websites, professional CVs, portfolios, custom QR codes and content creation.',
    order: 5,
    active: true
  },
  {
    icon: '🚀',
    title: 'Accompagnement publicitaire',
    titleEn: 'Advertising support',
    description: 'Stratégie, création de campagnes, suivi et optimisation pour maximiser votre retour sur investissement.',
    descriptionEn: 'Strategy, campaign creation, tracking and optimization to maximize your return on investment.',
    order: 6,
    active: true
  }
];

const defaultPacks = [
  {
    name: 'Pack Starter',
    nameEn: 'Starter Pack',
    price: '15 000 FCFA',
    features: ['1 logo professionnel', 'Carte de visite', 'Visuel Facebook'],
    featuresEn: ['1 professional logo', 'Business card', 'Facebook visual'],
    popular: false,
    order: 1,
    active: true
  },
  {
    name: 'Pack Business',
    nameEn: 'Business Pack',
    price: '35 000 FCFA',
    features: ['1 logo professionnel', 'Carte de visite', 'Flyer', 'Couverture Facebook'],
    featuresEn: ['1 professional logo', 'Business card', 'Flyer', 'Facebook cover'],
    popular: true,
    order: 2,
    active: true
  },
  {
    name: 'Pack Premium',
    nameEn: 'Premium Pack',
    price: '75 000 FCFA',
    features: ['Identité visuelle complète', '10 visuels réseaux sociaux', 'Flyer', 'Carte de visite', 'Accompagnement publicitaire'],
    featuresEn: ['Complete visual identity', '10 social media visuals', 'Flyer', 'Business card', 'Advertising support'],
    popular: false,
    order: 3,
    active: true
  }
];

const defaultPortfolio = [
  {
    title: 'Carte de visite premium',
    titleEn: 'Premium business card',
    imagePath: 'images/portfolio-business-card.jpg',
    category: 'print',
    order: 1,
    active: true
  },
  {
    title: 'Sacs & packaging',
    titleEn: 'Bags & packaging',
    imagePath: 'images/portfolio-shopping-bags.jpg',
    category: 'branding',
    order: 2,
    active: true
  },
  {
    title: 'T-shirt personnalisé',
    titleEn: 'Custom T-shirt',
    imagePath: 'images/portfolio-tshirt.jpg',
    category: 'print',
    order: 3,
    active: true
  },
  {
    title: 'Logo & identité visuelle',
    titleEn: 'Logo & visual identity',
    imagePath: 'images/portfolio-logo-design.jpg',
    category: 'branding',
    order: 4,
    active: true
  }
];

const defaultTestimonials = [
  {
    name: 'Kouassi Jean',
    company: 'Boulangerie La Mie Dorée',
    rating: 5,
    text: 'Boostify a transformé l\'image de ma boulangerie. Le logo et les flyers sont magnifiques. Merci Bello !',
    lang: 'fr',
    approved: true
  },
  {
    name: 'Amina Diallo',
    company: 'Boutique Élégance',
    rating: 5,
    text: 'Très professionnel, réactif et créatif. Je recommande Boostify à tous les entrepreneurs.',
    lang: 'fr',
    approved: true
  },
  {
    name: 'Yao Marcel',
    company: 'Restaurant Chez Kofi',
    rating: 4,
    text: 'Les menus et les visuels Instagram ont vraiment boosté ma présence en ligne. Excellent travail.',
    lang: 'fr',
    approved: true
  }
];

async function imageToBase64(relativePath) {
  try {
    const filePath = path.join(__dirname, '../../public', relativePath);
    if (!fs.existsSync(filePath)) return relativePath;
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.svg') {
      const base64 = fs.readFileSync(filePath).toString('base64');
      return `data:image/svg+xml;base64,${base64}`;
    }
    const processed = await processImageFile(filePath, 1200, 1200);
    if (processed) {
      return `data:${processed.mime};base64,${processed.buffer.toString('base64')}`;
    }
  } catch (err) {
    console.error('Erreur conversion image en base64:', relativePath, err.message);
  }
  return relativePath;
}

async function seedConfig() {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = await Config.create(defaultConfig);
      console.log('✅ Configuration par défaut créée.');
    } else {
      // Update old invalid defaults without overwriting user changes
      let updated = false;
      if (config.location === 'Conzagüe Ville' || config.location === 'Conzagüe') {
        config.location = defaultConfig.location;
        updated = true;
      }
      if (config.email === 'bellosuaibou@7gmail.com') {
        config.email = defaultConfig.email;
        updated = true;
      }
      if (config.phone === '+229 66 01 43 36') {
        config.phone = defaultConfig.phone;
        updated = true;
      }
      if (config.whatsapp === '+225 01 61 49 85 23') {
        config.whatsapp = defaultConfig.whatsapp;
        updated = true;
      }
      if (updated) {
        await config.save();
        console.log('✅ Anciennes informations de contact mises à jour.');
      }
    }
  } catch (err) {
    console.error('Erreur seed config:', err.message);
  }
}

async function seedServices() {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(defaultServices);
      console.log('✅ Services par défaut créés.');
    }
  } catch (err) {
    console.error('Erreur seed services:', err.message);
  }
}

async function seedPacks() {
  try {
    const count = await Pack.countDocuments();
    if (count === 0) {
      await Pack.insertMany(defaultPacks);
      console.log('✅ Packs par défaut créés.');
    }
  } catch (err) {
    console.error('Erreur seed packs:', err.message);
  }
}

async function seedPortfolio() {
  try {
    const count = await Portfolio.countDocuments();
    if (count === 0) {
      const items = [];
      for (const item of defaultPortfolio) {
        items.push({
          ...item,
          imagePath: await imageToBase64(item.imagePath)
        });
      }
      await Portfolio.insertMany(items);
      console.log('✅ Portfolio par défaut créé.');
    }
  } catch (err) {
    console.error('Erreur seed portfolio:', err.message);
  }
}

async function seedTestimonials() {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(defaultTestimonials);
      console.log('✅ Témoignages par défaut créés.');
    }
  } catch (err) {
    console.error('Erreur seed testimonials:', err.message);
  }
}

async function seedAll() {
  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️ MongoDB non connecté. Seed ignoré.');
    return;
  }
  console.log('🌱 Vérification des données par défaut...');
  await seedConfig();
  await seedServices();
  await seedPacks();
  await seedPortfolio();
  await seedTestimonials();
  console.log('🌱 Seed terminé.');
}

module.exports = { seedAll };
