const express = require('express');
const path=require("path")
const jwt=require('jsonwebtoken')
const passport = require('passport');
const oauthRouter = express.Router();
oauthRouter.use(express.static(path.join(__dirname, '../../Frontend')))

oauthRouter.get("/oauthlogin",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../Frontend/index.html"))
})
// OAuth login route
oauthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


oauthRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, generate a JWT token and send it to the client
    const user = req.user;  // Assuming you have user data available after successful authentication

    // Create a JWT token with user information
    const accessToken = jwt.sign({userId:user._id, email: user.email },  process.env.secretkey, { expiresIn: '7d' });
    console.log("this is user detail from oauth : ",user)

    // Send the token to the client (you can store it in cookies, localStorage, or session)
    res.cookie('jwt', accessToken);  // Example: Store the token in a cookie

    // Redirect to frontend URL with the token (you can handle this token on the frontend)
    res.redirect(`http://localhost:3000/oauth/oauthlogin?token=${accessToken}&uname=${user.email}`);
  }
)

module.exports = {oauthRouter}
