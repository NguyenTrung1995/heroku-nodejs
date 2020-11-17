const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    invoice_no: {
        type: String,
        required: true,
        unique: true,
    },
    total_product: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    products: {
        type: Object,
        required: true,
    },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
