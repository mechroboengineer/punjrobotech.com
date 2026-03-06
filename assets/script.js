// Cart functionality
let cart = [];
let total = 0;
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
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart items list
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('li');
        cartItemElement.className = 'cart-item flex py-6';
        cartItemElement.innerHTML = `
            <div class="ml-4 flex-1">
                <div class="flex justify-between">
                    <h3 class="text-base font-medium text-gray-900">${item.name}</h3>
                    <p class="text-base font-medium text-gray-900">₹${itemTotal.toFixed(2)}</p>
                </div>
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500">Qty: ${item.quantity}</span>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 text-sm font-medium">
                        Remove
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total
    cartTotalElement.textContent = `₹${total.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.add('hidden');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        // Find and activate the clicked nav link in DOM
        const targetLink = Array.from(document.querySelectorAll('.nav-link')).find(link => 
            link.getAttribute('onclick').includes(sectionId)
        );
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
}

// Handle navigation when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('onclick').split("'")[1];
        scrollToSection(target);
    });
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Initialize cart display
updateCartDisplay();

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (!sidebar.contains(event.target) && !event.target.closest('[onclick="toggleCart()"]') && 
        !sidebar.classList.contains('hidden') && event.target !== overlay) {
        toggleCart();
    }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create email body
    const emailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:mechroboenginner@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show notification
    showNotification('Thank you for your message! Your email client will open now.');
    
    // Reset form
    this.reset();
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Shipping methods functionality
function showShippingMethods() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('sub-total').textContent = `₹${subtotal.toFixed(2)}`;
    
    // Show modal
    document.getElementById('shipping-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeShippingModal() {
    document.getElementById('shipping-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function selectShippingMethod(method, cost) {
    // Remove selected class from all options
    document.querySelectorAll('.shipping-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.currentTarget.classList.add('selected');
    
    selectedShipping = { method, cost };
    
    // Update shipping cost display
    document.getElementById('shipping-cost').textContent = `₹${cost.toFixed(2)}`;
    
    // Update final total
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const finalTotal = subtotal + cost;
    document.getElementById('final-total').textContent = `₹${finalTotal.toFixed(2)}`;
}

function showPaymentMethods() {
    if (!selectedShipping) {
        showNotification("Please select a shipping method first!");
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('payment-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('payment-shipping').textContent = `₹${selectedShipping.cost.toFixed(2)}`;
    const finalTotal = subtotal + selectedShipping.cost;
    document.getElementById('payment-total').textContent = `₹${finalTotal.toFixed(2)}`;
    
    // Show payment modal
    document.getElementById('shipping-modal').classList.add('hidden');
    document.getElementById('payment-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function selectPaymentMethod(method) {
    // Remove selected class from all options
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.currentTarget.classList.add('selected');
    
    selectedPayment = method;
}

function showPersonalDetailsForm() {
    if (!selectedPayment) {
        showNotification("Please select a payment method first!");
        return;
    }
    
    // Close payment modal and show details form
    document.getElementById('payment-modal').classList.add('hidden');
    document.getElementById('details-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDetailsModal() {
    document.getElementById('details-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Handle form submission
document.getElementById('personal-details-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    
    // Show success notification
    showNotification(`Order placed successfully! Details: ${fullName}, ${email}, ${phone}`);
    
    // Close all modals and reset cart
    closeDetailsModal();
    cart = [];
    updateCartDisplay();
    
    // Reset form
    this.reset();
});
