import {useRef, useEffect} from 'react';
import kaplay from 'kaplay';
import {useNavigate} from "react-router-dom";

// Le decimos a Vite que recargue la página entera cuando este archivo cambie
// en lugar de hacer HMR, porque KAPLAY necesita reiniciarse desde cero
if (import.meta.hot) {
    import.meta.hot.accept(() => {
        window.location.reload()
    })
}

// Variable de módulo: persiste entre montajes del componente
// Así podemos destruir la instancia anterior antes de crear una nueva
let kaplayInstance = null

function Game({ onKill }) {
    const onKillRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const navigateRef = useRef(null);
    navigateRef.current = navigate;
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
            background: #00ff66;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `
        const lineaV = document.createElement('div')
        lineaV.style.cssText = `
            position: absolute;
            width: 2px;
            height: 30px;
            background: #00ff66;
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

        const k = kaplay({
            canvas: canvasRef.current,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            global: false,
        })
        kaplayInstance = k

        k.loadSprite("TerrorDerecha", "/sprites/Sprite_TerrorCS_Derecha.png")
        k.loadSprite("TerrorIzquierda", "/sprites/Sprite_TerrorCS_Izquierda.png")
        k.loadSprite("FondoDust2", "/FondoDust2.jpg")

        // Estas variables viven fuera de la escena para que onMouseDown pueda accederlas
        const balas = []
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

            const bala = k.add([
                k.rect(2, 16),
                k.pos(terrorRef.pos.x, terrorRef.pos.y),
                k.color(255, 50, 50),
            ])
            balas.push({ obj: bala, velX, velY })
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
                    b.obj.pos.x += b.velX * k.dt()
                    b.obj.pos.y += b.velY * k.dt()

                    if (b.obj.pos.x < 0 || b.obj.pos.x > k.width() ||
                        b.obj.pos.y < 0 || b.obj.pos.y > k.height()) {
                        b.obj.destroy()
                        balas.splice(i, 1)
                        continue
                    }

                    const secciones = ['about', 'skills', 'projects', 'experience', 'contact']
                    for (const id of secciones) {
                        const btn = document.getElementById(`btn-${id}`)
                        if (!btn) continue
                        const rect = btn.getBoundingClientRect()
                        if (b.obj.pos.x >= rect.left && b.obj.pos.x <= rect.right &&
                            b.obj.pos.y >= rect.top  && b.obj.pos.y <= rect.bottom) {
                            b.obj.destroy()
                            balas.splice(i, 1)
                            HeadShot()
                            navigateRef.current(`/${id}`)
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
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'auto',
            }}
        />
    )
}

export default Game;
