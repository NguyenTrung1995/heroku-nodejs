const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;
