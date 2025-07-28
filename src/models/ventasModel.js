const pool = require("../config/db");

const crearVenta = async ({
  id_usuario,
  cantidad_total,
  total_pagar,
  subtotal,
  igv,
}) => {
  const query = `
    INSERT INTO ventas (id_usuario, cantidad_total, total_pagar, subtotal, igv)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    id_usuario,
    cantidad_total,
    total_pagar,
    subtotal,
    igv,
  ]);
  return result.rows[0];
};

const insertarDetalleVenta = async ({
  id_venta,
  id_libro,
  cantidad,
  precio_unitario,
}) => {
  const query = `
    INSERT INTO detalle_venta (id_venta, id_libro, cantidad, precio_unitario)
    VALUES ($1, $2, $3, $4)
  `;
  await pool.query(query, [id_venta, id_libro, cantidad, precio_unitario]);
};

const insertarEnBiblioteca = async (id_usuario, id_libro) => {
  const query = `
    INSERT INTO biblioteca (id_usuario, id_libro)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING;
  `;
  await pool.query(query, [id_usuario, id_libro]);
};

const registrarPago = async ({
  id_venta,
  metodo,
  estado,
  paymentId,
  tipo_pago,
}) => {
  const query = `
    INSERT INTO pago (metodo, id_venta, estado, payment_id, tipo_pago)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await pool.query(query, [metodo, id_venta, estado, paymentId, tipo_pago]);
};

module.exports = {
  crearVenta,
  insertarDetalleVenta,
  insertarEnBiblioteca,
  registrarPago,
};
