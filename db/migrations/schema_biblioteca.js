//Ejecutar en la terminal:
//npx knex migrate:rollback
//npx knex migrate:latest

exports.up = function (knex) {
  return (
    knex.schema
      //Tabla usuarios
      .createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nombre", 100).notNullable();
        table.string("correo", 100).notNullable();
        table.string("contrasena", 255).notNullable();
        table.text("url_foto");
        table.string("rol", 50);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      //Tabla autor
      .createTable("autor", (table) => {
        table.increments("id").primary();
        table.string("nombre", 50).notNullable();
        table.text("url_foto").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      //Tabla categorias
      .createTable("categorias", (table) => {
        table.increments("id").primary();
        table.string("nombre_cat", 70).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      //Tabla libros
      .createTable("libros", (table) => {
        table.increments("id").primary();
        table.string("isbn", 5).notNullable();
        table.string("titulo", 255).notNullable();
        table.text("descripcion").notNullable();
        table.decimal("precio", 10, 2).notNullable();
        table.text("url_portada").notNullable();
        table.text("url_libro").notNullable();
        table
          .integer("id_categoria")
          .unsigned()
          .references("id")
          .inTable("categorias")
          .onDelete("SET NULL");
        table
          .integer("id_autor")
          .unsigned()
          .references("id")
          .inTable("autor")
          .onDelete("SET NULL");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabla comentarios
      .createTable("comentarios", (table) => {
        table.increments("id").primary();
        table.text("comentario").notNullable();
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabla resenas
      .createTable("resenas", (table) => {
        table.increments("id").primary();
        table.integer("calificacion");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("CASCADE");
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
      })

      // Tabla favoritos
      .createTable("favoritos", (table) => {
        table.increments("id").primary();
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("CASCADE");
      })

      //Tabla carrito_compras
      .createTable("carrito_compras", (table) => {
        table.increments("id").primary();
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      //Tabla biblioteca
      .createTable("biblioteca", (table) => {
        table.increments("id").primary();
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      //Tabla ventas
      .createTable("ventas", (table) => {
        table.increments("id").primary();
        table
          .integer("id_usuario")
          .unsigned()
          .references("id")
          .inTable("usuarios")
          .onDelete("CASCADE");
        table.integer("cantidad_total");
        table.decimal("total_pagar", 10, 2);
        table.decimal("subtotal", 10, 2);
        table.decimal("igv", 10, 2);
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      // Tabla pago
      .createTable("pago", (table) => {
        table.increments("id").primary();
        table.string("metodo", 50);
        table
          .integer("id_venta")
          .unsigned()
          .references("id")
          .inTable("ventas")
          .onDelete("CASCADE");
        table.string("estado", 50);
        table.string("payment_id", 100);
        table.string("tipo_pago", 50);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabla detalle_ventas
      .createTable("detalle_venta", (table) => {
        table.increments("id").primary();
        table
          .integer("id_venta")
          .unsigned()
          .references("id")
          .inTable("ventas")
          .onDelete("CASCADE");
        table
          .integer("id_libro")
          .unsigned()
          .references("id")
          .inTable("libros")
          .onDelete("SET NULL");
        table.integer("cantidad");
        table.decimal("precio_unitario", 10, 2);
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("autor")
    .dropTableIfExists("biblioteca")
    .dropTableIfExists("carrito_compras")
    .dropTableIfExists("categorias")
    .dropTableIfExists("comentarios")
    .dropTableIfExists("detalle_venta")
    .dropTableIfExists("favoritos")
    .dropTableIfExists("libros")
    .dropTableIfExists("pago")
    .dropTableIfExists("resenas")
    .dropTableIfExists("usuarios")
    .dropTableIfExists("ventas");
};
