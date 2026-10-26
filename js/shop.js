const productsGrid =
    document.getElementById("productsGrid");

const productCount =
    document.getElementById("productCount");

const searchInput =
    document.getElementById("productSearch");

const sortSelect =
    document.getElementById("sortProducts");

const categoryButtons =
    document.querySelectorAll(".category-btn");


let currentCategory = "all";

let currentSearch = "";


// ======================================
// DISPLAY PRODUCTS
// ======================================

function displayProducts(productList) {

    productsGrid.innerHTML = "";


    productCount.textContent =
        `${productList.length} PRODUCTS`;


    if (productList.length === 0) {

        productsGrid.innerHTML = `
        
            <div class="no-products">

                <h2>
                    NO PRODUCTS FOUND
                </h2>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;
    }


    productList.forEach((product, index) => {

        const productCard =
            document.createElement("article");


        productCard.className =
            "product-card";


        productCard.style.animationDelay =
            `${index * 0.08}s`;


        productCard.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <button
                    class="wishlist-product"
                    onclick="addToWishlist(${product.id})">

                    ♡

                </button>


                <button
                    class="quick-view"
                    onclick="quickView(${product.id})">

                    QUICK VIEW

                </button>

            </div>


            <div class="product-info">

                <div>

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                </div>


                <span class="product-price">
                    $${product.price}
                </span>

            </div>


            <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                ADD TO BAG

                <span>→</span>

            </button>

        `;


        productsGrid.appendChild(productCard);

    });

}


// ======================================
// FILTER PRODUCTS
// ======================================

function filterProducts() {

    let filteredProducts =
        products.filter(product => {

            const categoryMatch =
                currentCategory === "all" ||
                product.category === currentCategory;


            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(currentSearch);


            return categoryMatch && searchMatch;

        });


    // SORT

    const sortValue =
        sortSelect.value;


    if (sortValue === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortValue === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortValue === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    displayProducts(filteredProducts);

}


// ======================================
// CATEGORY BUTTONS
// ======================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterProducts();

    });

});


// ======================================
// SEARCH
// ======================================

searchInput.addEventListener(
    "input",
    () => {

        currentSearch =
            searchInput.value
                .toLowerCase()
                .trim();


        filterProducts();

    }
);


// ======================================
// SORT
// ======================================

sortSelect.addEventListener(
    "change",
    filterProducts
);


// ======================================
// QUICK VIEW
// ======================================

const quickModal =
    document.getElementById("quickModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalCategory =
    document.getElementById("modalCategory");

const modalPrice =
    document.getElementById("modalPrice");

const modalAdd =
    document.getElementById("modalAdd");

const modalWishlist =
    document.getElementById("modalWishlist");


let selectedProduct = null;


// OPEN MODAL

function quickView(id) {

    selectedProduct =
        products.find(product => product.id === id);

    if (!selectedProduct) return;


    modalImage.src =
        selectedProduct.image;

    modalImage.alt =
        selectedProduct.name;

    modalName.textContent =
        selectedProduct.name;

    modalCategory.textContent =
        selectedProduct.category;

    modalPrice.textContent =
        `$${selectedProduct.price}`;


    quickModal.classList.add("show");

    document.body.classList.add("modal-open");

}


// CLOSE MODAL

function closeQuickView() {

    quickModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


modalClose.addEventListener(
    "click",
    closeQuickView
);


modalOverlay.addEventListener(
    "click",
    closeQuickView
);


// ESC KEY

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeQuickView();

        }

    }
);


// ======================================
// SIZE SELECT
// ======================================

const sizeButtons =
    document.querySelectorAll(".size-btn");


// ======================================
// SIZE SELECTION
// ======================================

let selectedSize = "M";





sizeButtons.forEach(button => {

    button.addEventListener("click", function () {

        sizeButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        selectedSize =
            this.textContent.trim();


        console.log(
            "Selected Size:",
            selectedSize
        );

    });

});


// ======================================
// COLOR SELECTION
// ======================================

let selectedColor = "Black";


const colorButtons =
    document.querySelectorAll(".color-btn");


colorButtons.forEach(button => {

    button.addEventListener("click", function () {

        colorButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        this.classList.add("active");


        if (this.classList.contains("black")) {

            selectedColor = "Black";

        } else {

            selectedColor = "White";

        }


        console.log(
            "Selected Color:",
            selectedColor
        );

    });

});


// ======================================
// QUANTITY
// ======================================

let quantity = 1;


const quantityValue =
    document.getElementById("quantityValue");


document.getElementById("plusQty")
    .addEventListener("click", () => {

        quantity++;

        quantityValue.textContent =
            quantity;

    });


document.getElementById("minusQty")
    .addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            quantityValue.textContent =
                quantity;

        }

    });


// ======================================
// ADD TO BAG
// ======================================

// ======================================
// ADD TO BAG
// ======================================

modalAdd.addEventListener("click", () => {

    if (!selectedProduct) return;

    // Get current cart
    let cart = JSON.parse(
        localStorage.getItem("venaroCart")
    ) || [];


    // Create new item
    const newItem = {

        id: selectedProduct.id,

        name: selectedProduct.name,

        category: selectedProduct.category,

        price: selectedProduct.price,

        image: selectedProduct.image,

        size: selectedSize,

        color: selectedColor,

        quantity: quantity

    };


    // Check if same product,
    // same size and same color already exist

    const existingItem = cart.find(item =>

        item.id === newItem.id &&
        item.size === newItem.size &&
        item.color === newItem.color

    );


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push(newItem);

    }


    // Save cart
    localStorage.setItem(
        "venaroCart",
        JSON.stringify(cart)
    );


    // Update Bag number
    updateCartCount();


    // Show success message
    showCartToast(
        `${selectedProduct.name} added to your bag`
    );


    // Change button
    modalAdd.innerHTML = "ADDED ✓";


    setTimeout(() => {

        modalAdd.innerHTML =
            `ADD TO BAG <span>→</span>`;

        closeQuickView();

        resetQuantity();

    }, 900);

});


// ======================================
// UPDATE BAG COUNT
// ======================================

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("venaroCart")
    ) || [];


    const counter =
        document.getElementById("cartCount");


    if (!counter) return;


    const totalQuantity = cart.reduce(
        (total, item) => {

            return total +
                (Number(item.quantity) || 1);

        },
        0
    );


    counter.textContent =
        totalQuantity;

}


// Run when page opens
updateCartCount();



// ======================================
// CART TOAST
// ======================================

function showCartToast(message) {

    let oldToast =
        document.querySelector(".cart-toast");


    // Remove old toast

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
                Added to Bag
            </strong>

            <p>
                ${message}
            </p>

        </div>

        <a href="cart.html">
            VIEW BAG
        </a>

    `;


    document.body.appendChild(toast);


    // Show animation

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);


    // Hide after 4 seconds

    setTimeout(() => {

        toast.classList.remove("show");


        setTimeout(() => {

            toast.remove();

        }, 500);

    }, 4000);

}


// ======================================
// WISHLIST SYSTEM
// ======================================

function getWishlist() {

    return JSON.parse(
        localStorage.getItem("venaroWishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "venaroWishlist",
        JSON.stringify(wishlist)
    );

}


function addToWishlist(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;


    let wishlist =
        getWishlist();


    const alreadyExists =
        wishlist.some(
            item => item.id === id
        );


    if (alreadyExists) {

        wishlist =
            wishlist.filter(
                item => item.id !== id
            );

    } else {

        wishlist.push(product);

    }


    saveWishlist(wishlist);


    displayProducts(
        products.filter(product => {

            const categoryMatch =
                currentCategory === "all" ||
                product.category === currentCategory;

                // ======================================
// CATEGORY FROM URL
// ======================================

const urlParams = new URLSearchParams(window.location.search);
const urlCategory = urlParams.get("category");

if (
    urlCategory === "men" ||
    urlCategory === "women" ||
    urlCategory === "accessories"
) {
    currentCategory = urlCategory;
}

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(currentSearch);

            return categoryMatch && searchMatch;

        })
    );


    updateWishlistCount();

}


// ======================================
// MODAL WISHLIST
// ======================================

modalWishlist.addEventListener(
    "click",
    () => {

        if (!selectedProduct) return;


        addToWishlist(
            selectedProduct.id
        );

        modalWishlist.textContent = "♥";

    }
);


// ======================================
// WISHLIST COUNT
// ======================================

function updateWishlistCount() {

    const wishlist =
        getWishlist();


    const wishlistButton =
        document.getElementById("wishlistBtn");


    if (wishlistButton) {

        wishlistButton.innerHTML =
            `♡ ${wishlist.length}`;

    }

}


// ======================================
// QUICK ADD TO BAG
// ======================================

function addToCart(id) {

    const product =
        products.find(item => item.id === id);


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


    const existingItem = cart.find(item =>

        item.id === newItem.id &&
        item.size === newItem.size &&
        item.color === newItem.color

    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push(newItem);

    }


    localStorage.setItem(
        "venaroCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showCartToast(
        `${product.name} added to your bag`
    );

}


// ======================================
// INITIAL LOAD
// ======================================

displayProducts(
    currentCategory === "all"
        ? products
        : products.filter(product => product.category === currentCategory)
);

updateCartCount();
updateWishlistCount();

// Activate category button from URL

categoryButtons.forEach(button => {
    if (button.dataset.category === currentCategory) {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    }
});