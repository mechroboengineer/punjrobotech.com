tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        secondary: '#1e40af',
                        accent: '#f59e0b',
                        dark: '#0f172a'
                    }
                }
            }
        }
    

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
