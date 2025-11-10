const express = require('express');
const router = express.Router();
const Product = require('../models/products');  

// GET /api/products - Get all products
router.get('/', async (req, res) => {
    try {  
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }});

// GET /api/products/:id - Get a specific product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }}catch (error) {
        res.status(500).json({ message: error.message });
    }});


// POST /api/products - Create a new product
router.post('/', async (req, res) => { 
    const { id, name, description, price, category, inStock } = req.body;
    try {
        const newProduct = new Product({ id, name, description, price, category, inStock });
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }});
   
// PUT /api/products/:id - Update a product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },  
            req.body,
            { new: true }
        );  
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }  
        res.json(updatedProduct);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }   
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }       
});

module.exports = router;        

