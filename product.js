const express = require('express')
const router = express.Router();
const mongoose  = require('mongoose')
const verifyToken = require('./verify-token')
const jwt = require('jsonwebtoken')
 


let productSchema= new mongoose.Schema({
        name:String,
        type:String,
        price:Number,
        rating:Number,
         
})


let productModel = new mongoose.model('products',productSchema)

let duumyREs={"message":"sucess"}
 


// Routers
router.post('/createproduct',verifyToken, (req,res)=>{
        
           let product = req.body

           
             let productDAata = new productModel(product)

            productDAata.save()
            res.send(productDAata) 
   
     
})


router.get('/viewproducts',verifyToken,async(req,res)=>{
    
    let products = await productModel.find({email:req.user.email})
    
    res.send(products)


})

 

module.exports=router
