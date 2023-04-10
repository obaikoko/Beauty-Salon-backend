const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  // User Authentication
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(400);
    throw new Error('User not found!');
  }
  // User Verification
  const matchPassword = await bcrypt.compare(password, user.password);
  if (user && !matchPassword) {
    res.status(400);
    throw new Error({ msg: 'Invalid password' });
  }

  if (user && matchPassword) {
    res.status(200);
   res.json({
     name: user.name,
     email,
     token: generateToken(user._id),
   });
  }

});
// @desc Register user
// @route POST /api/register
// @Privacy Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }
  //   check if User already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // Register User
  const user = User.create({ name, email, password: hashPassword });
  res.status(200);
  res.json({
    name,
    email,
    token: generateToken(user._id),
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ msg: `Welcome ${user.name}` });
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
};
