
 const express = require('express')
 const router = express.Router();
 const mongoose  = require('mongoose')
 const jwt = require('jsonwebtoken')
 const crypto = require('crypto')
 


let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    city: String,
     
})

let userModel = mongoose.model('users',userSchema)
let salt = crypto.randomBytes(16).toString('hex')

// Routers
 
router.post('/register',(req,res)=>{
    let userDetails = req.body

    userDetails.password = crypto.pbkdf2Sync(userDetails.password,salt,1000,64,'sha512').toString('hex') 

    let userData = new userModel(userDetails)

    userData.save().then(()=>{
        res.send( userData)
    })
 
 
})


router.post('/login',async(req,res)=>{
    let userDetails = req.body
 
    let count = await userModel.find(userDetails).countDocuments()

    if(count==1)
        {
            jwt.sign({user:userDetails},"mykey",(err,token)=>{
                
                if(err==null)
                {
                    res.send({"token":token})
                }
                else
                {
                    res.send({"message":"error"})
                }


            })
        }
        else
        {
            res.send({ "message": "wrong user name & password " })

        }



 
})




module.exports=router
