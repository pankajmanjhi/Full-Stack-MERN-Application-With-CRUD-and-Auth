const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/Users');
const Product = require('./db/Products');

const Jwt = require('jsonwebtoken');  
const jwtKey = 'e-comm';

const app = express();


app.use(express.json());
app.use(cors());

app.post("/register",async(req,resp)=>{
    let user = new User(req.body);
    let result =await  user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    // Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(error,token)=>{
    //     if(error){
    //         res.send({result: "Something went wrong!"});
    //     }
    //     res.send({result,auth:token});
    // })
})

app.post("/login", async(req, res) => {
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(error,token)=>{
                if(error){
                    res.send({result: "No User Found!"});
                }
                res.send({user,auth:token});
            })
        }
        else{
            res.send({result: "No User Found!"});
        }
    }
    else{
        res.send("Please enter name and password");
    }
});

app.post("/add-product", async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if(products.length){
        res.send(products);
    }
    else{
        res.send({"result": "No record found!"});
    }
});

app.delete("/products/:id", async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
});

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result){
        res.send(result)
    }
    else{
        res.send({result: "No record found!"})
    }
})

app.put("/product/:id", async (req,res) => {
    let result = await Product.updateOne({_id: req.params.id}, {$set: req.body})
    res.send(result)
});

app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key }},
            { company: { $regex: req.params.key }},
            { category: { $regex: req.params.key }}
        ]
    });
    res.send(result);
})

app.listen(5000);



