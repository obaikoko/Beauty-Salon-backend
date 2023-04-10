// const asyncHandler = require('express-async-handler');
// const { cloudinary } = require('../config/cloudinary');


// const getImages = asyncHandler(async (req, res) => {
//   try {
//     const { resources } = await cloudinary.search
//       .expression('folder: dev_setups')
//       .sort_by('public_id', 'desc')
//       .max_results('30')
//       .execute();

//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = {
//   uploadImage,
//   getImages,
// };
