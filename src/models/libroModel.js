const pool = require("../config/db");

const registrar = async (
  isbn,
  titulo,
  descripcion,
  precio,
  url_portada,
  url_libro,
  id_categoria,
  id_autor
) => {
  const query = `INSERT INTO libros (isbn,titulo,descripcion,precio,url_portada,url_libro,id_categoria,id_autor) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const resultado = await pool.query(query, [
    isbn,
    titulo,
    descripcion,
    precio,
    url_portada,
    url_libro,
    id_categoria,
    id_autor,
  ]);
  return resultado.rows[0];
};

const buscarPorIsbn = async (isbn) => {
  const query = `SELECT isbn FROM libros WHERE isbn = $1`;
  const resultado = await pool.query(query, [isbn]);
  return resultado.rows[0];
};

const listarLibros = async () => {
  const query = `SELECT * FROM libros`;
  const resultado = await pool.query(query);
  return resultado.rows;
};

const libroPorId = async (id) => {
  const query = `SELECT * FROM libros WHERE id = $1`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

module.exports = {
  registrar,
  buscarPorIsbn,
  listarLibros,
  libroPorId,
};
