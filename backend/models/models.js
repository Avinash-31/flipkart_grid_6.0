const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
});

const productSchema = new mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  type: String,
  features: String,
  details: String,
  price: Number,
  discount: Number,
  sellerInfo: {
    name: String,
    email: String,
    phone: String,
  },
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Category, Product };