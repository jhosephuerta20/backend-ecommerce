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

// const crearIntencionDePagoStripe = async (total, id_usuario, carrito) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: Math.round(total * 100),
//     currency: "PEN",
//     metadata: {
//       id_usuario: id_usuario,
//       carrito: JSON.stringify(
//         carrito.map((libro) => ({ id_libro: libro.id_libro }))
//       ),
//     },
//   });
//   return paymentIntent;
// };

const crearIntentoDePago = async (req, res) => {
  const id_usuario = req.usuario.id;

  try {
    const datos_carrito = await obtenerCarritoYCalcularTotales(id_usuario);
    if (!datos_carrito || !datos_carrito.total || !datos_carrito.carrito) {
      return res.status(400).json({
        error: "Error: No se pudo obtener el carrito o el total a pagar.",
      });
    }

    const total_a_pagar_en_centavos = Math.round(datos_carrito.total * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_a_pagar_en_centavos,
      currency: "PEN",
      metadata: {
        id_usuario: id_usuario,
        carrito: JSON.stringify(
          datos_carrito.carrito.map((libro) => ({ id_libro: libro.id_libro }))
        ),
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({
      error: "Error creando el intento de pago",
      detalle: error.message,
    });
  }
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

// ✅ Lógica pura de negocio (no depende de req ni res)
const procesarVenta = async (
  id_usuario,
  paymentIntent,
  metodo_pago = "tarjeta"
) => {
  try {
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

    return venta;
  } catch (error) {
    console.error("Error en procesarVentaLogic:", error.message);
    throw error;
  }
};

const webHook = async (req, res) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    //console.log("contenido del event", event);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const id_usuario = paymentIntent.metadata.id_usuario;
    try {
      await procesarVenta(id_usuario, paymentIntent);
    } catch (err) {
      console.error("Error procesando venta:", err.message);
    }
  }

  res.json({ received: true });
};

module.exports = {
  crearIntentoDePago,
  procesarVenta,
  webHook,
};
