const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    img_cover: {
        type: String,
        required: true,
    },
    thumbnails: {
        type: Array,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
