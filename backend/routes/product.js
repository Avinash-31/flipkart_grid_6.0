const express = require('express');
const auth = require('../middleware/auth'); // Import the auth middleware
const { Product } = require('../models/models'); // Import the Product model

const router = express.Router();

router.post('/products', auth, async (req, res) => {
  const product = new Product({ ...req.body, user: req.user.userId });
  try {
    await product.save();
    console.log("product saved");
    
    res.status(201).send(product);
  } catch (error) {
    console.log("error in saving pdt");
    
    res.status(400).send(error);
  }
});

router.get('/getproducts', auth, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.userId });
    if (!products) return res.status(200).send('No products found');
    else{

        res.status(200).send(products);
    }
  } catch (error) {
    console.log("hello");
    
    res.status(400).send(error);
  }
});

module.exports = router;