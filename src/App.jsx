import { Routes, Route, Link } from 'react-router-dom'
import {useState} from 'react';
import KillFeed from './components/KillFeed';
import './App.css'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Menu from './pages/Menu'

function App() {

  const [kills, setKills] = useState([]);

  const secciones = [
    { path: '/about', label: 'Sobre Mí' },
    { path: '/skills', label: 'Habilidades' },
    { path: '/projects', label: 'Proyectos' },
    { path: '/experience', label: 'Experiencia' },
    { path: '/contact', label: 'Contacto' }
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
        <Route path="/about" element={<AboutMe />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu onKill={addKill} />} />
      </Routes>
    </>
  )
}

export default App
