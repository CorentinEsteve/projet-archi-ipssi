const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3350;
const ConnectDb = require("./db/db.js");
const UserController = require("./controllers/userController/userController.js");
const filesRoutes = require("../backend/routes/filesRoutes.js");
const invoicesRoutes = require("../backend/routes/invoicesRoutes.js");
const foldersRoutes = require("../backend/routes/foldersRoutes.js");
const usersRoutes = require("../backend/routes/usersRoutes.js");

ConnectDb();

// Middlewares
app.use(express.json());
app.use(bodyParser.json({limit: '100kb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100kb', extended: true}))



// Routes
app.use("/api/v1/files", filesRoutes);
app.use("/api/v1/folders", foldersRoutes);
app.use("/api/v1/invoices", filesRoutes);
app.use("/api/v1/users", usersRoutes);


// Authentication routes
app.post("/api/v1/signUp", UserController.SignUp);
app.get("/api/v1/logIn", UserController.LogIn);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});