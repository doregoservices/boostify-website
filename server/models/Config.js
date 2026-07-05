const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Boostify'
  },
  slogan: {
    type: String,
    default: "L'Alpha du Branding"
  },
  founderName: {
    type: String,
    default: 'Bello Shouaïb'
  },
  role: {
    type: String,
    default: 'Infographiste & Brand Designer'
  },
  email: {
    type: String,
    default: 'boostifygraphics@gmail.com'
  },
  phone: {
    type: String,
    default: '+225 01 61 49 85 23'
  },
  whatsapp: {
    type: String,
    default: '+225 05 96 19 56 39'
  },
  location: {
    type: String,
    default: 'Cocody, Abidjan'
  },
  website: {
    type: String,
    default: 'https://boostify-website.onrender.com'
  },
  logoPath: {
    type: String,
    default: 'images/logo-boostify.svg'
  },
  darkLogoPath: {
    type: String,
    default: 'images/logo-boostify-dark.svg'
  },
  faviconPath: {
    type: String,
    default: 'favicon.svg'
  },
  primaryColor: {
    type: String,
    default: '#F5A623'
  },
  darkColor: {
    type: String,
    default: '#111111'
  },
  description: {
    type: String,
    default: 'Boostify donne vie à votre identité visuelle. Logos, affiches, réseaux sociaux, impressions, sites web — tout ce dont votre marque a besoin pour briller.'
  },
  aboutTitle: {
    type: String,
    default: "Donner du pouvoir à chaque marque"
  },
  aboutText: {
    type: String,
    default: "Je suis Bello Shouaïb, fondateur de Boostify. Je conçois des identités visuelles impactantes et des supports de communication modernes pour entrepreneurs, entreprises et particuliers. Mon objectif : transformer vos idées en designs mémorables qui boostent votre image."
  },
  footerText: {
    type: String,
    default: "Votre identité visuelle, notre mission."
  },
  metaDescription: {
    type: String,
    default: 'Boostify, agence de branding et infographie en Côte d\'Ivoire. Création de logos, flyers, réseaux sociaux, sites web et impression.'
  },
  metaKeywords: {
    type: String,
    default: 'infographie, branding, logo, flyer, réseaux sociaux, Côte d\'Ivoire, Abidjan, Boostify, Bello Shouaïb'
  },
  heroTitle: {
    type: String,
    default: "L'Alpha du Branding"
  },
  heroSubtitle: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one config document exists
configSchema.statics.getConfig = async function() {
  let config = await this.findOne();
  if (!config) {
    config = await this.create({});
  }
  return config;
};

module.exports = mongoose.model('Config', configSchema);
