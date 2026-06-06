const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");


// CREATE ADMIN

router.post("/create", async (req, res) => {

    try {

        const {
            name,
            username,
            password
        } = req.body;

        const existingAdmin =
        await Admin.findOne({
            username
        });

        if(existingAdmin){

            return res.status(400).json({
                message:
                "Username already exists"
            });

        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const admin =
        new Admin({

            name,

            username,

            password:
            hashedPassword,

            role: "admin"

        });

        await admin.save();

        res.json({
            message:
            "Admin Created Successfully"
        });

    }

    catch(error){

        res.status(500).json({
            error:
            error.message
        });

    }

});


// GET ALL ADMINS

router.get("/", async (req, res) => {

    try {

        const admins =
        await Admin.find()
        .select("-password");

        res.json(admins);

    }

    catch(error){

        res.status(500).json({
            error:
            error.message
        });

    }

});


// DELETE ADMIN

router.delete("/:id", async (req, res) => {

    try {

        await Admin.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Admin Deleted"
        });

    }

    catch(error){

        res.status(500).json({
            error:
            error.message
        });

    }

});

module.exports = router;