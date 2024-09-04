// controllers/CartController.js
const CartItem = require("../models/CartItem");

exports.addToCart = async (req, res) => {
  const cartItems = req.body;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ msg: "Invalid cart items format" });
  }

  try {
    const userId = req.user.id;
    const savedCartItems = [];

    for (const item of cartItems) {
      const {
        name,
        quantity,
        priceInclTax,
        priceExclTax,
        image,
        variants,
        selectedVariants,
        uniqueKey,
        productId,
        shipping_charge,
        totalWeight,
      } = item;

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ msg: "Invalid quantity" });
      }

      let cartItem = await CartItem.findOne({ user: userId, uniqueKey });

      if (cartItem) {
        cartItem.quantity = quantity;
      } else {
        cartItem = new CartItem({
          user: userId,
          name,
          quantity,
          priceInclTax,
          priceExclTax,
          image,
          variants,
          selectedVariants,
          uniqueKey,
          productId,
          shipping_charge,
          totalWeight,
        });
      }

      await cartItem.save();
      savedCartItems.push(cartItem);
    }

    res.json(savedCartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id });
    // console.log(cartItems);
    res.json(cartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findOneAndDelete({
      user: req.user.id,
      uniqueKey: req.params.uniqueKey,
    });
    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
