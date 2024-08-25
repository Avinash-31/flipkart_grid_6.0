const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Category, Product } = require('./models/models');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const productRoutes = require('./routes/product');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongo_url', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/product',productRoutes);

// Create a new category
app.post('/api/categories', auth, async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send(category);
        console.log("Saved successfully");
    } catch (error) {
        res.status(400).send(error);
        console.log("Error saving data");
    }
});

// Create a new product
app.post('/api/products', auth, async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        console.log("Saved pdt");
        res.status(201).send(product);
    } catch (error) {
        console.log("failed to save");
        res.status(400).send(error);
    }
});

// Fetch all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});