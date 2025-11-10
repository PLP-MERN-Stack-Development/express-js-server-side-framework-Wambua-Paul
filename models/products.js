const { time } = require('console');
const mongoose = require('mongoose');

//schema rules for collections
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String,required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true  
   
});

// Create and export the model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;