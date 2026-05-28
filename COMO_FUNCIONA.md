# 🔍 Cómo funciona el proyecto — explicación de la base

> Referencia rápida para entender qué hace cada archivo y cómo se conecta todo.
> Volvé acá cuando te olvides para qué servía algo.

---

## 🏗️ El big picture

Cuando corrés `npm run dev`, esto es lo que pasa:

```
Tu browser pide → http://localhost:5173
                    │
                    ▼
              Vite (dev server)
                    │
                    ▼
       Lee index.html → encuentra <script src="/src/main.jsx">
                    │
                    ▼
       Compila main.jsx (y todos sus imports) on-the-fly
                    │
                    ▼
       main.jsx ejecuta → React monta <App /> dentro de #root
                    │
                    ▼
       Tailwind procesa las className= y genera CSS
                    │
                    ▼
       El browser muestra todo en pantalla ✨
```

**HMR (Hot Module Replacement)**: Vite mantiene una conexión abierta con el browser. Cuando guardás un archivo, recompila SOLO lo que cambió y lo manda al browser sin recargar la página. Por eso los cambios se ven al instante.

---

## 🧩 Las 4 piezas del stack

### 1. **Vite** — el "constructor" (bundler)

Vite hace 3 cosas:

| Función | Detalle |
|---|---|
| **Sirve archivos** mientras desarrollás | Con `npm run dev` arranca en `localhost:5173` |
| **Compila JSX a JavaScript** | Los navegadores NO entienden JSX directo |
| **Empaqueta para producción** | Con `npm run build` te deja una carpeta `dist/` lista para deployar |

Sin Vite no podrías escribir JSX ni usar `import` modernos. Es la magia que conecta tu código moderno con el browser.

---

### 2. **React** — la librería de UI

React te deja construir interfaces con **componentes**: funciones que devuelven HTML-ish (JSX) y se pueden reusar.

```jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>
}
```

No tocás el DOM directamente (`document.getElementById`, etc.). React lo hace por vos en base a tus componentes.

> Si venís de React Native, **la mentalidad es idéntica**. Lo que cambia son los elementos (`<View>` → `<div>`) y el styling.

---

### 3. **Tailwind CSS** — utility-first

En vez de escribir CSS aparte, ponés clases utility directo en el JSX:

```jsx
// Antes (CSS aparte):
<div className="caja-azul" />
// .caja-azul { background: blue; padding: 16px; border-radius: 8px; }

// Con Tailwind:
<div className="bg-blue-500 p-4 rounded-lg" />
```

Cada clase = una propiedad CSS específica. Acelera muchísimo el desarrollo cuando lo dominás.

**Cheat sheet rápida** de los utilities más comunes:

| Tailwind | Equivale a |
|---|---|
| `p-4` | `padding: 1rem` (16px) |
| `px-4` | `padding-left: 1rem; padding-right: 1rem` |
| `m-4` | `margin: 1rem` |
| `text-xl` | `font-size: 1.25rem` |
| `font-bold` | `font-weight: 700` |
| `bg-orange-500` | `background: #f97316` |
| `flex` | `display: flex` |
| `justify-center` | `justify-content: center` |
| `items-center` | `align-items: center` |
| `gap-4` | `gap: 1rem` |
| `rounded-lg` | `border-radius: 0.5rem` |
| `hover:bg-red-500` | aplica `bg-red-500` solo en hover |
| `md:text-xl` | aplica `text-xl` solo desde tablet hacia arriba |

Cheat sheet completa: [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

### 4. **KAPLAY** — game framework (instalado pero NO usado todavía)

Es el sucesor de Kaboom.js. Sirve para hacer juegos en canvas con API ultra simple. Cuando llegues a la **Fase 3** del plan, lo vas a importar y usar para el personaje + balas. Por ahora vive en `node_modules/` esperando.

Docs: [https://kaplayjs.com/](https://kaplayjs.com/)

---

## 📁 Tour de la carpeta del proyecto

```
aim-portfolio/
├── public/                ← archivos estáticos
├── src/                   ← acá vive TU código
├── index.html             ← el HTML raíz
├── package.json           ← lista de dependencias
├── package-lock.json      ← versiones exactas (no la toques)
├── vite.config.js         ← configuración de Vite
├── eslint.config.js       ← config del linter (calidad de código)
├── node_modules/          ← las librerías instaladas (1000+ archivos)
├── PLAN_REACT_DIAS.md     ← tu roadmap
├── GETTING_STARTED.md     ← guía de referencia
└── COMO_FUNCIONA.md       ← este archivo
```

---

### 📄 `index.html` — el HTML raíz

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>AIM://PORTFOLIO</title>
  </head>
  <body>
    <div id="root"></div>                              ← React se monta acá
    <script type="module" src="/src/main.jsx"></script>  ← punto de entrada
  </body>
</html>
```

**Clave**: el `<body>` tiene UN solo `<div id="root">` vacío. Todo lo que ves después en pantalla lo inyecta React dentro de ese div.

---

### 📄 `src/main.jsx` — el bootstrap de React

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Línea por línea:

- `import { createRoot } from 'react-dom/client'` — trae la función que conecta React con el DOM
- `import './index.css'` — importa los estilos globales (Tailwind incluido)
- `import App from './App.jsx'` — trae tu componente principal
- `createRoot(...).render(<App />)` — busca el `#root` del HTML, lo "agarra", y le mete `<App />` adentro

**StrictMode** es un wrapper de React que ayuda a detectar problemas en desarrollo. No afecta el resultado visible. En producción se desactiva solo.

**Casi nunca tocás main.jsx.** Es el "encendido", listo.

---

### 📄 `src/App.jsx` — tu componente raíz (donde vivís)

Ahora mismo está mínimo:

```jsx
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          AIM://PORTFOLIO
        </h1>
        <p className="text-gray-400">...</p>
      </div>
    </div>
  )
}

export default App
```

- `function App() { ... }` — un **componente**, que es solo una función que retorna JSX
- `return (...)` — lo que devuelve es lo que se va a renderizar
- `className="min-h-screen flex ..."` — clases de Tailwind (después las desarmás)
- `export default App` — esto permite que otros archivos hagan `import App from './App'`

Este es el archivo que vas a modificar el 90% del tiempo.

---

### 📄 `src/index.css` — estilos globales

```css
@import "tailwindcss";    /* ← acá se importa TODO Tailwind */

:root {
  --color-bg: #0e0e10;
  --color-accent: #ff6b1a;
  ...
}

* { box-sizing: border-box; }   /* ← la regla universal */

html, body, #root {
  margin: 0;
  height: 100%;
  background: var(--color-bg);
  font-family: 'Courier New', Consolas, monospace;
  overflow-x: hidden;
}
```

Es el archivo donde:

- Importás Tailwind con `@import "tailwindcss";` (esa línea hace toda la magia)
- Definís variables CSS globales
- Hacés el reset universal (`* { box-sizing: border-box }`)
- Aplicás estilos al `body` / `html`

---

### 📄 `src/App.css` — actualmente vacío

Como usamos Tailwind, no necesitamos un CSS aparte para el App. Por eso quedó vacío. Si en algún momento querés CSS clásico para un caso específico, va acá.

---

### 📄 `vite.config.js` — config de Vite

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),            // ← le decimos a Vite "manejá JSX y React"
    tailwindcss(),      // ← le decimos a Vite "procesá las clases Tailwind"
  ],
})
```

Es simple: solo le decimos a Vite qué plugins usar. Casi nunca lo tocás.

---

### 📄 `package.json` — la lista de ingredientes

```json
{
  "name": "aim-portfolio",
  "scripts": {
    "dev": "vite",                ← `npm run dev` corre esto
    "build": "vite build",        ← para deployar
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.x",             ← React
    "react-dom": "^19.x",         ← React → DOM
    "kaplay": "^3000.x",          ← game framework
    "tailwindcss": "^4.x",
    "@tailwindcss/vite": "^4.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^8.x",
    "eslint": "..."
  }
}
```

- **scripts**: comandos que podés correr con `npm run <nombre>`
- **dependencies**: librerías que tu app NECESITA para funcionar en producción
- **devDependencies**: solo necesarias mientras desarrollás (Vite, ESLint)

---

### 📁 `node_modules/`

Acá viven las ~150 librerías instaladas (React, KAPLAY, Tailwind, y todas sus dependencias). Es PESADO (~200 MB) pero **no se sube a Git** (`.gitignore` lo bloquea). Si alguien clona tu repo, corre `npm install` y se le recrea todo.

---

### 📁 `public/`

Archivos estáticos que se sirven tal cual están. Ahora tenés `favicon.svg` (el icono de la pestaña del browser) y `icons.svg` (que vino con el template default pero podés borrar).

---

## 🔄 El flujo completo, paso a paso

Cuando guardás un cambio en `App.jsx`:

1. **Vite detecta el cambio** (tiene un watcher de archivos)
2. **Compila el JSX a JavaScript** puro
3. **Procesa Tailwind**: lee qué clases usaste en tu JSX y genera SOLO el CSS necesario para esas clases
4. **Manda el código nuevo al browser** vía WebSocket
5. **React actualiza solo lo que cambió** (no recarga la página entera)
6. **Vos ves el cambio en milisegundos**

Esto es lo que se llama **Hot Module Replacement (HMR)** y es ✨magia✨.

---

## 🎯 Cheat sheet de archivos clave

| Archivo | Para qué sirve | ¿Lo tocás seguido? |
|---|---|---|
| `index.html` | Punto de entrada del browser. Solo tiene un `<div id="root">`. | Casi nunca |
| `src/main.jsx` | Bootstrap: agarra el div root y le mete tu App adentro. | Casi nunca |
| `src/App.jsx` | Tu componente principal. | **El 90% del tiempo** |
| `src/index.css` | Estilos globales + import de Tailwind. | A veces |
| `src/App.css` | Estilos específicos del App (vacío por ahora). | A veces |
| `vite.config.js` | Config de Vite. | Casi nunca |
| `package.json` | Lista de dependencias y comandos. | Cuando instalás algo nuevo |
| `node_modules/` | Las librerías instaladas. | **Nunca** |

---

## ❓ Preguntas frecuentes

### ¿Por qué `App.jsx` y no `App.js`?

La extensión `.jsx` le indica a Vite "este archivo tiene sintaxis JSX". Técnicamente con React podés usar `.js` también, pero `.jsx` es la convención clara.

### ¿Por qué hay tantos archivos en `node_modules`?

React + Vite + KAPLAY + Tailwind dependen de OTRAS librerías, que dependen de otras, etc. Es una cadena. Por suerte npm las maneja por vos.

### ¿Tengo que entender cada librería que se instaló?

No. Solo las 4 principales (React, Vite, Tailwind, KAPLAY). El resto son dependencias técnicas que no vas a tocar.

### ¿Y si quiero agregar otra librería más adelante?

```
npm install nombre-libreria
```

Y listo. Vite la detecta automáticamente. Después la importás en tu código:

```jsx
import algo from 'nombre-libreria'
```

### ¿Cómo paro el dev server?

En la terminal donde está corriendo: `Ctrl + C`.

### ¿Cómo lo vuelvo a arrancar?

Parado en `aim-portfolio/`:
```
npm run dev
```

(Si te tira error de PowerShell: `cmd /c "npm run dev"`)

### ¿Qué hago si pifio algo y se rompe todo?

1. Mirá la consola del navegador (`F12` → Console). El error te dice dónde está el problema.
2. Si no entendés el error, copialo y mostrámelo.
3. **Git te salva**: cuando llegues a la Fase 4 y aprendas Git, vas a poder volver atrás cualquier cambio. Mientras tanto, escribí cambios chicos y guardá seguido para ver si rompe algo.

### ¿Para qué sirve `npm run build`?

Te genera una versión optimizada y minificada del proyecto en la carpeta `dist/`. Eso es lo que subís cuando deployás. Para desarrollo siempre usás `npm run dev`.

---

## 🆘 Cuándo recurrir a este archivo

- Cuando te olvides para qué servía algún archivo
- Cuando quieras saber dónde poner código nuevo
- Cuando algo no anda y querés ubicar dónde está la falla
- Cuando alguien te pregunte qué stack estás usando
- Como referencia rápida cuando volvés al proyecto después de varios días
