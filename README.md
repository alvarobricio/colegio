# 🍊 Recreo 2026-27

Web de pedidos y gestión para el servicio de recreo.

## Funciones

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
- Zona personal
- Pedidos
- Estados de pedido
- Ventas
- Ticket medio
- Objetivo de 3.000 €
- Inventario

## Ejecutar

No necesita servidor para la primera versión.

Se puede abrir:

index.html

La zona personal está en:

admin.html

## Google Sheets

La versión actual utiliza datos locales para poder desarrollar la interfaz.

La siguiente fase conectará:

Web
↓
Google Apps Script
↓
Google Sheets

Las hojas recomendadas son:

- MENU
- PEDIDOS
- PERSONAL
- HORARIOS
- EVENTOS
- AVISOS
- INVENTARIO
- CONFIGURACION
- VENTAS

## Importante

La zona de administración necesita autenticación antes de utilizarse
en producción.

Los pedidos de la versión local se almacenan en localStorage.

Cuando se conecte Google Sheets, localStorage será sustituido por la
API de Google Apps Script.
