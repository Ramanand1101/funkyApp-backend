const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        min: 1 // Ensuring the quantity is at least 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
   
});
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (assuming you have a User model)
       
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    altNumber:{
        type:Number,
        default:null
    },
    fullAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    }
});
const orderSchema = new mongoose.Schema({
    items: [orderItemSchema], // Array of order items, each item follows the orderItemSchema
    cartTotalPrice:{
        type:Number,
        
    },
    shippmentAddress:[addressSchema],
    paymentStatus: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending"
    },
    
    
});



const Order = mongoose.model('Order', orderSchema);

module.exports ={Order};
