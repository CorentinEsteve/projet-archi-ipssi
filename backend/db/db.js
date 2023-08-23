// To connect with mongoDB database
const mongoose = require('mongoose');

const uri = "mongodb+srv://teamArchiTech:eMiMJTwDZtONf1Sl@cluster0.3sl646h.mongodb.net/?retryWrites=true&w=majority"

function ConnectDb(){
    mongoose.set("strictQuery",false);

    const connectionOptions = {
        dbName : "architechDb"
    }
    mongoose.connect(uri, connectionOptions, err => err ? console.log(err) :
    console.log('Connected to mongodb'));
}

module.exports = ConnectDb