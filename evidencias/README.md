# Guía de Capturas de Pantalla para Evidencias (INFORME.md)

Esta carpeta almacena las evidencias gráficas requeridas para el informe académico `INFORME.md`. A continuación se detalla el nombre de archivo, comando a ejecutar en la terminal y contenido esperado para cada una de las 12 capturas:

---

### `01-wsl.png` — Figura 1: Verificación de WSL 2 y Ubuntu
- **Comando a ejecutar (PowerShell en Windows):**
  ```powershell
  wsl --list --verbose
  ```
- **Contenido esperado:** Tabla con `Ubuntu`, estado `Running` y versión `2`.
- **Sección en INFORME.md:** Sección 5 (Entorno de Desarrollo) y Anexo 1.

---

### `02-entorno.png` — Figura 2: Verificación de Node.js, npm y Git en Ubuntu
- **Comando a ejecutar (Terminal Ubuntu/WSL):**
  ```bash
  node -v && npm -v && git --version
  ```
- **Contenido esperado:** Versiones de Node (`v22.22.1`), npm (`9.2.0`) y Git (`2.53.0`).
- **Sección en INFORME.md:** Sección 5 (Entorno de Desarrollo) y Anexo 2.

---

### `03-docker.png` — Figura 3: Verificación de Docker y contenedor de prueba
- **Comando a ejecutar (Terminal Ubuntu/WSL):**
  ```bash
  docker --version && docker run hello-world
  ```
- **Contenido esperado:** Versión del cliente Docker y el mensaje de confirmación `"Hello from Docker!"`.
- **Sección en INFORME.md:** Sección 5 (Entorno de Desarrollo) y Anexo 3.

---

### `04-estructura-proyecto.png` — Figura 4: Estructura del proyecto
- **Comando a ejecutar (Terminal Ubuntu/WSL):**
  ```bash
  cd ~/proyecto-monolito-microservicios && ls -la && ls -la monolito
  ```
- **Contenido esperado:** Carpetas `monolito/` y `microservicios/`, y dentro de `monolito`: `src/`, `tests/`, `package.json`, `.gitignore`, `.env`.
- **Sección en INFORME.md:** Sección 6 (Desarrollo del Proyecto) y Anexo 4.

---

### `05-base-datos.png` — Figura 5: Tablas y propietario en PostgreSQL
- **Comando a ejecutar (Terminal Ubuntu/WSL):**
  ```bash
  sudo -u postgres psql -d proyecto_app -c "\dt"
  ```
- **Contenido esperado:** Listado de tablas `usuarios`, `productos` y `pedidos` en el esquema público de `proyecto_app`.
- **Sección en INFORME.md:** Sección 10 (Diseño de la Base de Datos) y Anexo 5.

---

### `06-datos-iniciales.png` — Figura 6: Registros iniciales en las tablas
- **Comando a ejecutar (Terminal Ubuntu/WSL):**
  ```bash
  sudo -u postgres psql -d proyecto_app -c "SELECT * FROM usuarios; SELECT * FROM productos; SELECT * FROM pedidos;"
  ```
- **Contenido esperado:** Los 3 usuarios (Ana, Luis, Carlos), los 3 productos (Laptop, Teclado, Mouse) y los 3 pedidos relacionados.
- **Sección en INFORME.md:** Sección 11 (Carga de Datos Iniciales) y Anexo 5.

---

### `07-endpoints.png` — Figura 7: Pruebas de endpoints REST con curl
- **Comando a ejecutar (Terminal Ubuntu/WSL con el servidor activo `npm start`):**
  ```bash
  curl -s http://localhost:3000/health && echo "" && curl -s http://localhost:3000/db-test && echo "" && curl -s http://localhost:3000/usuarios && echo "" && curl -s http://localhost:3000/productos && echo "" && curl -s http://localhost:3000/pedidos && echo ""
  ```
- **Contenido esperado:** Respuestas JSON válidas para `/health`, `/db-test`, `/usuarios`, `/productos` y `/pedidos`.
- **Sección en INFORME.md:** Sección 12 (Implementación de Endpoints) y Anexo 6.

---

### `08-pruebas-exitosas.png` — Figura 8: Pruebas automatizadas iniciales (4/4 PASS)
- **Comando a ejecutar (Terminal Ubuntu/WSL en `monolito/`):**
  ```bash
  npm test
  ```
- **Contenido esperado:** `PASS tests/app.test.js`, con las 4 pruebas aprobadas (`Tests: 4 passed, 4 total`).
- **Sección en INFORME.md:** Sección 15 (Resultados de las Pruebas) y Anexo 7.

---

### `09-error-controlado.png` — Figura 9: Prueba de error controlado (1 FAIL / 3 PASS)
- **Comando a ejecutar (Temporalmente con `prodctos` en `src/app.js`):**
  ```bash
  npm test
  ```
- **Contenido esperado:** `FAIL tests/app.test.js`, fallo en `GET /productos`, código HTTP 500 y error `relation "prodctos" does not exist`.
- **Sección en INFORME.md:** Sección 16 (Prueba de Error Controlado) y Anexo 8.

---

### `10-pruebas-restauradas.png` — Figura 10: Pruebas automatizadas tras restauración (4/4 PASS)
- **Comando a ejecutar (Con código restaurado `productos`):**
  ```bash
  npm test
  ```
- **Contenido esperado:** `PASS tests/app.test.js`, retornando al 100% de aprobación (`Tests: 4 passed, 4 total`).
- **Sección en INFORME.md:** Sección 17 (Restauración del Sistema) y Anexo 9.

---

### `11-git-commit.png` — Figura 11: Commit inicial en Git
- **Comando a ejecutar (Terminal Ubuntu/WSL en `monolito/`):**
  ```bash
  git log --oneline -1 && git log -1
  ```
- **Contenido esperado:** Commit `c744c32` con mensaje `"Version inicial del monolito funcionando"`.
- **Sección en INFORME.md:** Sección 18 (Control de Versiones con Git) y Anexo 10.

---

### `12-git-status.png` — Figura 12: Estado limpio de Git y .gitignore
- **Comando a ejecutar (Terminal Ubuntu/WSL en `monolito/`):**
  ```bash
  git status && cat .gitignore
  ```
- **Contenido esperado:** `nothing to commit, working tree clean` y el contenido de `.gitignore` (`node_modules/`, `.env`).
- **Sección en INFORME.md:** Sección 18 (Control de Versiones con Git) y Anexo 10.
