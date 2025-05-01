const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const getMessage = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    id,
  ]);
  console.log("Rows: ", rows);

  return rows;
};

const addMessage = async (text, username) => {
  await pool.query("INSERT INTO messages (text, username) VALUES (($1),($2))", [
    text,
    username,
  ]);
};

module.exports = { getAllMessages, getMessage, addMessage };
