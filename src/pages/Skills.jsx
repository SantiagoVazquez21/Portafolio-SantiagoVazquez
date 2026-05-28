import BackToMenu from '../components/BackToMenu';

const skills = [
  {
    nivel: "Lenguajes",
    items: ["JavaScript", "PHP", "HTML", "CSS", "Python"]
  },
  {
    nivel: "Frameworks y Librerías",
    items: ["Tailwind", "PHPMailer", "PhpSpreadsheet"]
  },
  {
    nivel: "🖥️ Infraestructura y Herramientas",
    items: ["MySQL", "Git/GitHub", "Figma", "Excel Avanzado", "Windows", "Linux", "Redes LAN", "Vite"]
  },
  {
    nivel: "Aprendiendo actualmente",
    items: ["React", "React Native", "Tailwind", "KAPLAY", "C#", ".NET", "Vite"]
  }
]

function Skills() {
  return (
    <main className="min-h-screen text-white px-6 py-16 max-w-4xl mx-auto">
      <BackToMenu />

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Habilidades</h1>

      <div className="flex flex-col gap-10">
        {skills.map((grupo) => (
          <div key={grupo.nivel}>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">{grupo.nivel}</h2>
            <div className="flex flex-wrap gap-3">
              {grupo.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 border border-orange-500 text-orange-400 rounded text-sm font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

export default Skills
