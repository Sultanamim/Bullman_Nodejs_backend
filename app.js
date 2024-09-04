//backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRouter = require("./routes/productRoute");
const packageRoutes = require("./routes/packageRoute");
const authRouter = require("./routes/auth");
const paymentsRoute = require("./routes/payment");
const webhookRoute = require("./routes/webhook");
const odooRoutes = require("./routes/odooRoutes");
const cartRoutes = require("./routes/cart");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/orderRoutes");
const stripePayment = require("./routes/stripePayment");
const customStripePayment = require("./routes/customStripePayment");
const customMolliePayment = require("./routes/customMolliePayment");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//All API
app.use("/products", productRouter);
app.use("/packages", packageRoutes);
app.use("/auth", authRouter);
app.use("/payments", paymentsRoute);
app.use("/webhook", webhookRoute);
app.use("/odoo", odooRoutes);
app.use("/cart", cartRoutes);
app.use("/user", addressRoutes);
app.use("/orders", orderRoutes);
app.use("/stripe-payment", customStripePayment);

module.exports = app;
