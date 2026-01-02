import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

export async function initDatabase() {
  // Connect to default postgres DB first
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: "postgres",
  });

  await client.connect();

  // Create DB if not exists
  const dbCheck = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [process.env.PG_DATABASE]
  );

  if (dbCheck.rowCount === 0) {
    await client.query(`CREATE DATABASE "${process.env.PG_DATABASE}"`);
    console.log("✅ Database created: EPMDatabook");
  }

  await client.end();

  // Now connect to EPMDatabook DB
  const appClient = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });

  await appClient.connect();

  // Create table
  await appClient.query(`
    CREATE TABLE IF NOT EXISTS Info (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100),
      description TEXT,
      machine_name VARCHAR(100),
      equipment_no VARCHAR(50),
      version VARCHAR(50),
      start_time TIMESTAMP,
      end_time TIMESTAMP
    );
  `);

  console.log("✅ Table ensured: Info");
  await appClient.end();
}
