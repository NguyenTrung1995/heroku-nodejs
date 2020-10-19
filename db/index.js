const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.woj10.mongodb.net/db-test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
