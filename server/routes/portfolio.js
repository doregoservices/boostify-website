const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { isMongoConnected, readJsonFile, writeJsonFile, generateId } = require('../utils/db');
const router = express.Router();

const PORTFOLIO_FILE = 'portfolio';

const defaultPortfolio = [
  {
    _id: '1',
    title: 'Carte de visite premium',
    titleEn: 'Premium business card',
    imagePath: 'images/portfolio-business-card.jpg',
    category: 'print',
    order: 1,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Sacs & packaging',
    titleEn: 'Bags & packaging',
    imagePath: 'images/portfolio-shopping-bags.jpg',
    category: 'branding',
    order: 2,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'T-shirt personnalisé',
    titleEn: 'Custom T-shirt',
    imagePath: 'images/portfolio-tshirt.jpg',
    category: 'print',
    order: 3,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Logo & identité visuelle',
    titleEn: 'Logo & visual identity',
    imagePath: 'images/portfolio-logo-design.jpg',
    category: 'branding',
    order: 4,
    active: true,
    createdAt: new Date().toISOString()
  }
];

const portfolioValidation = [
  body('title').trim().notEmpty().withMessage('Le titre est obligatoire'),
  body('imagePath').trim().notEmpty().withMessage('L\'image est obligatoire')
];

// GET /api/portfolio - Public portfolio items
router.get('/', async (req, res) => {
  try {
    let items;
    if (isMongoConnected()) {
      items = await Portfolio.find({ active: true }).sort({ order: 1, createdAt: -1 });
    } else {
      items = readJsonFile(PORTFOLIO_FILE, defaultPortfolio)
        .filter(item => item.active)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('Erreur portfolio:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// GET /api/portfolio/all - All items (admin)
router.get('/all', adminAuth, async (req, res) => {
  try {
    let items;
    if (isMongoConnected()) {
      items = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    } else {
      items = readJsonFile(PORTFOLIO_FILE, defaultPortfolio)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('Erreur portfolio admin:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// POST /api/portfolio - Add item (admin)
router.post('/', adminAuth, portfolioValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Vérifiez les champs.', errors: errors.array() });
    }

    const { title, titleEn, imagePath, category, order } = req.body;
    const itemData = {
      title: title.trim(),
      titleEn: titleEn ? titleEn.trim() : '',
      imagePath: imagePath.trim(),
      category: category ? category.trim() : '',
      order: parseInt(order) || 0,
      active: true,
      createdAt: new Date().toISOString()
    };

    let item;
    if (isMongoConnected()) {
      item = new Portfolio(itemData);
      await item.save();
    } else {
      const items = readJsonFile(PORTFOLIO_FILE, defaultPortfolio);
      itemData._id = generateId();
      items.push(itemData);
      writeJsonFile(PORTFOLIO_FILE, items);
      item = itemData;
    }

    res.status(201).json({ success: true, message: 'Projet ajouté.', item });
  } catch (error) {
    console.error('Erreur ajout portfolio:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// POST /api/portfolio/upload - Upload image (admin)
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucune image uploadée.' });
    }
    const imagePath = `images/${req.file.filename}`;
    res.json({ success: true, message: 'Image uploadée.', imagePath });
  } catch (error) {
    console.error('Erreur upload portfolio:', error);
    res.status(500).json({ success: false, message: 'Erreur upload.' });
  }
});

// PATCH /api/portfolio/:id/toggle - Toggle active (admin)
router.patch('/:id/toggle', adminAuth, async (req, res) => {
  try {
    let item;
    if (isMongoConnected()) {
      const existing = await Portfolio.findById(req.params.id);
      if (!existing) return res.status(404).json({ success: false, message: 'Projet non trouvé.' });
      item = await Portfolio.findByIdAndUpdate(req.params.id, { active: !existing.active }, { new: true });
    } else {
      const items = readJsonFile(PORTFOLIO_FILE, defaultPortfolio);
      const index = items.findIndex(i => i._id === req.params.id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Projet non trouvé.' });
      items[index].active = !items[index].active;
      writeJsonFile(PORTFOLIO_FILE, items);
      item = items[index];
    }
    res.json({ success: true, message: 'Statut mis à jour.', item });
  } catch (error) {
    console.error('Erreur toggle portfolio:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// DELETE /api/portfolio/:id - Delete item (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    let deleted = false;
    if (isMongoConnected()) {
      const item = await Portfolio.findByIdAndDelete(req.params.id);
      deleted = !!item;
    } else {
      const items = readJsonFile(PORTFOLIO_FILE, defaultPortfolio);
      const filtered = items.filter(i => i._id !== req.params.id);
      deleted = filtered.length !== items.length;
      writeJsonFile(PORTFOLIO_FILE, filtered);
    }
    if (!deleted) return res.status(404).json({ success: false, message: 'Projet non trouvé.' });
    res.json({ success: true, message: 'Projet supprimé.' });
  } catch (error) {
    console.error('Erreur suppression portfolio:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

module.exports = router;
