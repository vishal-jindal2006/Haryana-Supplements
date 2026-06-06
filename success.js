const downloadInvoiceBtn =
document.getElementById(

    "downloadInvoiceBtn"

);


// DOWNLOAD PDF

downloadInvoiceBtn.addEventListener(

    "click",

    () => {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        // GET LAST ORDER

        const order = JSON.parse(
            localStorage.getItem("lastOrder")
        );

        // TITLE

        doc.setFontSize(22);

        doc.text(

            "Haryana Supplements Invoice",

            20,

            20

        );

        // CUSTOMER DETAILS

        doc.setFontSize(14);

        doc.text(

            `Customer: ${order.customerName}`,

            20,

            40

        );

        doc.text(

            `Phone: ${order.customerPhone}`,

            20,

            50

        );

        doc.text(

            `Payment: ${order.paymentMethod}`,

            20,

            60

        );

        doc.text(

            `Status: ${order.status}`,

            20,

            70

        );

        // PRODUCTS

        let y = 90;

        doc.text(

            "Products:",

            20,

            y

        );

        y += 10;

        order.products.forEach(item => {

            doc.text(

                `${item.name} | Qty: ${item.quantity} | ₹${item.price}`,

                20,

                y

            );

            y += 10;

        });

        // TOTAL

        y += 10;

        doc.setFontSize(18);

        doc.text(

            `Total: ₹${order.total}`,

            20,

            y

        );

        // SAVE PDF

        doc.save(

            "invoice.pdf"

        );

    }

);