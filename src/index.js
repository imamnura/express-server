const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");

const app = express();

dotenv.config();

// const connectionString = `${process.env.DATABASE_URL}`;

// const prisma = new PrismaClient();

// (async () => {
//   try {
//     console.log(await prisma.widget.create({ data: {} }));
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     prisma.$disconnect();
//   }
// })();

const PORT = process.env.ADMINER_PORT || 3000;

app.use(express.json()); //parse si body
app.use(cors()); //parse si query

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
