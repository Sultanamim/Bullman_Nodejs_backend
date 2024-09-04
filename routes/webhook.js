// backend/routes/webhook.js

const express = require("express");
const router = express.Router();
const { createMollieClient } = require("@mollie/api-client");

//console.log(process.env.MOLLIE_API_KEY);

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

router.post("/webhook", async (req, res) => {
  const paymentId = req.body.id;

  try {
    const payment = await mollieClient.payments.get(paymentId);

    if (payment.status === "paid") {
      // Handle successful payment
      console.log("Payment successful:", payment);
    } else {
      // Handle other payment statuses
      console.log("Payment status:", payment.status);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
