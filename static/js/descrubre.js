document.addEventListener('DOMContentLoaded', function() {
    const abrirInfo = document.getElementById("ver_filtro");
    const panelInfo = document.getElementById("filters_content");

    if (abrirInfo && panelInfo) {
        abrirInfo.addEventListener("click", () => {
            panelInfo.classList.toggle("open");
        });
    }
});