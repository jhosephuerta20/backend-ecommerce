const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const VentasModel = require("../models/ventasModel");
const CarritoModel = require("../models/carritoModel");

const obtenerCarritoYCalcularTotales = async (id_usuario) => {
  const carrito = await CarritoModel.listarLibrosPorUsuario(id_usuario);

  if (carrito.length === 0) {
    throw new Error("El carrito está vacío");
  }
  const subtotal = carrito.reduce(
    (acc, libro) => acc + parseFloat(libro.precio),
    0
  );
  const igv = subtotal * 0.18;
  const total = subtotal + igv;
  return { carrito, total, subtotal, igv };
};

const crearIntencionDePagoStripe = async (total, id_usuario, carrito) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: "PEN",
    metadata: {
      id_usuario: id_usuario,
      carrito: JSON.stringify(
        carrito.map((libro) => ({ id_libro: libro.id_libro }))
      ),
    },
  });
  return paymentIntent;
};

const crearRegistroDeVenta = async (
  id_usuario,
  cantidad_total,
  total_pagar,
  subtotal,
  igv
) => {
  const venta = await VentasModel.crearVenta({
    id_usuario,
    cantidad_total,
    total_pagar,
    subtotal,
    igv,
  });
  return venta;
};

const insertarDetallesDeVenta = async (id_venta, carrito) => {
  for (const libro of carrito) {
    await VentasModel.insertarDetalleVenta({
      id_venta: id_venta,
      id_libro: libro.id_libro,
      cantidad: 1,
      precio_unitario: parseFloat(libro.precio),
    });
  }
};

const agregarLibrosABiblioteca = async (id_usuario, carrito) => {
  for (const libro of carrito) {
    await VentasModel.insertarEnBiblioteca(id_usuario, libro.id_libro);
  }
};

const registrarInformacionDePago = async (
  id_venta,
  metodo_pago,
  paymentIntent
) => {
  let paymentId = paymentIntent.id;
  await VentasModel.registrarPago({
    id_venta: id_venta,
    metodo: metodo_pago,
    estado: "exitoso",
    paymentId: paymentId,
    tipo_pago: "tarjeta",
  });
};

const limpiarCarritoDeUsuario = async (id_usuario) => {
  await CarritoModel.vaciarCarrito(id_usuario);
};

const procesarVenta = async (req, res) => {
  const id_usuario = req.usuarioId;
  const { metodo_pago = "tarjeta" } = req.body;

  try {
    const { carrito, total, subtotal, igv } =
      await obtenerCarritoYCalcularTotales(id_usuario);

    const paymentIntent = await crearIntencionDePagoStripe(
      total,
      id_usuario,
      carrito
    );

    const venta = await crearRegistroDeVenta(
      id_usuario,
      carrito.length,
      total,
      subtotal,
      igv
    );
    await insertarDetallesDeVenta(venta.id, carrito);
    await agregarLibrosABiblioteca(id_usuario, carrito);
    await registrarInformacionDePago(venta.id, metodo_pago, paymentIntent);
    await limpiarCarritoDeUsuario(id_usuario);
    res
      .status(200)
      .json({ mensaje: "Compra registrada exitosamente", venta_id: venta.id });
  } catch (error) {
    console.error("Error en procesarVenta:", error.message);
    let statusCode = 500;
    if (error.message === "El carrito está vacío") {
      statusCode = 400;
    }
    res
      .status(statusCode)
      .json({ error: "Error al procesar la venta", detalle: error.message });
  }
};

module.exports = { procesarVenta };
