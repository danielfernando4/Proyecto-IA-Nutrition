document.addEventListener("DOMContentLoaded", function () {
    const postContainer = document.querySelector(".plan-thumbnails");

    const sendRating = (id_comida, calificacion) => {
        const ratingData = { id_comida: id_comida, calificacion: calificacion };
    
        fetch("/rate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ratingData),
        })
            .then((response) => {
                const messageContainer = document.getElementById("rating-message");
                if (response.ok) {
                    messageContainer.textContent = "Calificación enviada exitosamente";
                    messageContainer.style.color = "green";
                } else {
                    messageContainer.textContent = "Hubo un error al enviar la calificación";
                    messageContainer.style.color = "red";
                }
                messageContainer.style.display = "block";
                setTimeout(() => {
                    messageContainer.style.display = "none";
                }, 3000);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const getRating = (id_comida) => {
        fetch(`/get_rating/${id_comida}`)
            .then(response => response.json())
            .then(data => {
                if (data.calificacion !== null) {
                    const ratingElement = document.getElementById(`rating-${id_comida}`);
                    if (ratingElement) {
                        ratingElement.value = data.calificacion;
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Llamar a getRating para cada plato cuando la página carga
    const foodItems = document.querySelectorAll(".food-item");
    foodItems.forEach(item => {
        const id_comida = item.dataset.id;
        getRating(id_comida);
    });

    // Manejar el evento de calificación
    postContainer.addEventListener("click", function (event) {
        if (event.target.matches(".rating-button")) {
            const id_comida = event.target.dataset.id;
            const calificacion = document.getElementById(`rating-${id_comida}`).value;
            sendRating(id_comida, calificacion);
        }
    });

    // Función para mostrar los detalles del plato
    const mostrarDetalles = (plato) => {
        console.log('Detalles del plato:', plato); // Mensaje de depuración

        const imagen = document.getElementById("plato-imagen");
        const nombre = document.getElementById("plato-nombre");
        const dia = document.getElementById("plato-dia");
        const ingredientesList = document.getElementById("plato-ingredientes");
        const propiedadesList = document.getElementById("plato-propiedades");
        const descripcion = document.getElementById("plato-descripcion");

        imagen.src = plato.url_imagen + ".jpg";
        nombre.textContent = plato.nombre_comida;
        dia.textContent = plato.dia || "Día no especificado";
        descripcion.textContent = plato.descripcion || "Sin descripción disponible";

        ingredientesList.innerHTML = "";
        propiedadesList.innerHTML = "";

        plato.ingredientes.split(',').forEach((ingrediente) => {
            const li = document.createElement("li");
            li.textContent = ingrediente.trim();
            ingredientesList.appendChild(li);
        });

        // Añadir las propiedades nutricionales
        const propiedades = [
            `Calorías: ${plato.calorias} kcal`,
            `Proteínas: ${plato.proteinas} g`,
            `Carbohidratos: ${plato.carbohidratos} g`,
            `Grasas: ${plato.grasas} g`
        ];

        propiedades.forEach((propiedad) => {
            const li = document.createElement("li");
            li.textContent = propiedad;
            propiedadesList.appendChild(li);
        });

        document.getElementById("recipe-popup").classList.add("open");
        document.getElementById("modal_overlay").classList.add("open");
    };

    const closePopup = () => {
        document.getElementById("recipe-popup").classList.remove("open");
        document.getElementById("modal_overlay").classList.remove("open");
    };

    // Función para cargar las recetas
    const loadRecipes = () => {
        fetch("/get_recipes")
            .then((response) => response.json())
            .then((recetas) => {
                const order = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
                order.forEach((dia) => {
                    const data = recetas[dia];
                    const postData = data.comida;

                    // Añadir el día a los datos del plato
                    postData.dia = dia.charAt(0).toUpperCase() + dia.slice(1);

                    const card = document.createElement("div");
                    card.classList.add("thumbnail");
                    card.innerHTML = `
                        <div class="thumbnail-content">
                            <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="thumbnail-img" />
                            <h3 class="thumbnail-title">${postData.nombre_comida}</h3>
                            <p class="thumbnail-description">${postData.descripcion}</p>
                            <div class="thumbnail-footer">
                                <span class="more-info">Más información</span>
                                <button class="btn" data-recipe-id="${postData.id_comida}">Ver receta</button>
                            </div>
                            <div class="rating">
                                ${[5, 4, 3, 2, 1]
                                    .map(
                                        (star) => `
                                    <input type="radio" id="star${star}-${postData.id_comida}" name="rate-${postData.id_comida}" value="${star}" ${
                                            star == data.calificacion ? "checked" : ""
                                        } />
                                    <label for="star${star}-${postData.id_comida}" title="${star} estrellas"></label>
                                `
                                    )
                                    .join("")}
                            </div>
                        </div>
                    `;

                    const stars = card.querySelectorAll('.rating input[type="radio"]');
                    stars.forEach((star) => {
                        star.addEventListener("change", function () {
                            const calificacion = this.value;
                            sendRating(postData.id_comida, calificacion);
                        });
                    });

                    // Attach event listener to the button for showing recipe details
                    card.querySelector('.btn').addEventListener('click', function () {
                        const platoId = this.getAttribute("data-recipe-id");
                        const plato = Object.values(recetas)
                            .map((d) => d.comida)
                            .find((pl) => pl.id_comida == platoId);
                        console.log('Mostrar detalles del plato:', plato); // Mensaje de depuración
                        mostrarDetalles(plato);
                    });

                    postContainer.appendChild(card);
                });
            })
            .catch((error) => {
                console.error("Error al cargar las recetas:", error);
            });
    };

    loadRecipes();

    document.getElementById("close-popup").addEventListener("click", closePopup);
    document.getElementById("modal_overlay").addEventListener("click", (e) => {
        if (e.target === document.getElementById("modal_overlay")) {
            closePopup();
        }
    });
});
