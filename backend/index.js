const express = require('express');
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const User = require("./models/userModel/userModel.js");

ConnectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/users", async(req,res) => {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});