const productmodel = require('./models/product');

const product = new productmodel({  
    id:  req.body.id,  
    type: req.body.type,
    productcode: req.body.productcode,  
    brand: req.body.brand,  
    name: req.body.name,  
    image: req.body.image,  
    sellingPrice: req.body.sellingPrice,  
    originalPrice: req.body.originalPrice,  
    stock: req.body.stock, 
  }); 

app.product("api/products",(req,res, next)=>{
    const product = new productmodel({  
        id:  req.body.id,  
        type: req.body.type,
        productcode: req.body.productcode,  
        brand: req.body.brand,  
        name: req.body.name,  
        image: req.body.image,  
        sellingPrice: req.body.sellingPrice,  
        originalPrice: req.body.originalPrice,  
        stock: req.body.stock, 
    }); 
    product.save();
    console.log(product);
    res.status(201).json({
        message: 'Product added successfully'
    });
  });

const mongoose = require('mongoose');  

mongoose.connect("mongodb+srv://wbakilalakshan:FRT6Bl3xZZj9wfpK@ashop.xpar7za.mongodb.net/?retryWrites=true&w=majority&appName=Ashop") 
.then(()=>{  
    console.log("Connected to database");  
  })  
  .catch(()=>{  
    console.log("Connection Failed");  
  }); 