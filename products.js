const allProductsContainer =
document.getElementById("allProductsContainer");

let allProducts = [];

async function loadAllProducts() {

    try {

        const res = await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        allProducts = await res.json();

        displayProducts(allProducts);

    }

    catch(error) {

        console.log(error);

    }

}

function displayProducts(products) {

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

function filterProducts(category) {

    if(category === "All") {

        displayProducts(allProducts);

        return;

    }

    const filteredProducts = allProducts.filter(

        product =>

        product.category === category

    );

    displayProducts(filteredProducts);

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

loadAllProducts();