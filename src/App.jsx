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
      <KillFeed kills={kills} />
      <Routes>
        {/* Home eliminado — redirige directo al portfolio */}
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<Menu onKill={addKill} />} />
      </Routes>
    </>
  )
}
