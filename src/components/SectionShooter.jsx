import { useEffect, useRef } from 'react'

const SPEED     = 5000  // px/s — igual que en el hero
const TRAIL_LEN = 45    // longitud del tracer en px

// IDs de los botones de navegación del header
const NAV_IDS = ['btn-sobremi', 'btn-habilidades', 'btn-proyectos', 'btn-experiencia', 'btn-contacto']

// Calcula la posición del cañón a partir del ref React de la imagen del Terror.
// Usar un ref en vez de querySelector garantiza que tenemos el elemento correcto
// y evita problemas de timing o selectores incorrectos.
function getCanionPos(terrorImgRef) {
    const img = terrorImgRef?.current
    if (!img) return null
    const rect = img.getBoundingClientRect()
    if (!rect.width || !rect.height) return null
    return {
        x: rect.left + rect.width  * 0.95,  // cañón en el lado derecho del sprite
        y: rect.top  + rect.height * 0.24,  // altura aproximada del arma
    }
}

export default function SectionShooter({ enSecciones, onKill, terrorImgRef }) {
    const canvasRef  = useRef(null)
    const bulletsRef = useRef([])  // balas en vuelo: { x, y, velX, velY, targetX, targetY }

    // Resize del canvas al viewport
    useEffect(() => {
        const canvas = canvasRef.current
        const resize = () => {
            canvas.width  = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    // Loop de dibujo — replica exactamente el sistema de balas del hero (KAPLAY)
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx    = canvas.getContext('2d')
        let rafId
        let prev = null

        const loop = (timestamp) => {
            const now = timestamp / 1000
            const dt  = prev != null ? now - prev : 0
            prev = now

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // ── Balas en vuelo ──
            for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
                const b = bulletsRef.current[i]

                // Calculamos cuánto avanza la bala este frame (igual que Game.jsx)
                const stepDist    = Math.sqrt(b.velX * b.velX + b.velY * b.velY) * dt
                const dxT         = b.targetX - b.x
                const dyT         = b.targetY - b.y
                const distToTarget = Math.sqrt(dxT * dxT + dyT * dyT)

                // Si el avance supera la distancia restante → llegó al destino, sin agujero
                if (stepDist >= distToTarget) {
                    bulletsRef.current.splice(i, 1)
                    continue
                }

                b.x += b.velX * dt
                b.y += b.velY * dt

                // Fallback: sale de pantalla sin llegar → destruir sin agujero
                if (b.x < -50 || b.x > canvas.width + 50 || b.y < -50 || b.y > canvas.height + 50) {
                    bulletsRef.current.splice(i, 1)
                    continue
                }

                // ── Tracer (mismas 3 capas que en Game.jsx) ──
                const dirX = b.velX / SPEED
                const dirY = b.velY / SPEED
                const tailX = b.x - dirX * TRAIL_LEN
                const tailY = b.y - dirY * TRAIL_LEN

                // Capa exterior: glow suave naranja
                ctx.lineWidth   = 4
                ctx.strokeStyle = 'rgba(255,160,20,0.25)'
                ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(b.x, b.y); ctx.stroke()

                // Capa media: núcleo amarillo brillante
                ctx.lineWidth   = 2
                ctx.strokeStyle = 'rgba(255,220,80,0.85)'
                ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(b.x, b.y); ctx.stroke()

                // Punta: círculo blanco
                ctx.fillStyle = 'rgba(255,255,255,0.9)'
                ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, Math.PI * 2); ctx.fill()
            }

            rafId = requestAnimationFrame(loop)
        }

        rafId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(rafId)
    }, [])

    // Handler de disparo — solo activo cuando el usuario está en secciones
    useEffect(() => {
        if (!enSecciones) return

        const playShot = () => {
            const a = new Audio('/sonidos/CS2_AK47_Sonido.mp3'); a.volume = 0.2; a.play()
        }
        const playHeadShot = () => {
            const a = new Audio('/sonidos/CS2_HeadShot_Sonido.mp3'); a.volume = 0.2; a.play()
        }

        const onMouseDown = (e) => {
            // Diana: headshot sin killfeed, sin tracer
            if (e.target.closest('.diana-btn')) { playHeadShot(); return }

            // Botón "Inicio" → headshot + killfeed "Hero", sin tracer
            if (e.target.closest('#btn-inicio')) { playHeadShot(); onKill('hero'); return }

            // Nav buttons del header → headshot + killfeed con el nombre de la sección
            for (const btnId of NAV_IDS) {
                if (e.target.closest(`#${btnId}`)) {
                    playHeadShot()
                    onKill(btnId.replace('btn-', ''))  // 'btn-sobremi' → 'sobremi'
                    return
                }
            }

            // Elementos marcados explícitamente con data-kill → headshot + killfeed "Boton", sin tracer
            // Usamos data-kill en GitHub links, botón enviar, etc. para evitar falsos positivos
            if (e.target.closest('[data-kill]')) { playHeadShot(); onKill('boton'); return }

            // Click en zona libre → disparo normal con tracer
            playShot()
            const canion = getCanionPos(terrorImgRef)
            if (!canion) return

            const dx   = e.clientX - canion.x
            const dy   = e.clientY - canion.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist === 0) return

            bulletsRef.current.push({
                x: canion.x,   y: canion.y,
                velX: (dx / dist) * SPEED,
                velY: (dy / dist) * SPEED,
                targetX: e.clientX,
                targetY: e.clientY,
            })
        }

        window.addEventListener('mousedown', onMouseDown)
        return () => window.removeEventListener('mousedown', onMouseDown)
    }, [enSecciones, onKill])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, zIndex: 35, pointerEvents: 'none' }}
        />
    )
}
