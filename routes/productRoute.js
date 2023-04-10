const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route('/').post(createProduct).get(getProducts)
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
