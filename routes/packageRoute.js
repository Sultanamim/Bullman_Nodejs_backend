const express = require("express");
const router = express.Router();
const Package = require("../models/packges");

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single package by ID
router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(package);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new package
router.post("/", async (req, res) => {
  const package = new Package({
    title: req.body.title,
    image: req.body.image,
    price: req.body.price,
    products: req.body.products,
    specifications: req.body.specifications,
    desc: req.body.desc,
    garantie: req.body.garantie,
    expedition: req.body.expedition,
    payment: req.body.payment,
  });

  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a package
router.put("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (req.body.title != null) {
      package.title = req.body.title;
    }
    if (req.body.image != null) {
      package.image = req.body.image;
    }
    if (req.body.price != null) {
      package.price = req.body.price;
    }
    if (req.body.products != null) {
      package.products = req.body.products;
    }
    if (req.body.specifications != null) {
      package.specifications = req.body.specifications;
    }
    if (req.body.desc != null) {
      package.desc = req.body.desc;
    }
    if (req.body.garantie != null) {
      package.garantie = req.body.garantie;
    }
    if (req.body.expedition != null) {
      package.expedition = req.body.expedition;
    }
    if (req.body.payment != null) {
      package.payment = req.body.payment;
    }

    const updatedPackage = await package.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package
router.delete("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package not found" });
    }

    await package.remove();
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
