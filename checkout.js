// =========================
// GET CART
// =========================

let cart = JSON.parse(

    localStorage.getItem("cart")

) || [];

const summaryItems =
document.getElementById("checkoutItems");

const summaryTotal =
document.getElementById("checkoutTotal");

const subtotalAmount =
document.getElementById("subtotalAmount");

const advanceFeeElement =
document.getElementById("advanceFee");

const remainingAmountElement =
document.getElementById("remainingAmount");

// =========================
// LOAD ORDER SUMMARY
// =========================

function loadSummary(){

    summaryItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        summaryItems.innerHTML += `

        <div class="summary-item">

            <h4>${item.name}</h4>

            <p>

                ₹${item.price}
                x
                ${item.quantity}

            </p>

        </div>

        `;

    });

summaryTotal.innerText = total;

subtotalAmount.innerText = total;

const codAdvance =
Math.round(total * 0.10);

advanceFeeElement.innerText =
codAdvance;

remainingAmountElement.innerText =
total - codAdvance;

}


// =========================
// PLACE ORDER
// =========================

const placeOrderBtn =
document.getElementById("placeOrderBtn");

const paymentModal =
document.getElementById(
    "paymentModal"
);

const paymentAmount =
document.getElementById(
    "paymentAmount"
);

const paymentMethodSelect =
document.getElementById(
    "paymentMethod"
);

const proceedPaymentBtn =
document.getElementById(
    "submitPaymentBtn"
);

const paymentProof =
document.getElementById(
    "paymentScreenshot"
);

placeOrderBtn.addEventListener("click", async () => {

    const customerName =
    document.getElementById("customerName").value;

    const customerPhone =
    document.getElementById("customerPhone").value;

    const customerAddress =
    document.getElementById("customerAddress").value;

    const paymentMethod =
    document.getElementById("paymentMethod").value;

    // VALIDATION

if(

    customerName === "" ||

    customerPhone === "" ||

    customerAddress === ""

){

    alert("Please Fill All Details!");

    return;

}

const total =
Number(summaryTotal.innerText);

if(paymentMethod === "UPI"){

    paymentAmount.innerText = total;

}else{

    paymentAmount.innerText =
    Math.round(total * 0.10);

}

paymentModal.style.display = "flex";

    return;

    // =========================
    // SAVE ORDER
    // =========================

    const customerPincode =
document.getElementById("customerPincode").value;

const customerCity =
document.getElementById("customerCity").value;

const customerState =
document.getElementById("customerState").value;

const subtotal =
Number(summaryTotal.innerText);

const advanceFee =
paymentMethod === "COD"
? Math.round(subtotal * 0.10)
: subtotal;

const remainingAmount =
paymentMethod === "COD"
? subtotal - advanceFee
: 0;

const newOrder = {

    orderId:
    "HS" + Date.now(),

    customerName,

    customerPhone,

    customerAddress,

    customerPincode,

    customerCity,

    customerState,

    products: cart,

    subtotal,

    advanceFee,

    remainingAmount,

    total: subtotal,

    paymentMethod,

    paymentStatus:
    paymentMethod === "UPI"
    ? "Paid"
    : "Pending",

    status: "Pending"

};

try{

    const response = await fetch(

        "https://haryana-supplements-api.onrender.com/api/orders",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(
                newOrder
            )

        }

    );

    if(!response.ok){

        throw new Error(
            "Order Save Failed"
        );

    }

    localStorage.setItem(

        "lastOrder",

        JSON.stringify(
            newOrder
        )

    );

}
catch(error){

    console.error(error);

    alert(
        "Order Save Failed!"
    );

    return;

}

    // =========================
    // REDUCE STOCK
    // =========================

    let products = JSON.parse(

        localStorage.getItem("products")

    ) || [];

    cart.forEach(cartItem => {

        const product = products.find(

            item => item.name === cartItem.name

        );

        if(product){

            product.stock =

            parseInt(product.stock)

            -

            cartItem.quantity;

            // PREVENT NEGATIVE

            if(product.stock < 0){

                product.stock = 0;

            }

        }

    });

    // SAVE PRODUCTS

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

    // =========================
    // ORDER MESSAGE
    // =========================

    let orderMessage =

`🔥 NEW ORDER - HARYANA SUPPLEMENTS

👤 Name:
${customerName}

📞 Phone:
${customerPhone}

📍 Address:
${customerAddress}

💳 Payment:
${paymentMethod}

====================

🛒 ORDER ITEMS:

`;

    // LOOP ITEMS

    cart.forEach(item => {

        orderMessage +=

`${item.name}

₹${item.price}
x
${item.quantity}

-------------------

`;

    });

    // TOTAL

    orderMessage +=

`💰 TOTAL:
₹${summaryTotal.innerText}`;

    // =========================
    // WHATSAPP URL
    // =========================

    const whatsappURL =

`https://wa.me/917027768213?text=${encodeURIComponent(orderMessage)}`;

    // =========================
    // PAYMENT METHOD
    // =========================

    if(paymentMethod === "UPI"){

        // UPI LINK

        const upiURL =

`upi://pay?pa=7027768213@paytm&pn=Haryana%20Supplements&am=${summaryTotal.innerText}&cu=INR`;

        // OPEN UPI APP

        window.location.href = upiURL;

        // OPEN WHATSAPP

        setTimeout(() => {

            window.open(

                whatsappURL,

                "_blank"

            );

        }, 2000);

        // CLEAR CART

        localStorage.removeItem("cart");

        // SUCCESS PAGE

        setTimeout(() => {

            window.location.href =
            "success.html";

        }, 4000);

    }

    else{

        // COD

       window.open(
        whatsappURL,
        "_blank"
    );

    console.log("GOING TO SUCCESS PAGE");

    localStorage.removeItem("cart");

    window.location.href = "success.html";

    }

});


proceedPaymentBtn.addEventListener(
"click",

async () => {

    console.log("BUTTON CLICKED");

if(
    !paymentProof.files.length
){

    alert(
        "Upload Payment Screenshot"
    );

    return;

}

const formData = new FormData();

formData.append(
    "file",
    paymentProof.files[0]
);

formData.append(
    "upload_preset",
    "haryana_supplements"
);

const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/dkcztjm6s/image/upload",
    {
        method: "POST",
        body: formData
    }
);

const uploadData =
await uploadResponse.json();

const screenshotURL =
uploadData.secure_url;

const customerName =
document.getElementById("customerName").value;

const customerPhone =
document.getElementById("customerPhone").value;

const customerAddress =
document.getElementById("customerAddress").value;

const customerPincode =
document.getElementById("customerPincode").value;

const customerCity =
document.getElementById("customerCity").value;

const customerState =
document.getElementById("customerState").value;

const paymentMethod =
document.getElementById("paymentMethod").value;

const subtotal =
Number(summaryTotal.innerText);

const advanceFee =
paymentMethod === "COD"
? Math.round(subtotal * 0.10)
: subtotal;

const remainingAmount =
paymentMethod === "COD"
? subtotal - advanceFee
: 0;

const newOrder = {

    orderId:
    "HS" + Date.now(),

    customerName,

    customerPhone,

    customerAddress,

    customerPincode,

    customerCity,

    customerState,

    products: cart,

    subtotal,

    advanceFee,

    remainingAmount,

    total: subtotal,

    paymentMethod,

    paymentStatus:
    "Paid",

    paymentScreenshot:
    screenshotURL,

    status:
    "Pending"

};

try{

    const response = await fetch(

        "https://haryana-supplements-api.onrender.com/api/orders",

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(
                newOrder
            )

        }

    );

    if(!response.ok){

        throw new Error(
            "Order Save Failed"
        );

    }

    localStorage.setItem(

        "lastOrder",

        JSON.stringify(
            newOrder
        )

    );

}
catch(error){

    console.error(error);

    alert(
        "Order Save Failed!"
    );

    return;

}

console.log(
    "Screenshot URL:",
    screenshotURL
);

    let orderMessage =

`🔥 NEW ORDER - HARYANA SUPPLEMENTS

🆔 Order ID:
${newOrder.orderId}

👤 Name:
${customerName}

📞 Phone:
${customerPhone}

📍 Address:
${customerAddress}

📮 Pincode:
${customerPincode}

🏙️ City:
${customerCity}

🌍 State:
${customerState}

💳 Payment:
${paymentMethod}

💰 Total:
₹${subtotal}

📸 Screenshot:
${screenshotURL}
`;

const whatsappURL =

`https://wa.me/917027768213?text=${encodeURIComponent(orderMessage)}`;

    window.open(
        whatsappURL,
        "_blank"
    );

    localStorage.removeItem("cart");

setTimeout(() => {

    window.location.href =
    "success.html";

}, 1000);

});

// =========================
// START
// =========================

function updatePaymentSummary() {

    const total = Number(summaryTotal.innerText);

    if (paymentMethodSelect.value === "UPI") {

        advanceFeeElement.innerText = total;

        remainingAmountElement.innerText = 0;

    } else {

        const codAdvance =
        Math.round(total * 0.10);

        advanceFeeElement.innerText =
        codAdvance;

        remainingAmountElement.innerText =
        total - codAdvance;

    }

}

paymentMethodSelect.addEventListener(
    "change",
    updatePaymentSummary
);

loadSummary();
updatePaymentSummary();