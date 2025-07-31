-- Tabla Autores
CREATE TABLE autor (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    url_foto TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla biblioteca
CREATE TABLE biblioteca (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    id_libro INTEGER REFERENCES libros(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
);

-- Tabla carrito_compras
CREATE TABLE carrito_compras (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    id_libro INTEGER REFERENCES libros(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
);

-- Tabla Categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre_cat VARCHAR (70) NOT NULL
	created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    comentario TEXT NOT NULL,
    id_usuario INTEGER REFERENCES usuarios(id),
    id_libro INTEGER REFERENCES libros(id)
	created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE detalle_venta (
    id SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id),
    id_libro INTEGER REFERENCES libros(id),
    cantidad INTEGER,
    precio_unitario DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    id_libro INTEGER REFERENCES libros(id)
);

-- Tabla Libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(5) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    url_portada TEXT NOT NULL,
    url_libro TEXT NOT NULL,
    id_categoria INTEGER REFERENCES Categorias(id),
    id_autor INTEGER REFERENCES autor(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pago (
    id SERIAL PRIMARY KEY,
    metodo VARCHAR(50),
    id_venta INTEGER REFERENCES ventas(id),
    estado VARCHAR(50),
    payment_id VARCHAR(100),
    tipo_pago VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Tabla Resenas
CREATE TABLE resenas (
    id SERIAL PRIMARY KEY,
    calificacion INTEGER,
    id_libro INTEGER REFERENCES libros(id),
    id_usuario INTEGER REFERENCES usuarios(id) 
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,  
    correo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
	url_foto TEXT,
    rol VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Tabla ventas

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    cantidad_total INTEGER,
    total_pagar DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    igv DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
);