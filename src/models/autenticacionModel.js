const db = require("../config/db");

const crearUsuario = async (nombre, correo, rol, contrasenaHasheada) => {
  const resultado = await db.query(
    "INSERT INTO usuarios (nombre, correo,rol, contrasena) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, correo, rol, contrasenaHasheada]
  );
  return resultado.rows[0];
};

const buscarPorCorreo = async (correo) => {
  const resultado = await db.query("SELECT * FROM usuarios WHERE correo = $1", [
    correo,
  ]);
  return resultado.rows[0];
};

const buscarPorId = async (id) => {
  const resultado = await db.query(
    "SELECT id, nombre, correo, created_at FROM usuarios WHERE id = $1",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  crearUsuario,
  buscarPorCorreo,
  buscarPorId,
};
