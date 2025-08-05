exports.seed = async function (knex) {
  await knex("autor").del();
  await knex("autor").insert([
    {
      nombre: "Gabriel García Márquez",
      url_foto: "https://link.com/foto1.jpg",
    },
    { nombre: "Isabel Allende", url_foto: "https://link.com/foto2.jpg" },
  ]);
};
