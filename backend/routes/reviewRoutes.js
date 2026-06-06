const express = require("express");

const router = express.Router();

const Review = require("../models/Review");


// CREATE REVIEW

router.post("/", async (req,res)=>{

    try{

        const review =
        new Review(req.body);

        await review.save();

        res.status(201).json(review);

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});


// GET ALL REVIEWS

router.get("/", async (req,res)=>{

    try{

        const reviews =
        await Review.find()
        .sort({createdAt:-1});

        res.json(reviews);

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});

module.exports = router;

router.delete(

"/:id",

async (req,res)=>{

    try{

        await Review.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message:
            "Review Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});