import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useInView } from '../hooks/useInView'

const proyectos = [
    {
        titulo: 'RADEP',
        descripcion: 'Plataforma web cloud para gestión de acreditación de proveedores en eventos corporativos. Permite a organizadores validar documentación, generar códigos QR de acceso y administrar vendors. Desarrollado para Magnética, empresa de producción de eventos.',
        imagen: '/proyectos/radep.png',
        tecnologias: ['PHP', 'HTML', 'CSS', 'JavaScript', 'AWS RDS', 'AWS S3'],
        repoUrl: 'https://github.com/SantiagoVazquez21/RADEP-Registro-y-Acreditaci-n-de-Proveedores',
        demoUrl: null,
    },
]

function ProyectoCard({ titulo, descripcion, imagen, tecnologias, repoUrl, demoUrl, delay = 0 }) {
    const [ref, inView] = useInView()
    return (
        <div
            ref={ref}
            className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden grid grid-rows-[8rem_auto] md:grid-rows-1 md:grid-cols-[2fr_3fr]
                transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >

            <div className="relative overflow-hidden bg-white/5 flex items-center justify-center">
                {imagen
                    ? <img src={imagen} alt={titulo} className="absolute inset-0 w-full h-full object-cover object-top" />
                    : <span className="text-gray-600 text-sm">Sin imagen</span>
                }
            </div>

            <div className="flex-1 p-4 flex flex-col gap-3">
                <h3 className="text-white font-bold text-lg">{titulo}</h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{descripcion}</p>

                <div className="flex flex-wrap gap-2">
                    {tecnologias.map(tech => (
                        <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-orange-400/10 border border-orange-400/30 text-orange-400 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3 mt-auto">
                    <a
                        data-kill
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded transition-colors"
                    >
                        <FaGithub /> Repositorio
                    </a>
                    {demoUrl && (
                        <a
                            data-kill
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-orange-400/20 hover:bg-orange-400/30 border border-orange-400/50 text-orange-400 text-sm rounded transition-colors"
                        >
                            <FaExternalLinkAlt /> Demo
                        </a>
                    )}
                </div>
            </div>

        </div>
    )
}

export default function Proyectos() {
    return (
        <div className="flex flex-col gap-4 max-w-5xl mx-auto px-8 py-4">
            <h2 className="text-4xl font-bold text-orange-400 mb-2">Proyectos</h2>
            {proyectos.map((p, i) => (
                <ProyectoCard key={p.titulo} {...p} delay={i * 120} />
            ))}
        </div>
    )
}
