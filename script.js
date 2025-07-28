// Responsive mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  const cartBtn = document.getElementById('cartBtn');
  const modal = document.getElementById('cartModal');
  const closeModal = document.getElementById('closeModal');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  let modalTimer = null;

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close nav menu on outside click (mobile)
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 900 &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  // Show modal function
  function showModal(message = "Added to cart!") {
    const content = modal.querySelector('.modal-content p');
    if (content) content.textContent = message;

    modal.style.display = 'flex';
    closeModal.focus();

    clearTimeout(modalTimer);
    modalTimer = setTimeout(() => {
      modal.style.display = 'none';
    }, 2000);
  }

  // Add to cart click
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      showModal("Added to cart!");
    });
  });

  // Cart button click
  cartBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showModal("Cart feature coming soon!");
  });

  // Close modal
  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
    clearTimeout(modalTimer);
  });

  // ESC to close modal
  window.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') modal.style.display = 'none';
  });

  // Click outside modal to close
  modal.addEventListener('click', function(evt) {
    if (evt.target === modal) modal.style.display = 'none';
  });
});
