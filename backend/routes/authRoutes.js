const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Admin = require("../models/Admin");


// LOGIN

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const admin =
        await Admin.findOne({
            username
        });

        if(!admin){

            return res.status(400).json({

                success: false,

                message:
                "User Not Found"

            });

        }

        const isMatch =
        await bcrypt.compare(

            password,

            admin.password

        );

        if(!isMatch){

            return res.status(400).json({

                success: false,

                message:
                "Wrong Password"

            });

        }

        res.json({

            success: true,

            role: admin.role,

            name: admin.name,

            username: admin.username

        });

    }

    catch(error){

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

module.exports = router;