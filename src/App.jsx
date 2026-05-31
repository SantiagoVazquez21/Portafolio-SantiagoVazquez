import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react';
import KillFeed from './components/KillFeed';
import Menu from './pages/Menu'

export default function App() {

  const [kills, setKills] = useState([]);

  const secciones = [
    { path: '/sobremi',     label: 'Sobre Mí'    },
    { path: '/habilidades', label: 'Habilidades'  },
    { path: '/proyectos',   label: 'Proyectos'    },
    { path: '/experiencia', label: 'Experiencia'  },
    { path: '/contacto',    label: 'Contacto'     }
  ];

  const addKill = (seccion, tema = 'antiterror') => {
    const found = secciones.find(s => s.path === `/${seccion}`)
    const label = found?.label ?? (seccion === 'hero' ? 'Hero' : 'Boton')
    const id = Date.now()
    setKills(prev => [...prev, { id, seccion, label, tema }])
    setTimeout(() => {
      setKills(prev => prev.filter(k => k.id !== id))
    }, 3000)
  }

  return (
    <>
      {/* Disclaimer mobile — solo visible en pantallas < 768px */}
      <div className="fixed inset-0 z-[9999] bg-[#0B1220] flex-col items-center justify-center text-center p-8 hidden max-md:flex">
        <img src="/sprites/LogoAntiTerror.png" alt="AIM" className="h-20 mb-6 opacity-80" />
        <h1 className="text-2xl font-bold text-orange-400 mb-3" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          AIM://PORTFOLIO
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Este portfolio está diseñado para <span className="text-orange-400 font-bold">desktop</span>.
        </p>
        <p className="text-gray-600 text-sm mt-3">
          Accedé desde una computadora para la experiencia completa.
        </p>
      </div>

      <KillFeed kills={kills} />
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<Menu onKill={addKill} />} />
      </Routes>
    </>
  )
}
