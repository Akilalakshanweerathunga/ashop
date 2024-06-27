const mongoose = require('mongoose');   

const productSchema = mongoose.Schema({  
    id: {type: String, required:true},  
    type: {type: String, required:true},
    productcode: {type: String, required:true},  
    brand: {type: String, required:true},  
    name: {type: String, required:true},  
    image: {type: String, required:true},  
    sellingPrice: {type: Number, required:true},  
    originalPrice: {type: Number, required:true},  
    stock: {type: Boolean, required:true},    
});  

module.exports = mongoose.model('Product',productSchema);  

