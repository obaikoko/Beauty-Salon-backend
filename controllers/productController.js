const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../config/cloudinary');
const Products = require('../models/productModel');

const createProduct = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const description = req.body.desc;
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'jesse',
    });
    console.log(name);
    console.log(description);

    const product = await Products.create({
      name,
      image: {
        publicId: uploadedResponse.public_id,
        url: uploadedResponse.url,
        name,
        description,
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  if (products.length < 1) {
    res.status(400);
    throw new Error('No product has been created yet');
  }
  const images = products.map((product) => {
    return {
      name: product.name,
      url: product.image.url,
      desc: product.image.description,
    };
  });
  res.json(images);
});

const updateProduct = (req, res) => {
  res.send('This is update route');
};
const deleteProduct = (req, res) => {
  res.send('This is delete route');
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
