const express = require('express');
const fs = require('fs');
const path = require('path');
const Config = require('../models/Config');
const { adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { isMongoConnected, readJsonFile, writeJsonFile } = require('../utils/db');
const router = express.Router();

const CONFIG_FILE = 'config';

const defaultConfig = {
  siteName: 'Boostify',
  slogan: "L'Alpha du Branding",
  founderName: 'Bello Shouaïb',
  role: 'Infographiste & Brand Designer',
  email: 'bellosuaibou@7gmail.com',
  phone: '+229 66 01 43 36',
  whatsapp: '+225 01 61 49 85 23',
  location: 'Conzagüe Ville',
  website: 'https://www.Boostify.com',
  logoPath: 'images/logo-boostify.svg',
  darkLogoPath: 'images/logo-boostify-dark.svg',
  faviconPath: 'favicon.svg',
  primaryColor: '#F5A623',
  darkColor: '#111111',
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
      'faviconPath', 'primaryColor', 'darkColor'
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
      'faviconPath', 'primaryColor', 'darkColor'
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
    let mime = 'image/jpeg';
    if (ext === '.png') mime = 'image/png';
    else if (ext === '.gif') mime = 'image/gif';
    else if (ext === '.svg') mime = 'image/svg+xml';
    else if (ext === '.webp') mime = 'image/webp';
    const base64 = fs.readFileSync(filePath).toString('base64');
    const logoPath = `data:${mime};base64,${base64}`;
    const config = await saveConfig({ logoPath, darkLogoPath: logoPath });
    fs.unlinkSync(filePath);

    res.json({ success: true, message: 'Logo uploadé avec succès.', logoPath, config });
  } catch (error) {
    console.error('Erreur upload logo:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'upload du logo.' });
  }
});

module.exports = router;
