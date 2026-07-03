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
    default: 'bellosuaibou@7gmail.com'
  },
  phone: {
    type: String,
    default: '+229 66 01 43 36'
  },
  whatsapp: {
    type: String,
    default: '+225 01 61 49 85 23'
  },
  location: {
    type: String,
    default: 'Conzagüe Ville'
  },
  website: {
    type: String,
    default: 'https://www.Boostify.com'
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
