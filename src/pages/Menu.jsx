import Game from '../components/Game';
import Header from '../components/Header';
import SobreMi from '../secciones/SobreMi';
import Habilidades from '../secciones/Habilidades';
import Proyectos from '../secciones/Proyectos';
import Experiencia from '../secciones/Experiencia';
import Contacto from '../secciones/Contacto';

export default function Menu({ onKill }) {

    return (

        <>
            <Header />

            <section id="hero" className="h-screen relative overflow-hidden">
                <Game onKill={onKill} />

            </section>

            <section id="sobremi" className="min-h-screen bg-[#0e0e10] scroll-mt-[40px]">
                <div className="flex min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex justify-center pt-16">
                        <SobreMi />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="habilidades" className="min-h-screen bg-[#1a1a1d] scroll-mt-[40px]">
                <div className="flex min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex justify-center pt-16">
                        <Habilidades />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="proyectos" className="min-h-screen bg-[#0e0e10] scroll-mt-[40px]">
                <div className="flex min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex justify-center pt-16">
                        <Proyectos />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="experiencia" className="min-h-screen bg-[#1a1a1d] scroll-mt-[40px]">
                <div className="flex min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex justify-center pt-16">
                        <Experiencia />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>

            <section id="contacto" className="min-h-screen bg-[#0e0e10] scroll-mt-[40px]">
                <div className="flex min-h-screen">
                    <div className="w-24 flex items-center justify-center border-r border-white/10">
                        Terror
                    </div>
                    <div className="flex-1 flex justify-center pt-16">
                        <Contacto />
                    </div>
                    <div className="w-24 flex flex-col items-center justify-center gap-4 border-l border-white/10">
                        Logo
                    </div>
                </div>
            </section>
        </>
    )
}