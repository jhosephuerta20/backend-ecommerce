const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/autenticacionModel");

const registrar = async (req, res) => {
  const { nombre, correo, rol, contrasena } = req.body;
  try {
    const existente = await Usuario.buscarPorCorreo(correo);
    if (existente) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
    const nuevo = await Usuario.crearUsuario(
      nombre,
      correo,
      rol,
      contrasenaHasheada
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevo.id,
        nombre: nuevo.nombre,
        correo: nuevo.correo,
        rol: nuevo.rol,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el registro", detalle: error.message });
  }
};

function generarJWT(usuario) {
  // Incluye el ID y el rol en el payload
  const payload = {
    id: usuario.id,
    rol: usuario.rol,
  };
  console.log("aqui esta", payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
}

const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await Usuario.buscarPorCorreo(correo);
    if (!usuario) {
      return res.status(404).json({ error: "Correo no registrado" });
    }

    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const token = generarJWT(usuario);
    res.json({ token, rol: usuario.rol, id: usuario.id });
  } catch (error) {
    res.status(500).json({
      error: "Error al iniciar sesión",
      detalle: error.message,
    });
  }
};

const obtenerPerfil = async (req, res) => {
  const id = req.usuarioId;
  try {
    const usuario = await Usuario.buscarPorId(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ perfil: usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener perfil", detalle: error.message });
  }
};

module.exports = {
  generarJWT,
  registrar,
  iniciarSesion,
  obtenerPerfil,
};
