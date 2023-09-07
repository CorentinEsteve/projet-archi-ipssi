const mongoose = require("mongoose");

var invoiceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    invoicePath: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
},{
    timestamps : true
} )

var invoiceModel = mongoose.model("invoices", invoiceSchema);

module.exports = invoiceModel;