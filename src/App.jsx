import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react';
import KillFeed from './components/KillFeed';
import Menu from './pages/Menu'
import { SECCIONES, KILL_FADE_MS } from './constants'

export default function App() {

  const [kills, setKills] = useState([]);

  const addKill = (seccion, tema = 'antiterror') => {
    const found = SECCIONES.find(s => s.id === seccion)
    const label = found?.label ?? (seccion === 'hero' ? 'Hero' : 'Boton')
    const id = Date.now()
    setKills(prev => [...prev, { id, seccion, label, tema }])
    setTimeout(() => {
      setKills(prev => prev.filter(k => k.id !== id))
    }, KILL_FADE_MS)
  }

  return (
    <>
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
