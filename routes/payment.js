// backend/routes/payments.js

const express = require("express");
const router = express.Router();
const { createMollieClient } = require("@mollie/api-client");

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

router.post("/create-payment", async (req, res) => {
  try {
    const { amount, description, redirectUrl, webhookUrl, orderId } = req.body;
    const allowedMethods = [
      "ideal",
      "paypal",
      "banktransfer",
      "klarna",
      "sofort",
    ];
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: amount, // E.g. '10.00'
      },
      description: description,
      redirectUrl: redirectUrl,
      //webhookUrl: webhookUrl,
      method: allowedMethods,
      metadata: {
        order_id: orderId,
      },
    });

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating payment");
  }
});

module.exports = router;
