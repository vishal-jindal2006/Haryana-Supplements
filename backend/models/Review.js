const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    customerName: {

        type: String,
        required: true

    },

    reviewText: {

        type: String,
        required: true

    },

    rating:{

    type:Number,

    default:5

    },

    createdAt: {

        type: Date,
        default: Date.now

    }

});

module.exports = mongoose.model(
    "Review",
    reviewSchema
);