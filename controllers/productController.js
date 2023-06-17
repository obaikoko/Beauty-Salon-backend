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
      transformation: [{ width: 200, height: 200, crop: 'scale' }],
    });

    const products = await Products.create({
      name,
      image: {
        publicId: uploadedResponse.public_id,
        url: uploadedResponse.url,
        name,
        description,
      },
    });

   
    res.json('Image created successfully');
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

        let imageUrl = product.image.url;
        imageUrl = imageUrl.replace('/upload/', '/upload/w_300,h_300/');
    return {
      Id: product._id,
      name: product.name,
      url: imageUrl,
      desc: product.image.description,
    };
  });
  res.json(images);
});

const updateProduct = (req, res) => {
  res.send('This is update route');
};
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error('product not found');
  }
  await product.remove();
  res.status(200).json(req.params.id);
});

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
