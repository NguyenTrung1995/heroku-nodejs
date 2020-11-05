const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Type = mongoose.model("types", typeSchema);

module.exports = Type;
