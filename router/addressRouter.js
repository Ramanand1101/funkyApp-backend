const express = require("express");
const { Order } = require("../model/orderModel");
const { authMiddleware } = require("../middleware/authenticate");
const addressRouter = express.Router();

addressRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, name, phoneNumber, altPhoneNumber, fullAddress, city, state, zipCode, country } = req.body;
        console.log("sss",userId,name,phoneNumber,altPhoneNumber)
        // Find the order by userId
        const existingOrder = await Order.findById(userId);

        if (!existingOrder) {
            return res.status(404).json ({ message: "Order not found for the given userId" });
        }

        // Create a new address object
        const newAddress = {
            userId: userId,
            name: name,
            phoneNumber: phoneNumber,
            altNumber: altPhoneNumber,
            fullAddress: fullAddress,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country
        };

        // Ensure that shippmentAddress field is an array and initialize it if undefined
        existingOrder.shippmentAddress = existingOrder.shippmentAddress || [];
        existingOrder.shippmentAddress.push(newAddress);

        // Save the changes to the existing order
        await existingOrder.save();

        res.status(200).json(existingOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = { addressRouter };
