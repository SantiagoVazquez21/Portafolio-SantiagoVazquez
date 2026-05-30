export default function Header() {

    const secciones = [
        { id: 'sobremi',    label: 'Sobre mí'    },
        { id: 'habilidades', label: 'Habilidades' },
        { id: 'proyectos',  label: 'Proyectos'   },
        { id: 'experiencia', label: 'Experiencia' },
        { id: 'contacto',   label: 'Contacto'    },
    ]

    return (
        <div className="fixed top-0 z-50 w-full bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/8">
            <div className="flex items-center h-20">

                {/* Columna izquierda — espeja el ancho de la columna Terror */}
                <div className="w-72 flex-shrink-0" />

                {/* Área de contenido central — logo izquierda, nav derecha */}
                <div className="flex-1 flex items-center justify-between px-8">
                    <img
                        src="/sprites/LogoTerror.png"
                        alt="AIM"
                        className="h-12 w-auto object-contain"
                    />

                    <div className="flex items-center gap-10">
                        {secciones.map(s => (
                            <button
                                key={s.id}
                                id={`btn-${s.id}`}
                                onClick={() => document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' })}
                                className="relative text-[11px] font-medium uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-200 group"
                            >
                                {s.label}
                                {/* Línea naranja que crece desde la izquierda al hover */}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Columna derecha — espeja el ancho de la columna Logo */}
                <div className="w-72 flex-shrink-0" />

            </div>
        </div>
    )
}
