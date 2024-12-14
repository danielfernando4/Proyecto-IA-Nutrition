document.addEventListener('DOMContentLoaded', function() {
    const userProfileLink = document.getElementById('user-profile-link');
    const dropdownMenu = document.getElementById('dropdown-menu');

    userProfileLink.addEventListener('click', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!userProfileLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});