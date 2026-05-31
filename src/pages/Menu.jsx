import { useState, useEffect, useRef } from 'react'
import { SCROLL_THRESHOLD } from '../constants'
import Game from '../components/Game';
import SectionShooter from '../components/SectionShooter';
import Header from '../components/Header';
import SobreMi from '../secciones/SobreMi';
import Habilidades from '../secciones/Habilidades';
import Proyectos from '../secciones/Proyectos';
import Experiencia from '../secciones/Experiencia';
import Contacto from '../secciones/Contacto';

// alt=true → usa --theme-surface (un tono más claro), false → --theme-bg (fondo principal)
function Seccion({ id, alt = false, children, centered = false, className = '' }) {
    return (
        <section
            id={id}
            style={{ backgroundColor: alt ? 'var(--theme-surface)' : 'var(--theme-bg)' }}
            className={`flex flex-col scroll-mt-[80px] ${centered ? 'min-h-[calc(100vh-80px)]' : ''} ${className}`}
        >
            <div className="flex flex-1">
                <div className="w-72 flex-shrink-0 border-r border-white/10" />
                <div className={`flex-1 flex justify-center ${centered ? 'items-center' : 'py-6'}`}>
                    {children}
                </div>
                <div className="w-72 flex-shrink-0 border-l border-white/10" />
            </div>
        </section>
    )
}

export default function Menu({ onKill }) {
    const [enSecciones, setEnSecciones] = useState(false)
    const [killCount,   setKillCount]   = useState(0)
    const [hp,          setHp]          = useState(100)
    const terrorImgRef = useRef(null)

    const handleMiss = () => setHp(h => Math.max(0, h - 10))

    const [tema, setTema] = useState(() => localStorage.getItem('aim-tema') ?? 'antiterror')

    const toggleTema = () => setTema(t => {
        const nuevo = t === 'terror' ? 'antiterror' : 'terror'
        localStorage.setItem('aim-tema', nuevo)
        return nuevo
    })

    // Wrapper que cuenta kills para el HUD del hero
    const handleKill = (id) => {
        setKillCount(c => c + 1)
        onKill(id, tema)
    }

    // Aplica la clase de tema al body para que las variables CSS cascasen globalmente
    useEffect(() => {
        document.body.classList.remove('theme-terror', 'theme-antiterror')
        document.body.classList.add(`theme-${tema}`)
        return () => document.body.classList.remove('theme-terror', 'theme-antiterror')
    }, [tema])

    useEffect(() => {
        const onScroll = () => setEnSecciones(window.scrollY > window.innerHeight * SCROLL_THRESHOLD)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Sprite del margen izquierdo — AntiTerror_Izquierda porque el archivo Derecha está al revés
    const spriteMargen = tema === 'terror'
        ? '/sprites/Terror_Derecha.png'
        : '/sprites/AntiTerror_Izquierda.png'

    return (
        <>
            <Header tema={tema} onToggleTema={toggleTema} />

            {/* Sprite fijo en el margen izquierdo — cambia con el tema */}
            {enSecciones && (
                <div className="fixed left-0 bottom-4 z-40 w-72 flex justify-center pointer-events-none terror-slide-in">
                    <img ref={terrorImgRef} src={spriteMargen} alt="" className="h-72 w-auto" />
                </div>
            )}

            {enSecciones && (
                <div className="fixed right-0 bottom-4 z-40 w-72 flex justify-center slide-in-right">
                    <button
                        id="btn-inicio"
                        className="flex flex-col items-center gap-2 px-8 py-4 border border-orange-400/50 hover:border-orange-400 bg-[#0a0a0c]/90 hover:bg-orange-400/10 text-orange-400 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,26,0.25)]"
                    >
                        <span className="text-sm uppercase tracking-[0.2em] font-bold">Volver al Hero</span>
                    </button>
                </div>
            )}

            <SectionShooter enSecciones={enSecciones} onKill={handleKill} onMiss={handleMiss} terrorImgRef={terrorImgRef} tema={tema} />

            <section id="hero" className="h-screen relative overflow-hidden"
                style={{ backgroundColor: 'var(--theme-bg)' }}>
                <Game onKill={handleKill} onMiss={handleMiss} tema={tema} />

                {/* Overlay del hero — colores fijos para que se vea en cualquier fondo */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between px-12 pb-10 pt-24">

                    {/* Centro — nombre y rol con backdrop para legibilidad */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center bg-black/40 backdrop-blur-sm px-12 py-8 rounded-2xl border border-white/10">
                            <h1 className="text-8xl font-bold tracking-tight text-white anim-fade drop-shadow-lg"
                                style={{ animationDelay: '0s', fontFamily: 'Rajdhani, sans-serif' }}>
                                Santiago Elian Vazquez
                            </h1>
                            <p className="text-orange-400 text-4xl mt-3 font-bold tracking-wide anim-fade"
                                style={{ animationDelay: '0.2s' }}>
                                Desarrollador Junior
                            </p>
                            <p className="text-gray-200 text-lg mt-4 anim-fade"
                                style={{ animationDelay: '0.4s' }}>
                                Bienvenido a mi portafolio, un espacio donde busco combinar creatividad y profesionalismo
                            </p>
                        </div>
                    </div>

                    {/* HUD inferior — estilo CS2, colores fijos */}
                    <div className="flex items-end justify-between">

                        {/* Izquierda: HP bar dinámica */}
                        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 flex flex-col gap-2">
                            <span className="text-sm uppercase tracking-widest font-bold text-orange-400">
                                ♥ {hp}
                            </span>
                            <div className="w-52 h-2 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full rounded-full bg-orange-400 transition-all duration-300"
                                    style={{ width: `${hp}%` }} />
                            </div>
                            {hp === 0 && (
                                <span className="text-xs uppercase tracking-widest font-semibold text-red-400">
                                    Te falta aim
                                </span>
                            )}
                        </div>

                        {/* Derecha: kill counter */}
                        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-right">
                            <p className="text-xs uppercase tracking-widest text-white font-bold">Secciones visitadas</p>
                            <p className="text-6xl font-bold text-orange-400 mt-1">{killCount}</p>
                        </div>

                    </div>
                </div>
            </section>

            <Seccion id="sobremi"                              centered><SobreMi /></Seccion>
            <Seccion id="habilidades" alt                  centered><Habilidades /></Seccion>
            <Seccion id="proyectos"       className="min-h-[calc(100vh-80px)]"><Proyectos /></Seccion>
            <Seccion id="experiencia" alt                  centered><Experiencia /></Seccion>
            <Seccion id="contacto"                         centered><Contacto /></Seccion>
        </>
    )
}
