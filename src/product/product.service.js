// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const {
  findProducts,
  findProductById,
  findProductByName,
  insertProduct,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  return await findProducts();
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const createProduct = async (newProductData) => {
  const existingProduct = await findProductByName(newProductData?.name);

  if (existingProduct) {
    throw new Error("Product name must be unique");
  }
  return await insertProduct(newProductData);
};

const deleteProductById = async (id) => {
  return await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);
  return await editProduct(id, productData);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
