// ==========================================
// VÉNARO CHECKOUT
// ==========================================


// ==========================================
// GET CART
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("venaroCart")
    ) || [];

}


// ==========================================
// ELEMENTS
// ==========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const cartCount =
    document.getElementById("cartCount");


// ==========================================
// DISPLAY BAG COUNT
// ==========================================

function updateCartCount() {

    const cart = getCart();


    const total =
        cart.reduce(
            (sum, item) => {

                return sum +
                    (Number(item.quantity) || 1);

            },
            0
        );


    if (cartCount) {

        cartCount.textContent =
            total;

    }

}


// ==========================================
// DISPLAY ORDER
// ==========================================

function displayCheckout() {

    const cart = getCart();


    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="checkout-empty">

                <h3>
                    YOUR BAG IS EMPTY
                </h3>

                <a href="shop.html">
                    RETURN TO SHOP →
                </a>

            </div>

        `;

        checkoutSubtotal.textContent =
            "$0.00";

        checkoutTotal.textContent =
            "$0.00";

        return;

    }


    let subtotal = 0;


    cart.forEach(product => {

        const quantity =
            Number(product.quantity) || 1;

        const price =
            Number(product.price) || 0;


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const item =
            document.createElement("div");


        item.className =
            "checkout-item";


        item.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <span>
                    ${quantity}
                </span>

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.size || "M"}
                    /
                    ${product.color || "BLACK"}
                </p>

            </div>


            <strong>
                $${itemTotal.toFixed(2)}
            </strong>

        `;


        checkoutItems.appendChild(item);

    });


    checkoutSubtotal.textContent =
        `$${subtotal.toFixed(2)}`;


    checkoutTotal.textContent =
        `$${subtotal.toFixed(2)}`;

}


// ==========================================
// PLACE ORDER
// ==========================================

const placeOrderBtn =
    document.getElementById("placeOrderBtn");


placeOrderBtn.addEventListener(
    "click",
    () => {

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();


        const cart = getCart();


        // CHECK CART

        if (cart.length === 0) {

            alert(
                "Your bag is empty."
            );

            return;

        }


        // CHECK FORM

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !address ||
            !city
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        // SAVE ORDER

        const order = {

            id:
                "VN-" +
                Date.now(),

            customer: {

                firstName,

                lastName,

                email,

                phone,

                address,

                city

            },

            items: cart,

            date:
                new Date().toISOString()

        };


        localStorage.setItem(
            "venaroLastOrder",
            JSON.stringify(order)
        );


        // CLEAR BAG

        localStorage.removeItem(
            "venaroCart"
        );


        // GO SUCCESS PAGE

        window.location.href =
            "success.html";

    }
);


// ==========================================
// INITIALIZE
// ==========================================

displayCheckout();

updateCartCount();