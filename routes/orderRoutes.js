const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Save order history
router.post("/save-order-history", async (req, res) => {
  try {
    const { orderHistory, userId } = req.body;

    // Save each order in the orderHistory array
    const savedOrders = await Order.insertMany(
      orderHistory.map((order) => ({
        ...order,
        ecom_customer_id: userId,
      }))
    );

    res
      .status(200)
      .json({ message: "Order history saved successfully", savedOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to save order history" });
  }
});

// Get all orders for a user
router.get("/get-all-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ ecom_customer_id: req.params.userId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

module.exports = router;
