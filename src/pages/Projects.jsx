import BackToMenu from '../components/BackToMenu';

const proyectos = [
  {
    titulo: "RADEP",
    subtitulo: "Plataforma de Registro y Acreditación de Proveedores",
    año: "2025",
    cliente: "Cliente real: Magnética S.A. — Instituto Leonardo Murialdo",
    descripcion: "Base de datos relacional desde cero: modelo DER, normalización y 19 tablas en MySQL. Sistema de generación y validación de QR por empleado con envío automático por correo (PHPMailer). Módulo de exportación a Excel y calendario interactivo. Equipo de 5 personas bajo metodología Scrum.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "PHPMailer", "PhpSpreadsheet", "Git/GitHub", "Figma"],
    github: "https://github.com/SantiagoVazquez21/RADEP-Registro-y-Acreditaci-n-de-Proveedores",
    demo: null,
    destacado: true
  },
  {
    titulo: "Sistema de Seguridad para Museo",
    subtitulo: "Proyecto Integrador — Programación & Electrónica",
    año: "2024",
    cliente: "Instituto Leonardo Murialdo",
    descripcion: "Lógica de control en Arduino IDE integrando 5 sensores simultáneos: infrarrojo, ultrasónico, humo, temperatura y relé para ventilación a 220V. Interfaz web de monitoreo con actualización de datos en tiempo real.",
    stack: ["Arduino IDE", "JavaScript", "HTML/CSS"],
    github: null,
    demo: null,
    destacado: false
  },
]

function Projects() {
  return (
    <main className="min-h-screen text-white px-6 py-16 max-w-5xl mx-auto">
      <BackToMenu />

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Proyectos</h1>

      <div className="flex flex-col gap-8">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.titulo}
            className={`p-6 border rounded ${proyecto.destacado ? 'border-orange-500' : 'border-gray-700'}`}
          >
            {proyecto.destacado && (
              <span className="text-xs text-orange-500 font-mono mb-2 block">⭐ PROYECTO DESTACADO</span>
            )}

            <div className="flex items-start justify-between mb-1">
              <h2 className="text-2xl font-bold">{proyecto.titulo}</h2>
              <span className="text-gray-500 text-sm">{proyecto.año}</span>
            </div>

            <p className="text-orange-400 text-sm mb-1">{proyecto.subtitulo}</p>
            <p className="text-gray-500 text-xs mb-4">{proyecto.cliente}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{proyecto.descripcion}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {proyecto.stack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-mono">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {proyecto.github && (
                <a
                  href={proyecto.github}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded text-sm hover:border-orange-500 hover:text-orange-500"
                >
                  GitHub →
                </a>
              )}
              {proyecto.demo && (
                <a
                  href={proyecto.demo}
                  className="px-4 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                >
                  Demo →
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </main>
  )
}

export default Projects
