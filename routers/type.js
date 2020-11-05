const express = require("express");

const Type = require("../models/Type");
const auth = require("../middleware/auth");
const { respSucceed } = require('../utils/parseResponse');

const router = express.Router();

router.get("/types", auth, async (req, res) => {
    try {
        Type.find({}).exec((err, types) => {
            res.status(201).send(respSucceed(types));
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/types/:categoryCode", auth, async (req, res) => {
    try {
        const { categoryCode } = req.params;
        Type.find({ category: categoryCode }).exec((err, types) => {
            res.status(201).send(respSucceed(types));
        });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;
