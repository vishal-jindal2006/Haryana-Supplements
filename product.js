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

// =========================
// LOAD PRODUCT
// =========================

if(selectedProduct){

    detailsImage.src =
    selectedProduct.image;

    detailsName.innerText =
    selectedProduct.name;

    detailsDiscount.innerText =
    "₹" + selectedProduct.discount;

    detailsPrice.innerText =
    "₹" + selectedProduct.price;

    detailsDescription.innerText =
    selectedProduct.description;

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