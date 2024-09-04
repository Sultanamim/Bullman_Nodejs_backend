const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Bullman Equipment",
          },
          unit_amount: amount, // Amount in cents (i.e., $20.00)
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/order-detail",
    cancel_url: "http://localhost:3000/order",
  });

  res.json({ id: session.id });
});

module.exports = router;
