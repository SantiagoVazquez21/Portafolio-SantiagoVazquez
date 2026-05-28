import Game from '../components/Game';
import Header from '../components/Header'

export default function Menu({ onKill }) {

    return (

        <>
            <Header />

            <section id="hero" className="h-screen relative">
                <Game onKill={onKill} />

            </section>

            <section id="sobremi" className="min-h-screen flex items-center justify-center text-white">
                <h2>Sobre Mí</h2>
            </section>

            <section id="habilidades" className="min-h-screen flex items-center justify-center text-white">
                <h2>Habilidades</h2>
            </section>

            <section id="proyectos" className="min-h-screen flex items-center justify-center text-white">
                <h2>Proyectos</h2>
            </section>

            <section id="experiencia" className="min-h-screen flex items-center justify-center text-white">
                <h2>Experiencia</h2>
            </section>

            <section id="contacto" className="min-h-screen flex items-center justify-center text-white">
                <h2>Contacto</h2>
            </section>
        </>
    )
}