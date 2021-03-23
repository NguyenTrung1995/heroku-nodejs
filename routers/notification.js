const axios = require('axios');
const express = require("express");

const router = express.Router();

router.post("/fcm/register", async (req, res) => {

    axios({
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        data: {
            to: "dvl-MAjT-fLaAI8QNq0iLU:APA91bHHjPf4dMflXWK-PiCOVfz9A0Gzauw_E_-HVZogVXtR1igKF3X1FDmXeFL9hb6Oq7itGJZkOdqI2uAgjd3JY6QEcq2EMJ0nY10y62SYWXU0cKk_H5s5Uf5DuToDeDXt5JrkYHva",
            data: {
                title: "Hello",
                body: "world",
            }
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${process.env.FIREBASE_KEY}`
        }
    })
        .then(resp => {
            res.send(resp);
        })
        .catch(error => {
            res.send(error);
        })
});

module.exports = router;
