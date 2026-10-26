// ==========================================
// VÉNARO WISHLIST
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const wishlistGrid =
    document.getElementById("wishlistGrid");

const wishlistCount =
    document.getElementById("wishlistCount");

const cartCount =
    document.getElementById("cartCount");


// ==========================================
// GET WISHLIST
// ==========================================

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("venaroWishlist")
    ) || [];

}


// ==========================================
// SAVE WISHLIST
// ==========================================

function saveWishlist(wishlist) {

    localStorage.setItem(
        "venaroWishlist",
        JSON.stringify(wishlist)
    );

}


// ==========================================
// UPDATE WISHLIST COUNT
// ==========================================

function updateWishlistCount() {

    const wishlist =
        getWishlist();


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


// ==========================================
// UPDATE BAG COUNT
// ==========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("venaroCart")
        ) || [];


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
// DISPLAY WISHLIST
// ==========================================

function displayWishlist() {

    const wishlist =
        getWishlist();


    wishlistGrid.innerHTML = "";


    // ======================================
    // EMPTY
    // ======================================

    if (wishlist.length === 0) {

        wishlistGrid.innerHTML = `

            <div class="empty-wishlist">

                <div class="empty-wishlist-icon">
                    ♡
                </div>

                <h2>
                    NOTHING SAVED YET
                </h2>

                <p>
                    Save the pieces you love
                    and come back to them later.
                </p>

                <a href="shop.html">
                    EXPLORE COLLECTION →
                </a>

            </div>

        `;

        return;

    }


    // ======================================
    // PRODUCTS
    // ======================================

    wishlist.forEach((product, index) => {


        const card =
            document.createElement("article");


        card.className =
            "wishlist-card";


        card.style.animationDelay =
            `${index * 0.08}s`;


        card.innerHTML = `

            <div class="wishlist-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">


                <button
                    class="remove-wishlist"
                    onclick="removeFromWishlist(${product.id})">

                    ♥

                </button>


                <div class="wishlist-image-overlay">

                    <button
                        onclick="addWishlistItemToCart(${product.id})">

                        ADD TO BAG

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </div>


            <div class="wishlist-info">

                <div>

                    <p>
                        ${product.category}
                    </p>

                    <h2>
                        ${product.name}
                    </h2>

                </div>


                <strong>
                    $${Number(product.price).toFixed(2)}
                </strong>

            </div>

        `;


        wishlistGrid.appendChild(card);

    });

}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(id) {

    let wishlist =
        getWishlist();


    const product =
        wishlist.find(
            item => item.id === id
        );


    wishlist =
        wishlist.filter(
            item => item.id !== id
        );


    saveWishlist(wishlist);


    displayWishlist();

    updateWishlistCount();


    if (product) {

        showWishlistToast(
            `${product.name} removed from wishlist`
        );

    }

}


// ==========================================
// ADD WISHLIST ITEM TO BAG
// ==========================================

function addWishlistItemToCart(id) {

    const wishlist =
        getWishlist();


    const product =
        wishlist.find(
            item => item.id === id
        );


    if (!product) return;


    let cart =
        JSON.parse(
            localStorage.getItem("venaroCart")
        ) || [];


    const newItem = {

        id: product.id,

        name: product.name,

        category: product.category,

        price: product.price,

        image: product.image,

        size: "M",

        color: "Black",

        quantity: 1

    };


    const existingItem =
        cart.find(item =>

            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color

        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push(newItem);

    }


    saveCart(cart);


    updateCartCount();


    showWishlistToast(
        `${product.name} added to your bag`
    );

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
// TOAST
// ==========================================

function showWishlistToast(message) {

    const oldToast =
        document.querySelector(
            ".wishlist-toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement("div");


    toast.className =
        "wishlist-toast";


    toast.innerHTML = `

        <span>
            ✓
        </span>

        <div>

            <strong>
                WISHLIST
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
// INITIALIZE
// ==========================================

displayWishlist();

updateWishlistCount();

updateCartCount();