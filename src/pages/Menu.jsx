import { useState, useEffect, useRef } from 'react'
import Game from '../components/Game';
import SectionShooter from '../components/SectionShooter';
import Header from '../components/Header';
import SobreMi from '../secciones/SobreMi';
import Habilidades from '../secciones/Habilidades';
import Proyectos from '../secciones/Proyectos';
import Experiencia from '../secciones/Experiencia';
import Contacto from '../secciones/Contacto';

// centered → sección ocupa pantalla completa con contenido centrado
// className → clases extra para casos especiales
function Seccion({ id, bg, children, centered = false, className = '' }) {
    return (
        <section
            id={id}
            className={`flex flex-col scroll-mt-[80px] ${bg} ${centered ? 'min-h-[calc(100vh-80px)]' : ''} ${className}`}
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
    const terrorImgRef = useRef(null)  // ref directo a la imagen del Terror fijo

    useEffect(() => {
        const onScroll = () => {
            setEnSecciones(window.scrollY > window.innerHeight * 0.7)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <Header />

            {/* Terror fijo en el margen izquierdo — cae desde arriba al entrar a secciones */}
            {enSecciones && (
                <div className="fixed left-0 bottom-4 z-40 w-72 flex justify-center pointer-events-none terror-slide-in">
                    <img ref={terrorImgRef} src="/sprites/Terror_Derecha.png" alt="" className="w-64" />
                </div>
            )}

            {/* Botón fijo en el margen derecho — entra desde la derecha */}
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

            {/* Canvas de disparo — recibe el ref directo a la imagen del Terror */}
            <SectionShooter enSecciones={enSecciones} onKill={onKill} terrorImgRef={terrorImgRef} />

            {/* CSS como fallback para el flash inicial antes de que KAPLAY renderice */}
            <section id="hero" className="h-screen relative overflow-hidden bg-[#0e0e10]">
                <Game onKill={onKill} />
            </section>

            <Seccion id="sobremi"     bg="bg-[#0e0e10]" centered><SobreMi /></Seccion>
            <Seccion id="habilidades" bg="bg-[#1a1a1d]" centered><Habilidades /></Seccion>
            <Seccion id="proyectos"   bg="bg-[#0e0e10]" className="min-h-[calc(100vh-80px)]"><Proyectos /></Seccion>
            <Seccion id="experiencia" bg="bg-[#1a1a1d]" centered><Experiencia /></Seccion>
            <Seccion id="contacto"    bg="bg-[#0e0e10]" centered><Contacto /></Seccion>
        </>
    )
}
