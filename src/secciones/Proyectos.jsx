import { useState, useRef, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useInView } from '../hooks/useInView'

const proyectos = [
    {
        titulo: 'Portafolio Personal',
        descripcionBreve: 'Portfolio CS2 temático con juego interactivo',
        descripcion: 'Sitio web personal para mostrar mi experiencia, habilidades y proyectos. Desarrollado con React, Tailwind CSS y KAPLAY, con un diseño moderno y responsivo. Incluye secciones de biografía, habilidades, proyectos destacados y contacto.',
        imagen: '/proyectos/portafolio.png',
        tecnologias: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'KAPLAY'],
        repoUrl: 'https://github.com/SantiagoVazquez21/Portafolio-SantiagoVazquez',
        demoUrl: 'https://portafolio-santiago-vazquez.vercel.app',
    },
    {
        titulo: 'RADEP',
        descripcionBreve: 'Plataforma cloud de acreditación de proveedores',
        descripcion: 'Plataforma web cloud para gestión de acreditación de proveedores en eventos corporativos. Permite a organizadores validar documentación, generar códigos QR de acceso y administrar vendors. Desarrollado para Magnética, empresa de producción de eventos.',
        imagen: '/proyectos/radep.png',
        tecnologias: ['PHP', 'HTML', 'CSS', 'JavaScript', 'AWS RDS', 'AWS S3'],
        repoUrl: 'https://github.com/SantiagoVazquez21/RADEP-Registro-y-Acreditaci-n-de-Proveedores',
        demoUrl: null,
    },
    
]

// Modal de detalle — se abre cuando disparás una card
function ProyectoModal({ proyecto, onClose }) {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-scale-in"
            onClick={onClose}>
            <div className="bg-[#0a0a0c]/95 border border-orange-400/20 rounded-xl overflow-hidden max-w-5xl w-full mx-8 shadow-[0_0_60px_rgba(0,0,0,0.9)]"
                onClick={e => e.stopPropagation()}>

                {/* Imagen del proyecto */}
                <div className="relative h-80 overflow-hidden">
                    {proyecto.imagen
                        ? <img src={proyecto.imagen} alt={proyecto.titulo}
                            className="w-full h-full object-cover object-top" />
                        : <div className="w-full h-full bg-white/5" />
                    }
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
                    <h2 className="absolute bottom-5 left-8 text-4xl font-bold text-white">
                        {proyecto.titulo}
                    </h2>
                </div>

                <div className="p-8 flex flex-col gap-6">

                    {/* Descripción */}
                    <p className="text-gray-300 leading-relaxed text-lg">{proyecto.descripcion}</p>

                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-3">
                        {proyecto.tecnologias.map(tech => (
                            <span key={tech}
                                className="text-sm px-4 py-1.5 bg-orange-400/10 border border-orange-400/30 text-orange-400 rounded font-semibold">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-1">
                        <a data-kill href={proyecto.repoUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded transition-all hover:scale-105">
                            <FaGithub className="text-lg" /> Repositorio
                        </a>
                        {proyecto.demoUrl && (
                            <a data-kill href={proyecto.demoUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-orange-400/20 hover:bg-orange-400/30 border border-orange-400/50 text-orange-400 font-semibold rounded transition-all hover:scale-105">
                                <FaExternalLinkAlt className="text-lg" /> Demo
                            </a>
                        )}
                    </div>

                    <p className="text-gray-700 text-xs uppercase tracking-widest text-right">
                        [ ESC ] para cerrar
                    </p>
                </div>
            </div>
        </div>
    )
}

// Card estilo CS2 map select
function MapCard({ proyecto, onSelect }) {
    const [cardInViewRef, inView] = useInView()
    const btnRef = useRef(null)

    // Ref combinado — une useInView con el ref del botón en un solo callback
    const setRef = (el) => {
        cardInViewRef.current = el
        btnRef.current = el
    }

    // Guardamos el activar en el DOM para que SectionShooter lo llame al llegar la bala
    useEffect(() => {
        if (btnRef.current) {
            btnRef.current._activar = () => onSelect(proyecto)
        }
    })

    return (
        <button
            ref={setRef}
            onClick={() => onSelect(proyecto)}
            className={`proyecto-card-btn relative w-44 h-106 flex-shrink-0 overflow-hidden rounded-none
                border-2 border-white/10 hover:border-white focus:outline-none focus:border-white/10
                transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
        >
            {/* Imagen de fondo */}
            {proyecto.imagen
                ? <img src={proyecto.imagen} alt={proyecto.titulo}
                    className="absolute inset-0 w-full h-full object-cover object-top" />
                : <div className="absolute inset-0 bg-white/5" />
            }

            {/* Gradient — cubre la mitad inferior para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Texto centrado al fondo — igual que los nombres de mapas en CS2 */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 text-center">
                <p className="text-white font-bold text-base leading-tight mb-1">
                    {proyecto.titulo}
                </p>
                <p className="text-gray-300 text-xs leading-snug">
                    {proyecto.descripcionBreve}
                </p>
            </div>
        </button>
    )
}

export default function Proyectos() {
    const [selectedProject, setSelectedProject] = useState(null)

    return (
        <>
            {selectedProject && (
                <ProyectoModal
                    proyecto={selectedProject}
                    onClose={() => {
                        setSelectedProject(null)
                        // Saca el foco del botón para que no quede el borde activo
                        document.activeElement?.blur()
                    }}
                />
            )}

            <div className="max-w-5xl mx-auto px-8 py-4 w-full">
                <h2 className="text-4xl font-bold text-orange-400 mb-6">Proyectos</h2>
                <div className="flex flex-wrap gap-4 justify-start">
                    {proyectos.map(p => (
                        <MapCard key={p.titulo} proyecto={p} onSelect={setSelectedProject} />
                    ))}
                </div>
            </div>
        </>
    )
}
