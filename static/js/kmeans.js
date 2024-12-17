document.addEventListener('DOMContentLoaded', function () {
    const postContainer = document.querySelector(".recipe-cards");
    const modalOverlay = document.getElementById("modal_overlay");
    const modalPanel = document.getElementById("recipe_info");
    const closeModalButton = document.getElementById("close_recipeinf");
    const abrirAgregar = document.getElementById("abrir_agregar");
    const cerrarAgregar = document.getElementById("cerrar_plan");
    const panelAgregar = document.getElementById("modal_agregar");
    const addToPlanButton = document.querySelector(".boton-agregar");
    let recetas = [];

    
    const grupo = document.getElementById('grupo').getAttribute('data-grupo');
    const label = grupo; 

    console.log("Grupo asignado a label:", label); 

    function getFilterStates() {
        const states = {
            label: label 
        };
        return states;
    }

    async function sendFilterStates() {
        const states = getFilterStates();
        console.log("Enviando JSON al servidor:", states);
        try {
            const response = await fetch('/kmeans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(states)
            });

            if (response.ok) {
                const data = await response.json();
                recetas = data;
                updateRecipeCards();
            } else {
                console.error('Error en el POST:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

    function updateRecipeCards() {
        postContainer.innerHTML = "";
        recetas.forEach((postData) => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.innerHTML = `
                <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="recipe-image">
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
                    <p class="recipe-card-description">${postData.descripcion}</p>
                </div>
                <button class="btn view-recipe" data-index="${postData.id_comida}">Ver receta</button>
            `;
            postContainer.appendChild(card);
        });
        addModalEventListeners();
    }

    function addModalEventListeners() {
        const recipeButtons = document.querySelectorAll(".view-recipe");
        recipeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const recipeId = button.getAttribute("data-index");
                const recipeData = recetas.find(post => post.id_comida == recipeId);

                if (recipeData) {
                    document.querySelector(".recipe-title").innerText = recipeData.nombre_comida;
                    document.querySelector(".recipe-description").innerText = recipeData.descripcion;

                    const modalImage = document.querySelector(".recipe-image");
                    modalImage.src = `${recipeData.url_imagen}.jpg`;
                    modalImage.alt = recipeData.nombre_comida;

                    const ingredientsList = document.querySelector(".ingredients-list");
                    ingredientsList.innerHTML = recipeData.ingredientes.split(',').map(ing => `<li>${ing.trim()}</li>`).join("");

                    const nutritionList = document.querySelector(".nutrition-list");
                    nutritionList.innerHTML = `
                        <li>Calorías: ${recipeData.calorias}</li>
                        <li>Proteínas: ${recipeData.proteinas}</li>
                        <li>Carbohidratos: ${recipeData.carbohidratos}</li>
                        <li>Grasas: ${recipeData.grasas}</li>
                    `;

                    modalPanel.classList.add("open");
                    modalOverlay.classList.add("open");

                    abrirAgregar.addEventListener("click", () => {
                        panelAgregar.classList.add("open");
                    });
                }
            });
        });
    }

    function closeModal() {
        modalPanel.classList.remove("open");
        modalOverlay.classList.remove("open");
        panelAgregar.classList.remove("open");
    }

    closeModalButton.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    cerrarAgregar.addEventListener("click", () => panelAgregar.classList.remove("open"));

    addToPlanButton.addEventListener("click", () => {
        const diaSeleccionado = document.getElementById("dia").value;
        closeModal();
    });

    sendFilterStates();
});
