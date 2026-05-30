import { useState } from 'react'

export default function Header({ tema = 'terror', onToggleTema }) {
    const [flipping, setFlipping] = useState(false)

    const secciones = [
        { id: 'sobremi',     label: 'Sobre mí'    },
        { id: 'habilidades', label: 'Habilidades'  },
        { id: 'proyectos',   label: 'Proyectos'    },
        { id: 'experiencia', label: 'Experiencia'  },
        { id: 'contacto',    label: 'Contacto'     },
    ]

    const handleLogoClick = () => {
        if (flipping) return
        setFlipping(true)
        // Cambiamos el tema al medio giro (300ms) — cuando el logo está de canto
        // el usuario no puede ver cuál de los dos logos aparece, así se siente natural
        setTimeout(() => onToggleTema?.(), 300)
        // Quitamos la clase de animación al terminar para poder repetirla
        setTimeout(() => setFlipping(false), 620)
    }

    const logoSrc = tema === 'terror'
        ? '/sprites/LogoTerror.png'
        : '/sprites/LogoAntiTerror.png'

    return (
        <div className="fixed top-0 z-50 w-full bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/8">
            <div className="flex items-center h-20">

                <div className="w-72 flex-shrink-0" />

                <div className="flex-1 flex items-center justify-between px-8">

                    {/* Logo clickeable — coin-flip horizontal al hacer clic */}
                    <button
                        onClick={handleLogoClick}
                        className="focus:outline-none"
                        title="Cambiar lado"
                    >
                        <img
                            src={logoSrc}
                            alt="Logo"
                            className={`h-12 w-auto object-contain transition-none ${flipping ? 'logo-flip' : ''}`}
                        />
                    </button>

                    <div className="flex items-center gap-10">
                        {secciones.map(s => (
                            <button
                                key={s.id}
                                id={`btn-${s.id}`}
                                onClick={() => document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' })}
                                className="relative text-[11px] font-medium uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-200 group"
                            >
                                {s.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-72 flex-shrink-0" />
            </div>
        </div>
    )
}
