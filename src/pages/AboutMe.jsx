import BackToMenu from '../components/BackToMenu';

function AboutMe() {
  return (
    <main className="min-h-screen text-white px-6 py-16 max-w-4xl mx-auto">
      <BackToMenu />

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Sobre Mí</h1>

      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
        Soy Santiago, desarrollador fullstack junior de 19 años de Pablo Podestá, Buenos Aires.
        Estoy cursando la Tecnicatura Superior en Desarrollo de Software en el ISFT 225
        y tengo el título de Técnico en Informática Personal y Profesional.
      </p>

      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
        Empecé con hardware y redes, pasé por electrónica con Arduino, y terminé
        enamorado del desarrollo de software. Trabajo con JavaScript, PHP, MySQL,
        React Native y C#/.NET, y me gusta construir cosas que resuelvan problemas
        reales — no demos de laboratorio.
      </p>

      <p className="text-lg text-gray-300 mb-12 leading-relaxed">
        Busco mi primera experiencia formal como developer junior. Tengo experiencia
        real trabajando en equipo bajo metodología Scrum, con clientes reales y código
        que llegó a producción.
      </p>

      <div className="flex flex-wrap gap-8 justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-500">19</p>
          <p className="text-gray-400 text-sm mt-1">años</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-500">2</p>
          <p className="text-gray-400 text-sm mt-1">proyectos reales</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-500">6+</p>
          <p className="text-gray-400 text-sm mt-1">tecnologías</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-500">B2</p>
          <p className="text-gray-400 text-sm mt-1">inglés</p>
        </div>
      </div>

    </main>
  )
}

export default AboutMe
