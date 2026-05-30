import { useState, useEffect, useRef } from 'react'
import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaGithub, FaFigma, FaPython, FaPhp, FaGamepad, FaUsers } from 'react-icons/fa'
import { SiJavascript, SiTailwindcss, SiMysql, SiArduino, SiVite, SiDotnet } from 'react-icons/si'

const MAX_VISIBLE = 4

// Cuando tengas las imágenes, agregá img: '/logos/html.png' al objeto
// y automáticamente usará la imagen en vez del ícono de react-icons
const cards = [
    {
        titulo: 'Frontend',
        logos: [
            { icon: <FaHtml5 color="#E34F26" />, label: 'HTML' },
            { icon: <FaCss3Alt color="#1572B6" />, label: 'CSS' },
            { icon: <SiJavascript color="#F7DF1E" />, label: 'JavaScript' },
            { icon: <FaReact color="#61DAFB" />, label: 'React' },
            { icon: <FaReact color="#61DAFB" />, label: 'React Native' },
            { icon: <SiTailwindcss color="#06B6D4" />, label: 'Tailwind' },
            { icon: <FaGamepad color="#00ff66" />, label: 'KAPLAY' },
        ]
    },
    {
        titulo: 'Backend',
        logos: [
            { icon: <FaPhp color="#8892BF" />, label: 'PHP' },
            { icon: <SiDotnet color="#512BD4" />, label: 'C#' },
            { icon: <FaPython color="#3776AB" />, label: 'Python' },
            { icon: <SiMysql color="#4479A1" />, label: 'MySQL' },
        ]
    },
    {
        titulo: 'Herramientas',
        logos: [
            { icon: <FaGitAlt color="#F05032" />, label: 'Git' },
            { icon: <FaGithub color="#ffffff" />, label: 'GitHub' },
            { icon: <FaFigma color="#A259FF" />, label: 'Figma' },
            { icon: <SiArduino color="#00979D" />, label: 'Arduino' },
            { icon: <SiVite color="#646CFF" />, label: 'Vite' },
            { icon: <FaUsers color="#ff6b1a" />, label: 'Scrum' },
        ]
    },
]

function Diana({ direction, onClick, disabled }) {
    return (
        <button
            id={`diana-skills-${direction}`}
            onClick={onClick}
            disabled={disabled}
            className={`relative w-14 h-14 flex-shrink-0 flex items-center justify-center transition-all duration-200
                ${disabled ? 'opacity-20 cursor-default' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}
        >
            <div className="absolute w-14 h-14 rounded-full border-2 border-[#00ff66]/30" />
            <div className="absolute w-9 h-9 rounded-full border border-[#00ff66]/50" />
            <div className="absolute w-4 h-4 rounded-full border border-[#00ff66]/70" />
            <span className="text-[#00ff66] font-bold z-10 text-lg">
                {direction === 'left' ? '←' : '→'}
            </span>
        </button>
    )
}

function SkillCard({ titulo, logos }) {
    const trackRef = useRef(null)
    const [trackWidth, setTrackWidth] = useState(0)
    const [idx, setIdx] = useState(0)

    // Cuántos logos entran: máximo MAX_VISIBLE, pero si hay menos logos que MAX_VISIBLE
    // se muestran todos sin gaps vacíos
    const visible = Math.min(MAX_VISIBLE, logos.length)
    const itemWidth = trackWidth > 0 ? trackWidth / visible : 0
    const maxIdx = Math.max(0, logos.length - visible)

    useEffect(() => {
        const el = trackRef.current
        if (!el) return

        const measure = () => {
            requestAnimationFrame(() => {
                if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth)
            })
        }

        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <h3 className="text-white font-bold mb-2 text-base">{titulo}</h3>

            <div className="flex items-center gap-4">
                <Diana
                    direction="left"
                    onClick={() => setIdx(i => Math.max(0, i - 1))}
                    disabled={idx === 0}
                />

                <div ref={trackRef} className="flex-1 overflow-hidden relative py-2" style={{ minHeight: '70px' }}>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                    <div
                        className="flex transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateX(-${idx * itemWidth}px)`,
                            visibility: trackWidth === 0 ? 'hidden' : 'visible',
                            width: `${logos.length * itemWidth}px`,
                        }}
                    >
                        {logos.map((logo, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2 flex-shrink-0"
                                style={{ width: itemWidth }}
                            >
                                {logo.img
                                    ? <img src={logo.img} alt={logo.label} className="w-12 h-12 object-contain" />
                                    : <div className="text-6xl">{logo.icon}</div>
                                }
                                <span className="text-sm text-gray-400">{logo.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Diana
                    direction="right"
                    onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}
                    disabled={idx >= maxIdx}
                />
            </div>
        </div>
    )
}

export default function Habilidades() {
    return (
        <div className="flex flex-col gap-3 max-w-5xl mx-auto px-8 py-2">
            <h2 className="text-4xl font-bold text-orange-400">Habilidades</h2>
            {cards.map(card => (
                <SkillCard key={card.titulo} titulo={card.titulo} logos={card.logos} />
            ))}
        </div>
    )
}
