document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('ver_filtro');
    const panelInfo = document.getElementById("filters_content");
    const allFilters = document.querySelectorAll('.icon-button, .diet-select');

    // Toggle del panel de filtros
    if (filterButton && panelInfo) {
        filterButton.addEventListener("click", () => {
            const isOpen = panelInfo.classList.contains("open");

            if (isOpen) {
                panelInfo.classList.remove("open");
                panelInfo.style.maxHeight = "0"; // Colapsar altura
            } else {
                panelInfo.classList.add("open");
                panelInfo.style.maxHeight = panelInfo.scrollHeight + "px"; // Ajustar altura al contenido
            }
        });
    }

    // Botones de filtros con ciclo de 3 estados (ascendente, descendente, ninguno)
    const filterButtons = document.querySelectorAll('.icon-button:not(.diet-select)');

    filterButtons.forEach((button) => {
        let clickState = 0;

        button.addEventListener('click', () => {
            clickState = (clickState + 1) % 3;

            // Resetear estado previo
            button.classList.remove('active');
            const existingIcon = button.querySelector('.sort-icon');
            if (existingIcon) existingIcon.remove();

            if (clickState === 1) {
                // Estado ascendente
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/up-arrow.png';
                sortIcon.classList.add('sort-icon', 'asc');
                button.appendChild(sortIcon);
            } else if (clickState === 2) {
                // Estado descendente
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/down-arrow.png';
                sortIcon.classList.add('sort-icon', 'desc');
                button.appendChild(sortIcon);
            } else {
                // Estado inicial (ninguno)
                button.classList.remove('active');
            }

            updateFilterButton();
        });
    });

    // Combo box "Tipo de dieta"
    const dietSelect = document.getElementById('diet-filter');

    dietSelect.addEventListener('change', () => {
        const selectedOption = dietSelect.options[dietSelect.selectedIndex];
        const icon = selectedOption.getAttribute('data-icon'); // Obtener el icono asociado

        // Actualizar la imagen del combo box
        dietSelect.style.backgroundImage = `url('${icon}')`;

        // Aplicar diseño activo si no es "sin_filtro"
        if (dietSelect.value !== 'sin_filtro') {
            dietSelect.classList.add('active'); // Aplica el estilo activo
        } else {
            dietSelect.classList.remove('active'); // Quita el estilo activo
        }

        updateFilterButton(); // Actualizar el estado del botón "Filtros"
    });

    dietSelect.addEventListener('focus', () => {
        dietSelect.classList.add('open');
    });

    dietSelect.addEventListener('blur', () => {
        dietSelect.classList.remove('open');
    });

    // Actualizar estado del botón de filtros (cambia el icono si hay filtros activos)
    function updateFilterButton() {
        const hasActiveFilters = Array.from(allFilters).some(filter => filter.classList.contains('active'));

        const filterImg = filterButton.querySelector('img');
        if (hasActiveFilters) {
            filterImg.src = '/static/icons/filtroActivo.png'; // Icono activo
        } else {
            filterImg.src = '/static/icons/filtrar.png'; // Icono inactivo
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

    // Modal de información de recetas
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
