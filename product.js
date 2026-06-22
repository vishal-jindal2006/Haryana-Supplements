let quantity = 1;

// =========================
// GET PRODUCT
// =========================

const selectedProduct = JSON.parse(

    localStorage.getItem(
        "selectedProduct"
    )

);

// =========================
// ELEMENTS
// =========================

const detailsImage =
document.getElementById("detailsImage");

const detailsName =
document.getElementById("detailsName");

const detailsDiscount =
document.getElementById("detailsDiscount");

const detailsPrice =
document.getElementById("detailsPrice");

const detailsDescription =
document.getElementById("detailsDescription");

const thumbnailContainer =
document.getElementById(
    "thumbnailContainer"
);

// =========================
// LOAD PRODUCT
// =========================

if(selectedProduct){

    detailsImage.src =
    selectedProduct.images?.[0] ||
    "assets/products/default.png";

    const thumbnailGrid =
    document.getElementById("thumbnailGrid");

    if(
        thumbnailGrid &&
        selectedProduct.images &&
        selectedProduct.images.length > 0
    ){

        thumbnailGrid.innerHTML = "";

        selectedProduct.images.forEach(image => {

            thumbnailGrid.innerHTML += `

            <div class="thumbnail-box">

                <img
                src="${image}"
                onclick="changeMainImage('${image}')">

            </div>

            `;

        });

    }

    detailsName.innerText =
    selectedProduct.name;

    detailsDiscount.innerText =
    "₹" + selectedProduct.discount;

    detailsPrice.innerText =
    "₹" + selectedProduct.price;

    const saveAmount =
    selectedProduct.price -
    selectedProduct.discount;

    document.getElementById(
        "saveAmount"
    ).innerText =
    " ₹" + saveAmount;

    detailsDescription.innerText =
    selectedProduct.description;

    loadRelatedProducts(
        selectedProduct.category,
        selectedProduct._id
    );

}

// =========================
// BUY NOW
// =========================

const buyNowBtn =
document.getElementById("buyNowBtn");

if(buyNowBtn){

    buyNowBtn.addEventListener("click", () => {

        const product = JSON.parse(

            localStorage.getItem(
                "selectedProduct"
            )

        );

        localStorage.setItem(

            "buyNowProduct",

            JSON.stringify(product)

        );

        window.location.href =
        "checkout.html";

    });

}

async function loadRelatedProducts(
    category,
    currentProductId
){

    const container =
    document.getElementById(
        "relatedProducts"
    );

    if(!container) return;

    try{

        const res = await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        const products =
        await res.json();

        const relatedProducts =
        products.filter(product =>

            product.category === category &&

            product._id !== currentProductId

        ).slice(0,4);

        container.innerHTML = "";

        relatedProducts.forEach(product => {

            container.innerHTML += `

            <div
            class="product-card"
            onclick="openRelatedProduct('${product._id}')">

                <img
                src="${product.images?.[0] || 'assets/products/default.png'}">

                <h3>${product.name}</h3>

                <div class="price">

                    <span class="new-price">
                        ₹${product.discount}
                    </span>

                    <span class="old-price">
                        ₹${product.price}
                    </span>

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

function openRelatedProduct(productId){

    fetch(
        "https://haryana-supplements-api.onrender.com/api/products"
    )

    .then(res => res.json())

    .then(products => {

        const product =
        products.find(
            p => p._id === productId
        );

        localStorage.setItem(

            "selectedProduct",

            JSON.stringify(product)

        );

        location.reload();

    });

}

function increaseQty(){

    quantity++;

    document.getElementById(
        "productQty"
    ).innerText = quantity;

}

function decreaseQty(){

    if(quantity > 1){

        quantity--;

        document.getElementById(
            "productQty"
        ).innerText = quantity;

    }

}

// =========================
// CART SIDEBAR
// =========================

const cartBtn =
document.getElementById("cartBtn");

const cartSidebar =
document.getElementById("cartSidebar");

const closeCart =
document.getElementById("closeCart");

if(cartBtn){

    cartBtn.addEventListener("click", () => {

        cartSidebar.classList.add("active");

        renderCart();

    });

}

if(closeCart){

    closeCart.addEventListener("click", () => {

        cartSidebar.classList.remove("active");

    });

}

// =========================
// RENDER CART
// =========================

function renderCart(){

    const cartItems =
    document.getElementById("cartItems");

    const cartTotal =
    document.getElementById("cartTotal");

    if(!cartItems || !cartTotal) return;

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        const price =
        item.discount ||
        item.price ||
        0;

        const qty =
        item.quantity || 1;

        total += price * qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>₹${price}</p>

            <div class="cart-qty">

                <button onclick="decreaseCartQty(${index})">-</button>

                <span>${qty}</span>

                <button onclick="increaseCartQty(${index})">+</button>

            </div>

            <button onclick="removeCartItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    cartTotal.innerText = total;

}

// =========================
// CART FUNCTIONS
// =========================

function increaseCartQty(index){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    updateCartCount();

}

function decreaseCartQty(index){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

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

    updateCartCount();

}

function removeCartItem(index){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

    updateCartCount();

}

// INITIAL LOAD

renderCart();

// =========================
// ADD TO CART
// =========================

const addToCartBtn =
document.getElementById("addToCartBtn");

if(addToCartBtn){

    addToCartBtn.addEventListener("click", () => {

        let cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        const existingProduct =
        cart.find(item =>
            item._id === selectedProduct._id
        );

        if(existingProduct){

            existingProduct.quantity += quantity;

        }

        else{

            cart.push({

                ...selectedProduct,

                quantity: quantity

            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();

        alert(
            "✅ Product Added To Cart"
        );

    });

}

// =========================
// CART COUNT
// =========================

function updateCartCount(){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity || 1;

    });

    const cartCount =
    document.getElementById(
        "cartCount"
    );

    if(cartCount){

        cartCount.innerText = total;

    }

}

updateCartCount();

function changeMainImage(
    image,
    element
){

    detailsImage.src = image;

    document
    .querySelectorAll(".thumbnail")
    .forEach(img => {

        img.classList.remove(
            "active"
        );

    });

    element.classList.add(
        "active"
    );

}

function changeMainImage(image){

    document.getElementById(
        "detailsImage"
    ).src = image;

}