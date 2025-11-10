// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

//connect to database
connectDB();

// Define routes
app.use('/api/products', require('./routes/productsroutes'));


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  res.json(products.find(p => p.id === req.params.id));
// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});     

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);  
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {   
    res.status(404).json({ message: 'Product not found' });
  }});    
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
   if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }     
});

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
rest.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// - Authentication
app.use((req, res, next) => {
  // Dummy authentication check
  const authHeader = req.headers['authorization'];
  if (authHeader === 'Bearer dummy-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }});
// - Error handling
app.use((err, req, res, next) => {  
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; })