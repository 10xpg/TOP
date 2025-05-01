require('dotenv').config()
const { Client } = require('pg')

const dbString = process.env.PG_CONNECTION_STRING
const adminCode = process.env.ADMIN_SECRET
const memberCode = process.env.MEMBER_SECRET

const SQL = `

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (50) UNIQUE,
  firstName VARCHAR (255),
  lastName VARCHAR (255),
  pwdHash VARCHAR (255),
  salt VARCHAR (255),
  isMember BOOLEAN,
  isAdmin BOOLEAN,
  joinedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  userId INTEGER REFERENCES users ON DELETE CASCADE,
  title VARCHAR(100),
  message TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS promotions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  status VARCHAR(100),
  secret VARCHAR (255),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT NULL
);
`

const insertPasscodes = `

  INSERT INTO promotions (status, secret) VALUES
  ('member', $1 ),
  ('admin', $2 );  
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: dbString
  })
  await client.connect()
  await client.query(SQL)
  await client.query(insertPasscodes, [memberCode, adminCode])
  await client.end()
  console.log('CREATE TABLE')
}

main()
