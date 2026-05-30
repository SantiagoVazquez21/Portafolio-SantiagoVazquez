import {useRef, useEffect} from 'react';
import kaplay from 'kaplay';

if (import.meta.hot) {
    import.meta.hot.accept(() => {
        window.location.reload()
    })
}

let kaplayInstance = null

function Game({ onKill }) {
    const onKillRef = useRef(null);
    const canvasRef = useRef(null);
    onKillRef.current = onKill;

    useEffect(() => {
        document.documentElement.classList.add('game-active')

        // Mira del DOM
        const mira = document.createElement('div')
        mira.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            z-index: 9999;
            pointer-events: none;
            transform: translate(-50%, -50%);
            top: -100px;
            left: -100px;
        `
        const lineaH = document.createElement('div')
        lineaH.style.cssText = `
            position: absolute;
            width: 30px;
            height: 2px;
            background: #002fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `
        const lineaV = document.createElement('div')
        lineaV.style.cssText = `
            position: absolute;
            width: 2px;
            height: 30px;
            background: #002fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `
        mira.appendChild(lineaH)
        mira.appendChild(lineaV)
        document.body.appendChild(mira)

        let mouseX = 0
        let mouseY = 0

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            mira.style.left = e.clientX + 'px'
            mira.style.top = e.clientY + 'px'
        }
        window.addEventListener('mousemove', onMouseMove)

        // Si había una instancia anterior, la destruimos antes de crear la nueva
        if (kaplayInstance) {
            kaplayInstance.quit()
            kaplayInstance = null
        }

        // Parcheamos addEventListener para que KAPLAY no pueda bloquear el scroll con wheel/touchmove
        const origAddEventListener = EventTarget.prototype.addEventListener
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'wheel' || type === 'touchmove') {
                const newOptions = typeof options === 'object'
                    ? { ...options, passive: true }
                    : { passive: true }
                return origAddEventListener.call(this, type, listener, newOptions)
            }
            return origAddEventListener.call(this, type, listener, options)
        }

        const k = kaplay({
            canvas: canvasRef.current,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            global: false,
        })

        // Restauramos addEventListener después de que KAPLAY terminó de registrar sus listeners
        EventTarget.prototype.addEventListener = origAddEventListener
        kaplayInstance = k

        k.loadSprite("TerrorDerecha", "/sprites/Sprite_TerrorCS_Derecha.png")
        k.loadSprite("TerrorIzquierda", "/sprites/Sprite_TerrorCS_Izquierda.png")
        k.loadSprite("FondoDust2", "/FondoDust2.jpg")

        // Estas variables viven fuera de la escena para que onMouseDown pueda accederlas
        const balas = []
        const bulletHoles = [] // agujeros persistentes — se acumulan hasta que se desmonta el componente
        let terrorRef = null

        const HeadShot = () => {
            const audio = new Audio('/sonidos/CS2_HeadShot_Sonido.mp3')
            audio.volume = 0.2
            audio.play()
        }

        const playShot = () => {
            const audio = new Audio('/sonidos/CS2_AK47_Sonido.mp3')
            audio.volume = 0.2
            audio.play()
        }

        // Usamos window mousedown porque KAPLAY no detecta clicks con elementos DOM encima
        const onMouseDown = () => {
            playShot()
            if (!terrorRef) return
            const dx = mouseX - terrorRef.pos.x
            const dy = mouseY - terrorRef.pos.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            const speed = 5000
            const velX = (dx / dist) * speed
            const velY = (dy / dist) * speed

            // Rotamos la bala para que apunte en la dirección de viaje
            const angle = Math.atan2(velY, velX) * (180 / Math.PI) + 90
            const bala = k.add([
                k.rect(2, 16),
                k.pos(terrorRef.pos.x, terrorRef.pos.y),
                k.color(255, 50, 50),
                k.rotate(angle),
                k.anchor('center'),
            ])
            // Guardamos el destino exacto donde clickeó el usuario
            balas.push({ obj: bala, velX, velY, targetX: mouseX, targetY: mouseY })
        }
        window.addEventListener('mousedown', onMouseDown)

        k.scene("main", () => {
            let direction = 1
            let BASE_Y = k.height() - 255

            k.add([
                {
                    draw() {
                        k.drawSprite({
                            sprite: "FondoDust2",
                            pos: k.vec2(0, 0),
                            width: k.width(),
                            height: k.height(),
                        })
                    },
                    z: -1,
                }
            ])

            const Terror = k.add([
                k.sprite("TerrorDerecha"),
                k.pos(200, BASE_Y),
            ])
            // Guardamos referencia para que onMouseDown pueda usarla
            terrorRef = Terror

            const HOLE_LIFE = 4 // segundos que dura cada agujero en pantalla

            // Objeto persistente que dibuja todos los agujeros y maneja su fade-out
            k.add([{
                draw() {
                    const now = k.time()
                    for (let i = bulletHoles.length - 1; i >= 0; i--) {
                        const hole = bulletHoles[i]
                        const age = now - hole.born

                        // Cuando supera el tiempo de vida, lo eliminamos del array
                        if (age > HOLE_LIFE) {
                            bulletHoles.splice(i, 1)
                            continue
                        }

                        // Fade-out: empieza 1 segundo antes de desaparecer
                        const opacity = age > HOLE_LIFE - 1 ? (HOLE_LIFE - age) : 1

                        k.drawCircle({ pos: k.vec2(hole.x, hole.y), radius: 7, color: k.rgb(10, 10, 10), opacity })
                        k.drawCircle({ pos: k.vec2(hole.x, hole.y), radius: 3, color: k.rgb(0, 0, 0), opacity })
                    }
                }
            }])

            k.onUpdate(() => {
                // Movimiento del Terror
                Terror.pos.x += 150 * direction * k.dt()
                Terror.pos.y = BASE_Y + Math.sin(k.time() * 8) * 15

                if (Terror.pos.x + Terror.width >= k.width()) {
                    direction = -1
                    Terror.use(k.sprite("TerrorIzquierda"))
                }
                if (Terror.pos.x <= 0) {
                    direction = 1
                    Terror.use(k.sprite("TerrorDerecha"))
                }

                // Movimiento y colisión de balas
                for (let i = balas.length - 1; i >= 0; i--) {
                    const b = balas[i]

                    // Calculamos cuánto avanza la bala ESTE frame
                    const stepDist = Math.sqrt(b.velX * b.velX + b.velY * b.velY) * k.dt()
                    const dxT = b.targetX - b.obj.pos.x
                    const dyT = b.targetY - b.obj.pos.y
                    const distToTarget = Math.sqrt(dxT * dxT + dyT * dyT)

                    // Si el avance de este frame supera la distancia restante → llegó al destino
                    if (stepDist >= distToTarget) {
                        bulletHoles.push({ x: b.targetX, y: b.targetY, born: k.time() })
                        b.obj.destroy()
                        balas.splice(i, 1)
                        continue
                    }

                    b.obj.pos.x += b.velX * k.dt()
                    b.obj.pos.y += b.velY * k.dt()

                    // Fallback: si sale de pantalla sin llegar, la destruimos sin agujero
                    if (b.obj.pos.x < 0 || b.obj.pos.x > k.width() ||
                        b.obj.pos.y < 0 || b.obj.pos.y > k.height()) {
                        b.obj.destroy()
                        balas.splice(i, 1)
                        continue
                    }

                    // Colisión con botones del header → scroll a sección
                    const secciones = ['sobremi', 'habilidades', 'proyectos', 'experiencia', 'contacto']
                    for (const id of secciones) {
                        const btn = document.getElementById(`btn-${id}`)
                        if (!btn) continue
                        const rect = btn.getBoundingClientRect()
                        if (b.obj.pos.x >= rect.left && b.obj.pos.x <= rect.right &&
                            b.obj.pos.y >= rect.top  && b.obj.pos.y <= rect.bottom) {
                            bulletHoles.push({ x: b.obj.pos.x, y: b.obj.pos.y, born: k.time() })
                            b.obj.destroy()
                            balas.splice(i, 1)
                            HeadShot()
                            document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
                            onKillRef.current(id)
                            break
                        }
                    }
                }
            })
        })

        k.go("main")

        return () => {
            k.quit()
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            document.body.removeChild(mira)
            document.documentElement.classList.remove('game-active')
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
        />
    )
}

export default Game;
