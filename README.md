# Karate Appium Liverpool

Este proyecto contiene una suite base de automatización mobile para Android sobre la app de Liverpool. La implementación usa Karate DSL, Appium, UiAutomator2, Java, Maven, JUnit 5, BDD y Page Object Model.

La suite está diseñada para que cada escenario se ejecute de forma independiente. Cada prueba inicia una nueva sesión de Appium, abre la aplicación desde cero y evita que el estado de una ejecución afecte a las siguientes. La prioridad del framework es mantener pruebas estables, repetibles y fáciles de mantener.

## Stack

* Java 11+
* Maven
* Karate DSL
* JUnit 5
* Appium 2
* Android UiAutomator2
* Android SDK / ADB
* Page Object Model con selectores centralizados por página

## Estructura

```text
karate-appium-liverpool/
├── pom.xml
├── README.md
├── .gitignore
├── src/test/java/runners/AndroidTestRunner.java
├── src/test/java/features/
│   ├── 01_select_store.feature
│   ├── 02_search_product_add_to_bag.feature
│   ├── 03_login.feature
│   └── 04_add_product_to_wishlist.feature
├── src/test/java/pages/
│   ├── BasePage.js
│   ├── PermissionPage.js
│   ├── HomePage.js
│   ├── StorePage.js
│   ├── SearchResultsPage.js
│   ├── ProductPage.js
│   ├── LoginPage.js
│   ├── AccountPage.js
│   └── WishlistPage.js
└── src/test/resources/
    ├── karate-config.js
    ├── test-data/users.json
    └── apps/.gitkeep
```

## Requisitos previos

Antes de ejecutar la suite, el ambiente debe contar con los siguientes componentes:

1. Java 11 o superior configurado con `JAVA_HOME`.
2. Maven instalado y disponible desde consola.

```bash
mvn -v
```

3. Android SDK configurado con `ANDROID_HOME` o `ANDROID_SDK_ROOT`.
4. Un emulador o dispositivo Android conectado.
5. Appium y el driver UiAutomator2 instalados.

```bash
npm install -g appium
appium driver install uiautomator2
```

6. Appium iniciado.

```bash
appium --allow-cors
```

7. Dispositivo Android detectado por ADB.

```bash
adb devices
```

## APK

El APK debe colocarse en la siguiente ruta:

```text
src/test/resources/apps/9.0.8.apk
```

La ruta del APK también puede definirse mediante variable de ambiente:

```bash
APPIUM_APP="D:\Users\4kiir\Downloads\9.0.8.apk"
mvn test
```

O mediante propiedad Maven:

```bash
mvn test -Dappium.app="D:\Users\4kiir\Downloads\9.0.8.apk"
```

## Capabilities

La configuración de Appium se encuentra en:

```text
src/test/resources/karate-config.js
```

Capabilities base:

```json
{
  "platformName": "Android",
  "appium:platformVersion": "12.0",
  "appium:deviceName": "emulator-5554",
  "appium:automationName": "UiAutomator2",
  "appium:appPackage": "mx.com.liverpool.shoppingapp",
  "appium:appActivity": ".icon.AppIcon",
  "appium:appWaitActivity": "*",
  "appium:noReset": false,
  "appium:fullReset": false,
  "appium:newCommandTimeout": 300
}
```

Valores configurables:

| Valor             | Variable de ambiente      | Propiedad Maven                |
| ----------------- | ------------------------- | ------------------------------ |
| Appium server URL | `APPIUM_SERVER_URL`       | `-Dappium.serverUrl=...`       |
| Device name       | `APPIUM_DEVICE_NAME`      | `-Dappium.deviceName=...`      |
| Platform version  | `APPIUM_PLATFORM_VERSION` | `-Dappium.platformVersion=...` |
| APK path          | `APPIUM_APP`              | `-Dappium.app=...`             |

Ejemplo:

```bash
mvn test -Dappium.serverUrl="http://127.0.0.1:4723" -Dappium.deviceName="emulator-5554" -Dappium.platformVersion="12.0"
```

Para instalaciones que exponen Appium bajo `/wd/hub`, usar:

```bash
mvn test -Dappium.serverUrl="http://127.0.0.1:4723/wd/hub"
```

## Ejecución

Ejecutar todos los escenarios:

```bash
mvn test
```

Ejecutar un feature específico:

```bash
mvn test -Dkarate.options="classpath:features/03_login.feature"
```

## Datos de prueba

Los datos de prueba se leen desde:

```text
src/test/resources/test-data/users.json
```

Los archivos `.feature` no contienen credenciales hardcodeadas. Para repositorios públicos, las credenciales sensibles deben manejarse mediante variables de ambiente o mediante archivos locales excluidos del control de versiones.

## Independencia entre escenarios

Cada escenario se ejecuta de forma aislada.

Durante el inicio de cada prueba, la suite:

* Cierra cualquier sesión previa de Appium.
* Inicia una nueva sesión.
* Abre la app desde cero.
* Ejecuta `terminateApp()` y `activateApp()`.
* Maneja permisos y onboarding cuando están presentes.
* Evita depender del login, tienda, bolsa, wishlist o navegación generada por otro escenario.

El caso de Wishlist realiza el login como precondición propia mediante:

```text
AccountPage.loginIfNeeded(email, password)
```

## Estrategia de esperas

Todas las interacciones pasan por `BasePage.js`.

La suite usa esperas explícitas para sincronizar la automatización con la carga real de la app. Esto evita interacciones prematuras con elementos que todavía no están disponibles.

Reglas aplicadas:

* Elementos requeridos: timeout máximo de 30 segundos.
* Popups opcionales: timeout máximo de 5 segundos.
* No se usan esperas fijas largas antes de las acciones.
* Cada click espera primero a que el elemento exista.
* Cada input espera primero a que el campo exista.
* Cada validación espera primero a que el elemento exista.
* Cada navegación valida que la pantalla esperada cargó correctamente.
* Los elementos fuera de pantalla se buscan con `scrollUntilVisible()` antes de interactuar.
* Cuando un elemento no aparece, el error muestra el locator faltante.

Helpers principales:

```javascript
base.waitForElement(locator, 30);
base.waitAndClick(locator, 30);
base.waitAndInput(locator, value, 30);
base.waitForText(locator, expectedText, 30);
base.clickIfPresent(locator, 5);
base.waitAndClickAfterScroll(locator, 8);
```

## Evidencias

Karate genera los reportes de ejecución en:

```text
target/karate-reports/
```

Cuando un escenario falla, `karate-config.js` adjunta un screenshot al reporte usando:

```javascript
driver.screenshot()
```

## TODOs intencionales

El proyecto mantiene placeholders explícitos en los puntos donde aún faltan selectores estables inspeccionados desde la app.

Pendientes documentados:

* `AccountPage.js`: selector estable post-login para validar sesión iniciada.
* `ProductPage.js`: selector estable del item dentro de la bolsa.
* `WishlistPage.js`: selector estable del item dentro de Mi Wishlist.
* `SearchResultsPage.js`: selector estable para abrir productos distintos al Karcher documentado.

No se agregaron selectores no validados. Cuando falta un selector, el código conserva un `TODO` claro para completarlo durante la inspección.

## Troubleshooting

### Appium server no disponible

Appium debe estar corriendo antes de ejecutar la suite:

```bash
appium --allow-cors
```

La URL usada por el proyecto se define mediante `APPIUM_SERVER_URL` o `-Dappium.serverUrl`.

### Dispositivo no detectado

El dispositivo debe aparecer en la salida de:

```bash
adb devices
```

Cuando el dispositivo no aparece, el emulador debe estar encendido y correctamente conectado a ADB. En dispositivos físicos, los drivers USB y la depuración USB deben estar habilitados.

### APK no encontrado

El APK debe existir en:

```text
src/test/resources/apps/9.0.8.apk
```

También puede definirse desde Maven:

```bash
mvn test -Dappium.app="D:\ruta\local\9.0.8.apk"
```

### Elemento no visible

Cuando un elemento no aparece, el reporte muestra el locator que no fue encontrado. El primer punto de revisión es confirmar si apareció un popup nuevo o si el selector cambió en la app.

Los popups iniciales se manejan desde:

```text
PermissionPage.js
HomePage.js
```

### Scroll no encuentra botón

`BasePage.scrollUntilVisible(locator, maxScrolls)` usa `mobile: scrollGesture`.

Los parámetros de scroll se controlan desde `BasePage.js`:

```javascript
top
height
percent
```

Estos valores deben corresponder al viewport del dispositivo o emulador usado en la ejecución.

### Login tarda en cargar

El flujo de login depende de la carga del contenido dentro de la app. `LoginPage.waitForLogin()` controla la espera de los elementos requeridos del formulario.

Cuando el login no carga, se debe validar:

* Conectividad del dispositivo.
* Disponibilidad del ambiente.
* Estado del usuario de prueba.
* Contexto de la pantalla abierta dentro de la app.

### Wishlist requiere sesión iniciada

El feature `04_add_product_to_wishlist.feature` ejecuta login en el Background antes de agregar productos a Wishlist.

La estabilidad de este flujo depende de que el login funcione correctamente en:

```text
03_login.feature
```

### Estado previo de app interfiere con el test

La suite usa:

```json
"appium:noReset": false
```

Además, cada escenario crea una nueva sesión y abre la app desde cero.

Cuando el estado persiste por almacenamiento local de la app, la limpieza adicional debe implementarse de forma reutilizable desde `BasePage.js` o desde la configuración previa a la sesión Appium.

