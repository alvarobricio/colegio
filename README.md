# 🍊 Recreo 2026-27

Web de pedidos y gestión para el servicio de recreo del centro.

La aplicación está pensada para que el alumnado pueda consultar el
menú y realizar pedidos, mientras que el personal autorizado dispone
de una zona de administración.

## Funciones

### Zona pública

- Menú
- Snacks
- Bebidas
- Zumos
- Bollería
- Carrito
- Pedidos anticipados
- Pago al recoger
- Recogida 11:15–11:45
- Límite de pedidos a las 15:00 del día anterior
- Eventos
- Noticias
- Cambios de horario
- Información del servicio

### Administración

- Dashboard
- Gestión de pedidos
- Estados de pedido
- Personal
- Inventario
- Ventas
- Ticket medio
- Objetivo de ventas
- Auditoría
- Control de usuarios administradores
- Control de acceso mediante Google Workspace

## Arquitectura

La aplicación utiliza una arquitectura separada entre frontend y
backend:

```text
GitHub Pages
    │
    ├── index.html
    ├── admin.html
    ├── css/
    └── js/
          │
          ▼
Google Apps Script API
          │
          ▼
Google Sheets
