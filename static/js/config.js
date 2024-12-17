document.addEventListener('DOMContentLoaded', function () {
    const abrirProfile = document.getElementById("edit_profile");
    const cerrarProfile = document.getElementById("close_profile");
    const panelProfile = document.getElementById("profile_conf");

    if (abrirProfile && cerrarProfile && panelProfile) {
        abrirProfile.addEventListener("click", () => {
            panelProfile.classList.add("open");
        });

        cerrarProfile.addEventListener("click", () => {
            panelProfile.classList.remove("open");
        });
    }

    const abrirDatos = document.getElementById("edit_stats");
    const cerrarDatos = document.getElementById("close_stats");
    const panelDatos = document.getElementById("stats_conf");

    if (abrirDatos && cerrarDatos && panelDatos) {
        abrirDatos.addEventListener("click", () => {
            panelDatos.classList.add("open");
        });

        cerrarDatos.addEventListener("click", () => {
            panelDatos.classList.remove("open");
        });
    }

    const filterButtons = document.querySelectorAll('.icon-button');

    filterButtons.forEach((button) => {
        let isAscending = true; 

        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => {
                if (btn !== button) {
                    btn.classList.remove('active');
                    const icon = btn.querySelector('.sort-icon');
                    if (icon) icon.remove(); 
                }
            });

            // Alternar la clase activa
            button.classList.toggle('active');

            // Si el botón está activo
            if (button.classList.contains('active')) {
                let sortIcon = button.querySelector('.sort-icon');
                if (!sortIcon) {
                    sortIcon = document.createElement('img'); // Crear el elemento img
                    sortIcon.classList.add('sort-icon'); // Añadir la clase sort-icon
                    button.appendChild(sortIcon); // Añadir el icono al botón
                }

                // Cambiar la dirección del icono según el estado de orden
                if (isAscending) {
                    sortIcon.classList.remove('desc');
                    sortIcon.classList.add('asc');
                    sortIcon.src = '/static/icons/up-arrow.png'; // Icono de flecha hacia arriba
                } else {
                    sortIcon.classList.remove('asc');
                    sortIcon.classList.add('desc');
                    sortIcon.src = '/static/icons/down-arrow.png'; // Icono de flecha hacia abajo
                }

                isAscending = !isAscending; // Alternar el estado
            } else {
                // Si se desactiva, eliminar el icono
                const sortIcon = button.querySelector('.sort-icon');
                if (sortIcon) sortIcon.remove();
            }
        });
    });

    /* --- Botón para abrir/cerrar modal de información de recetas --- */
    const abrirReceta = document.getElementById("ver_infoRec");
    const cerrarReceta = document.getElementById("close_recipeinf");
    const panelReceta = document.getElementById("recipe_info");
    const overlay = document.getElementById("modal_overlay"); // Referencia al overlay

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
