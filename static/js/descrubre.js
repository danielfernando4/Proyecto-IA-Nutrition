document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search_input');
    const filterButton = document.getElementById('ver_filtro');
    const panelInfo = document.getElementById("filters_content");
    const postContainer = document.querySelector(".recipe-cards");
    const modalOverlay = document.getElementById("modal_overlay");
    const modalPanel = document.getElementById("recipe_info");
    const closeModalButton = document.getElementById("close_recipeinf");
    const allFilters = document.querySelectorAll('.icon-button, .diet-select');

    // Modal "Agregar al plan"
    const panelAgregar = document.getElementById("modal_agregar");
    const cerrarAgregar = document.getElementById("cerrar_plan");

    let recetas = [];
    let debounceTimer;

    /** Mostrar/Ocultar el panel de filtros */
    if (filterButton && panelInfo) {
        filterButton.addEventListener("click", () => {
            panelInfo.classList.toggle("open");
            filterButton.classList.toggle("open");
        });
    }

    /** Evento para la búsqueda por nombre */
    searchInput.addEventListener('input', () => {
        debounce(sendFilterStates, 500);
    });

    /** Configuración de los filtros interactivos */
    const filterButtons = document.querySelectorAll('.icon-button:not(.diet-select)');
    filterButtons.forEach((button) => {
        let clickState = 0;

        button.addEventListener('click', () => {
            clickState = (clickState + 1) % 3;
            button.classList.remove('active');
            const existingIcon = button.querySelector('.sort-icon');
            if (existingIcon) existingIcon.remove();

            if (clickState === 1) {
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/arriba.png';
                sortIcon.classList.add('sort-icon', 'asc');
                button.appendChild(sortIcon);
            } else if (clickState === 2) {
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/abajo.png';
                sortIcon.classList.add('sort-icon', 'desc');
                button.appendChild(sortIcon);
            }

            updateFilterButton();
            debounce(sendFilterStates, 500);
        });
    });

    const dietSelect = document.getElementById('diet-filter');
    dietSelect.addEventListener('change', () => {
        const selectedOption = dietSelect.options[dietSelect.selectedIndex];
        const icon = selectedOption.getAttribute('data-icon');
        dietSelect.style.backgroundImage = `url('${icon}')`;

        if (dietSelect.value !== 'sin_filtro') {
            dietSelect.classList.add('active');
        } else {
            dietSelect.classList.remove('active');
        }

        updateFilterButton();
        debounce(sendFilterStates, 500);
    });

    /** Función para actualizar el ícono del botón de filtro */
    function updateFilterButton() {
        const hasActiveFilters = Array.from(allFilters).some(filter => filter.classList.contains('active') || searchInput.value.trim());
        const filterImg = filterButton.querySelector('img');

        if (hasActiveFilters) {
            filterImg.src = '/static/icons/filtroActivo.png';
        } else {
            filterImg.src = '/static/icons/filtrar.png';
        }
    }

    /** Función para obtener estados de filtros */
    function getFilterStates() {
        const states = {};
        filterButtons.forEach(button => {
            const label = button.textContent.trim();
            const icon = button.querySelector('.sort-icon');
            let state = 0;

            if (icon) {
                if (icon.classList.contains('asc')) state = 1;
                else if (icon.classList.contains('desc')) state = 2;
            }

            states[label.toLowerCase()] = state;
        });

        states["tipo"] = dietSelect.value === 'vegetarian' ? 2 : dietSelect.value === 'gluten_free' ? 1 : 0;
        states["nombre"] = searchInput.value.trim();

        return states;
    }

    /** Función para enviar filtros al servidor */
    async function sendFilterStates() {
        const states = getFilterStates();
        console.log("Enviando JSON al servidor:", states);
        try {
            const response = await fetch('/descubre', {
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

    /** Función para actualizar las tarjetas de recetas */
    function updateRecipeCards() {
        postContainer.innerHTML = "";
        recetas.forEach((postData, index) => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.innerHTML = `
                <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="recipe-image">
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
                    <p class="recipe-card-description">${postData.descripcion}</p>
                </div>
                <button class="btn view-recipe" data-index="${index}">Ver receta</button>
            `;
            postContainer.appendChild(card);
        });
        addModalEventListeners();
    }

    /** Eventos para el modal */
    function addModalEventListeners() {
        const recipeButtons = document.querySelectorAll(".view-recipe");

        recipeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const recipeIndex = button.getAttribute("data-index");
                const recipeData = recetas[recipeIndex];

                document.querySelector(".recipe-title").innerText = recipeData.nombre_comida;
                document.querySelector(".mod_desc").innerText = "Conoce la información nutricional de esta receta.";
                document.querySelector(".recipe-description").innerText = recipeData.ingredientes;

                const modalImage = document.querySelector(".modal-recipe-image");
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

                const abrirAgregar = document.getElementById("abrir_agregar");
                abrirAgregar.addEventListener("click", () => {
                    panelAgregar.classList.add("open");
                });
            });
        });

        cerrarAgregar.addEventListener("click", () => {
            panelAgregar.classList.remove("open");
        });

        closeModalButton.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", closeModal);
    }

    function closeModal() {
        modalPanel.classList.remove("open");
        modalOverlay.classList.remove("open");
    }

    /** Debounce para evitar múltiples solicitudes */
    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    // Inicializar estados
    sendFilterStates();
    updateFilterButton();
});
