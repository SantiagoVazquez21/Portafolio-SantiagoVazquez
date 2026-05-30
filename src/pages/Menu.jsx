import Game from '../components/Game';
import Header from '../components/Header';
import SobreMi from '../secciones/SobreMi';
import Habilidades from '../secciones/Habilidades';
import Proyectos from '../secciones/Proyectos';
import Experiencia from '../secciones/Experiencia';
import Contacto from '../secciones/Contacto';

// centered → sección ocupa pantalla completa con contenido centrado (levemente hacia arriba)
// className → clases extra para casos especiales
function Seccion({ id, bg, children, centered = false, className = '' }) {
    return (
        <section
            id={id}
            className={`flex flex-col scroll-mt-[80px] ${bg} ${centered ? 'min-h-[calc(100vh-80px)]' : ''} ${className}`}
        >
            <div className="flex flex-1">
                <div className="w-24 flex-shrink-0 border-r border-white/10" />
                <div className={`flex-1 flex justify-center ${centered ? 'items-center' : 'py-6'}`}>
                    {children}
                </div>
                <div className="w-24 flex-shrink-0 border-l border-white/10" />
            </div>
        </section>
    )
}

export default function Menu({ onKill }) {
    return (
        <>
            <Header />

            {/* CSS como fallback para el flash inicial antes de que KAPLAY renderice */}
            <section id="hero" className="h-screen relative overflow-hidden bg-[#0e0e10]">
                <Game onKill={onKill} />
            </section>

            {/* centered: ocupa pantalla entera y centra el contenido */}
            <Seccion id="sobremi"     bg="bg-[#0e0e10]" centered><SobreMi /></Seccion>
            <Seccion id="habilidades" bg="bg-[#1a1a1d]" centered><Habilidades /></Seccion>
            <Seccion id="proyectos"   bg="bg-[#0e0e10]" className="min-h-[calc(100vh-80px)]"><Proyectos /></Seccion>
            <Seccion id="experiencia" bg="bg-[#1a1a1d]" centered><Experiencia /></Seccion>
            <Seccion id="contacto"    bg="bg-[#0e0e10]" centered><Contacto /></Seccion>
        </>
    )
}
