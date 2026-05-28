import Game from '../components/Game';

function Menu({ onKill }) {

    const secciones = [
        { path: '/about', label: 'Sobre Mí' },
        { path: '/skills', label: 'Habilidades' },
        { path: '/projects', label: 'Proyectos' },
        { path: '/experience', label: 'Experiencia' },
        { path: '/contact', label: 'Contacto' }
    ]


  return (

    <>
        <Game onKill={onKill} />

        <main className="fixed inset-0 z-10 flex flex-col text-white px-6 pointer-events-none">

            <div className="pt-10 flex justify-center gap-4">
                {secciones.map((seccion) => (
                    <button
                        id={`btn-${seccion.path.slice(1)}`}
                        key={seccion.path}
                        className="flex-1 px-6 py-3 bg-orange-500 text-white rounded text-lg font-semibold"
                    >
                        {seccion.label}
                    </button>
                ))}
            </div>
        </main>
    </>
  )
}

export default Menu