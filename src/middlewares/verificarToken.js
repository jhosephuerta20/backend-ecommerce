const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ success: false, error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const clienteId = payload.id;
    const rol = payload.rol;
    req.usuario = {
      id: clienteId,
      rol: rol,
    };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Token inválido o expirado" });
  }
};

// Función para validar múltiples roles permitidos
const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !req.usuario.rol) {
      return res.status(401).json({ success: false, error: "No autenticado" });
    }
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ success: false, error: "Acceso denegado" });
    }
    next();
  };
};

module.exports = { verificarToken, autorizarRoles };
