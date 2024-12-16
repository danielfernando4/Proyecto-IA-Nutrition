document.addEventListener('DOMContentLoaded', function () {
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
