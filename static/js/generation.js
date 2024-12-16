/*async function getInformation() {
  try {
    const response = await fetch("/generation");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error en el POST:", response.statusText);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
const recetasfinal = getInformation();
const postContainer = document.querySelector(".recipe-cards");

const postMethods = (recetas) => {
  postContainer.innerHTML = "";
  recetasfinal.map((postData) => {
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
*/
async function getInformation() {
  try {
    const response = await fetch("/generation");

    if (response.ok) {
      const data = await response.json();
      return data; // Devolver los datos directamente
    } else {
      console.error("Error en el POST:", response.statusText);
      return []; // Devolver un array vacío si falla
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return []; // Devolver un array vacío en caso de error
  }
}
const postContainer = document.querySelector(".recipe-cards");

// Función para renderizar las tarjetas
const postMethods = (recetas) => {
  postContainer.innerHTML = ""; // Limpiar contenedor

  // Iterar sobre las recetas
  recetas.map((postData) => {
    // Crear un elemento HTML para cada receta
    const card = document.createElement("div");
    card.classList.add("recipe-card", "bounce-in-top");

    card.innerHTML = `
    <div class="recipe-card-content">
      <img src="${postData.url_imagen}" alt="${
      postData.nombre_comida
    }" class="recipe-card-image" />
      <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
      <p class="recipe-card-description">Calorías: ${postData.calorias.toFixed(
        2
      )} | Proteínas: ${postData.proteinas}</p>
      <div class="recipe-card-footer">
        <button class="btn-ready" onclick="desvanecer()">Agregar a plan</button>
      </div>
    </div>
  `;
    // Añadir la tarjeta al contenedor
    postContainer.appendChild(card);
  });
};
const main = async () => {
  const recetasfinal = await getInformation(); // Esperar los datos
  postMethods(recetasfinal); // Pasar los datos a la función de renderizado
};
