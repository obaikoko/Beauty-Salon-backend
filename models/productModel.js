const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
      name: {
        type: String,
      },
      description: {
        type: String
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Products', productSchema);
