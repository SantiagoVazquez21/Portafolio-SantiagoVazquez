import { useInView } from '../hooks/useInView'
import { FaGraduationCap, FaBriefcase, FaCertificate } from 'react-icons/fa'

// Clases base compartidas por FormacionCard y ExperienciaCard
const CARD_BASE = 'bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1'

const formacion = [
    {
        institucion: 'ISFT 225',
        carrera: 'Tecnicatura Superior en Desarrollo de Software',
        fecha: '2026 – Actualidad',
        lugar: 'San Martín, Buenos Aires',
        detalle: 'Cursando 2° año',
        certUrl: false,
    },
    {
        institucion: 'Instituto Leonardo Murialdo',
        carrera: 'Técnico en Informática Personal y Profesional',
        fecha: '2019 – 2025',
        lugar: 'Tres de Febrero, Buenos Aires',
        detalle: null,
        certUrl: null,
    },
]

const experiencia = [
    {
        empresa: 'Municipalidad de Caseros',
        rol: 'Asistente de Datos y Automatización',
        tipo: 'Pasantía · 200 hs · 6 meses',
        fecha: '2025',
        area: 'Área de Acción Social',
        logros: [
            'Identificación de problemáticas de gestión documental y propuesta de solución de digitalización.',
            'Desarrollo de sistema de planillas en Excel con funciones avanzadas (BUSCARV, tablas dinámicas, validación de datos) adoptado por el equipo.',
            'Gestión de datos sensibles de ciudadanos garantizando confidencialidad, integridad y trazabilidad.',
        ],
    },
]

function FormacionCard({ institucion, carrera, fecha, lugar, detalle, certUrl, delay = 0 }) {
    const [ref, inView] = useInView()

    return (
        <div
            ref={ref}
            className={`${CARD_BASE} hover:shadow-[0_8px_30px_rgba(255,107,26,0.1)]
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="h-[3px] bg-gradient-to-r from-orange-400 to-orange-400/10" />

            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center flex-shrink-0">
                            <FaGraduationCap className="text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">{institucion}</h3>
                            <p className="text-orange-400/80 text-sm">{carrera}</p>
                            <p className="text-gray-600 text-xs mt-0.5">{lugar}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                        <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                            {fecha}
                        </span>
                        {detalle && <p className="text-gray-600 text-xs mt-1">{detalle}</p>}
                    </div>
                </div>

                {/* Botón certificado — solo aparece si certUrl no es false */}
                {certUrl !== false && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                        {certUrl ? (
                            <a
                                data-kill
                                href={certUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm px-3 py-1.5 bg-orange-400/10 hover:bg-orange-400/20 border border-orange-400/30 text-orange-400 rounded transition-colors w-fit"
                            >
                                <FaCertificate /> Ver certificado
                            </a>
                        ) : (
                            <span className="flex items-center gap-2 text-sm px-3 py-1.5 bg-white/5 border border-white/10 text-gray-600 rounded w-fit cursor-default select-none">
                                <FaCertificate /> Certificado — próximamente
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function ExperienciaCard({ empresa, rol, tipo, fecha, area, logros, delay = 0 }) {
    const [ref, inView] = useInView()

    return (
        <div
            ref={ref}
            className={`${CARD_BASE} hover:shadow-[0_8px_30px_rgba(255,107,26,0.08)]
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="h-[3px] bg-gradient-to-r from-orange-400 to-orange-400/10" />

            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center flex-shrink-0">
                            <FaBriefcase className="text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">{empresa}</h3>
                            <p className="text-orange-400/80 text-sm">{rol}</p>
                            <p className="text-gray-600 text-xs mt-0.5">{area} · {tipo}</p>
                        </div>
                    </div>
                    <span className="flex-shrink-0 text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                        {fecha}
                    </span>
                </div>

                {logros?.length > 0 && (
                    <ul className="mt-4 space-y-2 pl-1">
                        {logros.map((logro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <span className="text-orange-400/50 mt-1 flex-shrink-0">▸</span>
                                {logro}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default function Experiencia() {
    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto px-8 py-4 w-full">

            {/* Formación — siempre en fila de 2 (son exactamente 2 estudios) */}
            <div>
                <h2 className="text-3xl font-bold text-orange-400 mb-4">Formación</h2>
                <div className="grid grid-cols-2 gap-3">
                    {formacion.map((item, i) => (
                        <FormacionCard key={i} {...item} delay={i * 120} />
                    ))}
                </div>
            </div>

            {/* Experiencia — grilla de 2 columnas: escala bien cuando haya más */}
            <div>
                <h2 className="text-3xl font-bold text-orange-400 mb-4">Experiencia</h2>
                <div className="grid grid-cols-2 gap-3">
                    {experiencia.map((item, i) => (
                        <ExperienciaCard key={i} {...item} delay={i * 120} />
                    ))}
                </div>
            </div>

        </div>
    )
}
