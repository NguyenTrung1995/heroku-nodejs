require('dotenv').config();
require('./db');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const categoryRouter = require('./routers/category');
const typeRouter = require('./routers/type');
const orderRouter = require('./routers/order');
const notiRouter = require('./routers/notification');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(typeRouter);
app.use(orderRouter);
app.use(notiRouter);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello World! 1");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    return () => console.log("hihi");
});
