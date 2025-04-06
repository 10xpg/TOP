const pool = require("./pool");

const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM product");
  return rows;
};

const getCategoryList = async () => {
  const { rows } = await pool.query("SELECT * FROM category");
  return rows;
};

const getAllCategory = async (category) => {
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

const getCategory = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM category
    WHERE id = ($1)
    `,
    [id]
  );
  return rows;
};

const getProduct = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM product
    WHERE id = ($1)
    `,
    [id]
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

const editCategory = async (newCategoryValue, id) => {
  await pool.query("UPDATE category SET category = ($1) WHERE id = ($2) ", [
    newValue,
    id,
  ]);
};

const editProduct = async (
  id,
  newCategoryId,
  newProductVal,
  newDescriptionVal,
  newPriceVal,
  newImageVal,
  newQtyVal
) => {
  await pool.query(
    `
    UPDATE product SET category_id = ($2), name = ($3), description = ($4), price = ($5), imageurl = ($6), amount = ($7)
    WHERE id = ($1)
    `,
    [
      id,
      newCategoryId,
      newProductVal,
      newDescriptionVal,
      newPriceVal,
      newImageVal,
      newQtyVal,
    ]
  );
};

module.exports = {
  getAllProducts,
  getCategoryList,
  getAllCategory,
  getCategory,
  getProduct,
  createCategory,
  addProductToCategory,
  editCategory,
  editProduct,
};
