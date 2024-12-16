document.addEventListener('DOMContentLoaded', function () {
    /* --- Botón para abrir/cerrar el panel de filtros --- */
    const abrirInfo = document.getElementById("ver_filtro");
    const panelInfo = document.getElementById("filters_content");

    if (abrirInfo && panelInfo) {
        abrirInfo.addEventListener("click", () => {
            panelInfo.classList.toggle("open");
        });
    }

    /* --- Manejo de botones de filtros dinámicos con ciclo de 3 estados --- */
    const filterButtons = document.querySelectorAll('.icon-button');

    filterButtons.forEach((button) => {
        let clickState = 0; // 0 = no seleccionado, 1 = ascendente, 2 = descendente

        button.addEventListener('click', () => {
            clickState = (clickState + 1) % 3; 

            button.classList.remove('active');
            const existingIcon = button.querySelector('.sort-icon');
            if (existingIcon) existingIcon.remove();

            if (clickState === 1) {
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/up-arrow.png';
                sortIcon.classList.add('sort-icon', 'asc');
                button.appendChild(sortIcon);
            } else if (clickState === 2) {
                button.classList.add('active');
                const sortIcon = document.createElement('img');
                sortIcon.src = '/static/icons/down-arrow.png';
                sortIcon.classList.add('sort-icon', 'desc');
                button.appendChild(sortIcon);
            } else {
                button.classList.remove('active');
            }
        });
    });

    /* --- Botón para abrir/cerrar modal de información de recetas --- */
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
