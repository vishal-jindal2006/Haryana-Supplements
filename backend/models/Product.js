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

    images: [

        {

            type:String

        }

    ],

    category: {

        type: String,

        default: "Supplements"

    },

    bestSeller: {

        type: Boolean,

        default: false

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