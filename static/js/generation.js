const recetas = [
  {
    title: "Arroz relleno",

    proteinas: 5, // Gramos de proteína
    grasas: 20, // Gramos de grasa
    image: "/static/images/comida112.jpg",
    carbohidratos: 15, // Gramos de carbohidratos
    calorias: 240, // Calorías totales
  },
  {
    title: "Arroz Marinero",

    proteinas: 25,
    image: "/static/images/comida112.jpg",
    grasas: 10,
    carbohidratos: 40,
    calorias: 400,
  },
  {
    title: "Pollo Aguacate",

    proteinas: 30,
    image: "/static/images/comida112.jpg",
    grasas: 18,
    carbohidratos: 5,
    calorias: 350,
  },
  {
    title: "Pollo Aguacate",

    proteinas: 30,
    image: "/static/images/comida112.jpg",
    grasas: 18,
    carbohidratos: 5,
    calorias: 350,
  },
  {
    title: "Pollo Aguacate",

    proteinas: 30,
    image: "/static/images/comida112.jpg",
    grasas: 18,
    carbohidratos: 5,
    calorias: 350,
  },
  {
    title: "Pollo Aguacate",

    proteinas: 30,
    image: "/static/images/comida112.jpg",
    grasas: 18,
    carbohidratos: 5,
    calorias: 350,
  },
  {
    title: "Pollo Aguacate",

    proteinas: 30,
    image: "/static/images/comida112.jpg",
    grasas: 18,
    carbohidratos: 5,
    calorias: 350,
  },
];
// Limpia el contenedor de recetas antes de agregar nuevas tarjetas
const recetas2 = null;
const postContainer = document.querySelector(".recipe-cards");

const postMethods = () => {
  postContainer.innerHTML = "";
  recetas.map((postData) => {
    // Crear un elemento HTML para cada receta

    const card = document.createElement("div");
    card.classList.add("recipe-card", "bounce-in-top");

    // Agregar contenido a la tarjeta
    card.innerHTML = `
    <div class = "recipe-card-content">
      <img src="${postData.image}" alt="${postData.title}" class = "recipe-card" />
      
        <h3 class="recipe-card-title">${postData.title}</h3>
        
        <div class="recipe-card-footer">
          <button class="btn-ready" onclick = desvanecer() >Agregar a plan</button>
      </div>
    </div>
  `;
    // Añadir la tarjeta al contenedor

    postContainer.appendChild(card);
  });
};
const desvanecer = () => {};
