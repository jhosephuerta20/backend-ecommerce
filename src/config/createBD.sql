CREATE DATABASE bookstore;
\c bookstore;

-- Tabla Autores
CREATE TABLE autor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    url_foto TEXT,
);

-- Tabla Categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR (70) NOT NULL
);

-- Tabla Libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(20),
    titulo VARCHAR(255),
    descripcion TEXT,
    precio DECIMAL(10,2),
    url_portada TEXT,
    url_libro TEXT,
    id_categoria INTEGER REFERENCES Categorias(id),
    
);
id_autor INTEGER REFERENCES Autores(id),
-- Tabla Resenas
CREATE TABLE Resenas (
    id SERIAL PRIMARY KEY,
    calificacion INTEGER,
    id_libro INTEGER REFERENCES Libros(id),
    id_comentario INTEGER,
    id_usuario INTEGER REFERENCES Usuarios(id) -- esta referencia estará en la tabla Usuarios
);

-- Tabla Ventas
CREATE TABLE Ventas (
    id_ventas SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES Usuarios(id),
    cantidad_total INTEGER,
    total_pagar DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    igv DECIMAL(10,2),
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Detalle_venta
CREATE TABLE Detalle_venta (
    id_ventas INTEGER REFERENCES Ventas(id),
    id_libro INTEGER REFERENCES Libros(id),
    cantidad INTEGER,
    precio_unitario DECIMAL(10,2),
    PRIMARY KEY (id_ventas, id_libro)
);

-- Tabla Pagos
CREATE TABLE Pago (
    id SERIAL PRIMARY KEY,
    metodo VARCHAR(50),
    id_venta INTEGER REFERENCES Ventas(id),
    estado VARCHAR(50),
    payment_id VARCHAR(100),
    tipo_pago VARCHAR(50)
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),  
    correo VARCHAR(100),
    contrasena VARCHAR(255),
    rol VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Favoritos
CREATE TABLE Favoritos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES Usuarios(id),
    id_libro INTEGER REFERENCES Libros(id)
);

-- Tabla Comentarios
CREATE TABLE Comentarios (
    id SERIAL PRIMARY KEY,
    comentario TEXT,
    id_usuario INTEGER REFERENCES Usuarios(id),
    id_libro INTEGER REFERENCES Libros(id)
);