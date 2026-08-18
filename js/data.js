const APP_CONFIG = {

    name: "Recreo 2026-27",

    pickupStart: "11:15",
    pickupEnd: "11:45",

    orderDeadlineHour: 15,

    goal: 3000,

    paymentMethod: "Pago al recoger",

    // Más adelante:
    googleSheetsApi: null
};


const PRODUCTS = [

    // SNACKS

    {
        id: "pringles-original",
        category: "snacks",
        name: "Pringles",
        description: "Original",
        price: 1.00,
        available: true
    },

    {
        id: "pringles-paprika",
        category: "snacks",
        name: "Pringles",
        description: "Paprika",
        price: 1.00,
        available: true
    },

    {
        id: "pringles-onion",
        category: "snacks",
        name: "Pringles",
        description: "Sour & Onion",
        price: 1.00,
        available: true
    },

    {
        id: "pipas",
        category: "snacks",
        name: "Pipas",
        description: "Pipas peladas",
        price: 1.00,
        available: true
    },

    {
        id: "tosfrit",
        category: "snacks",
        name: "Snacks Tosfrit",
        description: "Apetinas",
        price: 1.50,
        available: true
    },

    {
        id: "patatas",
        category: "snacks",
        name: "Patatas Fritas",
        description: "Hermanos Pintor",
        price: 1.00,
        available: true
    },

    {
        id: "risi-palomitas",
        category: "snacks",
        name: "Snacks Risi",
        description: "Palomitas",
        price: 1.50,
        available: true
    },

    {
        id: "risi-gusanitos",
        category: "snacks",
        name: "Snacks Risi",
        description: "Gusanitos",
        price: 1.50,
        available: true
    },

    {
        id: "risi-risketos",
        category: "snacks",
        name: "Snacks Risi",
        description: "Risketos",
        price: 1.50,
        available: true
    },


    // BEBIDAS

    {
        id: "agua",
        category: "bebidas",
        name: "Agua",
        description: "Agua sin gas",
        price: 0.50,
        available: true
    },

    {
        id: "coca-zero",
        category: "bebidas",
        name: "Coca-Cola Zero",
        description: "Refresco",
        price: 1.50,
        available: true
    },

    {
        id: "coca-zero-zero",
        category: "bebidas",
        name: "Coca-Cola Zero Zero",
        description: "Refresco",
        price: 1.50,
        available: true
    },

    {
        id: "fuze-tea",
        category: "bebidas",
        name: "Fuze Tea",
        description: "Limón sin azúcares",
        price: 1.50,
        available: true
    },


    // BOLLERÍA

    {
        id: "galleta-huevo",
        category: "bolleria",
        name: "Galleta de Huevo",
        description: "2 unidades",
        price: 1.00,
        available: true
    },

    {
        id: "napolitana-jamon",
        category: "bolleria",
        name: "Napolitana",
        description: "Jamón y queso",
        price: 1.50,
        available: true
    },

    {
        id: "napolitana-chocolate",
        category: "bolleria",
        name: "Napolitana",
        description: "Chocolate",
        price: 1.50,
        available: true
    },

    {
        id: "palmerita",
        category: "bolleria",
        name: "Palmerita",
        description: "Bollería",
        price: 0.50,
        available: true
    },

    {
        id: "miniborracho",
        category: "bolleria",
        name: "Miniborracho",
        description: "Bollería",
        price: 1.50,
        available: true
    },

    {
        id: "magdalena",
        category: "bolleria",
        name: "Magdalena",
        description: "2 unidades",
        price: 1.00,
        available: true
    },


    // ZUMOS

    {
        id: "minimo",
        category: "zumos",
        name: "Mínimo",
        description: "Naranja",
        price: 2.00,
        available: true
    },

    {
        id: "favorito",
        category: "zumos",
        name: "El Favorito",
        description: "Plátano y fresa",
        price: 2.50,
        available: true
    },

    {
        id: "tropical",
        category: "zumos",
        name: "El Tropical",
        description: "Piña y coco",
        price: 2.50,
        available: true
    },

    {
        id: "refrescante",
        category: "zumos",
        name: "El Refrescante",
        description: "Mango y maracuyá",
        price: 2.50,
        available: true
    }

];


const CATEGORIES = [

    {
        id: "todos",
        name: "Todo",
        icon: "✨"
    },

    {
        id: "snacks",
        name: "Snacks",
        icon: "🥨"
    },

    {
        id: "bebidas",
        name: "Bebidas",
        icon: "🥤"
    },

    {
        id: "zumos",
        name: "Zumos",
        icon: "🧃"
    },

    {
        id: "bolleria",
        name: "Bollería",
        icon: "🥐"
    }

];


const EVENTS = [

    {
        id: 1,
        type: "info",
        date: "18 SEP",
        title: "Inicio del Recreo 2026-27",
        description:
            "Comienza el servicio del nuevo curso.",
        active: true
    },

    {
        id: 2,
        type: "event",
        date: "25 SEP",
        title: "Día especial",
        description:
            "Consulta la web para conocer las novedades.",
        active: true
    }

];


const SCHEDULE_CHANGES = [

    /*
    Ejemplo:

    {
        date: "16 OCT",
        title: "Cambio de horario",
        description: "Ese día la recogida será de 11:30 a 12:00.",
        active: true
    }
    */

];


const STAFF = [

    {
        name: "Personal de servicio",
        role: "Preparación y entrega",
        schedule: "11:00 – 11:45",
        active: true
    }

];


const MOCK_ORDERS = [

    {
        id: "RE-0001",
        date: "2026-09-18",
        time: "14:22",
        name: "Alumno 1",
        group: "3º ESO",
        items: [
            {
                name: "Agua",
                quantity: 1,
                price: 0.50
            },
            {
                name: "Pringles Original",
                quantity: 1,
                price: 1.00
            }
        ],
        total: 1.50,
        status: "pending"
    },

    {
        id: "RE-0002",
        date: "2026-09-18",
        time: "14:36",
        name: "Alumno 2",
        group: "4º ESO",
        items: [
            {
                name: "Napolitana Chocolate",
                quantity: 1,
                price: 1.50
            }
        ],
        total: 1.50,
        status: "ready"
    }

];
