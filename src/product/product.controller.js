// layer untuk handle request body
// biasanya jg untuk handle validasi
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");
const { responseHandler } = require("../../utils/common");

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    responseHandler(res, 200, true, products, "Successfully get list products");
  } catch (err) {
    responseHandler(res, 500, false, null, "Failed to get products");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    responseHandler(res, 200, true, product, "Product successfully retrieved");
  } catch (err) {
    responseHandler(res, 404, false, null, "Product not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const newDataProduct = req.body;
    const product = await createProduct(newDataProduct);
    responseHandler(res, 201, true, product, "Product successfully created");
  } catch (err) {
    responseHandler(res, 400, false, null, "Product data is required");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await deleteProductById(productId);
    responseHandler(res, 200, true, product, "Product successfully deleted");
  } catch (err) {
    responseHandler(res, 404, false, null, "Product not found");
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !productData.name ||
    !productData.description ||
    !productData.price ||
    !productData.image
  ) {
    return responseHandler(res, 400, false, null, "Product data is required");
  }

  try {
    const product = await editProductById(productId, productData);
    responseHandler(res, 200, true, product, "Product successfully updated");
  } catch (err) {
    responseHandler(res, 404, false, null, "Product not found");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await editProductById(productId, productData);
    responseHandler(res, 200, true, product, "Product successfully updated");
  } catch (err) {
    responseHandler(res, 404, false, null, "Product not found");
  }
});

module.exports = router;
