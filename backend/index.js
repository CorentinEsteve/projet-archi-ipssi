const express = require('express');
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const UserController = require("./controllers/userController/userController.js");
const { protect } = require('./functions/auth/authFunctions.js');
const filesRoutes = require("../backend/routes/filesRoutes.js");

ConnectDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/files", filesRoutes);
app.use("/folders", filesRoutes);
app.use("/invoices", filesRoutes);

app.post("/signUp", UserController.SignUp);

app.get("/logIn", UserController.LogIn);

app.post("/files", protect, (req,res) => {
      res.json(req.user);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});