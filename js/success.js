// ==========================================
// VÉNARO SUCCESS PAGE
// ==========================================

// ==========================================
// GET LAST ORDER
// ==========================================

function getLastOrder() {

    try {

        const savedOrder =
            localStorage.getItem("venaroLastOrder");

        if (!savedOrder) {
            return null;
        }

        return JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Error reading last order:",
            error
        );

        return null;
    }

}


// ==========================================
// ELEMENTS
// ==========================================

const orderNumber =
    document.getElementById("orderNumber");

const customerName =
    document.getElementById("customerName");

const customerCity =
    document.getElementById("customerCity");

const orderTotal =
    document.getElementById("orderTotal");


// ==========================================
// DISPLAY ORDER
// ==========================================

function displaySuccessOrder() {

    const order = getLastOrder();


    // ======================================
    // NO ORDER FOUND
    // ======================================

    if (!order) {

        if (orderNumber) {
            orderNumber.textContent = "NO ORDER";
        }

        if (customerName) {
            customerName.textContent = "—";
        }

        if (customerCity) {
            customerCity.textContent = "—";
        }

        if (orderTotal) {
            orderTotal.textContent = "$0.00";
        }

        return;
    }


    // ======================================
    // ORDER NUMBER
    // ======================================

    if (orderNumber) {

        orderNumber.textContent =
            order.id || "—";

    }


    // ======================================
    // CUSTOMER NAME
    // ======================================

    if (customerName) {

        const firstName =
            order.customer?.firstName || "";

        const lastName =
            order.customer?.lastName || "";

        customerName.textContent =
            `${firstName} ${lastName}`.trim() || "—";

    }


    // ======================================
    // CITY
    // ======================================

    if (customerCity) {

        customerCity.textContent =
            order.customer?.city || "—";

    }


    // ======================================
    // TOTAL
    // ======================================

    let total = 0;

    if (Array.isArray(order.items)) {

        order.items.forEach(item => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            total += price * quantity;

        });

    }


    if (orderTotal) {

        orderTotal.textContent =
            `$${total.toFixed(2)}`;

    }

}


// ==========================================
// INITIALIZE
// ==========================================

displaySuccessOrder();