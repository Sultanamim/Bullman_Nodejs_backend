const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const specificationSchema = new Schema(
  {
    Marque: String,
    Couleur: String,
    Poids: String,
    Charge_maximale: String,
    Garantie: String,
    Épaisseur_bois: String,
    Matière: String,
    Dimensions: String,
    Autres_détails: String,
  },
  { strict: false }
);

const descriptionSchema = new Schema({
  title: String,
  desc: String,
});

const descCardSchema = new Schema({
  id: Number,
  image: String,
  title: String,
  desc: String,
});

const expeditionSchema = new Schema({
  title1: String,
  desc1: [String],
  title2: String,
  desc2: [String],
});

const paymentSchema = new Schema({
  title: String,
  desc: [String],
});

const productSchema = new Schema(
  {
    id: Number,
    name: String,
    primaryImg1: String,
    primaryImg2: String,
    category: String,
    price: String,
    shortImg: [String],
    specifications: [specificationSchema],
    desc: [descriptionSchema],
    descCard: [descCardSchema],
    priceTypes: [
      {
        priceType: String,
        price: String,
        weight: String,
      },
    ],
    garantie: [String],
    expedition: [expeditionSchema],
    payment: [paymentSchema],
  },
  { strict: false }
);

module.exports.Product = model("Product", productSchema);
