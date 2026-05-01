# Integración Backend: Oficina Virtual (Virtual Office)

Este documento detalla cómo está estructurada la "Oficina Virtual" en el frontend (`components/dashboard/virtual-office`) y cómo interactúa con los endpoints actuales del chatbot y la base de datos.

## 1. Concepto General
La Oficina Virtual reemplaza al antiguo chat genérico por una interfaz donde el usuario puede "reunirse" con diferentes agentes especializados de la IA (Director General, Ventas, Marketing, RRHH, Inventario, Contabilidad). 

Para el usuario, parece que navega entre diferentes salas de chat. Para el backend, **esto se maneja aislando el historial de mensajes a través de diferentes `session_id`** bajo el mismo `tenant_id`.

## 2. Manejo de Sesiones (Session IDs)
El frontend utiliza un sistema de **prefijos estáticos** para definir la sesión de cada equipo. Cuando el usuario hace clic en "Ventas", el frontend asume o crea un `session_id` con el prefijo asignado.

### Mapeo Actual de Agentes:
| Departamento | ID Interno (Frontend) | `session_id` que envía al Backend |
| :--- | :--- | :--- |
| **Director General** | `yeison` | `vo_yeison` |
| **Ventas** | `ventas` | `vo_ventas` |
| **Marketing** | `marketing` | `vo_marketing` |
| **Recursos Humanos**| `rrhh` | `vo_rrhh` |
| **Inventario** | `inventario` | `vo_inventario` |
| **Contabilidad** | `contabilidad` | `vo_contabilidad` |

> **Nota para Backend:** Actualmente el frontend envía literalmente `vo_ventas` como `session_id`. Si la base de datos requiere un identificador único por tenant para no mezclar las ventas del Tenant A con el Tenant B, el backend debe asegurarse de buscar por `tenant_id + session_id` simultáneamente, o bien el frontend puede ser modificado para enviar `tenant_{id}_vo_ventas`. (Actualmente el frontend espera que el middleware/API determine el tenant por el token de Auth).

## 3. Endpoints Utilizados
La Oficina Virtual consume el hook `useChatbot` que apunta a `/api/v1/chatbot`:

### A. Cargar Historial
- **Endpoint:** `GET /history/{session_id}`
- **Cuándo se llama:** Cada vez que el usuario hace clic en un departamento en la barra lateral.
- **Flujo:** Frontend llama a `GET /history/vo_ventas`. Si devuelve el array de mensajes, los pinta. Si devuelve vacío/404, el frontend asume que es una conversación nueva e inyecta un "greeting" (saludo inicial) de manera local.

### B. Enviar Mensaje
- **Endpoint:** `POST /message`
- **Body Esperado:** `{ "message": "Hola equipo", "session_id": "vo_ventas" }`
- **Flujo:** El backend recibe el mensaje, invoca al LLM (idealmente inyectando un System Prompt específico según si el session_id es de ventas, marketing, etc.), guarda en la tabla `chatbot_conversation` y devuelve la respuesta.

### C. Listar Conversaciones (Historial Lateral)
- **Endpoint:** `GET /conversations`
- **Flujo:** Idealmente, este endpoint debería devolver todas las sesiones del tenant (`vo_yeison`, `vo_ventas`, etc.) para que el frontend pueda pintar el historial de "Reuniones Pasadas" en la barra lateral izquierda.

## 4. Estructura Esperada en la Base de Datos
La tabla actual es:
```sql
CREATE TABLE chatbot_conversation (
    id bigint PRIMARY KEY,
    tenant_id bigint,
    session_id varchar, 
    messages jsonb DEFAULT '{"messages": []}',
    active boolean,
    created_at timestamp,
    last_update timestamp
);
```

**Comportamiento esperado del Backend:**
1. Cuando llega `POST /message` con `session_id: "vo_marketing"` y `tenant_id: 5`.
2. Buscar si existe en `chatbot_conversation` donde `session_id = 'vo_marketing'` y `tenant_id = 5`.
3. Si no existe, crear el registro.
4. Agregar el mensaje del usuario y la respuesta de la IA al arreglo `messages` (jsonb).

## 5. Próximo Paso (Pendiente de Backend) - "Resúmenes de Reunión"
Actualmente el frontend tiene un botón **"Finalizar Reunión"**.
- **Comportamiento Actual (Simulado):** El frontend espera 2 segundos e inyecta visualmente un mensaje tipo `summary` en la pantalla.
- **Comportamiento Futuro (Requerido):** El frontend hará un `POST` o `PUT` especial (ej. `POST /api/v1/chatbot/summarize?session_id=vo_ventas`). El backend deberá leer el JSONB de `messages`, pedirle al LLM un resumen de acuerdos y siguientes pasos, guardarlo en la base de datos (quizás marcando `active = false`), y devolver el JSON del resumen para que el frontend lo pinte.

## 6. Archivos del Frontend
Si necesitan ver cómo el frontend envía esto, revisen los siguientes archivos:
- `components/dashboard/virtual-office/constants.ts` (Aquí están los `sessionIdPrefix`).
- `components/dashboard/virtual-office/VirtualOffice.tsx` (Contiene los efectos de `useEffect` que llaman a `getConversationHistory` y el manejador `handleSend`).
