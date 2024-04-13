const express = require('express');
const {
  getAllProducts,
  getSingleProduct,
} = require('./products.controllers');
const router = express.Router();

router.get('/', getAllProducts).get('/:id', getSingleProduct);

module.exports = router;
