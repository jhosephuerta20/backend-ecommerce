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

const actualizarLibro = async (
  isbn,
  titulo,
  descripcion,
  precio,
  url_portada,
  url_libro,
  id_categoria,
  id_autor,
  id
) => {
  const query = `UPDATE libros SET isbn = $1,titulo = $2,descripcion = $3,precio = $4,url_portada = $5,url_libro = $6,id_categoria = $7,id_autor = $8 WHERE id = $9
  RETURNING *`;
  const resultado = await pool.query(query, [
    isbn,
    titulo,
    descripcion,
    precio,
    url_portada,
    url_libro,
    id_categoria,
    id_autor,
    id,
  ]);
  return resultado.rows;
};

const eliminarLibro = async (id) => {
  const query = `DELETE FROM libros where id = $1`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

const filtroLibro = async (titulo) => {
  const query = `SELECT * FROM libros WHERE titulo = $1 `;
  const resultado = await pool.query(query, [titulo]);
  return resultado.rows;
};

module.exports = {
  registrar,
  buscarPorIsbn,
  listarLibros,
  libroPorId,
  actualizarLibro,
  eliminarLibro,
  filtroLibro,
};
