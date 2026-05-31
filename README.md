# AIM://PORTFOLIO — Santiago Elian Vazquez

Portfolio personal con estética de CS2. Navegación mediante mecánica de disparo, sistema de temas Terror/AntiTerror y animaciones reactivas.

**[→ Ver en vivo](https://portafolio-santiago-vazquez.vercel.app)**

---

## Stack

| Tecnología | Uso |
|---|---|
| React 19 | UI y estado |
| Vite | Bundler y dev server |
| Tailwind CSS v4 | Estilos |
| KAPLAY | Motor del juego (hero section) |
| EmailJS | Formulario de contacto sin backend |

---

## Features

- **Hero interactivo** — personaje que camina, mira del cursor, sistema de balas con tracer y headshot al navegar
- **Dos temas** — Terror (TT / naranja) y AntiTerror (CT / azul), con sprites, fondos y sonidos distintos. Persiste en `localStorage`
- **HUD de CS2** — barra de HP dinámica (se descuenta por disparos errados), kill counter
- **Sistema de disparo en secciones** — canvas DOM independiente de KAPLAY
- **KillFeed** — notificaciones estilo CS2 con arma según el tema activo
- **Scoreboard** — se abre con `TAB` en la sección Sobre Mí
- **Animaciones de scroll** — IntersectionObserver en todas las secciones
- **Mobile disclaimer** — aviso de diseño desktop-only en pantallas pequeñas

---

## Correrlo localmente

```bash
git clone https://github.com/SantiagoVazquez21/Portafolio-SantiagoVazquez.git
cd Portafolio-SantiagoVazquez
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el browser.

---

## Contacto

**Santiago Elian Vazquez** — Desarrollador Junior · Buenos Aires - santiagoelianvazquez@gmail.com

[LinkedIn](https://www.linkedin.com/in/santiago-vazquez-b266b3374/) · [GitHub](https://github.com/SantiagoVazquez21)
