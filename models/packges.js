const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema({
  Marque: String,
  Couleur: String,
  Poids: String,
  Charge_maximale: String,
  Garantie: String,
  Épaisseur_bois: String,
  Matière: String,
  Dimensions: String,
  Autres_détails: String,
});

const DescriptionSchema = new mongoose.Schema({
  title: String,
  desc: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  primaryImg1: String,
  category: String,
  price: String,
  shortImg: [String],
  specifications: SpecificationSchema,
  desc: [DescriptionSchema],
  garantie: [String],
  expedition: Array,
  payment: Array,
});

const PackageSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: String,
  products: [ProductSchema],
  specifications: [SpecificationSchema],
  desc: [DescriptionSchema],
  garantie: [String],
  expedition: Array,
  payment: Array,
});

module.exports = mongoose.model("Package", PackageSchema);
