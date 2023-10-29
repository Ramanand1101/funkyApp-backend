const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const cors=require("cors")
const passport=require("./config/google-oauth")
const {oauthRouter}=require("./router/oauthRouter")
const {userRouter}=require("./router/userRouter")
const {productRouter} = require('./router/productRouter')
const{addressRouter}=require("./router/addressRouter")
const{paymentRouter}=require("./router/paymentRouter")
const{authMiddleware}=require("./middleware/authenticate")
const { cartRouter } = require("./router/cartRouter")
const{orderRouter}=require("./router/orderRouter")

const app=express()

app.use(cors())

app.use(express.json())


app.get("/",async(req,res)=>{
    try{
        res.send("Home-Page")
    }
    catch(error){
        console.log(`Error:${error}`)
    }
})
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login',session:false }),
//   function(req, res) { 
//     console.log(req.user)
//     // Successful authentication, redirect home.
//     res.redirect('/frontend/index.html');
//   });

app.use("/user",userRouter)
app.use("/oauth",oauthRouter)
app.use("/payment",paymentRouter)
app.use(authMiddleware)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order", orderRouter);
app.use("/address",addressRouter)





/* Dont touch below code  */
const port=process.env.port||3000
app.listen(`${port}`,async()=>{
    try{
        await connection
        console.log("Database connected Successfully")
       
    }
    catch(error){
        console.log('Error', error.message)
    }
    console.log(`Server running in port ${port}`)
})