const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const { strict } = require("assert");

app.use(express.json());
app.use(cors());

//Database connect
mongoose.connect("mongodb+srv://nsrexperimental:7073705004@cluster0.at5bi.mongodb.net/Westify")
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get("/", (req, res)=>{
    res.send("express is running")
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating product

const Product = mongoose.model("Product", {
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        dafault:Date.now,
    },
    available:{
        type:Boolean,
       
    }
})

// ----POST
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id = 1;
    }

    try {
        console.log(req.body); 

        const newProduct = new Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await newProduct.save();
        res.status(200).json({
            success: true,
            message: 'Product added successfully',
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Failed to add product' });
    }
});


// ----deletion
app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success: true,
        name:req.body.name
    })
})

// ----all prod
app.get('/allproducts', async (req, res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    
    res.send(products);
})

// ----user creation Schema
const Users = mongoose.model('Users', {
    // name:{
    //     type:String
    // },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    Date:{
        type:Date,
        dafault:Date.now
    }
})

// ----Signup - user registration
app.post('/signup', async (req, res) => {
    try {
        // Check if the email is already registered
        let check_email = await Users.findOne({ email: req.body.email });
        if (check_email) {
            return res.status(400).json({ success: false, error: "User with this email already exists" });
        }

        // Check if the username is already taken
        // let check_username = await Users.findOne({ name: req.body.username });
        // if (check_username) {
        //     return res.status(400).json({ success: false, error: "Username already exists" });
        // }

        // Initialize the cart with 100 items, all set to 0
        let cart = {};
        for (let index = 0; index < 100; index++) {
            cart[index] = 0;
        }

        // Create a new user
        const user = new Users({
            // name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        // Generate a token (using JWT)
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        console.log("User signed up:", user);

        // Return success response with token
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            token: token,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, error: "Server error during signup" });
    }
});


// ----Login 
// const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    try {
        // Find the user by email
        let user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, error: "No user exists with this email" });
        }

        // Plain-text password check
        const pass_check = req.body.password === user.password;
        if (!pass_check) {
            return res.status(400).json({ success: false, error: "Incorrect password" });
        }

        // Generate JWT token upon successful login
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        console.log("User logged in:", user.name);

        // Send success response with token
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Server error during login" });
    }
});



app.listen(port, (error)=>{
    if(!error){
        console.log("Server running on port: " + port);
    }
    else{
        console.log("error: " + error);
    }
});