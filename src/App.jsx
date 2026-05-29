import {Routes, Route} from 'react-router-dom'
import {useState} from 'react';
import KillFeed from './components/KillFeed';
import Home from './pages/Home'
import Menu from './pages/Menu'

export default function App() {

  const [kills, setKills] = useState([]);

  const secciones = [
    { path: '/sobremi', label: 'Sobre Mí' },
    { path: '/habilidades', label: 'Habilidades' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/experiencia', label: 'Experiencia' },
    { path: '/contacto', label: 'Contacto' }
  ];

  const addKill = (seccion) => {
    const found = secciones.find(s => s.path === `/${seccion}`)
    const id = Date.now()
    setKills(prev => [...prev, {id, seccion, label: found.label }])
    setTimeout(() => {
      setKills(prev => prev.filter(k => k.id !== id))
    }, 3000)
  }

  return (
    <>
      <KillFeed kills={kills} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu onKill={addKill} />} />
      </Routes>
    </>
  )
}
