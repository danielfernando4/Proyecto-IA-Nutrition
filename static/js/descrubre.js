document.addEventListener('DOMContentLoaded', function() {
    const abrirInfo = document.getElementById("edit_profile");
    const cerrarInfo = document.getElementById("close_info");
    const panelInfo = document.getElementById("profile_conf");

    if (abrirProfile && cerrarProfile && panelProfile) {
        abrirProfile.addEventListener("click", () => {
            panelInfo.classList.add("open");
        });

        cerrarProfile.addEventListener("click", () => {
            panelInfo.classList.remove("open");
        });
    }
});