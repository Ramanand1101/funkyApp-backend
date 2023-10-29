const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
const {UserModel}=require("../model/userModel")
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL,
  },  
  async function(accessToken, refreshToken, profile, cb) {
    let email=profile._json.email
    const user=new UserModel({
      email,
      password:uuidv4()
    })
    const {_id,password}=user
    const payload={
      email,
      _id,
      password,
      url:profile._json.picture
    }
    await user.save()
    console.log(payload)
    return cb(null,payload)
    
  }
));
module.exports=passport