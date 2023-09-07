const dotenv = require("dotenv");
dotenv.config();

// To connect with mongoDB database
const mongoose = require('mongoose');

const uri = process.env.DB_URI;

function ConnectDb(){
    mongoose.set("strictQuery",false);
    console.log(process.env.DB_NAME)

    const connectionOptions = {
        dbName : process.env.DB_NAME
    }
    
    mongoose.connect(uri, connectionOptions, err => err ? console.log(err) :
    console.log('Connected to mongodb'));
}

module.exports = ConnectDb