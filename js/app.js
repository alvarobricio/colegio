let cart = [];

let selectedCategory = "todos";


document.addEventListener("DOMContentLoaded", () => {

    renderCategories();

    renderProducts();

    renderEvents();

    renderScheduleChanges();

    updateNextService();

    renderNotice();

    setupCart();

});


function money(value) {

    return value
        .toFixed(2)
        .replace(".", ",") + " €";

}


function renderCategories() {

    const container =
        document.getElementById("categoryTabs");

    container.innerHTML = "";

    CATEGORIES.forEach(category => {

        const button =
            document.createElement("button");

        button.className =
            "category-tab" +
            (category.id === selectedCategory
                ? " active"
                : "");

        button.innerHTML =
            `${category.icon} ${category.name}`;

        button.addEventListener("click", () => {

            selectedCategory = category.id;

            renderCategories();

            renderProducts();

        });

        container.appendChild(button);

    });

}


function renderProducts() {

    const container =
        document.getElementById("productGrid");

    container.innerHTML = "";

    let products = PRODUCTS.filter(
        product => product.available
    );

    if (selectedCategory !== "todos") {

        products = products.filter(
            product =>
                product.category === selectedCategory
        );

    }


    if (!products.length) {

        container.innerHTML = `
            <div class="empty-state">
                No hay productos disponibles.
            </div>
        `;

        return;
    }


    products.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-icon">
                ${getProductIcon(product.category)}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${getCategoryName(product.category)}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

            </div>

            <div class="product-bottom">

                <strong>
                    ${money(product.price)}
                </strong>

                <button
                    class="add-product"
                    data-id="${product.id}"
                >
                    Añadir +
                </button>

            </div>

        `;


        card
            .querySelector(".add-product")
            .addEventListener("click", () => {

                addToCart(product.id);

            });


        container.appendChild(card);

    });

}


function getProductIcon(category) {

    const icons = {

        snacks: "🥨",

        bebidas: "🥤",

        zumos: "🧃",

        bolleria: "🥐"

    };

    return icons[category] || "🍊";

}


function getCategoryName(category) {

    const item =
        CATEGORIES.find(
            categoryItem =>
                categoryItem.id === category
        );

    return item ? item.name : "";

}


function addToCart(productId) {

    const product =
        PRODUCTS.find(
            item => item.id === productId
        );

    if (!product || !product.available) {

        alert("Este producto no está disponible.");

        return;
    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            description: product.description,

            price: product.price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    updateCart();

}


function changeQuantity(productId, change) {

    const item =
        cart.find(
            product => product.id === productId
        );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    updateCart();

}


function getCartTotal() {

    return cart.reduce(

        (total, item) =>
            total + item.price * item.quantity,

        0

    );

}


function getCartCount() {

    return cart.reduce(

        (total, item) =>
            total + item.quantity,

        0

    );

}


function updateCart() {

    const count =
        document.getElementById("cartCount");

    const items =
        document.getElementById("cartItems");

    const total =
        document.getElementById("cartTotal");


    count.textContent =
        getCartCount();


    total.textContent =
        money(getCartTotal());


    if (!cart.length) {

        items.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>Tu carrito está vacío</h3>

                <p>
                    Añade algo rico para el recreo.
                </p>

            </div>

        `;

        return;

    }


    items.innerHTML = "";


    cart.forEach(item => {

        const row =
            document.createElement("div");

        row.className = "cart-item";


        row.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <small>
                    ${item.description}
                </small>

                <div class="quantity">

                    <button
                        data-action="minus"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-action="plus"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <strong>
                    ${money(
                        item.price * item.quantity
                    )}
                </strong>

                <button
                    class="remove"
                    data-action="remove"
                >
                    ×
                </button>

            </div>

        `;


        row
            .querySelector(
                '[data-action="minus"]'
            )
            .onclick = () =>
                changeQuantity(item.id, -1);


        row
            .querySelector(
                '[data-action="plus"]'
            )
            .onclick = () =>
                changeQuantity(item.id, 1);


        row
            .querySelector(
                '[data-action="remove"]'
            )
            .onclick = () =>
                removeFromCart(item.id);


        items.appendChild(row);

    });

}


function setupCart() {

    document
        .getElementById("openCart")
        .onclick = openCart;


    document
        .getElementById("closeCart")
        .onclick = closeCart;


    document
        .getElementById("cartOverlay")
        .onclick = closeCart;


    document
        .getElementById("checkoutButton")
        .onclick = openCheckout;


    document
        .getElementById("closeCheckout")
        .onclick = closeCheckout;


    document
        .getElementById("orderForm")
        .addEventListener(
            "submit",
            submitOrder
        );


    document
        .getElementById("closeSuccess")
        .onclick = () => {

            document
                .getElementById("successModal")
                .classList.remove("open");

        };


    updateCart();

}


function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("open");

}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("open");

}


function openCheckout() {

    if (!cart.length) {

        alert("Tu carrito está vacío.");

        return;

    }


    closeCart();


    document
        .getElementById("checkoutTotal")
        .textContent =
            money(getCartTotal());


    document
        .getElementById("checkoutModal")
        .classList.add("open");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("open");

}


function submitOrder(event) {

    event.preventDefault();


    if (!canOrderForNextService()) {

        alert(
            "El plazo para realizar pedidos " +
            "para el próximo servicio ya ha terminado."
        );

        return;

    }


    const name =
        document
            .getElementById("customerName")
            .value
            .trim();


    const group =
        document
            .getElementById("customerGroup")
            .value
            .trim();


    const notes =
        document
            .getElementById("customerNotes")
            .value
            .trim();


    if (!name) {

        alert("Introduce tu nombre.");

        return;

    }


    const order = {

        id: generateOrderId(),

        date: getTodayString(),

        time: getCurrentTime(),

        name,

        group,

        notes,

        items: cart.map(item => ({

            id: item.id,

            name: item.name,

            description: item.description,

            quantity: item.quantity,

            price: item.price

        })),

        total: getCartTotal(),

        status: "pending",

        payment: "pay_at_pickup"

    };


    saveLocalOrder(order);


    document
        .getElementById("orderNumber")
        .textContent = order.id;


    closeCheckout();


    document
        .getElementById("successModal")
        .classList.add("open");


    cart = [];

    updateCart();


    document
        .getElementById("orderForm")
        .reset();

}


function generateOrderId() {

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `RE-${random}`;

}


function saveLocalOrder(order) {

    const existing =
        JSON.parse(
            localStorage.getItem(
                "recreo_orders"
            ) || "[]"
        );


    existing.push(order);


    localStorage.setItem(
        "recreo_orders",
        JSON.stringify(existing)
    );

}


function getTodayString() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


function getCurrentTime() {

    return new Date()
        .toLocaleTimeString(
            "es-ES",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


function canOrderForNextService() {

    const now = new Date();

    return now.getHours() < APP_CONFIG.orderDeadlineHour;

}


function updateNextService() {

    const element =
        document.getElementById("nextService");


    element.textContent =
        "Próximo recreo";

}


function renderNotice() {

    const container =
        document.getElementById("mainNotice");


    const changes =
        SCHEDULE_CHANGES.filter(
            item => item.active
        );


    if (changes.length) {

        const change = changes[0];


        container.innerHTML = `

            <div class="notice-icon">
                ⚠️
            </div>

            <div>

                <strong>
                    ${change.title}
                </strong>

                <p>
                    ${change.description}
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="notice-icon">
            🕒
        </div>

        <div>

            <strong>
                Pedidos hasta las 15:00
            </strong>

            <p>
                Haz tu pedido antes de las 15:00
                del día anterior para asegurarte
                de tenerlo preparado.
            </p>

        </div>

    `;

}


function renderEvents() {

    const container =
        document.getElementById("eventsGrid");


    const events =
        EVENTS.filter(
            event => event.active
        );


    if (!events.length) {

        container.innerHTML = `
            <div class="empty-state">
                No hay eventos publicados.
            </div>
        `;

        return;

    }


    events.forEach(event => {

        const card =
            document.createElement("article");

        card.className =
            "event-card";


        card.innerHTML = `

            <div class="event-date">
                ${event.date}
            </div>

            <div>

                <span class="event-type">
                    ${event.type === "event"
                        ? "EVENTO"
                        : "INFORMACIÓN"}
                </span>

                <h3>
                    ${event.title}
                </h3>

                <p>
                    ${event.description}
                </p>

            </div>

        `;


        container.appendChild(card);

    });

}


function renderScheduleChanges() {

    const container =
        document.getElementById(
            "scheduleChanges"
        );


    const changes =
        SCHEDULE_CHANGES.filter(
            item => item.active
        );


    if (!changes.length) {

        container.innerHTML = `
            <div class="normal-schedule">
                ✓ No hay cambios de horario publicados.
            </div>
        `;

        return;

    }


    changes.forEach(change => {

        const item =
            document.createElement("div");

        item.className =
            "schedule-change";


        item.innerHTML = `

            <strong>
                ${change.date} · ${change.title}
            </strong>

            <p>
                ${change.description}
            </p>

        `;


        container.appendChild(item);

    });

}
