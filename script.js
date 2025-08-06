let cart = [];
let wishlist = [];
let currentSlide = 0;
let isLoading = true;

const loadingScreen = document.getElementById('loadingScreen');
const header = document.querySelector('.header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartContent = document.getElementById('cartContent');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const wishlistCount = document.getElementById('wishlistCount');
const backToTop = document.getElementById('backToTop');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroIndicators = document.querySelectorAll('.indicator');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const quickViewModal = document.getElementById('quickViewModal');
const quickViewClose = document.getElementById('quickViewClose');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const wishlistBtns = document.querySelectorAll('.wishlist-btn-product');
const loadMoreBtn = document.getElementById('loadMoreBtn');

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        hideLoadingScreen();
        initializeWebsite();
    }, 1500);
});

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    isLoading = false;
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function filterProducts(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function initializeWebsite() {
    initializeEventListeners();
    initializeHeroSlider();
    initializeIntersectionObserver();
    loadCartFromStorage();
    loadWishlistFromStorage();
    updateCartUI();
    updateWishlistUI();
}

function initializeEventListeners() {
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchOverlay);
    }
    if (searchClose) {
        searchClose.addEventListener('click', closeSearchOverlay);
    }
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearchOverlay();
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartSidebar);
    }
    if (cartClose) {
        cartClose.addEventListener('click', closeCartSidebar);
    }
    
    if (quickViewClose) {
        quickViewClose.addEventListener('click', closeQuickViewModal);
    }
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) closeQuickViewModal();
        });
    }
    
    if (heroPrev) {
        heroPrev.addEventListener('click', () => changeSlide(-1));
    }
    if (heroNext) {
        heroNext.addEventListener('click', () => changeSlide(1));
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', handleWishlist);
    });
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
    
    window.addEventListener('scroll', handleScroll);
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    document.addEventListener('keydown', handleKeyboardEvents);
    
    initializeProductOptions();
    
    initializeQuantityControls();
}

function toggleMobileMenu() {
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (navLinks && mobileMenuBtn) {
        navLinks.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
    }
}

function openSearchOverlay() {
    if (searchOverlay && searchInput) {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
}

function closeSearchOverlay() {
    if (searchOverlay && searchInput) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
    }
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        console.log('Searching for:', query);
    }
}

function initializeHeroSlider() {
    if (heroSlides.length === 0) return;
    
    setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    let startX = 0;
    let endX = 0;
    
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        
        heroSlider.addEventListener('touchend', e => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
        }
    }
}

function changeSlide(direction) {
    if (heroSlides.length === 0) return;
    
    heroSlides[currentSlide].classList.remove('active');
    if (heroIndicators[currentSlide]) {
        heroIndicators[currentSlide].classList.remove('active');
    }
    
    currentSlide += direction;
    
    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = heroSlides.length - 1;
    }
    
    heroSlides[currentSlide].classList.add('active');
    if (heroIndicators[currentSlide]) {
        heroIndicators[currentSlide].classList.add('active');
    }
}

function handleFilterClick(e) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    e.target.classList.add('active');
    
    const filter = e.target.getAttribute('data-filter');
    filterProducts(filter);
}

function filterProducts(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function openCartSidebar() {
    if (cartSidebar) {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleAddToCart(e) {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    
    const productName = btn.getAttribute('data-product');
    const productPrice = parseFloat(btn.getAttribute('data-price'));
    const productId = btn.getAttribute('data-id');
    
    const productCard = btn.closest('.product-card');
    const productImageEl = productCard ? productCard.querySelector('.product-image img') : null;
    const productImage = productImageEl ? productImageEl.src : '';
    
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };
    
    addToCart(product);
    showNotification(`${productName} added to cart!`, 'success');
    
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 150);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    updateCartUI();
    saveCartToStorage();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="btn btn-primary" onclick="closeCartSidebar()">Continue Shopping</button>
                </div>
            `;
            if (cartFooter) {
                cartFooter.style.display = 'none';
            }
        } else {
            cartContent.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="cart-item-qty">
                                <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                            <button class="cart-remove" onclick="removeFromCart('${item.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            if (cartFooter) {
                cartFooter.style.display = 'block';
            }
            if (cartSubtotal) {
                cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            }
            if (cartTotal) {
                cartTotal.textContent = `$${subtotal.toFixed(2)}`;
            }
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem('eliteShopCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('eliteShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function handleWishlist(e) {
    const btn = e.target.closest('.wishlist-btn-product');
    if (!btn) return;
    
    const productId = btn.getAttribute('data-product');
    const productCard = btn.closest('.product-card');
    if (!productCard) return;
    
    const productNameEl = productCard.querySelector('.product-title');
    const productPriceEl = productCard.querySelector('.current-price');
    const productImageEl = productCard.querySelector('.product-image img');
    
    const product = {
        id: productId,
        name: productNameEl ? productNameEl.textContent : '',
        price: productPriceEl ? productPriceEl.textContent : '',
        image: productImageEl ? productImageEl.src : ''
    };
    
    toggleWishlist(product);
}

function toggleWishlist(product) {
    const existingIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} removed from wishlist!`, 'info');
    } else {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`, 'success');
    }
    
    updateWishlistUI();
    saveWishlistToStorage();
}

function updateWishlistUI() {
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
    
    wishlistBtns.forEach(btn => {
        const productId = btn.getAttribute('data-product');
        const isInWishlist = wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

function saveWishlistToStorage() {
    localStorage.setItem('eliteShopWishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
    const savedWishlist = localStorage.getItem('eliteShopWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

function handleQuickView(e) {
    const btn = e.target.closest('.quick-view-btn');
    if (!btn) return;
    
    const productId = btn.getAttribute('data-product');
    const productCard = btn.closest('.product-card');
    if (!productCard) return;
    
    const productData = {
        image: productCard.querySelector('.product-image img')?.src || '',
        category: productCard.querySelector('.product-category')?.textContent || '',
        title: productCard.querySelector('.product-title')?.textContent || '',
        rating: productCard.querySelector('.product-rating')?.innerHTML || '',
        price: productCard.querySelector('.product-price')?.innerHTML || ''
    };
    
    openQuickViewModal(productData);
}

function openQuickViewModal(productData) {
    if (!quickViewModal) return;
    
    const quickViewImage = document.getElementById('quickViewImage');
    const quickViewCategory = document.getElementById('quickViewCategory');
    const quickViewTitle = document.getElementById('quickViewTitle');
    const quickViewRating = document.getElementById('quickViewRating');
    const quickViewPrice = document.getElementById('quickViewPrice');
    
    if (quickViewImage) quickViewImage.src = productData.image;
    if (quickViewCategory) quickViewCategory.textContent = productData.category;
    if (quickViewTitle) quickViewTitle.textContent = productData.title;
    if (quickViewRating) quickViewRating.innerHTML = productData.rating;
    if (quickViewPrice) quickViewPrice.innerHTML = productData.price;
    
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
    if (quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initializeProductOptions() {
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initializeQuantityControls() {
    const qtyInputs = document.querySelectorAll('.qty-input');
    const minusBtns = document.querySelectorAll('.qty-btn.minus');
    const plusBtns = document.querySelectorAll('.qty-btn.plus');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (input) {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            }
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input) {
                const currentValue = parseInt(input.value);
                const maxValue = parseInt(input.getAttribute('max')) || 10;
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                }
            }
        });
    });
    
    qtyInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.getAttribute('min')) || 1;
            const max = parseInt(this.getAttribute('max')) || 10;
            
            if (value < min) this.value = min;
            if (value > max) this.value = max;
        });
    });
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    if (backToTop) {
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    if (navLinks && navLinks.classList.contains('open')) {
        closeMobileMenu();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .feature-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function loadMoreProducts() {
    if (!productsGrid) return;
    
    const additionalProducts = [
        {
            id: '7',
            category: 'accessories',
            image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600',
            title: 'Premium Sunglasses',
            price: '$149.99',
            rating: 5
        },
        {
            id: '8',
            category: 'women',
            image: 'https://images.pexels.com/photos/1068209/pexels-photo-1068209.jpeg?auto=compress&cs=tinysrgb&w=600',
            title: 'Designer Handbag',
            price: '$299.99',
            rating: 4
        }
    ];
    
    additionalProducts.forEach(product => {
        const productHTML = createProductHTML(product);
        productsGrid.insertAdjacentHTML('beforeend', productHTML);
    });
    
    initializeNewProductEvents();
    
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function createProductHTML(product) {
    const stars = Array(5).fill(0).map((_, i) => 
        i < product.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'
    ).join('');
    
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button class="quick-view-btn" data-product="${product.id}">Quick View</button>
                    <button class="wishlist-btn-product" data-product="${product.id}"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">(${Math.floor(Math.random() * 500) + 50})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                </div>
                <button class="add-to-cart-btn" data-product="${product.title}" data-price="${product.price.replace('$', '')}" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function initializeNewProductEvents() {
    const newAddToCartBtns = document.querySelectorAll('.add-to-cart-btn:not([data-initialized])');
    const newQuickViewBtns = document.querySelectorAll('.quick-view-btn:not([data-initialized])');
    const newWishlistBtns = document.querySelectorAll('.wishlist-btn-product:not([data-initialized])');
    
    newAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
        btn.setAttribute('data-initialized', 'true');
    });
    
    newQuickViewBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickView);
        btn.setAttribute('data-initialized', 'true');
    });
    
    newWishlistBtns.forEach(btn => {
        btn.addEventListener('click', handleWishlist);
        btn.setAttribute('data-initialized', 'true');
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]')?.value;
    
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    }
}

function handleKeyboardEvents(e) {
    if (e.key === 'Escape') {
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            closeCartSidebar();
        }
        if (quickViewModal && quickViewModal.classList.contains('active')) {
            closeQuickViewModal();
        }
        if (navLinks && navLinks.classList.contains('open')) {
            closeMobileMenu();
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchOverlay();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left: 4px solid #28a745;
            }
            .notification-error {
                border-left: 4px solid #dc3545;
            }
            .notification-info {
                border-left: 4px solid #17a2b8;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification-success .notification-content i {
                color: #28a745;
            }
            .notification-error .notification-content i {
                color: #dc3545;
            }
            .notification-info .notification-content i {
                color: #17a2b8;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

function initializeAccessibility() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        if (!element) return;
        
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement?.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement?.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    if (quickViewModal) trapFocus(quickViewModal);
    if (searchOverlay) trapFocus(searchOverlay);
    if (cartSidebar) trapFocus(cartSidebar);
}

document.addEventListener('DOMContentLoaded', initializeAccessibility);

window.closeCartSidebar = closeCartSidebar;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
