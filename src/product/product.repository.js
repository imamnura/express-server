// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../db");

const findProducts = async () => {
  return await prisma.product.findMany();
};

const findProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: id },
  });
};

const findProductByName = async (name) => {
  return await prisma.product.findFirst({
    where: { name },
  });
};

const insertProduct = async (productData) => {
  return await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: { id },
  });
};

const editProduct = async (id, productData) => {
  return await prisma.product.update({
    where: { id },
    data: productData,
  });
};

module.exports = {
  findProducts,
  findProductById,
  findProductByName,
  insertProduct,
  deleteProduct,
  editProduct,
};
