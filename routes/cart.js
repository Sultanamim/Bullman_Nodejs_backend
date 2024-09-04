// routes/cart.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const CartController = require("../controllers/CartController");

router.post("/", authMiddleware, CartController.addToCart); // Endpoint for adding to cart
router.get("/", authMiddleware, CartController.getCartItems); // Endpoint for fetching cart items
router.delete("/:uniqueKey", authMiddleware, CartController.removeFromCart); //

module.exports = router;
