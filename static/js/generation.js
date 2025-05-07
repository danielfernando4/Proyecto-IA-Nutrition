document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("generationForm");
  const submitButton = document.getElementById("submitButton");

  const postContainer = document.querySelector(".recipe-cards");

  const tarjetasRenderizadas = {}; // Este será el JSON estructurado
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  let recetaIndex = 0; // Controla la asignación de días

  submitButton.addEventListener("click", () => {
    const formData = {
      peso: form.elements["peso"].value,
      edad: form.elements["edad"].value,
      altura: form.elements["altura"].value,
      sexo: form.elements["sexo"].value,
    };

    fetch("/generation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        const recetas = data.map((comida) => ({
          id_comida: comida.id_comida || "No disponible",
          nombre_comida: comida.nombre_comida || "No disponible",
          url_imagen: comida.url_imagen || "No disponible",
          calorias: comida.calorias || 0,
          proteinas: comida.proteinas || 0,
        }));

        postMethods(recetas);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const postMethods = (recetas) => {
    postContainer.innerHTML = ""; // Limpiar contenedor

    recetas.forEach((postData) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card", "bounce-in-top");
    
      card.innerHTML = `
        <div class="recipe-card-content">
          <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="recipe-card-image" />
          <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
          <p class="recipe-card-description">Calorías: ${postData.calorias.toFixed(
            2
          )} | Proteínas: ${postData.proteinas}</p>
        </div>
      `;
    
      postContainer.appendChild(card);
    
      // Asignar receta al día de la semana correspondiente
      const diaAsignado = diasSemana[recetaIndex % diasSemana.length];
    
      // Asignar directamente el id_comida al día
      tarjetasRenderizadas[diaAsignado] = postData.id_comida;
    
      recetaIndex++;
      console.log(`Día asignado: ${diaAsignado}, Receta: ${postData.id_comida}`);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("recipe-card-footer");

    buttonContainer.innerHTML = `
      <button class="btn-ready" id="agregarAPlan">Agregar al plan</button>
    `;

    postContainer.appendChild(buttonContainer);

    const agregarAPlanButton = document.getElementById("agregarAPlan");
    agregarAPlanButton.addEventListener("click", enviarTarjetasABaseDeDatos);
  };

  const enviarTarjetasABaseDeDatos = () => {
    console.log("Tarjetas a enviar:", tarjetasRenderizadas);
    fetch("/guardar_tarjetas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarjetasRenderizadas),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al guardar las tarjetas");
        return response.json();
      })
      .then((result) => {
        console.log("Tarjetas guardadas exitosamente:", result);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      })
      .catch((error) => {
        console.error("Error al guardar las tarjetas:", error);
      });
  };
});
