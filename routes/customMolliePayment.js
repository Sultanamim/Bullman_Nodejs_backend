// backend/routes/payments.js

const express = require("express");
const router = express.Router();
const { createMollieClient } = require("@mollie/api-client");

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

router.post("/create-mollie-payment-intent", async (req, res) => {
  try {
    const { amount, description, orderId, redirectUrl } = req.body;
    const allowedMethods = [
      "ideal",
      "paypal",
      "banktransfer",
      "klarna",
      "sofort",
    ]; // Excluding "card"

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: amount, // E.g. '10.00'
      },
      description: description,
      redirectUrl: redirectUrl,
      method: allowedMethods,
      metadata: {
        order_id: orderId,
      },
    });

    res.json({ paymentId: payment.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating payment intent");
  }
});

router.post("/confirm-mollie-payment", async (req, res) => {
  try {
    const { paymentId, selectedMethod } = req.body;

    // Fetch the payment details from Mollie using the payment ID
    const payment = await mollieClient.payments.get(paymentId);

    // Log the payment response to understand the structure better
    console.log("Payment Details:", payment);

    if (payment) {
      // Customize the checkout URL with the selected payment method
      const customizedCheckoutUrl = `${payment._links.checkout.href}?method=${selectedMethod}`;

      // Respond with the customized URL for redirection
      res.json({ success: true, redirectUrl: customizedCheckoutUrl });
    } else {
      res.status(400).json({ error: "Payment confirmation failed" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).send("Error confirming payment");
  }
});

module.exports = router;
