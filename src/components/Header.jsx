import { useState } from 'react'
import { SECCIONES } from '../constants'

export default function Header({ tema = 'terror', onToggleTema }) {
    const [flipping, setFlipping] = useState(false)
    const [glowing,  setGlowing]  = useState(false)

    const handleLogoClick = () => {
        if (flipping) return
        setFlipping(true)
        setGlowing(false)
        // Cambia el tema al medio giro — el logo está de canto y no se ve cuál es
        setTimeout(() => onToggleTema?.(), 300)
        // Al terminar el flip: sacamos el flip y disparamos el glow del nuevo tema
        setTimeout(() => {
            setFlipping(false)
            setGlowing(true)
        }, 620)
        // Apagamos el glow después de que termina su animación
        setTimeout(() => setGlowing(false), 1350)
    }

    const logoSrc = tema === 'terror'
        ? '/sprites/LogoTerror.png'
        : '/sprites/LogoAntiTerror.png'

    return (
        <div className="fixed top-0 z-50 w-full bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/8">
            <div className="flex items-center h-20">

                <div className="w-72 flex-shrink-0" />

                <div className="flex-1 flex items-center justify-between px-8">

                    <button
                        onClick={handleLogoClick}
                        className="focus:outline-none transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_10px_var(--theme-primary)]"
                        title="Cambiar lado"
                    >
                        <img
                            src={logoSrc}
                            alt="Logo"
                            className={`h-12 w-auto object-contain transition-none ${flipping ? 'logo-flip' : ''} ${glowing ? 'logo-glow' : ''}`}
                        />
                    </button>

                    <div className="flex items-center gap-10">
                        {SECCIONES.map(s => (
                            <button
                                key={s.id}
                                id={`btn-${s.id}`}
                                className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-widest
                                    border border-orange-400/30 text-orange-400/60
                                    hover:border-orange-400 hover:text-orange-400 hover:bg-orange-400/10
                                    hover:shadow-[0_0_12px_rgba(255,165,0,0.2)]
                                    transition-all duration-200"
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-72 flex-shrink-0" />
            </div>
        </div>
    )
}
