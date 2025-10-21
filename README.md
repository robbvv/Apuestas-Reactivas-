# Proyecto: Apuestas Reactivas  (Reactive Bets)

## Integrantes:
- Agustín Andrés Verdugo Bustos
- Joaquín Antonio Cornejo Morales
- Nelson Alejandro Navarro Barría
- Roberto Ulises Vega Vega

## Variables de entorno requeridas

El proyecto requiere ciertas variables de entorno para ejecutarse correctamente.  
Un ejemplo se encuentra en el archivo [`env.example`](./env.example).

Puedes configurarlas de una de las siguientes formas:

1. **Renombrar** el archivo `env.example` a `.env`, o  
2. **Crear un nuevo archivo** llamado `.env` y **copiar** en él el contenido de `env.example`.


## Instalación y ejecución en modo desarollo
Se ejecuta en dos terminales distintas los siguientes pasos:

### Levantar el backend
Inicia el server en http://localhost:3001

Nota: npm install solo se hace la primera vez que se clona el repositorio

```bash
cd backend
npm install
npm run dev
```

### Levantar el frontend
Inicia app en http://localhost:5173

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
Inicia la app en http://localhost:3001

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