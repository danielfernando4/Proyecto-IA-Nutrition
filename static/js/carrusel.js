// Referencia al contenedor Swiper
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Función para obtener recetas desde el endpoint y renderizarlas
const cargarRecetasEnSwiper = async (endpoint) => {
  try {
    const response = await fetch(endpoint); // Llamada al endpoint
    if (!response.ok) throw new Error("Error al cargar los datos");

    const recetas = await response.json(); // Parsear la respuesta como JSON
    console.log("Si entro");
    // Limpiar el contenedor Swiper antes de cargar nuevas tarjetas
    swiperWrapper.innerHTML = "";

    // Crear y agregar dinámicamente las tarjetas al Swiper
    recetas.forEach((postData) => {
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");

      swiperSlide.innerHTML = `
        <img src="${postData.url_imagen}" alt="${postData.nombre_comida}">
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

      // Añadir la tarjeta al Swiper
      swiperWrapper.appendChild(swiperSlide);
    });

    // Inicializar Swiper después de agregar las recetas
    inicializarSwiper();
  } catch (error) {
    console.error("Error al cargar las tarjetas:", error.message);
  }
};

// Función para inicializar Swiper
const inicializarSwiper = () => {
  new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true, // Opcional: para hacer el slider infinito
    slidesPerView: 1, // Cantidad de slides visibles
    spaceBetween: 20, // Espacio entre slides
  });
};

// Llamar a la función con tu endpoint (reemplaza con la URL correcta)
document.addEventListener("DOMContentLoaded", function () {
  cargarRecetasEnSwiper("/generation");
});
