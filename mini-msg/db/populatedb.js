require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
text VARCHAR(500),
username VARCHAR(255),
added TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (text, username) VALUES
('Hi there!','Amando'),
('Hello World!','Charles');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
