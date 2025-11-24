
# Proyecto: Apuestas Reactivas (Reactive Gambling)

***Apuestas Reactivas*** *(Reactive Gambling)* es una aplicación web de **apuestas deportivas** sujeto a un sistema de **fichas virtuales** intercambiables por premios. El fin de la aplicación es aumentar el interés y participación en los eventos deportivos organizados dentro de la facultad y/o a nivel universitario.

---

## Integrantes:

* Agustín Andrés Verdugo Bustos
* Joaquín Antonio Cornejo Morales
* Nelson Alejandro Navarro Barría
* Roberto Ulises Vega Vega

## Variables de entorno requeridas

El proyecto requiere ciertas variables de entorno para ejecutarse correctamente.
Un ejemplo se encuentra en el archivo [`env.example`](./env.example).

Puedes configurarlas de una de las siguientes formas:

1. **Renombrar** el archivo `env.example` a `.env`, o
2. **Crear un nuevo archivo** llamado `.env` y **copiar** en él el contenido de `env.example`.

## Instalación y ejecución en modo desarrollo

Se ejecuta en dos terminales distintas los siguientes pasos:

### Levantar el backend

Inicia el server en [http://localhost:3001](http://localhost:3001)

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd backend
npm install
npm run dev
```

### Levantar el frontend

Inicia app en [http://localhost:5173](http://localhost:5173)

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd frontend
npm install
npm run dev
```

## Instalación y ejecución en modo producción

Se ejecuta en dos terminales distintas los siguientes pasos:

### Build frontend

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd frontend
npm install
npm run build
```

Luego copiar la carpeta dist al backend:

Windows:

```bash
Copy-Item -Recurse -Force dist ../backend/dist
```

macOS/Linux:

```bash
cp -r dist ../backend/dist   # En macOS/Linux
```

### Build backend y levantar la app

Inicia la app en [http://localhost:3001](http://localhost:3001)

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd backend
npm install
npm run build
npm run start
```

### (Opcional para macOS/Linux)

Iniciar directamente todo

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
npm run build:ui
```

---

# Estructura del estado global

### Librería usada: *Zustand*

### Stores implementados

#### **useAuthStore:**

* Usuario autenticado (`user: UserData | null`)
* Mensaje de error de login (`loginError: string | null`)
* Iniciar sesión: `login(credentials)`
* Cerrar sesión: `logout()`
* Restaurar sesión: `restoreLogin()`
* Borrar mensaje de error: `clearError()`

Mantiene la sesión activa al refrescar la página gracias a `persist({ name: "auth-storage" })`

#### **useEventsStore:**

* Lista global de eventos (`events: EventData[]`)
* Evento actual (`currentEvent: EventData | null`)
* Obtener todos los eventos: `getAllEvents()`
* Obtener un evento único por id: `getEventById(id)`
* Apostar sobre una opción en un evento: `placeBetOnEvent(id, option, amount)`

Actualiza tanto `events` como `currentEvent` tras apostar o modificar un evento.

---

# Mapa de rutas y flujo de autenticación

La aplicación usa React Router para la navegación.
### Rutas públicas

* `/` → Muestra la página principal de la aplicación (`HomePage`).
* `/register` → Formulario de registro de nuevos usuarios (`RegisterPage`).
* `/login` → Formulario de inicio de sesión (`LoginPage`).
* `/event-list` → Lista completa de eventos disponibles para apostar (`EventList`).
* `/event-page/:id` → Vista detallada de un evento y acciones asociadas, como apostar si eres usuario, o definir un ganador si eres creador del evento (`EventPage`).
* `/ranking` → Vista del ranking global de usuarios (`Ranking`).
### Rutas protegidas
* `/me` → Página del perfil del usuario autenticado (`UserPage`).
* `/event-form` → Formulario para crear un nuevo evento (`EventForm`).



### Flujo de autenticación

* Registro: POST `/api/users`
* Login: POST `/api/login`

  * Backend genera JWT en cookie HTTPOnly
  * Devuelve header `X-CSRF-Token`
* Cada request autenticada pide:

  * Cookie con JWT
  * Header `X-CSRF-Token`
* `GET /api/login/me` permite restaurar sesión
* Logout: POST `/api/login/logout` limpia la cookie

El frontend mantiene el usuario mediante `useAuthStore` y su persistencia local.

---

# Flujos cubiertos por tests E2E 

Se utilizó Playwright.

## Autenticación

* Registro de usuario
* Login exitoso
* Login inválido por contraseña incorrecta
* Validación de campos vacíos al hacer login
* Redirección automática a `/login` al intentar acceder a `/me` sin sesión
* Logout y posterior bloqueo de acceso a rutas protegidas

## Eventos

* Crear un evento nuevo mediante el formulario completo
* Listar los eventos creados en `/event-list`
* Ver el detalle de un evento existente
* Crear múltiples eventos y acceder a uno específico

## Helpers implementados

`registerUser(page, username, email, password)`: Navega a */register*, rellena los campos obligatorios y envía el formulario.

`loginWith(page, username, password)`: Navega a */login*, completa usuario y contraseña, y envía el formulario.

`logout(page)`: Ejecuta el logout.

`createEvent(page, title)`: Rellena el formulario de creación de eventos con dos opciones y publica el evento.

Para correr tests:
```bash
cd e2e-tests
npm install
npm run test
```

---

# Librería de estilos utilizada y decisiones de diseño
Se utilizó la librería React Bootstrap para el estilo y organización de la página.

Sobre las decisiones de diseño, se decidió implementar la aplicación tal que usa:

* Barra de navegación: Para controlar la navegación sobre la aplicación es escencial tener una barra de navegación para poder intercambiando entre la página principal, listado de eventos, crear eventos, perfil, login y logout.

* Cards de Bootstrap: Se utilizan Cards junto Row y Col para organizar de manera estilizada los formularios y el listado de eventos.

* Uso de colores suaves: Se usan colores simples como blanco y un fondo azul muy claro, colores fuertes como negro o amarillo para indicar zonas importantes como la barra de navegación o las monedas del usuario.

* Interacción: Casi todos los componentes de React Bootstrap tienen interacciones que mejoran la experiencia, por ejemplo, hover del mouse sobre un botón y este cambia de color, rutas se resaltan en la barra de navegación.

# URL aplicación

