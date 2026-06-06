// =========================
// PRODUCTS
// =========================

let products = [];

// =========================
// ELEMENTS
// =========================

const productName =
document.getElementById("productName");

const productPrice =
document.getElementById("productPrice");

const discountPrice =
document.getElementById("discountPrice");

const productStock =
document.getElementById("productStock");

const productCategory =
document.getElementById("productCategory");

const productDescription =
document.getElementById("productDescription");

const productImage =
document.getElementById("productImage");

const uploadBtn =
document.getElementById("uploadBtn");

const productTable =
document.getElementById("productTable");

const ordersTable =
document.getElementById("ordersTable");


// =========================
// OFFER BANNER ELEMENTS
// =========================

const bannerTitle =
document.getElementById("bannerTitle");

const bannerImage =
document.getElementById("bannerImage");

const uploadBannerBtn =
document.getElementById("uploadBannerBtn");


// =========================
// DISPLAY PRODUCTS
// =========================

async function loadProducts(){

    try{

        const res =
        await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        products =
        await res.json();

        displayProducts();

        loadAnalytics();

    }

    catch(error){

        console.log(error);

    }

}

function displayProducts(){
    productTable.innerHTML = "";

    products.forEach((product,index) => {

        productTable.innerHTML += `

        <tr>

            <td>

                ${product.name}

            </td>

            <td>

                ₹${product.price}

            </td>

            <td>

                ₹${product.discount || 0}

            </td>

            <td>

                ${product.stock}

            </td>

            <td>

                ${product.category}

            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editProduct(${index})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteProduct(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


// =========================
// EDIT PRODUCT
// =========================

async function editProduct(index){

    console.log("EDIT CLICKED:", index);

    const product = products[index];

    if(!product){

        alert("Product Not Found");

        console.log("Products Array:", products);

        return;

    }

    const newName = prompt(
        "Edit Product Name",
        product.name
    );

    if(newName === null) return;

    const newPrice = prompt(
        "Edit Product Price",
        product.price
    );

    if(newPrice === null) return;

    const newDiscount = prompt(
        "Edit Discount Price",
        product.discount || 0
    );

    if(newDiscount === null) return;

    const newStock = prompt(
        "Edit Stock",
        product.stock
    );

    if(newStock === null) return;

    const newCategory = prompt(
        "Edit Category",
        product.category
    );

    if(newCategory === null) return;

    const newDescription = prompt(
        "Edit Description",
        product.description
    );

    if(newDescription === null) return;

    try{

        const res = await fetch(

            `https://haryana-supplements-api.onrender.com/api/products/${product._id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    name: newName,

                    price: Number(
                        newPrice
                    ),

                    discount: Number(
                        newDiscount
                    ),

                    stock: Number(
                        newStock
                    ),

                    category:
                    newCategory,

                    description:
                    newDescription

                })

            }

        );

        const data =
        await res.json();

        console.log(data);

        alert(
            "Product Updated Successfully 🔥"
        );

        await loadProducts();

    }

    catch(error){

        console.log(error);

        alert(
            "Update Failed ❌"
        );

    }

}


// =========================
// UPLOAD PRODUCT
// =========================

uploadBtn.addEventListener(

    "click",

    () => {

        // VALIDATION

        if(

            !productName.value ||

            !productPrice.value ||

            !discountPrice.value ||

            !productStock.value ||

            !productCategory.value ||

            !productDescription.value ||

            !productImage.files[0]

        ){

            alert(

                "Please Fill All Fields"

            );

            return;

        }

        // IMAGE FILE

        const file =
        productImage.files[0];

        // FORM DATA

        const formData =
        new FormData();

        formData.append(

            "file",

            file

        );

        formData.append(

            "upload_preset",

            "haryana_supplements"

        );

        // BUTTON LOADING

        uploadBtn.innerText =
        "Uploading...";

        // CLOUDINARY UPLOAD

        fetch(

        "https://api.cloudinary.com/v1_1/dwftsph1p/image/upload",

        {

            method: "POST",

            body: formData

        }

        )

        .then(res => res.json())

        .then(async data => {

    const newProduct = {

    name: productName.value,

    price: Number(
        productPrice.value
    ),

    discount: Number(
        discountPrice.value
    ),

    stock: Number(
        productStock.value
    ),

    category:
    productCategory.value,

    description:
    productDescription.value,

    image:
    data.secure_url

};

console.log(newProduct);

    // SAVE TO MONGODB

    const response =
    await fetch(

        "https://haryana-supplements-api.onrender.com/api/products/add",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify(

                newProduct

            )

        }

    );

    const result =
    await response.json();

    console.log(result);

    // RELOAD PRODUCTS

    await loadProducts();

    loadAnalytics();

    // RESET FORM

    productName.value = "";

    productPrice.value = "";

    discountPrice.value = "";

    productStock.value = "";

    productCategory.value = "";

    productDescription.value = "";

    productImage.value = "";

    uploadBtn.innerText =
    "Upload Product";

    alert(
    "Product Uploaded Successfully 🔥"
);

})

.catch(error => {

    console.log(error);

    uploadBtn.innerText =
    "Upload Product";

    alert(
        "Upload Failed"
    );

});

}
);

// =========================
// DELETE PRODUCT
// =========================

async function deleteProduct(index){

    const product =
    products[index];

    if(
        !confirm(
            `Delete ${product.name}?`
        )
    ){
        return;
    }

    try{

        await fetch(

            `https://haryana-supplements-api.onrender.com/api/products/${product._id}`,

            {

                method: "DELETE"

            }

        );

        alert(
            "Product Deleted 🔥"
        );

        loadProducts();

        loadAnalytics();

    }

    catch(error){

        console.log(error);

        alert(
            "Delete Failed"
        );

    }

}


// =========================
// DISPLAY ORDERS
// =========================

async function displayOrders(){

    try{

        const res = await fetch(

            "https://haryana-supplements-api.onrender.com/api/orders"

        );

        const orders = await res.json();

        ordersTable.innerHTML = "";

        orders.forEach(order => {

            ordersTable.innerHTML += `

            <tr>

                <td>

                    ${order.customerName}

                </td>

                <td>

                    ${order.customerPhone}

                </td>

                <td>

                    ₹${order.total}

                </td>
                

                <td>

                    ${order.paymentMethod}

                </td>

                <td>

                <a
                href="${order.paymentScreenshot}"
                target="_blank"
                class="view-proof-btn">

                View Proof

                </a>

                </td>

                <td>

                    <select

                    onchange="updateOrderStatus(

                    '${order._id}',

                    this.value

                    )"

                    class="status-select">

                    <option
                    value="Pending"
                    ${order.status === "Pending"
                    ? "selected" : ""}>

                    Pending

                    </option>

                    <option
                    value="Confirmed"
                    ${order.status === "Confirmed"
                    ? "selected" : ""}>

                    Confirmed

                    </option>

                    <option
                    value="Shipped"
                    ${order.status === "Shipped"
                    ? "selected" : ""}>

                    Shipped

                    </option>

                    <option
                    value="Delivered"
                    ${order.status === "Delivered"
                    ? "selected" : ""}>

                    Delivered

                    </option>

                    </select>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

// =========================
// UPDATE ORDER STATUS
// =========================

async function updateOrderStatus(

    orderId,

    status

){

    try{

        await fetch(

            `https://haryana-supplements-api.onrender.com/api/orders/${orderId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    status

                })

            }

        );

    }

    catch(error){

        console.log(error);

    }

}

// =========================
// OFFER BANNER SYSTEM
// =========================

uploadBannerBtn.addEventListener(

    "click",

    () => {

        if(

            !bannerTitle.value ||

            !bannerImage.files[0]

        ){

            alert(

                "Please Fill Banner Details"

            );

            return;

        }

        // IMAGE FILE

        const file =
        bannerImage.files[0];

        // FORM DATA

        const formData =
        new FormData();

        formData.append(

            "file",

            file

        );

        formData.append(

            "upload_preset",

            "haryana_supplements"

        );

        // BUTTON

        uploadBannerBtn.innerText =
        "Uploading...";

        // CLOUDINARY

        fetch(

        "https://api.cloudinary.com/v1_1/dwftsph1p/image/upload",

        {

            method: "POST",

            body: formData

        }

        )

        .then(res => res.json())

        .then(data => {

            // BANNER

            const banner = {

                title: bannerTitle.value,

                image: data.secure_url

            };

            // SAVE

            localStorage.setItem(

                "offerBanner",

                JSON.stringify(banner)

            );

            // RESET

            bannerTitle.value = "";

            bannerImage.value = "";

            uploadBannerBtn.innerText =
            "Upload Banner";

            alert(

                "Banner Uploaded Successfully 🔥"

            );

        })

        .catch(error => {

            console.log(error);

            uploadBannerBtn.innerText =
            "Upload Banner";

            alert(

                "Upload Failed"

            );

        });

    }

);


// =========================
// DASHBOARD ANALYTICS
// =========================

function loadAnalytics(){

    const totalProducts =
    document.getElementById("totalProducts");

    const totalOrders =
    document.getElementById("totalOrders");

    const totalRevenue =
    document.getElementById("totalRevenue");

    // TOTAL PRODUCTS

    totalProducts.innerText =
    products.length;

    // ORDERS

    let orders = JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    totalOrders.innerText =
    orders.length;

    // REVENUE

    let revenue = 0;

    orders.forEach(order => {

        revenue += parseInt(order.total);

    });

    totalRevenue.innerText =
    "₹" + revenue;

}


// =========================
// SIDEBAR FUNCTIONS
// =========================

function scrollToSection(id){

    document.getElementById(id)

    .scrollIntoView({

        behavior: "smooth"

    });

}


// =========================
// LOGOUT
// =========================

function logoutAdmin(){

    window.location.href =
    "admin-login.html";

}


// =========================
// INITIAL LOAD
// =========================

loadProducts();

displayOrders();

loadAnalytics();

// =========================
// SALES REPORT
// =========================

function loadSalesReport(){

    const orders = JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    // ELEMENTS

    const totalRevenueCard =

    document.getElementById(

        "totalRevenueCard"

    );

    const totalOrdersCard =

    document.getElementById(

        "totalOrdersCard"

    );

    const pendingOrdersCard =

    document.getElementById(

        "pendingOrdersCard"

    );

    const deliveredOrdersCard =

    document.getElementById(

        "deliveredOrdersCard"

    );

    // VALUES

    let revenue = 0;

    let pending = 0;

    let delivered = 0;

    orders.forEach(order => {

        revenue += parseInt(order.total);

        if(order.status === "Pending"){

            pending++;

        }

        if(order.status === "Delivered"){

            delivered++;

        }

    });

    // UPDATE UI

    totalRevenueCard.innerText =

    "₹" + revenue;

    totalOrdersCard.innerText =

    orders.length;

    pendingOrdersCard.innerText =

    pending;

    deliveredOrdersCard.innerText =

    delivered;

    // SALES CHART

    const ctx = document

    .getElementById("salesChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Revenue",

                "Orders",

                "Pending",

                "Delivered"

            ],

            datasets: [{

                label: "Business Analytics",

                data: [

                    revenue,

                    orders.length,

                    pending,

                    delivered

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true

        }

    });

}

// LOAD REPORT

// loadSalesReport();

// =========================
// ADMIN MANAGEMENT
// =========================

const createAdminBtn =
document.getElementById("createAdminBtn");

const adminTable =
document.getElementById("adminTable");


// LOAD ADMINS

async function loadAdmins(){

    try{

        const res =
        await fetch(
            "https://haryana-supplements-api.onrender.com/api/admins"
        );

        const admins =
        await res.json();

        adminTable.innerHTML = "";

        admins.forEach(admin => {

            adminTable.innerHTML += `

            <tr>

                <td>${admin.name}</td>

                <td>${admin.username}</td>

                <td>${admin.role}</td>

                <td>

                    ${
                        admin.role !== "owner"
                        ?

                        `<button
                        onclick="deleteAdmin('${admin._id}')">

                        Delete

                        </button>`

                        :

                        "Owner"

                    }

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}


// CREATE ADMIN

createAdminBtn.addEventListener(

    "click",

    async () => {

        const name =
        document.getElementById(
            "adminName"
        ).value;

        const username =
        document.getElementById(
            "adminUsername"
        ).value;

        const password =
        document.getElementById(
            "adminPassword"
        ).value;

        if(
            !name ||
            !username ||
            !password
        ){

            alert(
                "Fill all fields"
            );

            return;

        }

        const res =
        await fetch(

            "https://haryana-supplements-api.onrender.com/api/admins/create",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    name,
                    username,
                    password

                })

            }

        );

        const data =
        await res.json();

        alert(
            data.message
        );

        loadAdmins();

    }

);


// DELETE ADMIN

async function deleteAdmin(id){

    if(
        !confirm(
            "Delete this admin?"
        )
    ) return;

    await fetch(

        `https://haryana-supplements-api.onrender.com/api/admins/${id}`,

        {

            method: "DELETE"

        }

    );

    loadAdmins();

}


// =========================
// DASHBOARD ANALYTICS
// =========================

async function loadAnalytics(){

    try{

        const productsRes =
        await fetch(
            "https://haryana-supplements-api.onrender.com/api/products"
        );

        const products =
        await productsRes.json();

        document.getElementById(
            "totalProducts"
        ).innerText =
        products.length;

        const ordersRes =
        await fetch(
            "https://haryana-supplements-api.onrender.com/api/orders"
        );

        const orders =
        await ordersRes.json();

        document.getElementById(
            "totalOrders"
        ).innerText =
            orders.length;

        document.getElementById(
            "totalOrdersCard"
        ).innerText =
            orders.length;

        let revenue = 0;
        let pending = 0;
        let delivered = 0;

        orders.forEach(order => {

            revenue += Number(
                order.total || 0
            );

            if(order.status === "Pending"){
                pending++;
            }

            if(order.status === "Delivered"){
                delivered++;
            }

        });

        document.getElementById(
            "totalRevenue"
        ).innerText =
            "₹" + revenue;

        document.getElementById(
            "totalRevenueCard"
        ).innerText =
            "₹" + revenue;

        document.getElementById(
            "pendingOrdersCard"
        ).innerText =
            pending;

        document.getElementById(
            "deliveredOrdersCard"
        ).innerText =
            delivered;

    }

    catch(error){

        console.log(
            "Analytics Error:",
            error
        );

    }

}

// INITIAL LOAD

loadAdmins();

loadAnalytics();

const user = JSON.parse(
    localStorage.getItem(
        "loggedInUser"
    )
);

if(
    user &&
    user.role === "admin"
){

    document.getElementById(
        "adminsSection"
    ).style.display = "none";

}

async function loadReviews(){

    const container =
    document.getElementById(
        "reviewsContainer"
    );

    if(!container) return;

    const response =
    await fetch(
        "https://haryana-supplements-api.onrender.com/api/reviews"
    );

    const reviews =
    await response.json();

    container.innerHTML = "";

    reviews.forEach(review => {

        container.innerHTML += `

        <div class="review-card">

            <h3>
                ${review.customerName}
            </h3>

            <p>
                ${"⭐".repeat(review.rating)}
            </p>

            <p>
                ${review.reviewText}
            </p>

            <button
            onclick="deleteReview(
            '${review._id}'
            )">

                Delete Review

            </button>

        </div>

        `;

    });

}