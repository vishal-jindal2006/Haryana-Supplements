const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    orderId: {

        type: String,

        required: true

    },

    customerName: {

        type: String,

        required: true

    },

    customerPhone: {

        type: String,

        required: true

    },

    customerAddress: {

        type: String,

        required: true

    },

    customerPincode: {

        type: String,

        required: true

    },

    customerCity: {

        type: String,

        required: true

    },

    customerState: {

        type: String,

        required: true

    },

    products: [

        {

            name: String,

            quantity: Number,

            price: Number

        }

    ],

    subtotal: {

        type: Number,

        required: true

    },

    advanceFee: {

        type: Number,

        default: 0

    },

    remainingAmount: {

        type: Number,

        default: 0

    },

    total: {

        type: Number,

        required: true

    },

    paymentMethod: {

        type: String,

        default: "COD"

    },

    paymentStatus: {

        type: String,

        default: "Pending"

    },

    status: {

        type: String,

        default: "Pending"

    },

    paymentScreenshot: {

    type: String,

    default: ""

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(
    "Order",
    orderSchema
);