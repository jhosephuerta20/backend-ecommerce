const CarritoModel = require("../models/carritoModel");

const agregarAlCarrito = async (req, res) => {
  const id_usuario = req.usuarioId;
  const { id_libro } = req.body;
  try {
    const yaExiste = await CarritoModel.verificarLibroEnCarrito(
      id_usuario,
      id_libro
    );
    if (yaExiste) {
      return res.status(400).json({ error: "El libro ya está en el carrito." });
    }

    console.log("yaExyaiste");

    const nuevo = await CarritoModel.agregarLibro(id_usuario, id_libro);
    res.status(201).json({ mensaje: "Libro agregado al carrito", data: nuevo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al agregar al carrito", detalle: error.message });
  }
};

const listarCarrito = async (req, res) => {
  const id_usuario = req.usuarioId;

  try {
    const libros = await CarritoModel.listarLibrosPorUsuario(id_usuario);

    // Convertir precios a números y realizar cálculos
    let subtotal = 0;
    let totalDescontado = 0;

    const librosConDescuento = libros.map((libro) => {
      const precioNumero = parseFloat(libro.precio);
      subtotal += precioNumero;

      // Descuento del 12%
      const descuento = precioNumero * 0.12;
      const precioConDescuento = precioNumero - descuento;
      totalDescontado += precioConDescuento;

      return {
        ...libro,
        precioSinIGV: precioConDescuento.toFixed(2),
      };
    });

    // Calcular el IGV (12% del subtotal)
    const igv = subtotal * 0.12;

    // El total después del descuento
    const total = totalDescontado;

    // Agregar cantidad de libros
    const cantidadLibros = libros.length;

    // Respuesta con el resumen financiero
    res.status(200).json({
      libros: librosConDescuento,
      resumen: {
        cantidad: cantidadLibros,
        subtotal: subtotal.toFixed(2),
        igv: igv.toFixed(2),
        total: total.toFixed(2),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el carrito", detalle: error.message });
  }
};

const eliminarLibroDelCarrito = async (req, res) => {
  const id_usuario = req.usuarioId;
  const { id } = req.params;
  try {
    await CarritoModel.eliminarLibro(id_usuario, id);
    res.status(200).json({ mensaje: "Libro eliminado del carrito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el libro", detalle: error.message });
  }
};

const vaciarCarrito = async (req, res) => {
  const id_usuario = req.usuarioId;
  try {
    await CarritoModel.vaciarCarrito(id_usuario);
    res.status(200).json({ mensaje: "Carrito vaciado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al vaciar el carrito", detalle: error.message });
  }
};

module.exports = {
  agregarAlCarrito,
  listarCarrito,
  eliminarLibroDelCarrito,
  vaciarCarrito,
};
