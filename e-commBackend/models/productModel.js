import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true, },
    rating: { type: Number, required: true, },
    comment: { type: String, required: true, },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    name: {
      type: String,
      required: [true, 'Please add a prodcut name.'],
    },

    image: {
      type: String,
      required: [true, 'Please add an image path or URL.'],
    },

    brand: {
      type: String,
      required: [true, 'Please add a brand.'],
    },

    category: {
      type: String,
      required: [true, 'Please provide a category.'],
    },

    description: {
      type: String,
      required: [true, 'Please add description.'],
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  {
    timestamps: true,
  },
)

const Product = mongoose.model('Prodcut', productSchema);

export default Product;
