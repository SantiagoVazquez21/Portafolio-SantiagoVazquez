# 🎯 Plan reescalado v2 — React + KAPLAY (perfil junior con RN)

> **Reescalado a tu nivel real**: tenés React Native sólido. Saltamos toda la introducción a React/JSX/hooks/eventos porque eso ya lo dominás.
>
> **Decisiones tomadas**:
> - Stack: **Vite + React + Tailwind + React Router + KAPLAY**
> - Flujo: Home = juego con personaje CS, cada sección es una ruta separada (`/about`, `/skills`, etc.)
> - Días 2 y 3 (Tailwind básico/responsive) marcados como **opcionales** porque ya lo manejás
>
> Tiempo realista: **~15 días útiles = 2.5-3 semanas calendario** (1.5 hs/día, 1 día off por semana).

---

## 🚫 Lo que SALTAMOS (ya lo sabés)

- ❌ JSX, componentes, props, default export
- ❌ `useState`, `useEffect`, hooks básicos
- ❌ Event handlers, callbacks
- ❌ `.map()` para listas + keys
- ❌ Conditional rendering (`&&`, ternarios)
- ❌ Destructuring, arrow functions, template literals, spread
- ❌ Estructura modular con imports/exports
- ❌ Tailwind básico (lo estás usando bien sin ayuda)

Si en algún día aparece algo de esto y te quedó alguna duda específica, **preguntame puntual**, no perdamos un día entero repasando.

---

## 📋 Estructura de cada día

- 🎯 **Objetivo**: lo que vas a saber/tener al final
- 📚 **Aprender** (si hay concepto nuevo): el concepto + recurso
- 🛠️ **Hacer**: tarea concreta en `aim-portfolio/`
- ✅ **Listo cuando**: criterio para pasar al día siguiente

---

## 🗓️ FASE 1 — RN → React Web (~2 días útiles)

### ✅ Día 1 — HTML semántico (HECHO)

> Ya completaste este día — moviste el hero a HTML semántico con `<main>`, `<h1>`, `<p>`, `<button>` y Tailwind. Pasaste.

---

### ⏭️ Día 2 — Tailwind básico (OPCIONAL/SKIP)

> Lo estás usando bien sin necesidad de practicarlo. Si querés repaso rápido, mirá la [cheat sheet](https://nerdcave.com/tailwind-cheat-sheet) 5 min y seguís.

---

### ⏭️ Día 3 — Tailwind responsive (OPCIONAL/SKIP)

> Solo necesitás saber los 4 prefijos: `sm:` (≥640px), `md:` (≥768px), `lg:` (≥1024px), `xl:` (≥1280px). Aplicalos cuando hagas falta en cualquier día. No es un día completo.

---

### Día 4 — React Router + Nav fijo

🎯 **Objetivo**: configurar routing (cada sección = una URL distinta) y armar la nav.

📚 **Aprender**: React Router para web. Concepto idéntico a React Navigation que ya usás.

**Mapeo desde RN**:

| React Navigation | React Router |
|---|---|
| `<NavigationContainer>` | `<BrowserRouter>` |
| `<Stack.Screen name="X" component={Y} />` | `<Route path="/x" element={<Y />} />` |
| `navigation.navigate("X")` | `const navigate = useNavigate(); navigate("/x")` |
| `navigation.goBack()` | `navigate(-1)` |

**Mini ejemplo** (no copies — escribilo vos):

```jsx
// En main.jsx, envolvé <App /> con BrowserRouter:
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// En App.jsx:
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}
```

🛠️ **Hacer en tu proyecto**:

1. **Estructura nueva**: creá `src/pages/` con 6 archivos (Home.jsx, About.jsx, Skills.jsx, Projects.jsx, Experience.jsx, Contact.jsx). Cada uno por ahora solo devuelve un `<h1>` con su nombre.

2. **`Home.jsx`**: movéle el contenido actual del hero (tu nombre, rol, botón).

3. **`main.jsx`**: envolvé `<App />` con `<BrowserRouter>`.

4. **`App.jsx`**: ahora solo tiene la nav fija arriba + `<Routes>` con las 6 rutas.

5. **Nav fija arriba** con `<Link>` (NO con `<a>` — el `<a>` recarga la página, `<Link>` no):
```jsx
const sections = [
  { path: '/',           label: 'HOME' },
  { path: '/about',      label: 'ABOUT' },
  { path: '/skills',     label: 'SKILLS' },
  { path: '/projects',   label: 'PROJECTS' },
  { path: '/experience', label: 'EXPERIENCE' },
  { path: '/contact',    label: 'CONTACT' },
]
```

6. En cada página (About, Skills, etc.), agregá un botón "Volver al Home":
```jsx
const navigate = useNavigate()
<button onClick={() => navigate('/')}>← Volver al Home</button>
```

✅ **Listo cuando**:
- La URL cambia cuando clickás los links de la nav
- Cada ruta muestra su componente correspondiente
- El botón "Volver al Home" desde cualquier página vuelve a `/`
- El botón "atrás" del browser funciona

---

## 🗓️ FASE 2 — Llenar el portafolio (3 días)

> Acá ya es contenido real. **Honestidad** = mejor 3 skills reales que 10 inventados.

---

### Día 5 — HOME (hero impactante) + animaciones de entrada

🎯 **Objetivo**: la primera pantalla que te venda en 5 segundos. Con animación de entrada para que se sienta vivo.

#### 📐 Layout sugerido

```
┌─────────────────────────────────────────┐
│                                         │
│         [tagline pequeño, naranja]      │
│         // Junior Developer             │
│                                         │
│        [TU NOMBRE GRANDE]               │
│        Santiago Elian Vazquez           │
│                                         │
│         [frase corta de pitch]          │
│         Apuntá, clickeá, explorá.       │
│                                         │
│              [BOTÓN CTA]                │
│             INICIAR JUEGO →             │
│                                         │
│                ↓ scroll                 │  (chevron animado)
└─────────────────────────────────────────┘
```

#### 💡 Recomendaciones

- **Tagline corto** arriba del nombre (5-10 palabras). Algo identitario.
- **Nombre GRANDE**: `text-6xl md:text-8xl`. Es lo primero que se lee.
- **Frase pitch corta** (no la tecnicatura, eso va en ABOUT). Algo como "Construyendo cosas raras y memorables." o tu propia frase.
- **1 CTA principal**: "INICIAR JUEGO" o "VER PROYECTOS". Mejor un solo botón que tenga peso, no varios competendo.
- **Scroll-indicator** sutil abajo: un `↓` ow chevron que rebota, invitando a explorar.

#### 🎬 Animaciones recomendadas para el hero

**1. Fade-in al cargar (lo más básico, hacelo seguro)**

Opción Tailwind:
```jsx
<h1 className="animate-fade-in opacity-0">...</h1>
/* En index.css agregás: */
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
```

**2. Stagger (escalonado) — los elementos aparecen uno tras otro**

```jsx
<div className="animate-fade-in" style={{ animationDelay: '0s' }}>Tagline</div>
<h1 className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Nombre</h1>
<p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>Pitch</p>
<button className="animate-fade-in" style={{ animationDelay: '0.6s' }}>CTA</button>
```

**3. Typing effect en el nombre o tagline**

Hacelo custom con `useState` + `setInterval` (recomendado, te enseña algo), o usando librería:
```
npm install react-type-animation
```
```jsx
import { TypeAnimation } from 'react-type-animation'
<TypeAnimation sequence={['Junior Developer', 1000, 'CS2 Player', 1000]} repeat={Infinity} />
```

**4. Glow/pulse en el botón CTA**

```jsx
<button className="animate-pulse shadow-lg shadow-orange-500/50">INICIAR</button>
```

O custom con `@keyframes` para un glow más controlado:
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 26, 0.4); }
  50%      { box-shadow: 0 0 40px rgba(255, 107, 26, 0.8); }
}
.glow { animation: glow 2s ease-in-out infinite; }
```

**5. Scroll indicator bounce**

```jsx
<div className="animate-bounce">↓</div>
```

#### 📦 Librerías opcionales para Día 5

| Librería | Para qué |
|---|---|
| **`framer-motion`** | Animaciones declarativas potentes. Es como React Native Reanimated pero web. Recomendado si vas a meter muchas animaciones complejas. |
| **`react-type-animation`** | Typing effect listo y configurable |
| **`lucide-react`** | Iconos modernos (chevron, arrow, etc.) |

Instalación si querés alguna:
```
npm install framer-motion lucide-react
```

#### 💡 Ideas creativas para el hero (opcionales)

- **Cursor custom** ya en el hero (la mira verde de CS siguiendo el mouse): te adelantás al juego
- **Background con grilla sutil** (estética training range): CSS gradient repeating
- **Glitch text effect** en el nombre (CSS keyframes con `clip-path`): muy CS-style
- **Partículas de fondo**: con `tsparticles` o canvas custom (overkill pero llamativo)

#### 🛠️ Hacer

- HOME ocupa pantalla completa (`min-h-screen flex items-center justify-center`)
- Tu nombre GRANDE
- Frase de pitch corta
- Botón CTA con hover state
- Animación de entrada (mínimo fade-in stagger)
- Scroll indicator opcional

✅ **Listo cuando**: si alguien abre tu URL, en 3 segundos sabe **quién sos** y **qué hacés**, y siente que la página está "viva".

---

### Día 6 — ABOUT, SKILLS, CONTACT

🎯 **Objetivo**: el lado "informativo" de tu portafolio. Contenido honesto + algo de polish.

---

#### 📄 ABOUT

##### 💡 Recomendaciones de contenido

Estructura ideal (3 párrafos):

1. **Quién sos y qué hacés** (1 frase identitaria)
   > Soy Santiago, programador junior estudiando en el ISFT 225 y construyendo cosas que se sientan distintas a lo común.

2. **Por qué programación** (qué te trajo acá)
   > Empecé jugando CS2 modificando configs y modelos, y de ahí caí en el código. Encontrar el "por qué" debajo de cada cosa me obsesiona.

3. **Qué buscás ahora** (target laboral)
   > Busco mi primer trabajo formal como developer junior. Stack actual: HTML, CSS, JS, React, React Native.

##### 📐 Layout sugerido

- 2 columnas en desktop: texto a la izquierda, **imagen/avatar/dibujo** a la derecha
- 1 columna en mobile (apilado)
- Bonus: **"Stats"** debajo (años programando, proyectos shipped, tech aprendidas):
```
[1 año]      [3 proyectos]    [6 tech]
programando  shipped          aprendidas
```

##### 🎬 Animaciones recomendadas

- **Scroll-triggered fade-in** cuando la sección entra al viewport
- **Hover lift** en las stats cards (`hover:-translate-y-1 transition-transform`)
- **Counter animation** en las stats: el número sube de 0 al final cuando aparece (lo googleas como "animated counter React")

---

#### ⚒️ SKILLS

##### 💡 Recomendaciones de contenido

**Agrupá por nivel** (sé honesto):

```
🎯 Manejo cómodo
   HTML, CSS, JavaScript, React Native, Git

📚 Aprendiendo activamente
   React, Tailwind, KAPLAY, React Router

👀 Familiarizado / curioso
   TypeScript, Node.js
```

**NO infles**. Si en una entrevista te preguntan por algo que pusiste, tenés que poder responder. Mejor lista corta y verdadera.

##### 📐 Layout sugerido

Opción A — Tags/chips agrupados:
```
[Manejo cómodo]
[HTML] [CSS] [JS] [React Native] [Git]

[Aprendiendo]
[React] [Tailwind] [KAPLAY]
```

Opción B — Grid de cards con icono (más visual):
```
┌────────┐ ┌────────┐ ┌────────┐
│ [Icon] │ │ [Icon] │ │ [Icon] │
│  HTML  │ │  CSS   │ │   JS   │
└────────┘ └────────┘ └────────┘
```

##### 🎬 Animaciones recomendadas

- **Stagger entrance**: cuando entran al viewport, los chips aparecen uno por uno
- **Hover scale + glow**: `hover:scale-110 hover:shadow-orange-500/50`
- **Tooltip** opcional al hover que muestre "estoy aprendiendo X" o similar

##### 📦 Librería para iconos

```
npm install lucide-react
```
```jsx
import { Code, Palette, Zap } from 'lucide-react'
<Code size={32} />
```

O usar `react-icons` que tiene iconos específicos de cada tecnología:
```
npm install react-icons
```
```jsx
import { FaReact, FaHtml5, FaCss3, FaGitAlt } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss } from 'react-icons/si'
```

---

#### 📬 CONTACT

##### 💡 Recomendaciones de contenido

Mínimo:
- Email real
- GitHub real
- LinkedIn real

Opcional pero pro:
- **Form de contacto** (sin backend) usando [Formspree](https://formspree.io) — gratis hasta 50 mensajes/mes
- **Copy-to-clipboard** del email: el reclutador clickea y se copia, no tiene que escribirlo
- **Toast notification** cuando se copia ("Email copiado!")

##### 📐 Layout sugerido

Opción A — Cards de links con icono:
```
┌──────────────────────────────┐
│ 📧 tu@email.com    [Copiar]  │
├──────────────────────────────┤
│ 💻 GitHub          [Abrir →] │
├──────────────────────────────┤
│ 💼 LinkedIn        [Abrir →] │
└──────────────────────────────┘
```

Opción B — Form simple + links abajo:
```
Nombre: [____________]
Email:  [____________]
Mensaje:[____________]
        [Enviar →]

— o contactame directo —
GitHub | LinkedIn | Email
```

##### 🎬 Animaciones recomendadas

- **Border glow on focus** en los inputs del form: `focus:ring-2 focus:ring-orange-500`
- **Toast slide-in** cuando copia el email
- **Button submit state**: cuando se envía, cambia a "Enviando..." → "¡Listo!" → vuelve

##### 📦 Librerías para CONTACT

| Librería | Para qué |
|---|---|
| `react-hot-toast` | Notificaciones tipo "Email copiado" muy fáciles |
| `@formspree/react` | Forms sin backend, manda al email |

Instalación:
```
npm install react-hot-toast
```
```jsx
import toast, { Toaster } from 'react-hot-toast'
<button onClick={() => {
  navigator.clipboard.writeText('tu@email.com')
  toast.success('Email copiado!')
}}>Copiar email</button>
```

---

#### 🛠️ Hacer (en tu proyecto)

- Llenar las 3 páginas con contenido real
- Mínimo una animación por sección (fade-in al cargar es suficiente)
- Bonus: instalar `lucide-react` o `react-icons` para iconos

✅ **Listo cuando**: si un reclutador lo ve, te puede contactar **en 2 clicks** y entiende qué sabés hacer **en 30 segundos**.

---

### Día 7 — PROJECTS + EXPERIENCE

🎯 **Objetivo**: las dos secciones que más miran los reclutadores. Acá ganás o perdés.

---

#### 🚀 PROJECTS

##### 💡 Recomendaciones de contenido

**Mínimo 3 proyectos**:

1. **AIM://Portfolio** (este mismo) — el que estás haciendo
2. **Tu app de React Native** — la de los 18 ejercicios. Subila a GitHub si no está.
3. **Un tercero**: algo más, aunque sea chico. Una calculadora, un to-do, lo que sea.

Por cada proyecto:
- **Título** corto
- **Descripción** en 1-2 oraciones (qué problema resuelve / qué te enseñó)
- **Stack** usado (tags)
- **Link a GitHub** (sí o sí)
- **Link a demo** en vivo (si hay)
- **Screenshot o GIF** (¡esto sube mucho el nivel!)

##### 📐 Layout sugerido

Grid de cards (responsive):

```
┌──────────────────┐  ┌──────────────────┐
│   [Screenshot]   │  │   [Screenshot]   │
│                  │  │                  │
│ AIM://Portfolio  │  │ RN Ejercicios    │
│ [React][Vite]    │  │ [React Native]   │
│ Descripción...   │  │ Descripción...   │
│ [GitHub][Demo]   │  │ [GitHub]         │
└──────────────────┘  └──────────────────┘
```

En mobile: 1 columna. En desktop: 2-3 columnas.

##### 🎬 Animaciones recomendadas

- **Scroll-triggered reveal**: las cards aparecen al entrar al viewport
- **Hover scale**: `hover:scale-105 transition-transform`
- **Image hover**: overlay oscuro con "Ver detalles" al hover (`group` + `group-hover:` en Tailwind)
- **Tag stagger**: los tags de tech aparecen escalonadamente

##### 📦 Cómo conseguir screenshots/GIFs

- Para screenshots: usa la herramienta de captura de Windows (`Win + Shift + S`)
- Para GIFs: [ScreenToGif](https://www.screentogif.com/) (gratis)
- O grabás un video corto y lo convertís a GIF con [ezgif.com](https://ezgif.com/)

##### 💡 Bonus: "Featured Project"

Hacé UN proyecto destacado más grande (full-width) y el resto más chicos. Si tu portafolio es el mejor proyecto, ponelo featured.

---

#### 📅 EXPERIENCE

##### 💡 Recomendaciones de contenido

**Estructura tipo timeline**:

```
📚 EDUCACIÓN
├─ 2025–presente: Tecnicatura en Desarrollo de Software
│  ISFT 225, San Martín
│
└─ [Cursos online] (si tenés)

💼 EXPERIENCIA / PROYECTOS
├─ 2026: Portafolio interactivo CS-style (este mismo proyecto)
│  Stack: React, Tailwind, KAPLAY
│
└─ [Otros]
```

Si recién arrancás sin trabajo formal: **listá cursos, proyectos personales, hackathons, contribuciones a OSS, lo que tengas**. Honestamente. Un reclutador prefiere ver "completó X curso" verdadero que "experiencia 5 años" mentiroso.

##### 📐 Layout sugerido — Timeline vertical

```
●──── 2025-presente ──── ISFT 225
│     Tecnicatura en Desarrollo de Software
│
●──── 2026 ──── AIM://Portfolio
│     Proyecto personal, React + KAPLAY
│
●──── 2025 ──── React Native Course
      Curso de RN con 18 ejercicios
```

##### 🎬 Animaciones recomendadas

- **Line drawing**: la línea vertical "se dibuja" mientras scrolleás
- **Stagger fade-in**: cada entry aparece a medida que entra al viewport
- **Hover en cada entry**: el dot del timeline crece + cambia color

##### 📦 Librería útil

Para scroll-triggered animations bien hechas:

```
npm install framer-motion
```

Ejemplo:
```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Tu contenido
</motion.div>
```

Framer Motion es **EL standard** para animaciones React en 2026. Si lo aprendés acá, lo usás todo el resto de tu carrera.

---

#### 🛠️ Hacer

- Mínimo 3 cards de proyectos con info real
- Timeline o lista de educación/experiencia
- Screenshots/GIFs de al menos 1 proyecto
- Animaciones de scroll-triggered (con Framer Motion o CSS + Intersection Observer)

✅ **Listo cuando**: el portafolio podría reemplazar tu CV en LinkedIn.

---

## 🗓️ FASE 3 — KAPLAY (la chicha real, 7 días)

> Acá viene lo nuevo en serio. KAPLAY es un game framework para canvas.

### Día 8 — KAPLAY hello world en React

🎯 **Objetivo**: tener un canvas con KAPLAY corriendo dentro de un componente React.

📚 **Aprender**: cómo integrar una librería de canvas en React.
- `useRef` — referencia a un elemento del DOM
- `useEffect` con `[]` — corre el código UNA sola vez después del mount
- Cleanup function en `useEffect` para evitar leaks

📺 Recurso: [KAPLAY quick start](https://kaplayjs.com/guides/quick_start/).

🛠️ **Hacer**:
- Crear `src/components/Game.jsx`
- Dentro: un `<canvas ref={canvasRef}>` y un `useEffect` que inicializa KAPLAY
- Por ahora: solo un cuadrado fijo en el canvas
- Usar `Game.jsx` dentro de `Home.jsx`

✅ **Listo cuando**: ves un cuadrado dibujado por KAPLAY en `/`.

---

### Día 9 — Sprite del personaje

🎯 **Objetivo**: cargar y mostrar un sprite pixel-art.

📚 **Aprender**:
- `loadSprite("nombre", "ruta")` — KAPLAY carga la imagen
- `add([sprite("nombre"), pos(x, y)])` — instancia el sprite

🛠️ **Hacer**:
- Conseguir un sprite (Counter-Strike pixel art en itch.io o uno genérico)
- Ponerlo en `public/sprites/`
- Cargarlo con KAPLAY y mostrarlo en la parte inferior

✅ **Listo cuando**: tu personaje aparece estático en pantalla.

---

### Día 10 — Walk animation

🎯 **Objetivo**: el personaje "camina" en el lugar (cambia entre frames).

📚 **Aprender**:
- Sprite sheets: una imagen con varios frames
- `loadSprite` con opción `{ sliceX, sliceY, anims: { walk: { from: 0, to: 3, loop: true } } }`
- `.play("walk")` activa la animación

🛠️ **Hacer**: tu personaje camina en el lugar con animación de 4+ frames.

✅ **Listo cuando**: ves el walk cycle animado, sin moverse de lugar.

---

### Día 11 — Movimiento de punta a punta

🎯 **Objetivo**: el personaje patrulla solo, de izquierda a derecha y vuelve.

📚 **Aprender**:
- `onUpdate(() => ...)` — KAPLAY corre esta función cada frame
- Cambiar `personaje.pos.x` para mover
- Detectar bordes: `if (pos.x > width - 50)`
- `personaje.flipX = true` para invertir el sprite

🛠️ **Hacer**: el personaje camina solo, llega al borde, gira, vuelve.

✅ **Listo cuando**: patrulla infinitamente sin trabarse.

---

### Día 12 — Crosshair + click → bala

🎯 **Objetivo**: cursor custom (mira) + al clickear, sale una bala del personaje.

📚 **Aprender**:
- `cursor: none` en CSS
- Listener de click en KAPLAY
- Math 2D básico: dirección normalizada

```js
const dx = mx - px
const dy = my - py
const dist = Math.sqrt(dx*dx + dy*dy)
const vx = (dx / dist) * velocidad
const vy = (dy / dist) * velocidad
```

🛠️ **Hacer**:
- Mira verde siguiendo el mouse
- Al clickear, una bala sale del personaje hacia la dirección del crosshair
- La bala viaja, sale de pantalla, se destruye

✅ **Listo cuando**: clickeás cualquier parte y ves la bala viajando hacia ese punto.

---

### Día 13 — Hit detection vs botones de la nav

🎯 **Objetivo**: cuando la bala impacta un botón de sección, navega a esa ruta.

📚 **Aprender** (la parte más interesante):
- `element.getBoundingClientRect()` te da las coordenadas del botón en el viewport
- Comparar la posición de la bala vs el rect del botón en cada frame
- Disparar `navigate('/about')` con React Router

```js
const botonRect = document.getElementById('btn-about').getBoundingClientRect()
if (
  balaX >= botonRect.left && balaX <= botonRect.right &&
  balaY >= botonRect.top && balaY <= botonRect.bottom
) {
  navigate('/about')   // ← React Router toma el control
}
```

🛠️ **Hacer**: disparale a "ABOUT" → la URL cambia a `/about` y se muestra esa página.

✅ **Listo cuando**: todos los 6 botones de la nav reaccionan al ser baleados.

---

### Día 14 — Kill feed + sonidos

🎯 **Objetivo**: el cartel estilo CS de "headshot" + audio.

🛠️ **Hacer**:
- Componente `KillFeed` en React que recibe los hits y los muestra arriba a la derecha
- Animación de slide-in + fade-out
- Sonidos: disparo, impacto, headshot
- Para sonidos legales: [Pixabay sounds](https://pixabay.com/sound-effects/) o [Freesound](https://freesound.org/)

```js
const shotSound = new Audio('/sounds/shot.mp3')
shotSound.volume = 0.4
shotSound.play()
```

✅ **Listo cuando**: disparás → sonido shot → impacto → "headshot" sound → cartel arriba a la derecha.

---

## 🗓️ FASE 4 — Deploy (3 días)

### Día 15 — Git + GitHub

🎯 **Objetivo**: el código vive en GitHub.

📚 **Aprender** (si nunca usaste git):
- `git init` inicializa el repo
- `git add .` stagea cambios
- `git commit -m "mensaje"` los registra
- `git push` los sube a GitHub

📺 Recurso: [Mouredev — Git y GitHub desde cero](https://www.youtube.com/@mouredev).

🛠️ **Hacer**:
- Crear repo en GitHub: `aim-portfolio`
- Subir todo el código
- `.gitignore` ya viene con `node_modules` excluido

✅ **Listo cuando**: el repo está en `github.com/tu-usuario/aim-portfolio`.

---

### Día 16 — Deploy en Vercel

🎯 **Objetivo**: tu portafolio en una URL pública.

🛠️ **Hacer**:
- Crear cuenta en [vercel.com](https://vercel.com) (gratis)
- "Import Project" → conectar GitHub → seleccionar repo
- Vercel detecta Vite automáticamente
- Te da una URL: `aim-portfolio-xxx.vercel.app`
- Cada push a GitHub redeploya automáticamente

⚠️ **Importante con React Router**: agregar un `vercel.json` o configurar para que las rutas no-`/` no devuelvan 404 al refrescar:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

✅ **Listo cuando**: mandás el link a alguien y le funciona desde cualquier lado.

---

### Día 17 — Pulido final + revisión

🎯 **Objetivo**: detalles que separan "decente" de "wow".

🛠️ **Hacer**:
- Probar todo en mobile real (el juego en mobile puede no funcionar — pensá un fallback)
- Revisar tipografía: ¿se lee bien? ¿hay buen contraste?
- Revisar performance: Lighthouse score en DevTools
- Meta tags para compartir en redes (Open Graph):
```html
<meta property="og:title" content="AIM://Portfolio - Santiago Vazquez" />
<meta property="og:description" content="Portafolio interactivo CS-style" />
<meta property="og:image" content="/preview.png" />
```
- Pedir feedback a 1-2 personas
- Actualizar tu LinkedIn con el link

✅ **Listo cuando**: vos mismo te mandás el link a tu cuenta secundaria y decís "esto está bueno".

---

## 📊 Resumen visual del plan v2

| Fase | Días | Foco | Output |
|---|---|---|---|
| **1** | 1, 4 | RN → Web + Router | Routing + nav fija |
| **2** | 5, 6, 7 | Contenido + animaciones | Portafolio estático completo |
| **3** | 8-14 | KAPLAY + juego | Mecánica de shooting funcional |
| **4** | 15-17 | Deploy + polish | Sitio público con URL |

(Días 2 y 3 marcados como opcionales/skip)

**Total efectivo**: ~15 días útiles. A 1.5 hs/día con un día off semanal: **2.5-3 semanas calendario**.

---

## 🛑 Reglas simplificadas

1. **No avances de día sin terminar el anterior.** Las fases se construyen sobre las anteriores.
2. **Si algo nuevo aparece y no te suena**, parame y preguntá. No copies sin entender.
3. **El código sale de tus dedos**. Yo ayudo a debuggear, explicar conceptos, dar feedback. No te lo escribo.
4. **Honestidad con el contenido**. Mejor 3 skills reales que 10 que no sabés.

---

## 📚 Resumen de librerías opcionales mencionadas

| Librería | Fase | Para qué |
|---|---|---|
| `lucide-react` | 6-7 | Iconos modernos |
| `react-icons` | 6 | Iconos de tecnologías (React, JS, etc.) |
| `react-hot-toast` | 6 | Notificaciones (copiar email, etc.) |
| `framer-motion` | 5-7 | Animaciones React profesionales |
| `react-type-animation` | 5 | Typing effect |
| `@formspree/react` | 6 | Form de contacto sin backend |

Instalar todas (si querés):
```
npm install lucide-react react-icons react-hot-toast framer-motion react-type-animation @formspree/react
```

**Pero no las instales todas de una.** Sumá según vayas necesitando. Cada librería es peso extra en tu bundle.

---

🎯 **Tu próximo paso**: arrancá el **Día 4** — React Router. Crear `src/pages/` con las 6 páginas, envolver con `<BrowserRouter>`, armar las `<Routes>`, nav fija con `<Link>`.
