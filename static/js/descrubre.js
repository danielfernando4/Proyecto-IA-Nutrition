document.addEventListener('DOMContentLoaded', function() {
    const abrirInfo = document.getElementById("ver_filtro");
    const panelInfo = document.getElementById("filters_content");

    if (abrirInfo && panelInfo) {
        abrirInfo.addEventListener("click", () => {
            panelInfo.classList.toggle("open");
        });
    }

    const abrirReceta = document.getElementById("ver_infoRec");
    const cerrarReceta = document.getElementById("close_recipeinf");
    const panelReceta = document.getElementById("recipe_info");
    const overlay = document.getElementById("modal_overlay"); // Referencia al overlay

    if (abrirReceta && panelReceta) {
        abrirReceta.addEventListener("click", () => {
            panelReceta.classList.add("open");
            overlay.classList.add("open"); // Hacer visible el overlay
        });

        cerrarReceta.addEventListener("click", () => {
            panelReceta.classList.remove("open");
            overlay.classList.remove("open"); // Ocultar el overlay
        });
    }

    // Cerrar modal si se hace clic en el overlay
    if (overlay) {
        overlay.addEventListener("click", () => {
            panelReceta.classList.remove("open");
            overlay.classList.remove("open");
        });
    }
});
