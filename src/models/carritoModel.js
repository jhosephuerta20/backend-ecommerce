const pool = require("../config/db");

const agregarLibro = async (id_usuario, id_libro) => {
  const query = `
    INSERT INTO carrito_compras (id_usuario, id_libro)
    VALUES ($1, $2)
    RETURNING *
  `;
  const resultado = await pool.query(query, [id_usuario, id_libro]);

  return resultado.rows[0];
};

const verificarLibroEnCarrito = async (id_usuario, id_libro) => {
  const query = `
    SELECT * FROM carrito_compras
    WHERE id_usuario = $1 AND id_libro = $2
  `;
  const resultado = await pool.query(query, [id_usuario, id_libro]);
  return resultado.rows.length > 0;
};

const listarLibrosPorUsuario = async (id_usuario) => {
  const query = `
    SELECT cc.id, cc.id_libro, l.titulo, l.precio
    FROM carrito_compras cc
    JOIN libros l ON cc.id_libro = l.id
    WHERE cc.id_usuario = $1
  `;
  const resultado = await pool.query(query, [id_usuario]);
  return resultado.rows;
};

const eliminarLibro = async (id_usuario, id) => {
  const query = `
    DELETE FROM carrito_compras
    WHERE id_usuario = $1 AND id = $2
  `;
  await pool.query(query, [id_usuario, id]);
};

const vaciarCarrito = async (id_usuario) => {
  const query = `
    DELETE FROM carrito_compras
    WHERE id_usuario = $1
  `;
  await pool.query(query, [id_usuario]);
};

const verificarLibroEnBiblioteca = async (id_usuario, id_libro) => {
  const query = `
    SELECT * FROM biblioteca
    WHERE id_usuario = $1 AND id_libro = $2
  `;
  const resultado = await pool.query(query, [id_usuario, id_libro]);
  return resultado.rows.length > 0;
};

module.exports = {
  agregarLibro,
  verificarLibroEnCarrito,
  listarLibrosPorUsuario,
  eliminarLibro,
  vaciarCarrito,
  verificarLibroEnBiblioteca,
};
