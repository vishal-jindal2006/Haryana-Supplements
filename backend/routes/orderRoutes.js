const express = require("express");

const router = express.Router();

const Order = require("../models/Order");


// =========================
// CREATE ORDER
// =========================

router.post("/", async (req,res)=>{

    try{

        const order =
        new Order(req.body);

        await order.save();

        res.status(201).json({

            message:
            "Order Placed 🔥",

            order

        });

    }

    catch(error){

        res.status(500).json({

            error:
            error.message

        });

    }

});


// =========================
// GET ALL ORDERS
// =========================

router.get("/", async (req,res)=>{

    try{

        const orders =
        await Order.find()
        .sort({createdAt:-1});

        res.json(orders);

    }

    catch(error){

        res.status(500).json({

            error:
            error.message

        });

    }

});


// =========================
// UPDATE STATUS
// =========================

router.put("/:id", async (req,res)=>{

    try{

        const order =
        await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true

            }

        );

        res.json(order);

    }

    catch(error){

        res.status(500).json({

            error:
            error.message

        });

    }

});


// =========================
// DELETE ORDER
// =========================

router.delete("/:id", async (req,res)=>{

    try{

        await Order.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message:
            "Order Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            error:
            error.message

        });

    }

});

router.get(

"/phone/:phone",

async (req,res)=>{

try{

const orders =

await Order.find({

customerPhone:
req.params.phone

}).sort({

createdAt:-1

});

res.json(orders);

}

catch(error){

res.status(500).json({

error:error.message

});

}

}

);

module.exports = router;