import {useRef, useEffect} from 'react';
import kaplay from 'kaplay';

if (import.meta.hot) {
    import.meta.hot.accept(() => {
        window.location.reload()
    })
}

let kaplayInstance = null

function Game({ onKill, tema = 'terror' }) {
    const onKillRef = useRef(null);
    const canvasRef = useRef(null);
    const temaRef   = useRef(tema);
    onKillRef.current = onKill;
    temaRef.current   = tema;

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
            background: #09ff00;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `
        const lineaV = document.createElement('div')
        lineaV.style.cssText = `
            position: absolute;
            width: 2px;
            height: 30px;
            background: #09ff00;
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

        k.loadSprite("TerrorDerecha",      "/sprites/Terror_Derecha.png")
        k.loadSprite("TerrorIzquierda",     "/sprites/Terror_Izquierda.png")
        // Los archivos AntiTerror están nombrados al revés — swapeamos al cargar
        k.loadSprite("AntiTerrorDerecha",   "/sprites/AntiTerror_Izquierda.png")
        k.loadSprite("AntiTerrorIzquierda", "/sprites/AntiTerror_Derecha.png")
        k.loadSprite("AgujeroBala",         "/sprites/AgujeroBala.png")
        k.loadSprite("FondoTerror",     "/fondos/Dust2Fondo.png")
        k.loadSprite("FondoAntiTerror", "/fondos/NukeFondo.png")

        // Estas variables viven fuera de la escena para que onMouseDown pueda accederlas
        const balas = []
        const bulletHoles = [] // agujeros persistentes — se acumulan hasta que se desmonta el componente
        let terrorRef = null
        let directionRef = 1  // 1 = mirando derecha, -1 = mirando izquierda

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
            // Si el usuario scrolleó fuera del hero, el SectionShooter se encarga
            if (window.scrollY > window.innerHeight * 0.7) return

            playShot()
            if (!terrorRef) return

            // Verificamos al momento del click si el cursor está sobre un botón de sección.
            // Usamos 'boton' como label genérico para el killfeed en vez del ID de sección.
            const secciones = ['sobremi', 'habilidades', 'proyectos', 'experiencia', 'contacto']
            for (const id of secciones) {
                const btn = document.getElementById(`btn-${id}`)
                if (!btn) continue
                const rect = btn.getBoundingClientRect()
                if (mouseX >= rect.left && mouseX <= rect.right &&
                    mouseY >= rect.top  && mouseY <= rect.bottom) {
                    HeadShot()
                    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
                    onKillRef.current(id)
                    break
                }
            }

            // Offset del cañón relativo al top-left del sprite.
            // Ajustá estos valores si la bala no sale exactamente del cañón.
            const w = terrorRef.width
            const h = terrorRef.height
            const canion = directionRef === 1
                ? { x: w * 0.95, y: h * 0.24 }   // mirando derecha: cañón en el lado derecho
                : { x: w * 0.05, y: h * 0.24 }   // mirando izquierda: cañón en el lado izquierdo

            const spawnX = terrorRef.pos.x + canion.x
            const spawnY = terrorRef.pos.y + canion.y

            const dx = mouseX - spawnX
            const dy = mouseY - spawnY
            const dist = Math.sqrt(dx * dx + dy * dy)

            const speed = 5000
            const velX = (dx / dist) * speed
            const velY = (dy / dist) * speed

            // Rect invisible — solo sirve para rastrear la posición de la bala
            const bala = k.add([
                k.rect(1, 1),
                k.pos(spawnX, spawnY),
                k.opacity(0),
                k.anchor('center'),
            ])
            // Guardamos el destino exacto donde clickeó el usuario
            balas.push({ obj: bala, velX, velY, targetX: mouseX, targetY: mouseY })
        }
        window.addEventListener('mousedown', onMouseDown)

        k.scene("main", () => {
            let direction = 1
            let BASE_Y = k.height() - 360

            // Fondo — draw() callback dentro de onLoad() garantiza que el sprite
            // ya terminó de cargar antes del primer frame. drawSprite con width/height
            // explícitos cubre exactamente el canvas sin distorsionar el resto.
            k.onLoad(() => {
                k.add([
                    {
                        draw() {
                            // Cambia el fondo según el tema activo — reactivo via temaRef
                            k.drawSprite({
                                sprite: temaRef.current === 'terror' ? "FondoTerror" : "FondoAntiTerror",
                                pos: k.vec2(0, 0),
                                width: k.width(),
                                height: k.height(),
                            })
                        },
                    },
                    k.z(-10),
                ])
            })

            const Terror = k.add([
                k.sprite(temaRef.current === 'terror' ? "TerrorDerecha" : "AntiTerrorDerecha"),
                k.pos(200, BASE_Y),
                k.z(10),
            ])
            // Guardamos referencia para que onMouseDown pueda usarla
            terrorRef = Terror

            const TRAIL_LEN = 45 // longitud del tracer en píxeles

            // Dibuja el tracer de cada bala en vuelo
            k.add([{
                draw() {
                    for (const b of balas) {
                        // velDir normalizado: velX y velY son dir * 5000
                        const dirX = b.velX / 5000
                        const dirY = b.velY / 5000

                        const headX = b.obj.pos.x
                        const headY = b.obj.pos.y
                        const tailX = headX - dirX * TRAIL_LEN
                        const tailY = headY - dirY * TRAIL_LEN

                        // Capa exterior: glow suave amarillo-naranja
                        k.drawLine({
                            p1: k.vec2(tailX, tailY),
                            p2: k.vec2(headX, headY),
                            width: 4,
                            color: k.rgb(255, 160, 20),
                            opacity: 0.25,
                        })
                        // Capa media: núcleo amarillo brillante
                        k.drawLine({
                            p1: k.vec2(tailX, tailY),
                            p2: k.vec2(headX, headY),
                            width: 2,
                            color: k.rgb(255, 220, 80),
                            opacity: 0.85,
                        })
                        // Punta: blanco puro para el destello de impacto
                        k.drawCircle({
                            pos: k.vec2(headX, headY),
                            radius: 2,
                            color: k.rgb(255, 255, 255),
                            opacity: 0.9,
                        })
                    }
                }
            }])

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

                        // Sprite real del agujero de bala con fade-out aplicado
                        k.drawSprite({
                            sprite: "AgujeroBala",
                            pos: k.vec2(hole.x, hole.y),
                            anchor: "center",
                            width: 40,
                            height: 40,
                            opacity,
                        })
                    }
                }
            }])

            // Helpers para obtener el nombre correcto del sprite según el tema actual
            const spriteD = () => temaRef.current === 'terror' ? "TerrorDerecha"    : "AntiTerrorDerecha"
            const spriteI = () => temaRef.current === 'terror' ? "TerrorIzquierda"  : "AntiTerrorIzquierda"

            let lastTema = temaRef.current

            k.onUpdate(() => {
                // Si el tema cambió mid-escena, actualizamos el sprite inmediatamente
                if (temaRef.current !== lastTema) {
                    lastTema = temaRef.current
                    Terror.use(k.sprite(direction === 1 ? spriteD() : spriteI()))
                }

                // Movimiento del personaje
                Terror.pos.x += 150 * direction * k.dt()
                Terror.pos.y = BASE_Y + Math.sin(k.time() * 8) * 15

                if (Terror.pos.x + Terror.width >= k.width()) {
                    direction = -1
                    directionRef = -1
                    Terror.use(k.sprite(spriteI()))
                }
                if (Terror.pos.x <= 0) {
                    direction = 1
                    directionRef = 1
                    Terror.use(k.sprite(spriteD()))
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
