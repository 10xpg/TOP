const pool = require("./pool");

const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
};

const getCategoryList = async () => {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
};

const getCategory = async (category) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM category
    JOIN product ON category.id = product.category_id
    WHERE category = ($1)
    `,
    [category]
  );
  return rows;
};

const createCategory = async (category) => {
  await pool.query("INSERT INTO category (category) VALUES ($1)", [category]);
};

const addProductToCategory = async () => {};

module.exports = {
  getAllProducts,
  getCategoryList,
  getCategory,
  createCategory,
  addProductToCategory,
};
