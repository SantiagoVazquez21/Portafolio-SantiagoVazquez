import BackToMenu from '../components/BackToMenu';

const trabajo = [
  {
    año: "2025",
    titulo: "Asistente de Datos y Automatización",
    lugar: "Municipalidad de Caseros · Área de Acción Social",
    detalle: "Pasantía · 200 hs · 6 meses",
    descripcion: "Identifiqué la problemática de gestión documental del área y propuse una solución de digitalización reemplazando registros en papel. Desarrollé un sistema de planillas en Excel con funciones avanzadas (BUSCARV, tablas dinámicas, validación de datos) adoptado por todo el equipo. Gestioné datos sensibles de ciudadanos garantizando confidencialidad."
  },
]

const educacion = [
  {
    año: "2026 – Actualidad",
    titulo: "Estudiante de la Tecnicatura Superior en Desarrollo de Software",
    lugar: "ISFT 225 · San Martín, Buenos Aires",
    detalle: "Cursando 2° año",
    descripcion: null
  },
  {
    año: "2019 – 2025",
    titulo: "Técnico en Informática Personal y Profesional",
    lugar: "Instituto Leonardo Murialdo · Tres de Febrero, Buenos Aires",
    detalle: "Título obtenido",
    descripcion: null
  }
]

function Experience() {
  return (
    <main className="min-h-screen text-white px-6 py-16 max-w-3xl mx-auto">
      <BackToMenu />

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Experiencia</h1>

      <div className="flex flex-col">
        {trabajo.map((item, index) => (
          <div key={index} className="flex gap-6">
            <div className="pb-10">
              <span className="text-xs font-mono text-gray-500">{item.año}</span>
              <h2 className="text-xl font-bold mt-1">{item.titulo}</h2>
              <p className="text-orange-400 text-sm">{item.lugar}</p>
              <p className="text-gray-500 text-xs mb-2">{item.detalle}</p>
              {item.descripcion && (
                <p className="text-gray-300 leading-relaxed text-sm">{item.descripcion}</p>
              )}
            </div>

          </div>
        ))}   
      </div>

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Educación</h1>
      
      <div className="flex flex-col">
        {educacion.map((item, index) => (
          <div key={index} className="flex gap-6">
            <div className="pb-10">
              <span className="text-xs font-mono text-gray-500">{item.año}</span>
              <h2 className="text-xl font-bold mt-1">{item.titulo}</h2>
              <p className="text-orange-400 text-sm">{item.lugar}</p>
              <p className="text-gray-500 text-xs mb-2">{item.detalle}</p>
              {item.descripcion && (
                <p className="text-gray-300 leading-relaxed text-sm">{item.descripcion}</p>
              )}
            </div>

          </div>
        ))}   
      </div>

    </main>
  )
}

export default Experience
