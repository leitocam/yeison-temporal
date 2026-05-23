# Yeison - Panel Frontend (Next.js)

Este es el frontend de la plataforma **Yeison**, diseñado para administrar leads, inventario, instancias de agentes de inteligencia artificial y conversaciones de ventas. Está construido utilizando Next.js (con soporte para Turbopack y Next-Intl) y React 19.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** Next.js 16 (App Router + Turbopack)
* **Librería UI:** React 19 + Tailwind CSS + Framer Motion
* **Internacionalización:** Next-Intl (con soporte multilenguaje)
* **Gestión de Formularios:** React Hook Form + Zod
* **Cliente de API:** Fetch API con soporte para Mock Auth e integración nativa de tokens JWT.

---

## ⚙️ Variables de Entorno

Debes configurar un archivo de entorno (`.env.local` para desarrollo o directamente en tu proveedor de hosting en producción) con las siguientes variables:

```env
# URL de la API del Backend (FastAPI)
NEXT_PUBLIC_API_URL=https://tu-backend-api.com/api/v1

# Simulación de Autenticación (Modo Demo sin backend real)
# true = habilitado, false = deshabilitado (usar backend real)
NEXT_PUBLIC_ENABLE_MOCK_AUTH=false

# Nombre de la aplicación
NEXT_PUBLIC_APP_NAME=Yeison

# Tiempo de espera (timeout) para las peticiones a la API (en ms)
NEXT_PUBLIC_API_TIMEOUT=30000
```

> [!NOTE]
> Si deseas hacer pruebas de la interfaz rápidamente sin levantar la base de datos o el backend de Python, puedes establecer `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true`.

---

## 💻 Desarrollo Local

### 1. Requisitos Previos
* **Node.js:** Versión 20.x o 22.x
* **Gestor de Paquetes:** npm o pnpm

### 2. Instalación de Dependencias
```bash
npm install
```

### 3. Configurar Entorno de Desarrollo
Copia el archivo `.env.example` a `.env.local` y edita las variables:
```bash
cp .env.example .env.local
```

### 4. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🚀 Despliegue en Producción (Hostinger)

El proyecto está configurado con **`output: 'standalone'`** en `next.config.mjs`, lo cual es ideal para plataformas como Hostinger, cPanel o entornos Docker, ya que optimiza el tamaño del bundle de salida copiando únicamente los archivos necesarios.

### Configuración del Git en el Workspace
Para trabajar con la rama de producción:
```bash
# Cambiar a la rama de producción
git checkout production_leo

# Descargar cambios más recientes de la rama remota
git pull origin production_leo
```

### Configuración en el Panel de Hostinger

Cuando configures la aplicación de Node.js/Next.js en Hostinger, utiliza los siguientes valores:

1. **Framework Preset:** `Next.js`
2. **Branch:** `production_leo`
3. **Node Version:** `22.x`
4. **Root Directory:** `./`
5. **Build Command:** `npm run build`
6. **Output Directory:** `.next`
7. **Environment Variables:**
   * Configura `NEXT_PUBLIC_API_URL` apuntando a tu backend FastAPI de producción (ej. `https://tu-api.com/api/v1`).
   * Configura `NEXT_PUBLIC_ENABLE_MOCK_AUTH` en `false`.

### Verificación de Tipos antes de Desplegar
Para asegurar que tu build no falle por problemas de sintaxis o de TypeScript, puedes compilar los tipos de manera local antes de hacer un push:
```bash
npx tsc --noEmit
```
Si este comando no reporta errores, tu build se completará exitosamente en Hostinger.
