import { useEffect, useRef } from 'react'
import { SECCIONES, BULLET_SPEED as SPEED, TRAIL_LEN, SCROLL_THRESHOLD } from '../constants'

const NAV_IDS = SECCIONES.map(s => `btn-${s.id}`)

// Calcula la posición del cañón a partir del ref React de la imagen del Terror.
// Usar un ref en vez de querySelector garantiza que tenemos el elemento correcto
// y evita problemas de timing o selectores incorrectos.
function getCanionPos(terrorImgRef, tema) {
    const img = terrorImgRef?.current
    if (!img) return null
    const rect = img.getBoundingClientRect()
    if (!rect.width || !rect.height) return null
    // TT y CT tienen el arma a distinta altura en el sprite
    const esCT = tema === 'antiterror'
    return {
        x: rect.left + rect.width  * (esCT ? 1.01 : 0.95),
        y: rect.top  + rect.height * (esCT ? 0.03 : 0.24),
    }
}

export default function SectionShooter({ enSecciones, onKill, onMiss, terrorImgRef, tema = 'antiterror' }) {
    const canvasRef       = useRef(null)
    const bulletsRef      = useRef([])
    const blockDianaRef   = useRef(false)  // bloquea el click de diana mientras la bala viaja

    // Interceptor en capture phase — bloquea el click de la diana si hay una bala en vuelo hacia ella
    useEffect(() => {
        const intercept = (e) => {
            if (blockDianaRef.current && e.target.closest('.diana-btn')) {
                e.stopPropagation()
                e.preventDefault()
            }
        }
        window.addEventListener('click', intercept, { capture: true })
        return () => window.removeEventListener('click', intercept, { capture: true })
    }, [])

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

                // Llegó al destino — ejecuta la acción pendiente (headshot, scroll, kill)
                if (stepDist >= distToTarget) {
                    if (b.onHit) b.onHit()
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
            const src = tema === 'terror' ? '/sonidos/CS2_AK47_Sonido.mp3' : '/sonidos/M4A1-S_Sonido.mp3'
            const a = new Audio(src); a.volume = 0.2; a.play()
        }
        const playHeadShot = () => {
            const a = new Audio('/sonidos/CS2_HeadShot_Sonido.mp3'); a.volume = 0.2; a.play()
        }

        const onMouseDown = (e) => {
            // Diana: bloquea el click, spawna bala y ejecuta la acción al llegar
            if (e.target.closest('.diana-btn')) {
                const dianaEl = e.target.closest('.diana-btn')
                blockDianaRef.current = true
                const onHit = () => {
                    playHeadShot()
                    blockDianaRef.current = false
                    dianaEl.click()  // dispara el onClick original de la diana
                }
                playShot()
                const canion = getCanionPos(terrorImgRef, tema)
                if (!canion) { blockDianaRef.current = false; return }
                const dx = e.clientX - canion.x
                const dy = e.clientY - canion.y
                const dist = Math.sqrt(dx*dx + dy*dy)
                if (dist === 0) { blockDianaRef.current = false; return }
                bulletsRef.current.push({
                    x: canion.x, y: canion.y,
                    velX: (dx/dist) * SPEED, velY: (dy/dist) * SPEED,
                    targetX: e.clientX, targetY: e.clientY,
                    onHit,
                })
                return
            }

            // Determinamos qué acción ejecutar cuando la bala llegue
            let onHit = null

            if (e.target.closest('#btn-inicio')) {
                onHit = () => {
                    playHeadShot()
                    onKill('hero')
                    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })
                }
            } else {
                for (const btnId of NAV_IDS) {
                    if (e.target.closest(`#${btnId}`)) {
                        const sectionId = btnId.replace('btn-', '')
                        onHit = () => {
                            playHeadShot()
                            onKill(sectionId)
                            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
                        }
                        break
                    }
                }
            }

            if (!onHit && e.target.closest('[data-kill]')) {
                onHit = () => { playHeadShot(); onKill('boton') }
            }

            if (!onHit && e.target.closest('button, a')) {
                onHit = () => playHeadShot()
            }

            // Siempre disparamos — el onHit se ejecuta al llegar
            playShot()
            if (!onHit) onMiss?.()

            const canion = getCanionPos(terrorImgRef, tema)
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
                onHit,  // se ejecuta cuando la bala llega al destino
            })
        }

        window.addEventListener('mousedown', onMouseDown)
        return () => window.removeEventListener('mousedown', onMouseDown)
    }, [enSecciones, onKill, onMiss, tema])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, zIndex: 35, pointerEvents: 'none' }}
        />
    )
}
