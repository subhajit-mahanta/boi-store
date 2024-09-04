document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('cartModal');

    window.openModal = function() {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    };
});
