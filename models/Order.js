const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  delivery_address: {
    name: String,
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  billing_address: {
    name: String,
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  shipping_charges: Number,
  confirm_order: Boolean,
  ecom_customer_id: String,
  shipping: String,
  payment_method: String,
  ecom_create_date: String,
  product_details: Array,
  orderId: String,
  orderNumber: String,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
