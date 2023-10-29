const express = require("express");
const { Order } = require("../model/orderModel");

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Calculate the total amount from all orders
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.cartTotalPrice;
        });

        // Amount in cents
        const amount = totalAmount * 100; // Stripe uses amount in cents

        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = {
    paymentRouter
};
