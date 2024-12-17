document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('ver_filtro');
    const panelInfo = document.getElementById("filters_content");
    const allFilters = document.querySelectorAll('.icon-button, .diet-select');

    if (filterButton && panelInfo) {
        filterButton.addEventListener("click", () => {
            panelInfo.classList.toggle("open");
            filterButton.classList.toggle("open");
        });
    }

    const filterButtons = document.querySelectorAll('.icon-button:not(.diet-select)');
    let debounceTimer;

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

            debounce(() => {
                updateFilterStates();
                updateFilterButton();
            }, 300); // Evita múltiples solicitudes rápidas
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

        debounce(() => {
            updateFilterStates();
            updateFilterButton();
        }, 300);
    });

    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    function updateFilterButton() {
        const hasActiveFilters = Array.from(allFilters).some(filter => filter.classList.contains('active'));
        const filterImg = filterButton.querySelector('img');

        if (hasActiveFilters) {
            filterImg.src = '/static/icons/filtroActivo.png'; // Imagen con contorno negro
        } else {
            filterImg.src = '/static/icons/filtrar.png'; // Imagen original
        }
    }

    allFilters.forEach(filter => {
        filter.addEventListener('change', () => debounce(updateFilterButton, 300));
    });

    async function sendFilterStates(states) {
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
                getMethods(); // Actualizar tarjetas con nuevas recetas
            } else {
                console.error('Error en el POST:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }

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

        const dietLabel = 'tipo';
        const selectedOption = dietSelect.value;
        states[dietLabel] = selectedOption === 'vegetarian' ? 2 : selectedOption === 'gluten_free' ? 1 : 0;

        return states;
    }

    function updateFilterStates() {
        const currentStates = getFilterStates();
        console.log("Estados de filtros actuales:", currentStates);
        sendFilterStates(currentStates);
    }

    const postContainer = document.querySelector(".recipe-cards");
    const modalOverlay = document.getElementById("modal_overlay");
    const modalPanel = document.getElementById("recipe_info");
    const closeModalButton = document.getElementById("close_recipeinf");

    const getMethods = () => {
        postContainer.innerHTML = "";

        recetas.forEach((postData, index) => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            card.innerHTML = `
                <img src="${postData.url_imagen}.jpg" alt="${postData.nombre_comida}" class="recipe-image">
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
                    <p class="recipe-card-description">${postData.ingredientes}</p>
                    <div class="recipe-card-footer"></div>
                </div>
                <button class="btn view-recipe" data-index="${index}">Ver receta</button>
            `;

            postContainer.appendChild(card);
        });

        addModalEventListeners();
    };

    const addModalEventListeners = () => {
        const recipeButtons = document.querySelectorAll(".view-recipe");

        recipeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const recipeIndex = button.getAttribute("data-index");
                const recipeData = recetas[recipeIndex];

                document.querySelector(".recipe-title").innerText = recipeData.nombre_comida;
                document.querySelector(".mod_desc").innerText = "Conoce la información nutricional de esta receta.";

                const modalImage = document.querySelector(".modal-recipe-image");
                modalImage.src = `${recipeData.url_imagen}.jpg`;
                modalImage.alt = recipeData.nombre_comida;

                const description = document.querySelector(".recipe-description");
                description.innerText = recipeData.ingredientes;

                const ingredientsList = document.querySelector(".ingredients-list");
                const ingredientsArray = Array.isArray(recipeData.ingredientes)
                    ? recipeData.ingredientes
                    : recipeData.ingredientes.split(',').map(ing => ing.trim());

                ingredientsList.innerHTML = ingredientsArray.map(ing => `<li>${ing}</li>`).join("");

                const nutritionList = document.querySelector(".nutrition-list");
                nutritionList.innerHTML = `
                    <li>Calorías: ${recipeData.calorias}</li>
                    <li>Proteínas: ${recipeData.proteinas}</li>
                    <li>Carbohidratos: ${recipeData.carbohidratos}</li>
                    <li>Grasas: ${recipeData.grasas}</li>
                `;

                modalPanel.classList.add("open");
                modalOverlay.classList.add("open");
            });
        });
    };

    if (closeModalButton && modalOverlay) {
        closeModalButton.addEventListener("click", () => {
            modalPanel.classList.remove("open");
            modalOverlay.classList.remove("open");
        });

        modalOverlay.addEventListener("click", () => {
            modalPanel.classList.remove("open");
            modalOverlay.classList.remove("open");
        });
    }

    updateFilterStates();
    updateFilterButton();
});
