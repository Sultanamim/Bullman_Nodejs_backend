const express = require("express");
const axios = require("axios");
const router = express.Router();
const domain = "https://erp.bullman.fr";
const testDomain = "https://testerp.bullman.fr";

// Middleware for checking authentication, if required
// router.use(yourAuthMiddleware);

router.get("/categories/header", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/categories/header`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/categories/shop", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/categories/shop`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/sections/shop_by_categories", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/sections/shop_by_categories`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/our/packs", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/packs`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/most-viewed-products", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/most-viewed-products`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/best-seller-products", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/best-seller-products`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/category/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/product//${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/pack/:id", async (req, res) => {
  try {
    const response = await axios.get(`${domain}/pack/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

router.get("/search/product/:text", async (req, res) => {
  try {
    const response = await axios.get(
      `${domain}/product_search?term=${req.params.text}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

//order Apis
router.post("/create-order", async (req, res) => {
  const url = `${testDomain}/ecom_order`;
  //console.log(req.body);
  try {
    // Pass the request body to the POST request
    const response = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json", // Ensure that the content type is set to JSON
      },
    });
    //  console.log(response);

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : "No response data",
    });
  }
});
router.get("/get-all-orders/:user_id", async (req, res) => {
  const url = `${testDomain}/ecom_order/${req.params.user_id}`;
  console.log(url);
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});
router.get(
  "/get-single-orders/user/:user_id/order/:order_id",
  async (req, res) => {
    try {
      const response = await axios.get(
        `${testDomain}/ecom_order/${req.params.user_id}/order/${req.params.order_id}`
      );
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Modified routes with subcategory,promotion, limit, price and weight as params
// Helper function to construct URL based on non-null parameters
const constructUrl = (baseUrl, params) => {
  let url = baseUrl;
  const queryParams = [];

  for (const key in params) {
    if (params[key] !== null && params[key] !== "null") {
      queryParams.push(`${key}=${params[key]}`);
    }
  }

  if (queryParams.length > 0) {
    url += "?" + queryParams.join("&");
  }

  return url;
};

// Route 1: Order by list_price desc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/list_price/desc/price/:price/weight/:weight/page/:page",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "list_price+desc",
      limit: number,
      price,
      weight,
      page,
    };

    try {
      const url = constructUrl(`${domain}/category/${id}`, params);
      // console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 2: Order by list_price asc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/list_price/asc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "list_price+asc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`${domain}/category/${id}`, params);
      // console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 3: Order by name asc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/name/asc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "name+asc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`${domain}/category/${id}`, params);
      //console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);

// Route 4: Order by name desc
router.get(
  "/categories/:id/subcategory/:subcategory/promotion/:promotion/limit/:number/order/name/desc/price/:price/weight/:weight",
  async (req, res) => {
    const { id, subcategory, promotion, number, price, weight } = req.params;

    const params = {
      subcategory_id: subcategory,
      delivery_promotions: promotion,
      order: "name+desc",
      limit: number,
      price,
      weight,
    };

    try {
      const url = constructUrl(`${domain}/category/${id}`, params);
      //  console.log(url);
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }
);
//Pack filter
router.get("/our/packs/price/:price/weight/:weight", async (req, res) => {
  const { price, weight } = req.params;
  try {
    const url = `${domain}/packs?price${price}&weight${weight}`;
    const response = await axios.get(url);
    // console.log(url);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

module.exports = router;
