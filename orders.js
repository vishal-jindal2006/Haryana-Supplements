const searchBtn =
document.getElementById(
"searchOrdersBtn"
);

const ordersContainer =
document.getElementById(
"ordersContainer"
);

searchBtn.addEventListener(

"click",

async () => {

const phone =

document.getElementById(
"phoneInput"
).value;

const response =
await fetch(

`http://localhost:5000/api/orders/phone/${phone}`

);

const orders =
await response.json();

ordersContainer.innerHTML = "";

orders.forEach(order => {

ordersContainer.innerHTML += `

<div class="order-card">

<h3>
📦 Order ID:
${order.orderId}
</h3>

<p>

<b>Products:</b><br>

${order.products.map(item =>

`🔹 ${item.name}
(Qty: ${item.quantity})`

).join("<br>")}

</p>

<p>

<b>Total:</b>
₹${order.total}

</p>

<p>

<b>Status:</b>

<span class="${order.status.toLowerCase()}">

${order.status}

</span>

</p>

</div>

`;
});

}

);