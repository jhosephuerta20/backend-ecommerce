const pool = require("../config/db");

const agregar = async (id_usuario, id_libro) => {
  const query = `INSERT INTO favoritos (id_usuario, id_libro) VALUES ($1,$2) RETURNING *`;
  const resultado = await pool.query(query, [id_usuario, id_libro]);
  return resultado.rows[0];
};

const validacionFavoritos = async (id_usuario, id_libro) => {
  const query = `
    SELECT * FROM favoritos WHERE id_usuario = $1 AND id_libro = $2 `;
  const resultado = await pool.query(query, [id_usuario, id_libro]);
  return resultado.rows[0];
};

const listar = async (id_usuario) => {
  const query = `SELECT 
    f.id AS favorito_id,
    f.id_usuario,
    json_build_object(
      'id', l.id,
      'isbn', l.isbn,
      'titulo', l.titulo,
      'descripcion', l.descripcion,
      'precio', l.precio,
      'url_portada', l.url_portada,
      'url_libro', l.url_libro,
      'id_autor', l.id_autor,
      'id_categoria', l.id_categoria,
      'autor', json_build_object('nombre', a.nombre),
      'categoria', json_build_object('categoria', c.categoria)
    ) AS libro
  FROM favoritos f
  JOIN libros l ON f.id_libro = l.id
  LEFT JOIN autor a ON l.id_autor = a.id
  LEFT JOIN categorias c ON l.id_categoria = c.id
  WHERE f.id_usuario = $1;
  `;
  const resultado = await pool.query(query, [id_usuario]);
  return resultado.rows;
};

const eliminar = async (id) => {
  const query = `DELETE FROM favoritos WHERE id = $1  RETURNING *`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows;
};

module.exports = {
  agregar,
  validacionFavoritos,
  listar,
  eliminar,
};
