let swiperInstance;

const recetas = [
  {
    calorias: 828.64,
    carbohidratos: 104.97,
    descripcion:
      "Pan rápido sin gluten con chocolate y nueces pecanas, delicioso y apto para celiacos.",
    grasas: 18.37,
    grupo: 5,
    id_comida: 24,
    ingredientes:
      "butter, flour, sugar, brown sugar, baking soda, salt, semi-sweet chocolate chips, pecans, eggs, applesauce, vanilla-honey greek yogurt, vanilla extract",
    nombre_comida: "Gluten-Free Chocolate-Pecan Quickbread",
    proteinas: 42.16,
    tipo_comida: "Gluten Free",
    url_imagen: "/static/images/comida24.jpg",
  },
  {
    calorias: 520.5,
    carbohidratos: 80.2,
    descripcion:
      "Pan integral con semillas de chía y avena, ideal para el desayuno.",
    grasas: 10.5,
    grupo: 4,
    id_comida: 25,
    ingredientes:
      "whole wheat flour, oats, chia seeds, honey, baking powder, salt, olive oil, water",
    nombre_comida: "Whole Wheat Oat Chia Bread",
    proteinas: 15.8,
    tipo_comida: "Vegetarian",
    url_imagen: "/static/images/comida25.jpg",
  },
  {
    calorias: 350.2,
    carbohidratos: 45.6,
    descripcion: "Delicioso batido de mango y espinaca con proteína vegana.",
    grasas: 5.2,
    grupo: 1,
    id_comida: 26,
    ingredientes:
      "mango, spinach, almond milk, vegan protein powder, chia seeds, ice",
    nombre_comida: "Mango Spinach Protein Smoothie",
    proteinas: 20.3,
    tipo_comida: "Vegan",
    url_imagen: "/static/images/comida26.jpg",
  },
  {
    calorias: 180.8,
    carbohidratos: 22.3,
    descripcion: "Barra energética de avena con miel y nueces.",
    grasas: 7.5,
    grupo: 2,
    id_comida: 27,
    ingredientes: "oats, honey, walnuts, almond butter, chia seeds",
    nombre_comida: "Oat Honey Nut Energy Bar",
    proteinas: 5.9,
    tipo_comida: "Gluten Free",
    url_imagen: "/static/images/comida27.jpg",
  },
  {
    calorias: 410.1,
    carbohidratos: 45.8,
    descripcion: "Tacos veganos con guacamole, tomate, y lechuga.",
    grasas: 13.2,
    grupo: 3,
    id_comida: 28,
    ingredientes:
      "corn tortillas, guacamole, tomatoes, lettuce, black beans, corn, spices",
    nombre_comida: "Vegan Tacos with Guacamole",
    proteinas: 12.3,
    tipo_comida: "Vegan",
    url_imagen: "/static/images/comida28.jpg",
  },
  {
    calorias: 600.4,
    carbohidratos: 85.7,
    descripcion: "Pizza de pollo y vegetales con masa integral.",
    grasas: 22.8,
    grupo: 6,
    id_comida: 29,
    ingredientes:
      "chicken breast, whole wheat pizza dough, bell peppers, onions, tomato sauce, cheese",
    nombre_comida: "Whole Wheat Chicken Veggie Pizza",
    proteinas: 30.5,
    tipo_comida: "Low Carb",
    url_imagen: "/static/images/comida29.jpg",
  },
  {
    calorias: 455.3,
    carbohidratos: 58.2,
    descripcion: "Ensalada de quinoa con aguacate, tomate, y pepino.",
    grasas: 14.5,
    grupo: 2,
    id_comida: 30,
    ingredientes:
      "quinoa, avocado, tomatoes, cucumber, olive oil, lemon juice, herbs",
    nombre_comida: "Quinoa Avocado Salad",
    proteinas: 12.8,
    tipo_comida: "Vegetarian",
    url_imagen: "/static/images/comida30.jpg",
  },
];

// Referencia al contenedor Swiper
const swiperWrapper = document.querySelector(".swiper-wrapper");

const cargarRecetasEnSwiper = () => {
  try {
    // Limpiar el contenedor Swiper antes de cargar nuevas tarjetas
    swiperWrapper.innerHTML = "";

    // Crear y agregar dinámicamente las tarjetas al Swiper
    recetas.forEach((postData) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");

      swiperSlide.innerHTML = `
        <img src="${postData.url_imagen}" alt="${
        postData.nombre_comida
      }" onerror="this.src='default-image.jpg'">
        <div class="card-description">
          <div class="card-title">
            <h4>${postData.nombre_comida}</h4>
          </div>
          <div class="card-text">
            <p>Calorías: ${postData.calorias.toFixed(2)} | Proteínas: ${
        postData.proteinas
      }</p>
          </div>
        </div>
      `;

      swiperWrapper.appendChild(swiperSlide);
    });

    // Inicializar Swiper solo si no ha sido inicializado
    if (!swiperInstance) {
      swiperInstance = new Swiper(".swiper-container", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
      });
    }
  } catch (error) {
    console.error("Error al cargar las recetas:", error.message);
  }
};

// Llamar a la función cuando se haya cargado el contenido
document.addEventListener("DOMContentLoaded", cargarRecetasEnSwiper);
