import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
const MAX_VISIBLE = 4

// Cuando tengas las imágenes, agregá img: '/logos/html.png' al objeto
// y automáticamente usará la imagen en vez del ícono de react-icons
const cards = [
    {
        titulo: 'Frontend',
        logos: [
            { img: '/lenguajes/HTML5.png',    label: 'HTML'         },
            { img: '/lenguajes/CSS3.png',     label: 'CSS'          },
            { img: '/lenguajes/JS.png',        label: 'JavaScript'   },
            { img: '/lenguajes/React.png',     label: 'React'        },
            { img: '/lenguajes/Tailwind.png', label: 'Tailwind'     },
            { img: '/lenguajes/Kaplay.png',   label: 'KAPLAY'       },
        ]
    },
    {
        titulo: 'Backend',
        logos: [
            { img: '/lenguajes/PHP.png',    label: 'PHP'    },
            { img: '/lenguajes/CSharp.png',  label: 'C#'     },
            { img: '/lenguajes/Python.png', label: 'Python' },
            { img: '/lenguajes/MySQL.png',  label: 'MySQL'  },
            { img: '/lenguajes/PostgreSQL.png', label: 'PostgreSQL' },
        ]
    },
    {
        titulo: 'Herramientas',
        logos: [
            { img: '/lenguajes/Git.png',     label: 'Git'    },
            { img: '/lenguajes/GitHub.png',  label: 'GitHub' },
            { img: '/lenguajes/FIgma.png',   label: 'Figma'  },
            { img: '/lenguajes/Arduino.png', label: 'Arduino'},
            { img: '/lenguajes/VIte.png',    label: 'Vite'   },
            { img: '/lenguajes/Scrum.png',   label: 'Scrum'  },
        ]
    },
]

function Diana({ direction, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`diana-btn relative w-14 h-14 flex-shrink-0 flex items-center justify-center transition-all duration-200
                ${disabled ? 'opacity-20 cursor-default' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}
        >
            <img
                src="/sprites/Diana.png"
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
                style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
            />
        </button>
    )
}

function SkillCard({ titulo, logos, delay = 0 }) {
    const [cardRef, cardInView] = useInView()
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

        // Medición inmediata al montar — sin esto, si ResizeObserver tarda,
        // itemWidth queda en 0 y los logos no se ven por el overflow-hidden
        setTrackWidth(el.offsetWidth)

        const observer = new ResizeObserver(() => {
            if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={cardRef}
            className={`bg-white/5 border border-white/10 p-5 transition-all duration-500
                ${cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <h3 className="text-white font-bold mb-2 text-base">{titulo}</h3>

            <div className="flex items-center gap-4">
                <Diana
                    direction="left"
                    onClick={() => setIdx(0)}
                    disabled={idx === 0}
                />

                <div ref={trackRef} className="flex-1 overflow-hidden relative py-2" style={{ minHeight: '100px' }}>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                    <div
                        className="flex transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateX(-${idx * itemWidth}px)`,
                            width: itemWidth > 0 ? `${logos.length * itemWidth}px` : '100%',
                        }}
                    >
                        {logos.map((logo, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-2 flex-shrink-0"
                                style={{ width: itemWidth > 0 ? itemWidth : `${100 / visible}%` }}
                            >
                                {logo.img
                                    ? <img src={logo.img} alt={logo.label} className="w-16 h-16 object-contain" />
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
            {cards.map((card, i) => (
                <SkillCard key={card.titulo} titulo={card.titulo} logos={card.logos} delay={i * 100} />
            ))}
        </div>
    )
}
