// Cart functionality
let cart = [];
let selectedShipping = null;
let selectedPayment = null;

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    updateCartDisplay();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');

    const totalItems = cart.reduce((t, item) => t + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const el = document.createElement('li');
        el.className = 'cart-item flex py-6';
        el.innerHTML = `
            <div class="ml-4 flex-1">
                <div class="flex justify-between">
                    <h3 class="text-base font-medium text-gray-900">${item.name}</h3>
                    <p class="text-base font-medium text-gray-900">₹${itemTotal.toFixed(2)}</p>
                </div>
                <div class="flex justify-between items-center mt-1">
                    <span class="text-sm text-gray-500">Qty: ${item.quantity}</span>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 text-sm font-medium">
                        Remove
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(el);
    });

    cartTotalElement.textContent = `₹${total.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    sidebar.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    document.body.style.overflow = sidebar.classList.contains('hidden') ? 'auto' : 'hidden';
}

function showNotification(message) {
    const n = document.createElement('div');
    n.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Remove buggy nav JS ❌ (no duplicate listeners)

// Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('fade-in');
    });
});

document.querySelectorAll('.project-card').forEach(el => observer.observe(el));

updateCartDisplay();

// Close cart outside click
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (!sidebar.contains(e.target) &&
        !e.target.closest('[onclick="toggleCart()"]') &&
        !sidebar.classList.contains('hidden')) {
        toggleCart();
    }
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const subject = document.getElementById('subject').value;
    const body = `Message from website`;

    window.location.href =
        `mailto:mechroboenginner@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showNotification('Email client opening...');
    this.reset();
});

// Scroll top
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// SHIPPING (FIXED)
function selectShippingMethod(method, cost, event) {
    document.querySelectorAll('.shipping-method').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    selectedShipping = { method, cost };

    document.getElementById('shipping-cost').textContent = `₹${cost}`;
}

// PAYMENT (FIXED)
function selectPaymentMethod(method, event) {
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    selectedPayment = method;
}

function showShippingMethods() {
    if (cart.length === 0) {
        showNotification("Cart is empty!");
        return;
    }
    document.getElementById('shipping-modal').classList.remove('hidden');
}

function showPaymentMethods() {
    if (!selectedShipping) {
        showNotification("Select shipping first!");
        return;
    }
    document.getElementById('shipping-modal').classList.add('hidden');
    document.getElementById('payment-modal').classList.remove('hidden');
}

function showPersonalDetailsForm() {
    if (!selectedPayment) {
        showNotification("Select payment!");
        return;
    }
    document.getElementById('payment-modal').classList.add('hidden');
    document.getElementById('details-modal').classList.remove('hidden');
}
