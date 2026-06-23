const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");


// =========================
// DATABASE CONNECTION
// =========================

connectDB();


// =========================
// EXPRESS APP
// =========================

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

// Product APIs

app.use(
    "/api/products",
    productRoutes
);

// Image Upload API

app.use(
    "/api/upload",
    uploadRoutes
);

// Admin APIs

app.use(
    "/api/admins",
    adminRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/reviews",
    reviewRoutes
);

// =========================
// TEST ROUTE
// =========================

const Admin = require("./models/Admin");

app.get("/", (req, res) => {

    res.send(
        "Haryana Supplements Backend Running 🔥"
    );

});


// =========================
// PORT
// =========================

const PORT = process.env.PORT || 5000;


// =========================
// SERVER
// =========================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running On Port ${PORT}`);
});