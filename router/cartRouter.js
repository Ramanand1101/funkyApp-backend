// const express = require("express");
// const { CartProductModel } = require("../model/cartModel");
// const { authMiddleware } = require("../middleware/authenticate");

// const cartRouter = express.Router();

// // Route to get cart items for the authenticated user
// cartRouter.get("/", authMiddleware, async (req, res) => {
//     try {
//         const cartItems = await CartProductModel.find({ userId: req.user._id }).populate('productId');
//         res.status(200).json(cartItems);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error", message: error.message });
//     }
// });

// // Route to add item to cart
// cartRouter.post("/add", authMiddleware, async (req, res) => {
//     const { productId, quantity } = req.body;
//     const userId = req.user._id;

//     try {
//         const cartItem = new CartProductModel({ userId, productId, quantity });
//         await cartItem.save();
//         return res.status(201).json({ message: "Item added to cart", cartItem });
//     } catch (error) {
//         res.status(400).json({ error: "Bad Request", message: error.message });
//     }
// });

// // Route to update quantity of an item in the cart
// cartRouter.put("/update/:id", authMiddleware, async (req, res) => {
//     const cartItemId = req.params.id;
//     const { quantity } = req.body;

//     try {
//         const cartItem = await CartProductModel.findOneAndUpdate(
//             { _id: cartItemId, userId: req.user._id },
//             { quantity },
//             { new: true }
//         );

//         if (cartItem) {
//             res.status(200).json({ message: "Cart item quantity updated", cartItem });
//         } else {
//             res.status(404).json({ error: "Not Found", message: "Cart item not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error", message: error.message });
//     }
// });

// // Route to remove item from cart
// cartRouter.delete("/remove/:id", authMiddleware, async (req, res) => {
//     const cartItemId = req.params.id;

//     try {
//         const cartItem = await CartProductModel.findOneAndRemove({ _id: cartItemId, userId: req.user._id });

//         if (cartItem) {
//             res.status(200).json({ message: "Item removed from cart", cartItem });
//         } else {
//             res.status(404).json({ error: "Not Found", message: "Cart item not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error", message: error.message });
//     }
// });

// module.exports = {
//     cartRouter
// };
const express = require("express");
const { CartProductModel } = require("../model/cartModel");
const{ProductModel}=require("../model/productmodel")
const { authMiddleware } = require("../middleware/authenticate");

const cartRouter = express.Router();

// Route to get cart items for the authenticated user
cartRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const cartItems = await CartProductModel.find({ userId: req.user._id });
        const productIds = cartItems.map(item => item.productId);
    
        const products = await ProductModel.find({ _id: { $in: productIds } });
        console.log("Products fetched on cart Successfully")

        res.status(200).json({ cartItems, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});



// Route to add item to cart
// Route to add item to cart
cartRouter.post("/add", authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        // Check if the product is already in the user's cart
        const existingCartItem = await CartProductModel.findOne({ userId, productId });

        if (existingCartItem) {
            return res.status(400).json({ error: "Product already in the cart", message: "Product already in the cart" });
        }

        const cartItem = new CartProductModel({ userId, productId, quantity });
        await cartItem.save();
        return res.status(201).json({ message: "Item added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});


// Route to update quantity of an item in the cart
cartRouter.put("/update/:id", authMiddleware, async (req, res) => {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    try {
        const cartItem = await CartProductModel.findOneAndUpdate(
            { _id: cartItemId, userId: req.user._id },
            { quantity },
            { new: true }
        );

        if (cartItem) {
            res.status(200).json({ message: "Cart item quantity updated", cartItem });
        } else {
            res.status(404).json({ error: "Not Found", message: "Cart item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

// Route to remove item from cart
cartRouter.delete("/remove/:id", authMiddleware, async (req, res) => {
    const cartItemId = req.params.id;

    try {
        const cartItem = await CartProductModel.findOneAndRemove({ _id: cartItemId, userId: req.user._id });

        if (cartItem) {
            res.status(200).json({ message: "Item removed from cart", cartItem });
        } else {
            res.status(404).json({ error: "Not Found", message: "Cart item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

module.exports = {
    cartRouter
};
