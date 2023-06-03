const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route('/').get(getProducts)
router.route('/upload').post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
