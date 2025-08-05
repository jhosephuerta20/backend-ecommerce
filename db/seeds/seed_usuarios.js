//Ejecutar en la terminal:
//npx knex seed:run

const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("usuarios").del();
  const hashedPassword = await bcrypt.hash("Temp12345!", 12);
  return knex("usuarios").insert([
    {
      nombre: "Juan Pérez",
      correo: "juanperez@gmail.com",
      contrasena: hashedPassword,
      url_foto: "https://ejemplo.com/juan.jpg",
      rol: "CLIENTE",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      nombre: "Jhosep Saucedo Huerta",
      correo: "jhosephuerta@gmail.com",
      contrasena: hashedPassword,
      url_foto: "https://ejemplo.com/jhosep.jpg",
      rol: "ADMIN",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
