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

const addProductToCategory = async (
  category,
  name,
  description,
  price,
  image,
  quantity
) => {
  await pool.query(
    `
    INSERT INTO product (category_id, name, description, price, imageUrl, amount) VALUES
    ((SELECT id FROM category WHERE category = ($1)),($2),($3),($4),($5),($6))
    `,
    [category, name, description, price, image, quantity]
  );
};

const editCategory = async (newValue, id) => {
  await pool.query("UPDATE category SET category = ($1) WHERE id = ($2) ", [
    newValue,
    id,
  ]);
};

const editProduct = () => {};

module.exports = {
  getAllProducts,
  getCategoryList,
  getCategory,
  createCategory,
  addProductToCategory,
};
