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
