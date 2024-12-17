document.addEventListener("DOMContentLoaded", function() {
  const postContainer = document.querySelector(".plan-thumbnails");

  // Función para enviar las calificaciones
  const sendRating = (id_comida, calificacion) => {
      const ratingData = { id_comida: id_comida, calificacion: calificacion };

      console.log('Datos enviados en el JSON:', ratingData);

      fetch("/rate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ratingData),
      })
      .then((response) => {
          if (response.ok) {
              alert("Calificación enviada exitosamente");
          } else {
              alert("Hubo un error al enviar la calificación");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  };

  // Función para mostrar los detalles del plato
  const mostrarDetalles = (plato) => {
      const imagen = document.getElementById('plato-imagen');
      const nombre = document.getElementById('plato-nombre'); 
      const dia = document.getElementById('plato-dia');
      const ingredientesList = document.getElementById('plato-ingredientes');
      const propiedadesList = document.getElementById('plato-propiedades');
      const descripcion = document.getElementById('plato-descripcion');

      imagen.src = plato.url_imagen + '.jpg';	
      nombre.textContent = plato.nombre_comida;
      dia.innerText = plato.dia;
      descripcion.textContent = plato.descripcion;
      ingredientesList.innerHTML = '';
      propiedadesList.innerHTML = '';

      plato.ingredientes.forEach(ingrediente => {
          const li = document.createElement('li');
          li.textContent = ingrediente;
          ingredientesList.appendChild(li);
      });

      plato.propiedades.forEach(propiedad => {
          const li = document.createElement('li');
          li.textContent = propiedad;
          propiedadesList.appendChild(li);
      });

      document.getElementById('recipe-popup').classList.add('open');
      document.getElementById('modal_overlay').classList.add('open');
  }

  const closePopup = () => {
      document.getElementById('recipe-popup').classList.remove('open');
      document.getElementById('modal_overlay').classList.remove('open');
  }

  // Función para cargar las recetas
  const loadRecipes = () => {
      fetch("/get_recipes")
      .then((response) => response.json())
      .then((recetas) => {
          recetas.forEach((postData) => {
              const card = document.createElement("div");
              card.classList.add("thumbnail");
              card.innerHTML = `
                  <div class="thumbnail-content">
                      <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="thumbnail-img" />
                      <h3 class="thumbnail-title">${postData.nombre_comida}</h3>
                      <p class="thumbnail-description">${postData.descripcion}</p>
                      <div class="thumbnail-footer">
                          <span>Más información</span>
                          <button class="btn" data-recipe-id="${postData.id_comida}">Ver receta</button>
                      </div>
                      <div class="rating">
                          ${[5,4,3,2,1].map(star => `
                              <input type="radio" id="star${star}-${postData.id_comida}" name="rate-${postData.id_comida}" value="${star}" ${star == postData.calificacion ? 'checked' : ''} />
                              <label for="star${star}-${postData.id_comida}" title="${star} estrellas"></label>
                          `).join('')}
                      </div>
                  </div>
              `;
              const stars = card.querySelectorAll('.rating input[type="radio"]');
              stars.forEach(star => {
                  star.addEventListener('change', function() {
                      const calificacion = this.value;
                      sendRating(postData.id_comida, calificacion);
                  });
              });
              postContainer.appendChild(card);
          });

          const detailButtons = document.querySelectorAll('.btn');
          detailButtons.forEach(button => {
              button.addEventListener('click', function() {
                  const platoId = this.getAttribute('data-recipe-id');
                  const plato = recetas.find(pl => pl.id_comida == platoId);
                  mostrarDetalles(plato);
              });
          });
      })
      .catch((error) => {
          console.error("Error al cargar las recetas:", error);
      });
  };

  loadRecipes();

  document.getElementById('close-popup').addEventListener('click', closePopup);
  document.getElementById('modal_overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal_overlay')) {
          closePopup();
      }
  });
});
