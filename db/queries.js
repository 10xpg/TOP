const pool = require("./pool");

const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
};

const getCategoryList = async () => {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
};

module.exports = { getAllProducts, getCategoryList };
