const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cart/list", (req, res) => {
    const list = [
        {
            id: 1,
            name: 'Ahihi',
        },
        {
            id: 2,
            name: 'Hehe',
        }
    ];
    res.send(list);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
