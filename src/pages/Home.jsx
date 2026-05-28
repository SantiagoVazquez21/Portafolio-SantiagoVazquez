import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate();

    return(
    <main className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-orange-500 mb-4 anim-fade" 
        style={{ animationDelay: '0s' }}>

          Santiago Elian Vazquez
        </h1>

        <p className="text-gray-400 text-4xl anim-fade" 
        style={{ animationDelay: '0.2s' }}>

          Desarrollador Junior
        </p>

        <p className="text-gray-400 text-base mt-4 anim-fade" 
        style={{ animationDelay: '0.4s' }}>

          Bienvenido a mi portafolio, un espacio donde busco combinar creatividad y profesionalismo
          </p>

        <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 text-2xl anim-fade glow" 
        style={{ animationDelay: '0.6s' }}
        onClick={() => navigate('/menu')}>

          Mi Portafolio
        </button>
      </div>
    </main>
    )
}

export default Home