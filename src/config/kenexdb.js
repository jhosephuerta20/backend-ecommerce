require("dotenv").config();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
  },
});

knex
  .raw("SELECT 1")
  .then(() => console.log("Conectado a la bd"))
  .catch((err) => console.error("Error al conectar DB:", err));

module.exports = knex;
