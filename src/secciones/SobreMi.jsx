import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'

const GITHUB_URL   = 'https://github.com/SantiagoVazquez21'
const LINKEDIN_URL = 'https://www.linkedin.com/in/santiago-vazquez-b266b3374/'
const CV_PATH      = '/CV_SantiagoElianVazquez.pdf'

const stats = [
    { label: 'Proyectos',           value: '2',     desc: '' },
    { label: 'Tecnologías',         value: '16',    desc: 'Frontend, Backend, Herramientas'   },
    { label: 'Año de carrera',      value: '2°',    desc: 'ISFT 225 — Tecnicatura en Desarrollo de Software' },
    { label: 'Inglés',              value: 'B2',    desc: 'Nivel upper-intermediate'           },
]

function Scoreboard({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={onClose}>
            <div className="bg-[#0a0a0c]/95 border border-orange-400/20 rounded-xl p-10 min-w-[680px] animate-scale-in shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                onClick={e => e.stopPropagation()}>

                <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/10">
                    <span className="text-orange-400 font-bold uppercase tracking-widest text-lg">
                        Santiago Vazquez
                    </span>
                    <span className="text-gray-400 text-sm uppercase tracking-widest">
                        Dev Junior · Buenos Aires
                    </span>
                    <span className="text-gray-600 text-sm">[ TAB ] para cerrar</span>
                </div>

                <div className="flex flex-col gap-1">
                    {stats.map((s, i) => (
                        <div key={i} className="flex items-center gap-6 py-3 border-b border-white/5 last:border-0">
                            <span className="text-4xl font-bold w-24 text-right flex-shrink-0"
                                style={{ color: 'var(--theme-primary)' }}>
                                {s.value}
                            </span>
                            <div>
                                <p className="text-white font-bold text-lg">{s.label}</p>
                                <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-sm text-center mt-8 uppercase tracking-widest font-bold"
                    style={{ color: 'var(--theme-primary)', textShadow: '0 0 12px var(--theme-primary)' }}>
                    Buscando primer trabajo formal como Dev Junior
                </p>
            </div>
        </div>
    )
}

export default function SobreMi() {
    const [showStats, setShowStats] = useState(false)
    const [sectionRef, sectionInView] = useInView(0.1)

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Tab') { e.preventDefault(); setShowStats(s => !s) }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <>
            {showStats && <Scoreboard onClose={() => setShowStats(false)} />}

            <div ref={sectionRef} className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto px-8 py-12">

                <div className={`flex-shrink-0 flex flex-col items-center gap-4 transition-all duration-700
                    ${sectionInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <img
                        src="/foto.jpg"
                        alt="Santiago Vazquez"
                        className="w-64 h-64 rounded-full object-cover border-4 border-orange-400"
                    />

                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/40 bg-orange-400/10">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0 self-center" />
                        <span className="text-orange-400 text-xs font-bold uppercase tracking-widest leading-none translate-y-px">
                            Disponible para trabajar
                        </span>
                    </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-5">
                    <h2 className={`text-5xl font-bold text-orange-400 transition-all duration-500
                        ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                        style={{ transitionDelay: '100ms' }}>
                        Sobre Mí
                    </h2>

                    <p className={`text-gray-300 leading-relaxed text-lg transition-all duration-500
                        ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: '200ms' }}>
                        19 años, Buenos Aires. Cursando 2° año de la Tecnicatura en
                        Desarrollo de Software en el ISFT 225, con experiencia en
                        proyectos reales: desde una pasantía en la Municipalidad de
                        Caseros hasta una plataforma cloud para un cliente real.
                    </p>
                    <p className={`text-gray-300 leading-relaxed text-lg transition-all duration-500
                        ${sectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: '300ms' }}>
                        Me muevo cómodo en JavaScript, React Native, PHP, MySQL y C#.
                        Trabajo con Scrum, Git/GitHub y tengo inglés B2.
                        Actualmente aprendiendo React y construyendo este portfolio.
                    </p>

                    <div className={`flex items-center gap-3 flex-wrap mt-1 transition-all duration-500
                        ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: '400ms' }}>
                        <a data-kill href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20
                                bg-white/5 hover:bg-white/10 text-white text-sm font-semibold
                                transition-all duration-200 hover:scale-105">
                            <FaGithub className="text-lg" /> GitHub
                        </a>
                        <a data-kill href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0A66C2]/50
                                bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#60A5FA] text-sm font-semibold
                                transition-all duration-200 hover:scale-105">
                            <FaLinkedin className="text-lg" /> LinkedIn
                        </a>
                        <a data-kill href={CV_PATH} download
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-400/50
                                bg-orange-400/10 hover:bg-orange-400/20 text-orange-400 text-sm font-semibold
                                transition-all duration-200 hover:scale-105">
                            <FaDownload className="text-base" /> Descargar CV
                        </a>
                    </div>

                    {/* Hint TAB — solo decorativo, el scoreboard se abre ÚNICAMENTE con la tecla TAB */}
                    <div className="flex items-center gap-2 w-fit text-sm uppercase tracking-widest
                        text-orange-400/60 select-none pointer-events-none">
                        <kbd className="px-2 py-0.5 border border-orange-400/30 rounded text-xs font-bold">TAB</kbd>
                        Ver mis stats
                    </div>
                </div>

            </div>
        </>
    )
}
