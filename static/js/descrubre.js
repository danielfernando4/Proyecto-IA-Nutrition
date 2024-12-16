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
            } else {
                button.classList.remove('active');
            }

            updateFilterButton(); 
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
    });

    dietSelect.addEventListener('focus', () => {
        dietSelect.classList.add('open');
    });

    dietSelect.addEventListener('blur', () => {
        dietSelect.classList.remove('open'); 
    });

    function updateFilterButton() {
        const hasActiveFilters = Array.from(allFilters).some(filter => filter.classList.contains('active'));

        const filterImg = filterButton.querySelector('img');
        if (hasActiveFilters) {
            filterImg.src = '/static/icons/filtroActivo.png'; 
        } else {
            filterImg.src = '/static/icons/filtrar.png'; 
        }
    }

    allFilters.forEach(filter => {
        if (filter.tagName === 'SELECT') {
            filter.addEventListener('change', updateFilterButton);
        } else {
            filter.addEventListener('click', updateFilterButton);
        }
    });

    updateFilterButton();

    const abrirReceta = document.getElementById("ver_infoRec");
    const cerrarReceta = document.getElementById("close_recipeinf");
    const panelReceta = document.getElementById("recipe_info");
    const overlay = document.getElementById("modal_overlay");

    if (abrirReceta && panelReceta) {
        abrirReceta.addEventListener("click", () => {
            panelReceta.classList.add("open");
            overlay.classList.add("open"); 
        });

        cerrarReceta.addEventListener("click", () => {
            panelReceta.classList.remove("open");
            overlay.classList.remove("open"); 
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            panelReceta.classList.remove("open");
            overlay.classList.remove("open");
        });
    }
});


const recetas = [
    {
        url_imagen: "/static/images/comida112.jpg",
        nombre_comida: "Arroz relleno",
        tipo_comida: "Vegetariano",
        descripcion: "Un delicioso arroz relleno de vegetales y especias.",
        ingredientes: ["Arroz", "Zanahoria", "Guisantes", "Cebolla", "Especias"],
        informacion_nutricional: {
            calorias: "250 kcal",
            proteinas: "5 g",
            carbohidratos: "45 g",
            grasas: "3 g"
        }
    },
    {
        url_imagen: "/static/images/comida113.jpg",
        nombre_comida: "Arroz Marinero",
        tipo_comida: "Libre de gluten",
        descripcion: "Arroz con frutos del mar, ideal para dietas libres de gluten.",
        ingredientes: ["Arroz", "Camarones", "Almejas", "Ajo", "Perejil"],
        informacion_nutricional: {
            calorias: "320 kcal",
            proteinas: "15 g",
            carbohidratos: "40 g",
            grasas: "8 g"
        }
    },
    {
        url_imagen: "/static/images/comida114.jpg",
        nombre_comida: "Pollo Aguacate",
        tipo_comida: "Libre de gluten",
        descripcion: "Pollo con guacamole fresco, ideal para comidas ligeras.",
        ingredientes: ["Pollo", "Aguacate", "Limón", "Cilantro"],
        informacion_nutricional: {
            calorias: "400 kcal",
            proteinas: "25 g",
            carbohidratos: "10 g",
            grasas: "20 g"
        }
    }
];

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
            <img src="${postData.url_imagen}" alt="${postData.nombre_comida}" class="recipe-image">
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${postData.nombre_comida}</h3>
                <p class="recipe-card-description">${postData.descripcion}</p>
                <div class="recipe-card-footer">
                    <button class="btn view-recipe" data-index="${index}">Ver receta</button>
                </div>
            </div>
        `;

        postContainer.appendChild(card);
    });

    addModalEventListeners();
};

const addModalEventListeners = () => {
    const recipeButtons = document.querySelectorAll(".view-recipe");

    recipeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const recipeIndex = button.getAttribute("data-index");
            const recipeData = recetas[recipeIndex];

            document.querySelector(".recipe-title").innerText = recipeData.nombre_comida;
            document.querySelector(".mod_desc").innerText = recipeData.descripcion;

            const modalImage = document.querySelector(".modal-recipe-image");
            modalImage.src = recipeData.url_imagen;
            modalImage.alt = recipeData.nombre_comida;

            const description = document.querySelector(".recipe-description");
            description.innerText = recipeData.descripcion;

            const ingredientsList = document.querySelector(".ingredients-list");
            ingredientsList.innerHTML = recipeData.ingredientes.map(ingr => `<li>${ingr}</li>`).join("");

            const nutritionList = document.querySelector(".nutrition-list");
            nutritionList.innerHTML = `
                <li>Calorías: ${recipeData.informacion_nutricional.calorias}</li>
                <li>Proteínas: ${recipeData.informacion_nutricional.proteinas}</li>
                <li>Carbohidratos: ${recipeData.informacion_nutricional.carbohidratos}</li>
                <li>Grasas: ${recipeData.informacion_nutricional.grasas}</li>
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

