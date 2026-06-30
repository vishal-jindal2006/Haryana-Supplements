const allProductsContainer =
document.getElementById("allProductsContainer");

let allProducts = [];
let currentProducts = [];

async function loadAllProducts() {

    try {

        const res = await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        allProducts = await res.json();

        currentProducts = [...allProducts];

        displayProducts(currentProducts);

    }

    catch(error) {

        console.log(error);

    }

}

function displayProducts(products) {

    document.getElementById(
        "productCount"
    ).innerText =
    `Showing ${products.length} Products`;

    allProductsContainer.innerHTML = "";

    products.forEach(product => {

        const discountPercent = Math.round(
            (
                (product.price - product.discount)
                /
                product.price
            ) * 100
        );

        const saveAmount =
        product.price - product.discount;

        allProductsContainer.innerHTML += `

        <div
        class="product-card"
        onclick="showProductDetails('${product._id}')">

            <div class="discount-badge">
                ${discountPercent}% OFF
            </div>

            <div class="wishlist-icon">
                ❤️
            </div>

            ${product.bestSeller ? `
            <span class="product-badge">
                🔥 BESTSELLER
            </span>
            ` : ""}

            <img src="${product.images?.[0] || 'assets/products/default.png'}">

            <p class="brand-name">
                HARYANA SUPPLEMENTS
            </p>

            <h3>${product.name}</h3>

            <div class="product-rating">
                ⭐ 4.9
                <span>
                    95 Verified Reviews
                </span>
            </div>

            <div class="price">

                <span class="new-price">
                    ₹${product.discount}
                </span>

                <span class="old-price">
                    ₹${product.price}
                </span>

            </div>

            <div class="save-price">
                SAVE ₹${saveAmount}
            </div>

            <button
            onclick="event.stopPropagation();
            addToCart(
                '${product.name}',
                ${product.discount}
            )">

                Add To Cart

            </button>

        </div>

        `;

    });

}

function filterProducts(category, button){

    document
    .querySelectorAll(".category-btn")
    .forEach(btn => {

        btn.classList.remove(
            "active"
        );

    });

    button.classList.add(
        "active"
    );

    if(category === "All"){

        currentProducts =
        [...allProducts];

    }

    else{

        currentProducts =
        allProducts.filter(

            product =>
            product.category === category

        );

    }

    displayProducts(currentProducts);

}

function showProductDetails(productId){

    const product = allProducts.find(

        p => p._id === productId

    );

    localStorage.setItem(

        "selectedProduct",

        JSON.stringify(product)

    );

    window.location.href =
    "product.html";

}

function searchProducts(){

    const searchText =
    document.getElementById(
        "searchInput"
    ).value.toLowerCase();

    const filteredProducts =
    currentProducts.filter(product =>

        product.name
        .toLowerCase()
        .includes(searchText)

    );

    displayProducts(filteredProducts);

}

function sortProducts(){

    const sortValue =
    document.getElementById(
        "sortProducts"
    ).value;

    let sortedProducts =
    [...currentProducts];

    if(sortValue === "low"){

        sortedProducts.sort(
            (a,b)=>
            a.discount - b.discount
        );

    }

    else if(sortValue === "high"){

        sortedProducts.sort(
            (a,b)=>
            b.discount - a.discount
        );

    }

    else if(sortValue === "newest"){

        sortedProducts.sort(
            (a,b)=>
            new Date(b.createdAt)
            -
            new Date(a.createdAt)
        );

    }

    displayProducts(sortedProducts);

}

loadAllProducts();
updateCartCount();

function addToCart(name, price){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    const existingProduct =
    cart.find(item =>
        item.name === name
    );

    if(existingProduct){

        existingProduct.quantity++;

    }

    else{

        cart.push({

            name: name,

            price: parseInt(price),

            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    updateCartCount();

    alert("Added To Cart 🔥");

}

function updateCartCount(){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    const cartCount =
    document.getElementById(
        "cartCount"
    );

    if(cartCount){

        cartCount.innerText =
        count;

    }

}

// =========================
// CART SYSTEM
// =========================

const cartSidebar =
document.getElementById("cartSidebar");

const cartIcon =
document.querySelector(".cart-icon");

const closeCart =
document.getElementById("closeCart");

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const cartCount =
document.getElementById("cartCount");

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

if(cartIcon){

    cartIcon.addEventListener("click", () => {

        cartSidebar.classList.add("active");

        renderCart();

    });

}

if(closeCart){

    closeCart.addEventListener("click", () => {

        cartSidebar.classList.remove("active");

    });

}

function renderCart(){

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <div class="cart-qty">

            <button onclick="decreaseQty(${index})">

            -

            </button>

            <span>

            ${item.quantity}

            </span>

            <button onclick="increaseQty(${index})">

            +

            </button>

            </div>

            <p>

            ₹${item.price * item.quantity}

            </p>

            <button onclick="removeItem(${index})">

            Remove

            </button>

        </div>

        `;

    });

    cartTotal.innerText = total;

    cartCount.innerText = count;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    renderCart();

}

renderCart();

function increaseQty(index){

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

    else{

        cart.splice(index,1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

}

// Mobile Menu Toggle

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

}