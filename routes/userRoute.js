const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  loginUser,
  registerUser,
  getMe,
} = require('../controllers/userController');
const router = express.Router();

router.route('/').get(getMe);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
