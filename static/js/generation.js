const recetas = [
  { title: "Receta 1", description: "COCONUT" },
  { title: "Receta 2", description: "ARROZ con Pescado" },
  { title: "Receta 3", description: "Pollo Aguacate" },
];

const postContainer = document.querySelector(".card-container");

const postMethods = () => {
  recetas.map((postData) => {
    // Crear un elemento HTML para cada receta
    const card = document.createElement("div");
    card.classList.add("card");

    // Agregar contenido a la tarjeta
    card.innerHTML = `
        <h3>${postData.title}</h3>
        <p>${postData.description}</p>
      `;

    // Añadir la tarjeta al contenedor
    postContainer.appendChild(card);
  });
};

postMethods();
