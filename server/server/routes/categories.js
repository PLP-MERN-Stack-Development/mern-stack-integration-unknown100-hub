const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res, next) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) { next(err); }
});

router.post('/', body('name').isString().trim().notEmpty(), async (req, res, next) => {
  try {
    const cat = new Category({ name: req.body.name });
    const saved = await cat.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

module.exports = router;