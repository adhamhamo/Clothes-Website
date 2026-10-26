// ==========================================
// VÉNARO CART SYSTEM
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const cartItems =
    document.getElementById("cartItems");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");

const cartCount =
    document.getElementById("cartCount");


// ==========================================
// GET CART
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("venaroCart")
    ) || [];

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "venaroCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// UPDATE BAG COUNT
// ==========================================

function updateBagCount() {

    const cart = getCart();

    const totalQuantity =
        cart.reduce(
            (total, item) => {

                return total +
                    (Number(item.quantity) || 1);

            },
            0
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const cart = getCart();


    if (!cartItems) return;


    cartItems.innerHTML = "";


    // ======================================
    // EMPTY CART
    // ======================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛍
                </div>

                <h2>
                    YOUR BAG IS EMPTY
                </h2>

                <p>
                    Looks like you haven't
                    added anything yet.
                </p>

                <a href="shop.html">
                    START SHOPPING →
                </a>

            </div>

        `;


        updateTotals();

        updateBagCount();

        return;

    }


    // ======================================
    // PRODUCTS
    // ======================================

    cart.forEach((product, index) => {

        const quantity =
            Number(product.quantity) || 1;


        const price =
            Number(product.price) || 0;


        const itemTotal =
            price * quantity;


        const item =
            document.createElement("article");


        item.className =
            "cart-item";


        item.style.animationDelay =
            `${index * 0.08}s`;


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>


            <div class="cart-item-info">

                <p class="cart-item-category">
                    ${product.category || ""}
                </p>

                <h2>
                    ${product.name}
                </h2>


                <div class="cart-options">

                    <span>
                        SIZE: ${product.size || "M"}
                    </span>

                    <span>
                        COLOR: ${product.color || "BLACK"}
                    </span>

                </div>


                <div class="cart-item-bottom">


                    <!-- QUANTITY -->

                    <div class="cart-quantity">

                        <button
                            class="quantity-minus"
                            onclick="changeQuantity(${index}, -1)">

                            −

                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            class="quantity-plus"
                            onclick="changeQuantity(${index}, 1)">

                            +

                        </button>

                    </div>


                    <!-- PRICE -->

                    <div class="cart-prices">

                        <span class="unit-price">
                            $${price.toFixed(2)}
                        </span>

                        <strong>
                            $${itemTotal.toFixed(2)}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- REMOVE -->

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
                aria-label="Remove product">

                ×

            </button>

        `;


        cartItems.appendChild(item);

    });


    updateTotals();

    updateBagCount();

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(index, change) {

    const cart = getCart();


    if (!cart[index]) return;


    const oldQuantity =
        Number(cart[index].quantity) || 1;


    const newQuantity =
        oldQuantity + change;


    // ======================================
    // REMOVE IF ZERO
    // ======================================

    if (newQuantity <= 0) {

        removeFromCart(index);

        return;

    }


    cart[index].quantity =
        newQuantity;


    saveCart(cart);


    displayCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    const cart = getCart();


    if (!cart[index]) return;


    const productName =
        cart[index].name;


    cart.splice(index, 1);


    saveCart(cart);


    displayCart();


    showCartToast(
        `${productName} removed from your bag`
    );

}


// ==========================================
// UPDATE TOTALS
// ==========================================

function updateTotals() {

    const cart = getCart();


    let subtotal = 0;


    cart.forEach(product => {

        const price =
            Number(product.price) || 0;

        const quantity =
            Number(product.quantity) || 1;


        subtotal +=
            price * quantity;

    });


    if (subtotalElement) {

        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `$${subtotal.toFixed(2)}`;

    }

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showCartToast(message) {

    const oldToast =
        document.querySelector(".cart-toast");


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement("div");


    toast.className =
        "cart-toast";


    toast.innerHTML = `

        <span class="toast-icon">
            ✓
        </span>

        <div>

            <strong>
                BAG UPDATED
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 50);


    setTimeout(() => {

        toast.classList.remove("show");


        setTimeout(() => {

            toast.remove();

        }, 500);

    }, 2500);

}


// ==========================================
// CHECKOUT
// ==========================================

const checkoutBtn =
    document.getElementById("checkoutBtn");


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            const cart = getCart();


            if (cart.length === 0) {

                showCartToast(
                    "Your bag is empty"
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// ==========================================
// INITIALIZE
// ==========================================

displayCart();

updateBagCount();