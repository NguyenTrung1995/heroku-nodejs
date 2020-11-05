const express = require("express");

const Category = require("../models/Category");
const auth = require("../middleware/auth");
const { respSucceed } = require('../utils/parseResponse');

const router = express.Router();

router.get("/categories", auth, async (req, res) => {
    // Create a new user
    try {
        Category.find({}).exec((err, categories) => {
            res.status(201).send(respSucceed(categories));
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
