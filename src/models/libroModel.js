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

const obtenerCatalogo = async () => {
  const query = `
    SELECT 
      l.id AS libro_id,
      l.titulo,
      l.descripcion,
      l.precio,
      l.url_portada,
      l.url_libro,
      l.id_categoria,
      c.nombre_cat AS nombre_categoria,
      l.id_autor,
      a.nombre AS nombre_autor,

      r.id AS resena_id,
      r.calificacion,
      r.id_usuario AS resena_usuario_id,
      u_r.nombre AS nombre_usuario_resena,

      com.id AS comentario_id,
      com.comentario,
      com.id_usuario AS comentario_usuario_id,
      u_c.nombre AS nombre_usuario_comentario

    FROM libros l
    JOIN categorias c ON l.id_categoria = c.id
    JOIN autor a ON l.id_autor = a.id
    LEFT JOIN resenas r ON l.id = r.id_libro
    LEFT JOIN usuarios u_r ON r.id_usuario = u_r.id
    LEFT JOIN comentarios com ON l.id = com.id_libro
    LEFT JOIN usuarios u_c ON com.id_usuario = u_c.id
  `;

  const resultado = await pool.query(query);
  return resultado.rows;
};

//Biblioteca
const listarBiblioteca = async (id_usuario) => {
  const query = `
    SELECT
  l.id AS libro_id,
  l.titulo,
  l.descripcion,
  l.url_portada,
  l.url_libro,
  c.nombre_cat AS nombre_categoria,
  a.nombre AS nombre_autor
FROM
  libros l
JOIN
  biblioteca b ON l.id = b.id_libro
JOIN
  categorias c ON l.id_categoria = c.id
JOIN
  autor a ON l.id_autor = a.id
WHERE
  b.id_usuario = $1;
  `;
  const resultado = await pool.query(query, [id_usuario]);
  return resultado.rows;
};
module.exports = {
  registrar,
  buscarPorIsbn,
  libroPorId,
  actualizarLibro,
  eliminarLibro,
  filtroLibro,
  obtenerCatalogo,
  listarBiblioteca,
};
