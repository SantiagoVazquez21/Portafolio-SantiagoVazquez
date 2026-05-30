import { useState, useEffect, useRef } from 'react'
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
    const terrorImgRef = useRef(null)

    // Lee el tema guardado en localStorage, por defecto 'terror'
    const [tema, setTema] = useState(() => localStorage.getItem('aim-tema') ?? 'terror')

    const toggleTema = () => setTema(t => {
        const nuevo = t === 'terror' ? 'antiterror' : 'terror'
        localStorage.setItem('aim-tema', nuevo)  // persiste el tema para la próxima visita
        return nuevo
    })

    // Aplica la clase de tema al body para que las variables CSS cascasen globalmente
    useEffect(() => {
        document.body.classList.remove('theme-terror', 'theme-antiterror')
        document.body.classList.add(`theme-${tema}`)
        return () => document.body.classList.remove('theme-terror', 'theme-antiterror')
    }, [tema])

    useEffect(() => {
        const onScroll = () => setEnSecciones(window.scrollY > window.innerHeight * 0.7)
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
                    <img ref={terrorImgRef} src={spriteMargen} alt="" className="w-64" />
                </div>
            )}

            {enSecciones && (
                <div className="fixed right-0 bottom-4 z-40 w-72 flex justify-center slide-in-right">
                    <button
                        id="btn-inicio"
                        onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}
                        className="flex flex-col items-center gap-1.5 px-6 py-3 border border-orange-400/50 hover:border-orange-400 bg-[#0a0a0c]/90 hover:bg-orange-400/10 text-orange-400 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,26,0.25)]"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Volver al Hero</span>
                    </button>
                </div>
            )}

            <SectionShooter enSecciones={enSecciones} onKill={onKill} terrorImgRef={terrorImgRef} />

            <section id="hero" className="h-screen relative overflow-hidden"
                style={{ backgroundColor: 'var(--theme-bg)' }}>
                <Game onKill={onKill} tema={tema} />
            </section>

            <Seccion id="sobremi"                              centered><SobreMi /></Seccion>
            <Seccion id="habilidades" alt                  centered><Habilidades /></Seccion>
            <Seccion id="proyectos"       className="min-h-[calc(100vh-80px)]"><Proyectos /></Seccion>
            <Seccion id="experiencia" alt                  centered><Experiencia /></Seccion>
            <Seccion id="contacto"                         centered><Contacto /></Seccion>
        </>
    )
}
