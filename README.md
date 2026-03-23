# Appium + BrowserStack — Mobile Test Suite

Suite de pruebas automatizadas mobile para la BrowserStack Sample App (Wikipedia Android), desarrollada con Appium, WebdriverIO y JavaScript.

---

## Tecnologías

- [Appium](https://appium.io/) — framework de automatización mobile
- [WebdriverIO](https://webdriver.io/) — wrapper de Appium para JavaScript
- [BrowserStack App Automate](https://www.browserstack.com/app-automate) — dispositivos reales en la nube
- Node.js 18+
- dotenv — manejo de variables de entorno
- GitHub Actions — ejecución automática en CI/CD

---

## Arquitectura del proyecto
```
appium-browserstack-sample/
├── .github/
│   └── workflows/
│       └── appium.yml            # CI/CD — se ejecuta todos los lunes 15:00 hs ARG
├── config/
│   ├── wdio.base.js              # Configuración base compartida
│   └── wdio.browserstack.js     # Configuración de BrowserStack + capabilities
├── tests/
│   ├── happyPath1.spec.js        # Happy Path 1 — Text Input
│   └── happyPath2.spec.js        # Happy Path 2 — List View
├── helpers/
│   └── gestures.js               # Helpers reutilizables para gestos mobile
├── .env                          # Credenciales BrowserStack (no se sube al repo)
├── .gitignore
├── package.json
└── README.md
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- Cuenta en [BrowserStack](https://www.browserstack.com/) con acceso a App Automate
- Git instalado

---

## Pasos para ejecutar las pruebas

### Paso 1 — Clonar el repositorio
```bash
git clone https://github.com/LeoRosendorn/appium-browserstack-sample.git
cd appium-browserstack-sample
```

### Paso 2 — Instalar dependencias
```bash
npm install
```

### Paso 3 — Configurar variables de entorno

Creá un archivo `.env` en la raíz con tus credenciales de BrowserStack:
```
BROWSERSTACK_USERNAME=tu_username
BROWSERSTACK_ACCESS_KEY=tu_access_key
```

Podés encontrar estas credenciales en:
`https://www.browserstack.com/accounts/settings`

### Paso 4 — Subir la app a BrowserStack
```bash
curl.exe -u "TU_USERNAME:TU_ACCESS_KEY" -X POST "https://api-cloud.browserstack.com/app-automate/upload" -F "url=https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk" -F "custom_id=SampleApp"
```

Copiá el `app_url` que devuelve (formato `bs://xxxxx`) y actualizalo en `config/wdio.browserstack.js`.

### Paso 5 — Ejecutar los tests
```bash
npm test
```

---

## Tests incluidos

| Archivo | Descripción | Escenarios |
|---|---|---|
| `happyPath1.spec.js` | Navegación a Text Input y escritura | 2 |
| `happyPath2.spec.js` | Navegación a List View y verificación de items | 2 |

---

## CI/CD — GitHub Actions

El workflow corre automáticamente **todos los lunes a las 15:00 hs (hora Argentina, GMT-3)**.

Las credenciales de BrowserStack se configuran como **GitHub Secrets**:
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

---

## Decisiones técnicas

### ¿Por qué WebdriverIO y no Appium directo?

WebdriverIO es un wrapper de alto nivel sobre Appium que simplifica la configuración, el manejo de capabilities y la integración con BrowserStack. Tiene soporte nativo para `@wdio/browserstack-service` que maneja automáticamente la sesión, los logs y los reportes en el dashboard de BrowserStack.

### ¿Por qué separar wdio.base.js de wdio.browserstack.js?

`wdio.base.js` centraliza la configuración común (framework, reporters, timeouts). `wdio.browserstack.js` extiende esa base con las credenciales y capabilities específicas de BrowserStack. Si en el futuro se agrega ejecución local con un emulador, solo se necesita un `wdio.local.js` que extienda la misma base.

### ¿Por qué helpers/gestures.js?

Los gestos mobile (scroll, tap, setValue) son operaciones repetitivas. Centralizarlos en helpers evita duplicación y hace que los tests sean más legibles — describen el comportamiento, no los detalles de implementación.

---

## Preguntas extra

### Si la suite creciera a 500 tests, ¿qué cambiarías?

Con 500 tests mobile, los cambios principales serían:

**Paralelismo en BrowserStack:** BrowserStack permite correr tests en múltiples dispositivos en paralelo. Con `maxInstances: 5` y capabilities para diferentes dispositivos (Samsung, Pixel, iPhone), se puede cubrir una matriz de dispositivos completa sin multiplicar el tiempo de ejecución.

**Page Objects para mobile:** Igual que en web, crearía Page Objects para cada pantalla de la app. Cuando la app cambia un elemento, solo se actualiza el Page Object correspondiente.

**Tagging por tipo:** Tags como `@smoke`, `@regression`, `@android`, `@ios` para poder filtrar qué tests correr según el contexto del pipeline.

**App versioning:** Con 500 tests, distintas builds de la app deben mapearse a distintos `app_url` en BrowserStack. Automatizaría el upload de la app como parte del pipeline de CI y pasaría el `app_url` como variable de entorno.

### Si hay flakiness en un test mobile, ¿cómo lo manejarías?

El flakiness en mobile tiene causas específicas distintas a web:

**1. Timing de la app:** Las apps mobile tienen animaciones y transiciones que pueden hacer que elementos no estén listos. Siempre uso `waitForDisplayed()` con timeout explícito, nunca `driver.pause()` con valor fijo.

**2. Teclado virtual:** En Android, el teclado puede tapar elementos. Agrego `driver.hideKeyboard()` después de cada `setValue()` cuando el siguiente paso requiere ver la pantalla completa.

**3. Dispositivo específico:** A veces un test falla solo en cierto dispositivo por diferencias de OS o resolución. BrowserStack guarda video y logs de cada sesión — reviso esos primero antes de tocar el código.

**4. Retries diferenciados:** En CI uso `retries: 2` para mobile (los dispositivos reales tienen más variabilidad de red), pero documento cada retry como señal de alerta para investigar.

---

## Autor

**Leonardo Rosendorn** — QA Automation Engineer
[GitHub](https://github.com/LeoRosendorn)