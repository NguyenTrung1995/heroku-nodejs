const express = require("express");

const Order = require("../models/Order");
const auth = require("../middleware/auth");
const { respSucceed } = require('../utils/parseResponse');

const router = express.Router();

router.post("/order/create", auth, async (req, res) => {
    // Create a new order
    try {
        const { products } = req.body;
        let total_product = 0;
        let total_amount = 0;
        for (const product of products) {
            total_product += product.count;
            total_amount += (product.price * product.count);
        }
        const orderSchema = {
            invoice_no: `INVOICE-${Math.floor(new Date().getTime() / 1000)}`,
            total_product,
            total_amount,
            products,
        };
        await new Order(orderSchema).save();
        res.status(201).send(respSucceed(orderSchema));
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
