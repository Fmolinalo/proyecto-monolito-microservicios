# Proyecto Monolito

## 1. Descripción

Este proyecto implementa una arquitectura de software monolítica inicial desarrollada como parte de una práctica académica guiada. El objetivo es construir una API REST completamente funcional con Node.js, Express y PostgreSQL para gestionar tres entidades comerciales esenciales: **Usuarios**, **Productos** y **Pedidos**. Esta base monolítica servirá como punto de partida y recuperación antes de evolucionar el sistema hacia contenedorización con Docker, integración continua y posterior migración hacia una arquitectura basada en microservicios.

---

## 2. Arquitectura

El monolito concentra la lógica de negocio, el acceso a datos y las interfaces de comunicación en una sola unidad de despliegue:

```text
+--------------------------------------------------------------+
|                      ARQUITECTURA MONOLÍTICA                 |
|                                                              |
|   +------------------------------------------------------+   |
|   |                  API REST (Express.js)               |   |
|   |                                                      |   |
|   |   [Usuarios]          [Productos]         [Pedidos]  |   |
|   |   GET /usuarios       GET /productos      GET /pedidos|  |
|   |         |                   |                  |     |   |
|   +---------|-------------------|------------------|-----+   |
|             |                   |                  |         |
|             +-------------------+------------------+         |
|                                 |                            |
|                                 v                            |
|             +--------------------------------------+         |
|             |       Base de Datos PostgreSQL       |         |
|             |             (proyecto_app)           |         |
|             +--------------------------------------+         |
+--------------------------------------------------------------+
```

El servidor desacopla la definición de la aplicación (`src/app.js`) del proceso de escucha en red (`src/server.js`), facilitando la ejecución de pruebas automatizadas sin necesidad de mantener un socket de red ocupado manualmente.

---

## 3. Tecnologías

- **Node.js** (`v22.22.1`): Entorno de ejecución para JavaScript del lado del servidor.
- **Express** (`v5.2.1`): Framework web ligero y flexible para la creación de rutas y middlewares HTTP.
- **PostgreSQL** (`v18.6`): Sistema de gestión de bases de datos relacional utilizado para la persistencia local.
- **pg** (`v8.23.1`): Cliente oficial de PostgreSQL para Node.js implementando un pool de conexiones (`Pool`).
- **dotenv** (`v18.0.5`): Manejador de variables de entorno para aislar credenciales de la base de datos.
- **Jest** (`v30.5.2`): Entorno y corredor de pruebas automatizadas.
- **Supertest** (`v7.3.1`): Biblioteca de pruebas de integración para interactuar directamente con la API HTTP de Express.
- **Git** (`v2.53.0`): Sistema de control de versiones distribuido.
- **WSL 2** (Windows Subsystem for Linux con Ubuntu): Entorno de virtualización base donde se ejecuta el sistema.

---

## 4. Estructura del proyecto

Estructura real del directorio `monolito`:

```text
monolito/
├── .env                  # Variables de entorno locales (ignorado por Git)
├── .gitignore            # Reglas de exclusión para Git (ignora node_modules y .env)
├── package.json          # Metadatos del proyecto, dependencias y scripts
├── package-lock.json     # Árbol de dependencias bloqueadas
├── README.md             # Documentación técnica completa
├── src/
│   ├── app.js            # Definición de Express, middlewares y rutas de la API
│   ├── db.js             # Configuración del Pool de conexiones de PostgreSQL
│   └── server.js         # Archivo ejecutor que inicia la escucha en el puerto 3000
└── tests/
    └── app.test.js       # Suite de pruebas automatizadas con Jest y Supertest
```

---

## 5. Configuración

### Configuración de PostgreSQL

Dentro del entorno Ubuntu / WSL 2, se crea la base de datos y el usuario propietario:

```sql
CREATE DATABASE proyecto_app;
CREATE USER app_user WITH PASSWORD 'tu_contraseña_segura';
ALTER DATABASE proyecto_app OWNER TO app_user;
```

Las tablas (`usuarios`, `productos`, `pedidos`) y los permisos correspondientes se asignan a `app_user`:

```sql
GRANT USAGE ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### Variables de entorno (`.env`)

En la raíz de la carpeta `monolito/`, crear un archivo `.env` con las siguientes claves:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proyecto_app
DB_USER=app_user
DB_PASSWORD=[CONTRASEÑA_LOCAL]
```

> [!CAUTION]
> El archivo `.env` contiene información de autenticación local y está protegido en `.gitignore` para evitar su publicación accidental en repositorios de Git.

---

## 6. Ejecución

Para ejecutar el proyecto dentro de WSL (Ubuntu):

1. **Clonar o acceder al repositorio:**
   ```bash
   cd ~/proyecto-monolito-microservicios/monolito
   ```

2. **Asegurar que el servicio de PostgreSQL esté en ejecución:**
   ```bash
   sudo service postgresql start
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor monolítico:**
   ```bash
   npm start
   ```

El servidor quedará disponible en `http://localhost:3000`.

---

## 7. Endpoints

| Método | Ruta | Descripción | Respuesta esperada (HTTP 200) |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Chequeo de salud del servicio | `{"estado": "ok"}` |
| `GET` | `/db-test` | Comprueba la conectividad con PostgreSQL ejecutando `SELECT NOW()` | `{"estado": "ok", "mensaje": "Conexión con PostgreSQL correcta", "fecha": "..."}` |
| `GET` | `/usuarios` | Obtiene el listado completo de usuarios registrados | Arreglo JSON de objetos usuario (`id`, `nombre`, `email`) |
| `GET` | `/productos` | Obtiene el catálogo completo de productos | Arreglo JSON de objetos producto (`id`, `nombre`, `precio`) |
| `GET` | `/pedidos` | Obtiene el registro de pedidos realizados | Arreglo JSON de objetos pedido (`id`, `usuario_id`, `producto_id`, `cantidad`) |

---

## 8. Pruebas automatizadas

El proyecto utiliza **Jest** junto a **Supertest** para validar el comportamiento de los endpoints sin requerir interacción manual con herramientas externas.

Para ejecutar la suite de pruebas:

```bash
npm test
```

### Resultado real obtenido:

```text
PASS tests/app.test.js
  ✓ GET /health debe responder correctamente (61 ms)
  ✓ GET /usuarios debe devolver usuarios (42 ms)
  ✓ GET /productos debe devolver productos (9 ms)
  ✓ GET /pedidos debe devolver pedidos (8 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.87 s, estimated 2 s
Ran all test suites.
```

---

## 9. Prueba controlada

Para validar la efectividad de las pruebas automatizadas como mecanismo de detección temprana de errores de regresión, se realizó una prueba controlada de fallo de acuerdo con el Paso Ocho de la guía académica:

1. **Estado inicial correcto:**
   Todas las pruebas de la suite pasaban satisfactoriamente (4/4).

2. **Error introducido:**
   En `src/app.js`, se alteró deliberadamente la consulta SQL del endpoint `GET /productos`:
   ```javascript
   // Código modificado intencionalmente:
   const result = await pool.query('SELECT * FROM prodctos');
   ```

3. **Resultado de `npm test` con el error:**
   ```text
   FAIL tests/app.test.js
     ✓ GET /health debe responder correctamente (63 ms)
     ✓ GET /usuarios debe devolver usuarios (49 ms)
     ✕ GET /productos debe devolver productos (33 ms)
     ✓ GET /pedidos debe devolver pedidos (23 ms)

     ● GET /productos debe devolver productos

       expect(received).toBe(expected) // Object.is equality

       Expected: 200
       Received: 500

         21 | test('GET /productos debe devolver productos', async () => {
         22 |   const response = await request(app).get('/productos');
       > 23 |   expect(response.statusCode).toBe(200);
            |                               ^
         24 |   expect(response.body.length).toBeGreaterThan(0);
         25 | });

   Test Suites: 1 failed, 1 total
   Tests:       1 failed, 3 passed, 4 total
   ```
   PostgreSQL arrojó el error: `error: relation "prodctos" does not exist` (código `42P01`).

4. **Detección del error por las pruebas:**
   El endpoint respondió con código de estado HTTP 500 debido al fallo en la base de datos. Jest detectó inmediatamente la discrepancia con el estado esperado (HTTP 200) y falló la prueba de forma inmediata, aislando el error con exactitud en el módulo de productos.

5. **Restauración:**
   Se corrigió la consulta en `src/app.js` restaurando el nombre de tabla válido:
   ```javascript
   const result = await pool.query('SELECT * FROM productos');
   ```

6. **Resultado final de `npm test` tras la restauración:**
   ```text
   PASS tests/app.test.js
     ✓ GET /health debe responder correctamente
     ✓ GET /usuarios debe devolver usuarios
     ✓ GET /productos debe devolver productos
     ✓ GET /pedidos debe devolver pedidos

   Test Suites: 1 passed, 1 total
   Tests:       4 passed, 4 total
   ```

7. **Conclusión:**
   La suite de pruebas automatizadas garantiza la integridad del sistema ante modificaciones del código fuente o errores de sintaxis en las consultas SQL antes de desplegar o versionar.

---

## 10. Git

El control de versiones se configuró localmente dentro del directorio `monolito/`:

1. **Configuración de exclusiones (`.gitignore`):**
   ```text
   node_modules/
   .env
   ```
   Esto asegura que ni las dependencias descargadas (`node_modules`) ni las credenciales de base de datos (`.env`) sean incorporadas al árbol de Git.

2. **Inicialización y primer commit:**
   ```bash
   git init
   git add .
   git commit -m "Version inicial del monolito funcionando"
   ```

3. **Verificación de commit:**
   El historial de Git conserva el estado estable y verificado del monolito como punto de restauración seguro antes de avanzar hacia la contenerización con Docker.
