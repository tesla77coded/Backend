import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const getProducts = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword;

  const keywordFilter = keyword ? {
    name: {
      $regex: keyword,
      $options: 'i',
    },
  } : {};

  const count = await Product.countDocuments({ ...keywordFilter });
  const products = await Product.find({ ...keywordFilter })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});


const getProductById = asyncHandler(async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.findById(prodId);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  };
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  return res.status(200).send(products);
});
