let cart = [];

// ADD TO CART
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();

    alert(name + " added to cart!");
}


// UPDATE CART COUNT
function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    document.getElementById("cart-count").textContent = totalItems;
}


// SHOW CART
function showCart() {

    const modal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "₹0";

    } else {

        let total = 0;

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div>
                        <strong>${item.name}</strong>
                        <p>₹${item.price} × ${item.quantity}</p>
                    </div>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>
            `;
        });

        cartTotal.textContent = `₹${total}`;
    }

    modal.style.display = "flex";
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();
    showCart();
}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCartCount();
    showCart();
}


// REMOVE ITEM
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();
    showCart();
}


// CLOSE CART
function closeCart() {

    document.getElementById("cart-modal").style.display = "none";
}


// CHECKOUT
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");
        return;
    }

    closeCart();

    const checkoutPage = document.querySelector(".checkout-page");

    if (!checkoutPage) {
        alert("Checkout page not found!");
        return;
    }

    checkoutPage.style.display = "block";

    checkoutPage.scrollIntoView({
        behavior: "smooth"
    });

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <strong>₹${itemTotal}</strong>

            </div>
        `;
    });

    checkoutTotal.textContent = `₹${total}`;
}


// PLACE ORDER
const checkoutForm =
    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty!");
            return;
        }

        // CLEAR CART
        cart = [];

        updateCartCount();

        // RESET FORM
        checkoutForm.reset();

        // HIDE CHECKOUT
        document.querySelector(".checkout-page").style.display = "none";

        // SHOW SUCCESS PAGE
        const successPage =
            document.querySelector(".success-page");

        if (successPage) {

            successPage.style.display = "block";

            successPage.scrollIntoView({
                behavior: "smooth"
            });

        } else {

            alert("Order placed successfully!");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}


// GO HOME
function goHome() {

    const successPage =
        document.querySelector(".success-page");

    if (successPage) {
        successPage.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function searchProducts() {

    const searchText =
        document.getElementById("search-input").value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
function filterCategory(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productCategory =
            product.querySelector(".product-category")
            .textContent
            .trim();

        if (productCategory === category) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });

    // Scroll to products
    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}
function filterPrice() {

    const selectedPrice =
        document.getElementById("price-range").value;

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const priceText =
            product.querySelector(".price").textContent;

        const price =
            parseInt(priceText.replace(/[^\d]/g, ""));

        if (selectedPrice === "all") {

            product.style.display = "";

        } else if (price <= parseInt(selectedPrice)) {

            product.style.display = "";

        } else {

            product.style.display = "none";
        }
    });

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}
function showProductDetails(index) {

    const products = [
        {
            name: "Urban Running Shoes",
            category: "Footwear",
            price: "₹2,499",
            rating: "★★★★★",
            icon: "👟",
            description: "Comfortable and stylish running shoes designed for everyday use and active lifestyles."
        },
        {
            name: "Smart Watch Pro",
            category: "Accessories",
            price: "₹1,999",
            rating: "★★★★★",
            icon: "⌚",
            description: "A modern smart watch with useful features for your everyday activities."
        },
        {
            name: "Wireless Headphones",
            category: "Electronics",
            price: "₹1,499",
            rating: "★★★★☆",
            icon: "🎧",
            description: "Enjoy clear sound and comfortable listening with these wireless headphones."
        },
        {
            name: "Premium Travel Backpack",
            category: "Fashion",
            price: "₹1,299",
            rating: "★★★★★",
            icon: "🎒",
            description: "A stylish and spacious backpack perfect for travel, college and everyday use."
        }
    ];

    const product = products[index];

    document.getElementById("details-icon").textContent = product.icon;
    document.getElementById("details-category").textContent = product.category;
    document.getElementById("details-name").textContent = product.name;
    document.getElementById("details-rating").textContent = product.rating;
    document.getElementById("details-price").textContent = product.price;
    document.getElementById("details-description").textContent = product.description;

    document.querySelector(".products").style.display = "none";

    document.querySelector(".product-details-page").style.display = "block";

    document.querySelector(".product-details-page").scrollIntoView({
        behavior: "smooth"
    });
}