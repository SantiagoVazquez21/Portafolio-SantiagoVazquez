import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

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

function ProyectoCard({ titulo, descripcion, imagen, tecnologias, repoUrl, demoUrl }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden grid grid-rows-[12rem_auto] md:grid-rows-1 md:grid-cols-[2fr_3fr]">

            <div className="relative overflow-hidden bg-white/5 flex items-center justify-center">
                {imagen
                    ? <img src={imagen} alt={titulo} className="absolute inset-0 w-full h-full object-cover object-top" />
                    : <span className="text-gray-600 text-sm">Sin imagen</span>
                }
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
                <h3 className="text-white font-bold text-xl">{titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{descripcion}</p>

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
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded transition-colors"
                    >
                        <FaGithub /> Repositorio
                    </a>
                    {demoUrl && (
                        <a
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
        <div className="flex flex-col gap-6 max-w-5xl mx-auto px-8 py-8">
            <h2 className="text-4xl font-bold text-orange-400">Proyectos</h2>
            {proyectos.map(p => (
                <ProyectoCard key={p.titulo} {...p} />
            ))}
        </div>
    )
}
