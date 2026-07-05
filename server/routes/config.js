const express = require('express');
const fs = require('fs');
const path = require('path');
const Config = require('../models/Config');
const { adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { processImageFile, processBase64Image } = require('../utils/image');
const { isMongoConnected, readJsonFile, writeJsonFile } = require('../utils/db');
const router = express.Router();

const CONFIG_FILE = 'config';

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
  heroSubtitle: '',
  updatedAt: new Date().toISOString()
};

async function getConfig() {
  if (isMongoConnected()) {
    return await Config.getConfig();
  }
  return readJsonFile(CONFIG_FILE, defaultConfig);
}

async function saveConfig(updates) {
  if (isMongoConnected()) {
    const config = await Config.getConfig();
    const allowedFields = [
      'siteName', 'slogan', 'founderName', 'role', 'email', 'phone',
      'whatsapp', 'location', 'website', 'logoPath', 'darkLogoPath',
      'faviconPath', 'primaryColor', 'darkColor', 'description', 'aboutTitle', 'aboutText', 'footerText', 'metaDescription', 'metaKeywords', 'heroTitle', 'heroSubtitle'
    ];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        config[field] = updates[field];
      }
    });
    config.updatedAt = Date.now();
    await config.save();
    return config;
  } else {
    const config = readJsonFile(CONFIG_FILE, defaultConfig);
    const allowedFields = [
      'siteName', 'slogan', 'founderName', 'role', 'email', 'phone',
      'whatsapp', 'location', 'website', 'logoPath', 'darkLogoPath',
      'faviconPath', 'primaryColor', 'darkColor', 'description', 'aboutTitle', 'aboutText', 'footerText', 'metaDescription', 'metaKeywords', 'heroTitle', 'heroSubtitle'
    ];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        config[field] = updates[field];
      }
    });
    config.updatedAt = new Date().toISOString();
    writeJsonFile(CONFIG_FILE, config);
    return config;
  }
}

// GET /api/config - Public config
router.get('/', async (req, res) => {
  try {
    const config = await getConfig();
    res.json({ success: true, config });
  } catch (error) {
    console.error('Erreur config:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// PUT /api/config - Update config (admin)
router.put('/', adminAuth, async (req, res) => {
  try {
    const config = await saveConfig(req.body);
    res.json({ success: true, message: 'Configuration mise à jour.', config });
  } catch (error) {
    console.error('Erreur mise à jour config:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// POST /api/config/upload-logo - Upload logo (admin)
router.post('/upload-logo', adminAuth, upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier uploadé.' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let logoPath;
    if (ext === '.svg') {
      const base64 = fs.readFileSync(filePath).toString('base64');
      logoPath = `data:image/svg+xml;base64,${base64}`;
    } else {
      const processed = await processImageFile(filePath, 800, 800);
      if (!processed) {
        fs.unlinkSync(filePath);
        return res.status(500).json({ success: false, message: 'Erreur traitement logo.' });
      }
      logoPath = `data:${processed.mime};base64,${processed.buffer.toString('base64')}`;
    }

    fs.unlinkSync(filePath);
    const config = await saveConfig({ logoPath, darkLogoPath: logoPath });

    res.json({ success: true, message: 'Logo uploadé avec succès.', logoPath, config });
  } catch (error) {
    console.error('Erreur upload logo:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'upload du logo.' });
  }
});

async function migrateLogo() {
  if (!isMongoConnected()) return;
  try {
    const config = await Config.getConfig();
    if (config.logoPath && config.logoPath.startsWith('data:') && config.logoPath.length > 200000) {
      const resized = await processBase64Image(config.logoPath, 800, 800);
      if (resized && resized !== config.logoPath) {
        config.logoPath = resized;
        config.darkLogoPath = resized;
        await config.save();
        console.log('🎨 Logo redimensionné et optimisé.');
      }
    }
  } catch (error) {
    console.error('Erreur migration logo:', error.message);
  }
}

router.migrateLogo = migrateLogo;

module.exports = router;
