const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// =========================
// ADD PRODUCT
// =========================

router.post("/add", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json({

            message: "Product Added 🔥",

            product

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", async (req, res) => {

    try {

        const products = await Product.find()
        .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


// =========================
// UPDATE PRODUCT
// =========================

router.put("/:id", async (req, res) => {

    try {

        const updatedProduct =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        res.json({

            message:
            "Product Updated",

            product:
            updatedProduct

        });

    } catch (error) {

        res.status(500).json({

            error:
            error.message

        });

    }

});


// =========================
// DELETE PRODUCT
// =========================

router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message:
            "Product Deleted"

        });

    } catch (error) {

        res.status(500).json({

            error:
            error.message

        });

    }

});

module.exports = router;