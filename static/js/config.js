document.addEventListener('DOMContentLoaded', function() {
    /* Boton para el apartado de perfil */
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

    /* Boton para el apartado de datos */
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
});