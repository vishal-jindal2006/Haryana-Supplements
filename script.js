// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }, 1000);

    }

});


// =========================
// MOBILE MENU
// =========================

const menuBtn =
document.getElementById("menuBtn");

const navMenu =
document.getElementById("navMenu");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

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


// CHECKOUT BUTTON

const checkoutBtn =
document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        window.location.href =
        "checkout.html";

    });

}


// CART ARRAY

let cart = JSON.parse(

    localStorage.getItem("cart")

) || [];


// OPEN CART

if(cartIcon){

    cartIcon.addEventListener("click", () => {

        cartSidebar.classList.add("active");

    });

}


// CLOSE CART

if(closeCart){

    closeCart.addEventListener("click", () => {

        cartSidebar.classList.remove("active");

    });

}


// =========================
// UPDATE CART
// =========================

function updateCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <div class="cart-qty">

                    <button
                    onclick="decreaseQty(${index})">

                    -

                    </button>

                    <span>

                    ${item.quantity}

                    </span>

                    <button
                    onclick="increaseQty(${index})">

                    +

                    </button>

                </div>

                <p>
                    ₹${item.price * item.quantity}
                </p>

            </div>

            <button
            onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    if(cartTotal){

        cartTotal.innerText = total;

    }

    if(cartCount){

        cartCount.innerText = count;

    }

    // SAVE CART

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

function increaseQty(index){

    cart[index].quantity++;

    updateCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

    else{

        cart.splice(index,1);

    }

    updateCart();

}


// =========================
// PRODUCTS CONTAINER
// =========================

const dynamicProducts =
document.getElementById("dynamicProducts");


// =========================
// LOAD PRODUCTS
// =========================

async function loadProducts(){

    if(!dynamicProducts) return;

    try{

        const res = await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        const products = await res.json();

        dynamicProducts.innerHTML = "";

        if(products.length === 0){

            dynamicProducts.innerHTML = `
            <h2 style="
                color:white;
                text-align:center;
                width:100%;
                margin-top:50px;
            ">
                No Products Uploaded Yet
            </h2>
            `;

            return;
        }

        const bestSellerProducts = products.filter(
            product => product.bestSeller === true
        );

        window.productsData = bestSellerProducts;

        bestSellerProducts.forEach(product => {
            

            const discountPercent = Math.round(
            (
            (product.price - product.discount)
            /
            product.price
            ) * 100
            );

            const saveAmount =
            product.price - product.discount;

            dynamicProducts.innerHTML += `

            <div
            class="product-card"
            onclick="showProductDetails('${product._id}')">

            <div class="discount-badge">
                ${discountPercent}% OFF
            </div>

            <div class="wishlist-icon">
                ❤️
            </div>

                <span class="product-badge">

                    🔥 BESTSELLER

                </span>

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

    catch(error){

        console.log(
            "Product Load Error:",
            error
        );

    }

}

// =========================
// ADD TO CART
// =========================

function addToCart(name,price){

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

    updateCart();

    alert("Added To Cart 🔥");

}


// =========================
// SEARCH PRODUCTS
// =========================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value =
        searchInput.value.toLowerCase();

        const cards =
        document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

            if(name.includes(value)){

                card.style.display = "block";

            }

            else{

                card.style.display = "none";

            }

        });

    });

}


// =========================
// FILTER PRODUCTS
// =========================

function filterProducts(category){

    let products = [];

    dynamicProducts.innerHTML = "";

    // ALL PRODUCTS

    if(category === "All"){

        loadProducts();

        return;

    }

    // FILTER PRODUCTS

    const filteredProducts =

    products.filter(product =>

        product.category
        .toLowerCase()

        ===

        category.toLowerCase()

    );

    // NO PRODUCTS

    if(filteredProducts.length === 0){

        dynamicProducts.innerHTML = `

        <h2 style="

        color:white;
        text-align:center;
        width:100%;
        margin-top:50px;

        ">

            No Products Found

        </h2>

        `;

        return;

    }

    // DISPLAY PRODUCTS

    filteredProducts.forEach(product => {

        dynamicProducts.innerHTML += `

        <div class="product-card"

        onclick='openProduct(

        ${JSON.stringify(product)}

        )'>

            <img
            src="${product.image}">

            <h3>${product.name}</h3>

            <div class="price">

                <span class="new-price">

                    ₹${product.discount}

                </span>

                <span class="old-price">

                    ₹${product.price}

                </span>

            </div>

            ${
            product.stock > 0

            ?

            `<button
            onclick="event.stopPropagation();

            addToCart(

            '${product.name}',

            ${product.discount}

            )">

            Add To Cart

            </button>`

            :

            `<button
            style="

            background:#444;
            cursor:not-allowed;

            ">

            Out Of Stock

            </button>`
            }

        </div>

        `;

    });

}

function showProductDetails(productId){

    const product = window.productsData.find(

        p => p._id === productId

    );

    if(!product){

        alert("Product Not Found");

        return;

    }

    localStorage.setItem(

        "selectedProduct",

        JSON.stringify(product)

    );

    window.location.href =
    "product.html";

}

// =========================
// OPEN PRODUCT PAGE
// =========================

function openProduct(product){

    localStorage.setItem(

        "selectedProduct",

        JSON.stringify(product)

    );

    window.location.href =
    "product.html";

}


// =========================
// OFFER BANNER
// =========================

const offerBannerImage =
document.getElementById(

    "offerBannerImage"

);

const offerBannerTitle =
document.getElementById(

    "offerBannerTitle"

);

const offerBanner = JSON.parse(

    localStorage.getItem(

        "offerBanner"

    )

);

// LOAD BANNER

if(

    offerBanner &&

    offerBannerImage &&

    offerBannerTitle

){

    offerBannerImage.src =
    offerBanner.image;

    offerBannerTitle.innerText =
    offerBanner.title;

}


// =========================
// START
// =========================

updateCart();

loadProducts();

async function addReview(){

    const name =
    document.getElementById("reviewName").value;

    const text =
    document.getElementById("reviewText").value;

    const rating =
    document.getElementById("reviewRating").value;

    if(!name || !text){

        alert("Please Fill All Fields");

        return;

    }

    try{

        const response = await fetch(

            "https://haryana-supplements-api.onrender.com/api/reviews",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    customerName:name,

                    reviewText:text,

                    rating:rating

                })

            }

        );

        if(!response.ok){

            throw new Error();

        }

        document.getElementById(
            "reviewName"
        ).value = "";

        document.getElementById(
            "reviewText"
        ).value = "";

        loadReviews();

        alert(
            "Review Submitted ⭐"
        );

    }

    catch(error){

        alert(
            "Review Submit Failed"
        );

    }

}
let visibleReviews = 5;


async function loadReviews(){

    const container =
    document.getElementById(
        "reviewsContainer"
    );

    if(!container) return;

    try{

        const response =
        await fetch(

            "https://haryana-supplements-api.onrender.com/api/reviews"

        );

        const reviews =
        await response.json();

        container.innerHTML = "";

        reviews
        .slice(0, visibleReviews)
        .forEach(review => {

            const firstLetter =
            review.customerName.charAt(0).toUpperCase();

            container.innerHTML += `

            <div class="review-card">

                <div class="review-stars">
                    ${"⭐".repeat(review.rating)}
                </div>

                <p class="review-text">
                    "${review.reviewText}"
                </p>

                <div class="review-user">

                    <div class="review-avatar">
                        ${firstLetter}
                    </div>

                    <div>

                        <div class="review-name">
                            ${review.customerName}
                        </div>

                        <div class="review-verified">
                            ✅ VERIFIED CUSTOMER
                        </div>

                    </div>

                </div>

            </div>

            `;

        });

        

    if(reviews.length > visibleReviews){

        container.innerHTML += `

        <div style="text-align:center; width:100%;">

            <button
            onclick="loadMoreReviews()"
            class="load-more-btn">

                Load More Reviews

            </button>

        </div>

        `;

    }

    }

    catch(error){

        console.log(
            "Review Load Error:",
            error
        );

    }

}


function loadMoreReviews(){

            visibleReviews += 5;

            loadReviews();

        }
        
loadReviews();