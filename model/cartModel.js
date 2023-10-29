const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to your User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to your Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity is 1 when the item is added to the cart
    }
});

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

module.exports = { CartProductModel };
