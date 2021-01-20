const express = require('express')

const ProductRouter = require('./product')
const userRouter = require('./user')
const cors = require('cors')
 
const mongoose  = require('mongoose')
 

const app=express()

app.use(cors())
app.use( express.json())


mongoose.connect('mongodb://127.0.0.1:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
})




// Routers
app.use('/product',ProductRouter)
app.use('/user',userRouter)




app.listen(3000)
