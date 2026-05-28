import BackToMenu from '../components/BackToMenu';

function Contact() {

  const copiarEmail = () => {
    navigator.clipboard.writeText('santiagoelianvazquez@gmail.com')
  }

  return (
    <main className="min-h-screen text-white px-6 py-16 max-w-2xl mx-auto">
      <BackToMenu />

      <h1 className="text-5xl font-bold text-orange-500 mb-12">Contacto</h1>

      <div className="flex flex-col gap-4">

          {/* Email */}
        <div className="flex items-center justify-between p-4 border border-gray-700 rounded">
          <span className="text-gray-300">📧 santiagoelianvazquez@gmail.com</span>
          <button
            onClick={copiarEmail}
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded text-sm hover:bg-orange-500 hover:text-white hover:cursor-pointer"
          >
            Copiar
          </button>
        </div>

        {/* GitHub */}
        <div className="flex items-center justify-between p-4 border border-gray-700 rounded">
          <span className="text-gray-300">💻 github.com/SantiagoVazquez21</span>
          <a
            href="https://github.com/SantiagoVazquez21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded text-sm hover:bg-orange-500 hover:text-white"
          >
            Abrir →
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center justify-between p-4 border border-gray-700 rounded">
          <span className="text-gray-300">💼 linkedin.com/in/santiago-vazquez</span>
          <a
            href="https://linkedin.com/in/santiago-vazquez-b266b3374"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded text-sm hover:bg-orange-500 hover:text-white"
          >
            Abrir →
          </a>
        </div>

        {/* Ubicación */}
        <div className="p-4 border border-gray-700 rounded">
          <span className="text-gray-400">📍 Pablo Podestá, Buenos Aires, Argentina</span>
        </div>

      </div>

    </main>
  )
}

export default Contact
