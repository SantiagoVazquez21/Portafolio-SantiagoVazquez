import Game from '../components/Game';
import Header from '../components/Header';
import SobreMi from '../secciones/SobreMi';
import Habilidades from '../secciones/Habilidades';

export default function Menu({ onKill }) {

    return (

        <>
            <Header />

            <section id="hero" className="h-screen relative overflow-hidden">
                <Game onKill={onKill} />

            </section>

            <section id="sobremi" className="min-h-screen">
                <div className="flex h-full min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <SobreMi />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="habilidades" className="min-h-screen">
                <div className="flex h-full min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <Habilidades />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="proyectos" className="min-h-screen">
                <div className="flex h-full min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <h2 className="text-white text-4xl">Proyectos</h2>
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="experiencia" className="min-h-screen">
                <div className="flex h-full min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <h2 className="text-white text-4xl">Experiencia</h2>
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="contacto" className="min-h-screen">
                <div className="flex h-full min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <h2 className="text-white text-4xl">Contacto</h2>
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>
        </>
    )
}