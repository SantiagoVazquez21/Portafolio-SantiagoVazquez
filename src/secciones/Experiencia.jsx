import { useInView } from '../hooks/useInView'
import { FaCertificate } from 'react-icons/fa'

const CARD_STYLE = 'relative overflow-hidden border border-white/10 hover:-translate-y-1 transition-transform duration-300'

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
            className={`${CARD_STYLE} flex-1
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                transition-opacity transition-transform duration-500`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Fondo con gradiente sutil en el color del tema */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/8 via-transparent to-transparent" />

            <div className="relative p-4 h-full flex flex-col gap-2">
                {/* Fecha badge arriba a la derecha */}
                <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-widest font-bold text-orange-400">
                        Formación
                    </span>
                    <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-gray-400">
                        {fecha}
                    </span>
                </div>

                {/* Institución y carrera */}
                <div className="flex-1">
                    <h3 className="text-white font-bold text-xl leading-tight mb-1">{institucion}</h3>
                    <p className="text-gray-300 text-sm leading-snug">{carrera}</p>
                    <p className="text-gray-600 text-xs mt-2">{lugar}</p>
                    {detalle && <p className="text-orange-400/70 text-xs mt-1">{detalle}</p>}
                </div>

                {/* Certificado si corresponde */}
                {certUrl !== false && (
                    <div className="pt-3 border-t border-white/5">
                        {certUrl ? (
                            <a data-kill href={certUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs px-3 py-1.5 bg-orange-400/10 hover:bg-orange-400/20 border border-orange-400/30 text-orange-400 rounded w-fit transition-colors">
                                <FaCertificate /> Ver certificado
                            </a>
                        ) : (
                            <span className="flex items-center gap-2 text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-gray-600 rounded w-fit select-none">
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
            className={`${CARD_STYLE} w-full
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                transition-opacity transition-transform duration-500`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/8 via-transparent to-transparent" />

            <div className="relative p-4 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-orange-400 mb-1 block">
                            Experiencia
                        </span>
                        <h3 className="text-white font-bold text-xl">{empresa}</h3>
                        <p className="text-gray-300 text-sm mt-0.5">{rol}</p>
                        <p className="text-gray-600 text-xs mt-1">{area} · {tipo}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs px-2 py-1 bg-white/5 border border-white/10 text-gray-400">
                        {fecha}
                    </span>
                </div>

                {/* Logros */}
                {logros?.length > 0 && (
                    <ul className="flex flex-col gap-2 pt-2 border-t border-white/5">
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
        <div className="flex flex-col gap-3 max-w-5xl mx-auto px-8 py-2 w-full">

            {/* Formación — 2 cards en fila, cada una ocupa la mitad */}
            <div>
                <h2 className="text-4xl font-bold text-orange-400 mb-2">Formación</h2>
                <div className="flex gap-4">
                    {formacion.map((item, i) => (
                        <FormacionCard key={i} {...item} delay={i * 100} />
                    ))}
                </div>
            </div>

            {/* Experiencia — una sola card full width */}
            <div>
                <h2 className="text-4xl font-bold text-orange-400 mb-2">Experiencia</h2>
                {experiencia.map((item, i) => (
                    <ExperienciaCard key={i} {...item} delay={i * 100} />
                ))}
            </div>

        </div>
    )
}
