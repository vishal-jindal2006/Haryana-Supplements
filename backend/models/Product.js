const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true

    },

    price: {

        type: Number,

        required: true

    },

    discount: {

        type: Number,

        default: 0

    },

    image: {

        type: String,

        required: true

    },

    category: {

        type: String,

        default: "Supplements"

    },

    stock: {

        type: Number,

        default: 0

    },

    description: {

        type: String,

        default: ""

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(

    "Product",

    productSchema

);