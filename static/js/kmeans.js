document.addEventListener('DOMContentLoaded', function () {
    const postContainer = document.querySelector(".recipe-cards");
    const modalOverlay = document.getElementById("modal_overlay");
    const modalPanel = document.getElementById("recipe_info");
    const panelAgregar = document.getElementById("modal_agregar");
    const closeModalButton = document.getElementById("close_recipeinf");
    const cerrarAgregarButton = document.getElementById("cerrar_plan");
    const confirmarAgregarButton = document.getElementById("confirmar_agregar");
    let recetaSeleccionada = null;
    let recetas = [];

    async function fetchRecetas() {
        try {
            const grupo = document.getElementById('grupo').getAttribute('data-grupo');
            const response = await fetch('/kmeans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ label: grupo })
            });

            if (response.ok) {
                recetas = await response.json();
                renderRecetas();
            }
        } catch (error) {
            console.error("Error al cargar recetas:", error);
        }
    }

    function renderRecetas() {
        postContainer.innerHTML = "";
        recetas.forEach(receta => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.innerHTML = `
                <img src="${receta.url_imagen}.jpg" alt="${receta.nombre_comida}" />
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${receta.nombre_comida}</h3>
                    <p class="recipe-card-description">${receta.descripcion}</p>
                </div>
                <button class="btn view-recipe" data-id="${receta.id_comida}">Ver Receta</button>
            `;
            postContainer.appendChild(card);
        });
        addModalEventListeners();
    }

    function addModalEventListeners() {
        document.querySelectorAll(".view-recipe").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                recetaSeleccionada = recetas.find(r => r.id_comida == id);
                openModal(recetaSeleccionada);
            });
        });
    }

    function openModal(receta) {
        console.log("Datos de la receta:", receta);

        modalPanel.querySelector(".recipe-title").innerText = receta.nombre_comida;
        modalPanel.querySelector(".recipe-description").innerText = receta.descripcion;
        modalPanel.querySelector(".modal-recipe-image").src = receta.url_imagen + ".jpg";

        const ingredientsList = modalPanel.querySelector(".ingredients-list");
        const ingredientes = receta.ingredientes.split(',');
        ingredientsList.innerHTML = ingredientes.map(ing => `<li>${ing.trim()}</li>`).join('');

        const nutritionList = modalPanel.querySelector(".nutrition-list");
        nutritionList.innerHTML = `
            <li>Calorías: ${receta.calorias}</li>
            <li>Proteínas: ${receta.proteinas}</li>
            <li>Carbohidratos: ${receta.carbohidratos}</li>
            <li>Grasas: ${receta.grasas}</li>
        `;

        modalOverlay.classList.add("open");
        modalPanel.classList.add("open");

        const abrirAgregarButton = document.getElementById("abrir_agregar");
        abrirAgregarButton.addEventListener("click", () => {
            panelAgregar.classList.add("open");
        });
    }


    function closeModal() {
        modalOverlay.classList.remove("open");
        modalPanel.classList.remove("open");
        panelAgregar.classList.remove("open");
        confetti({
            particleCount: 500,
            spread: 170,
            origin: { y: 0.6 }
        });

    }

    closeModalButton.addEventListener("click", cerrarInfo);
    cerrarAgregarButton.addEventListener("click", cerrarModalAgregar);

    function cerrarInfo() {
        modalOverlay.classList.remove("open");
        modalPanel.classList.remove("open");
    }
    function cerrarModalAgregar() {
        panelAgregar.classList.remove("open");
    }

    confirmarAgregarButton.addEventListener("click", async () => {
        const diaSeleccionado = document.getElementById("dia").value;
    
        if (recetaSeleccionada && diaSeleccionado) {
            try {
                const response = await fetch('/cambio_receta', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre_comida: recetaSeleccionada.nombre_comida,
                        dia: diaSeleccionado
                    })
                });
    
                if (response.ok) {
                    console.log("Receta agregada correctamente al plan.");
                    closeModal();
                } else {
                    console.error("Error al agregar la receta:", await response.text());
                }
            } catch (error) {
                console.error("Error en la petición POST:", error);
            }
        } else {
            console.error("Faltan datos: nombre de la receta o día seleccionado.");
        }
    });
    

    fetchRecetas();
});
