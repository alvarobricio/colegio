let adminFilter = "all";


document.addEventListener("DOMContentLoaded", () => {

    setupFilters();

    renderAdmin();

});


function money(value) {

    return value
        .toFixed(2)
        .replace(".", ",") + " €";

}


function renderAdmin() {

    const orders =
        getOrders();


    renderStats(orders);

    renderOrders(orders);

    renderEvents();

    renderStaff();

    renderInventory();

    renderDate();

}


function getOrders() {

    const local =
        JSON.parse(
            localStorage.getItem(
                "recreo_orders"
            ) || "[]"
        );


    return [
        ...MOCK_ORDERS,
        ...local
    ];

}


function renderStats(orders) {

    const totalOrders =
        orders.length;


    const sales =
        orders.reduce(
            (total, order) =>
                total + Number(order.total || 0),
            0
        );


    const average =
        totalOrders
            ? sales / totalOrders
            : 0;


    const percentage =
        Math.min(
            100,
            (sales / APP_CONFIG.goal) * 100
        );


    document
        .getElementById("statOrders")
        .textContent =
            totalOrders;


    document
        .getElementById("statSales")
        .textContent =
            money(sales);


    document
        .getElementById("statAverage")
        .textContent =
            money(average);


    document
        .getElementById("statGoal")
        .textContent =
            `${percentage.toFixed(0)}%`;


    document
        .getElementById("goalAmount")
        .textContent =
            money(sales);


    document
        .getElementById("goalProgress")
        .style.width =
            `${percentage}%`;


    const remaining =
        Math.max(
            0,
            APP_CONFIG.goal - sales
        );


    document
        .getElementById("goalText")
        .textContent =
            remaining > 0
                ? `Faltan ${money(remaining)} para alcanzar el objetivo.`
                : "🎉 ¡Objetivo conseguido!";
}


function renderOrders(orders) {

    const container =
        document.getElementById(
            "adminOrders"
        );


    let filtered = orders;


    if (adminFilter !== "all") {

        filtered =
            orders.filter(
                order =>
                    order.status === adminFilter
            );

    }


    if (!filtered.length) {

        container.innerHTML = `
            <div class="empty-state">
                No hay pedidos en esta categoría.
            </div>
        `;

        return;

    }


    container.innerHTML = "";


    filtered.forEach(order => {

        const card =
            document.createElement("article");

        card.className =
            "admin-order";


        const items =
            order.items
                .map(
                    item =>
                        `${item.name} ×${item.quantity}`
                )
                .join(", ");


        card.innerHTML = `

            <div class="admin-order-main">

                <div>

                    <span class="order-id">
                        ${order.id}
                    </span>

                    <h3>
                        ${order.name}
                    </h3>

                    <p>
                        ${order.group || ""}
                    </p>

                </div>

                <span class="status status-${order.status}">
                    ${getStatusName(order.status)}
                </span>

            </div>


            <div class="admin-order-items">
                ${items}
            </div>


            <div class="admin-order-bottom">

                <strong>
                    ${money(Number(order.total))}
                </strong>

                <span>
                    ${order.time || ""}
                </span>

                <div class="order-actions">

                    <button
                        onclick="changeOrderStatus(
                            '${order.id}',
                            'preparing'
                        )"
                    >
                        Preparando
                    </button>

                    <button
                        onclick="changeOrderStatus(
                            '${order.id}',
                            'ready'
                        )"
                    >
                        Listo
                    </button>

                    <button
                        onclick="changeOrderStatus(
                            '${order.id}',
                            'delivered'
                        )"
                    >
                        Entregado
                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


function getStatusName(status) {

    const names = {

        pending: "Pendiente",

        preparing: "Preparando",

        ready: "Listo",

        delivered: "Entregado"

    };


    return names[status] || status;

}


function changeOrderStatus(id, status) {

    const orders =
        JSON.parse(
            localStorage.getItem(
                "recreo_orders"
            ) || "[]"
        );


    const order =
        orders.find(
            item => item.id === id
        );


    if (!order) {

        alert(
            "Este pedido es de demostración."
        );

        return;

    }


    order.status = status;


    localStorage.setItem(
        "recreo_orders",
        JSON.stringify(orders)
    );


    renderAdmin();

}


function setupFilters() {

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    adminFilter =
                        button.dataset.filter;


                    renderOrders(
                        getOrders()
                    );

                }
            );

        });

}


function renderEvents() {

    const container =
        document.getElementById(
            "adminEvents"
        );


    container.innerHTML = "";


    EVENTS
        .filter(event => event.active)
        .forEach(event => {

            const item =
                document.createElement("div");

            item.className =
                "admin-list-item";


            item.innerHTML = `

                <div>
                    <strong>
                        ${event.title}
                    </strong>

                    <p>
                        ${event.date}
                    </p>
                </div>

                <span class="badge">
                    Publicado
                </span>

            `;


            container.appendChild(item);

        });

}


function renderStaff() {

    const container =
        document.getElementById(
            "staffList"
        );


    container.innerHTML = "";


    STAFF
        .filter(person => person.active)
        .forEach(person => {

            const item =
                document.createElement("div");

            item.className =
                "staff-item";


            item.innerHTML = `

                <div class="staff-avatar">
                    👤
                </div>

                <div>

                    <strong>
                        ${person.name}
                    </strong>

                    <p>
                        ${person.role}
                    </p>

                </div>

                <span>
                    ${person.schedule}
                </span>

            `;


            container.appendChild(item);

        });

}


function renderInventory() {

    const container =
        document.getElementById(
            "inventoryList"
        );


    container.innerHTML = "";


    PRODUCTS.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "inventory-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ${product.description}
                </span>

            </div>

            <span class="${
                product.available
                    ? "available"
                    : "unavailable"
            }">

                ${
                    product.available
                        ? "Disponible"
                        : "Agotado"
                }

            </span>

        `;


        container.appendChild(item);

    });

}


function renderDate() {

    const element =
        document.getElementById(
            "adminDate"
        );


    element.textContent =
        new Date().toLocaleDateString(
            "es-ES",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}
