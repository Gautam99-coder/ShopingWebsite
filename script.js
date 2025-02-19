
// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 999.99,
        image: "../assets/weirless.png",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Casual T-Shirt",
        price: 249.99,
        image: "../assets/t-shirt.png",
        category: "Fashion"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 1499.99,
        image: "../assets/smartwatch.png",
        category: "Electronics"
    },
    {
        id: 4,
        name: "Table Lamp",
        price: 499.99,
        image: "../assets/lamp.png",
        category: "Home & Living"
    }
];

// Shopping cart
let cart = [];

// Display products
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="col-md-3">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Rs${product.price}</p>
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center mb-3">
            <img src="${item.image}" alt="${item.name}" style="width: 100px" class="me-3">
            <div class="flex-grow-1">
                <h5 class="mb-0">${item.name}</h5>
                <p class="mb-0">Rs${item.price} x ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCartUI();
    document.querySelector('[data-bs-dismiss="modal"]').click();
});

// Login form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here');
    document.querySelector('[data-bs-dismiss="modal"]').click();
});

// Initialize
displayProducts();

// Add new search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length > 0) {
        searchResults.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item" onclick="selectProduct(${product.id})">
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <div class="fw-bold">${product.name}</div>
                        <div class="text-muted small">${product.category} - Rs${product.price}</div>
                    </div>
                </div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <div class="text-muted">No products found</div>
            </div>
        `;
        searchResults.style.display = 'block';
    }
});

function selectProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(productId);
        searchInput.value = '';
        searchResults.style.display = 'none';
    }
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.style.display = 'none';
    }
});

 // Fade-in animation on scroll
 function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
// Initial check for visible elements
handleScroll();

// Quick View Functionality
function showQuickView(productId) {
    const quickView = document.getElementById('quickView');
    quickView.style.display = 'flex';
    setTimeout(() => quickView.classList.add('active'), 10);
}

document.querySelector('.quick-view-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        setTimeout(() => this.style.display = 'none', 300);
    }
});

// Wishlist Functionality
function toggleWishlist(button) {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
}

// Deal Timer
function updateTimer() {
    // Get elements
    const hoursEl = document.querySelector('.hours');
    const minutesEl = document.querySelector('.minutes');
    const secondsEl = document.querySelector('.seconds');
    
    // Update timer logic
    let hours = parseInt(hoursEl.textContent);
    let minutes = parseInt(minutesEl.textContent);
    let seconds = parseInt(secondsEl.textContent);
    
    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else {
            minutes = 59;
            if (hours > 0) {
                hours--;
            }
        }
    }
    
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);

// Size Selection
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Gallery Image Selection
document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainImage = this.parentElement.previousElementSibling;
        mainImage.src = this.src;
    });
});