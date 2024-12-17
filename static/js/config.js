document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modal_overlay');
    const modalProfile = document.getElementById('profile_conf');
    const modalStats = document.getElementById('stats_conf');
    const openProfileButton = document.getElementById('edit_profile');
    const openStatsButton = document.getElementById('edit_stats');
    const closeProfileButton = document.getElementById('close_profile');
    const closeStatsButton = document.getElementById('close_stats');

    // Función para abrir modal
    function openModal(modal) {
        modal.classList.add('open');
        modalOverlay.classList.add('open');
    }

    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('open');
        modalOverlay.classList.remove('open');
    }

    // Eventos para abrir modales
    openProfileButton.addEventListener('click', () => openModal(modalProfile));
    openStatsButton.addEventListener('click', () => openModal(modalStats));

    // Eventos para cerrar modales
    closeProfileButton.addEventListener('click', () => closeModal(modalProfile));
    closeStatsButton.addEventListener('click', () => closeModal(modalStats));

    // Cerrar modal al hacer clic en el overlay
    modalOverlay.addEventListener('click', () => {
        closeModal(modalProfile);
        closeModal(modalStats);
    });
});
