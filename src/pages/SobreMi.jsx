export default function SobreMi() {
    return (
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto px-8 py-16">
            
            <div className="flex-shrink-0">
                <img
                    src="/foto.jpg"
                    alt="Santiago Vazquez"
                    className="w-48 h-48 rounded-full object-cover border-4 border-orange-500"
                />
            </div>

            <div className="flex flex-col gap-4 text-white">
                <h2 className="text-4xl font-bold text-orange-400">Sobre Mí</h2>
                <p className="text-gray-300 leading-relaxed">
                    Soy Santiago, 19 años, desarrollador junior de Buenos Aires. 
                    Arrancando el 2° año de la Tecnicatura en Desarrollo de Software 
                    en el ISFT 225, y ya cuento con experiencia en proyectos reales — 
                    desde una pasantía en la Municipalidad de Caseros hasta una 
                    plataforma para un cliente real.
                </p>
                <p className="text-gray-300 leading-relaxed">
                    Me muevo cómodo en JavaScript, React Native, PHP, MySQL y C#. 
                    Trabajo con metodología Scrum, Git/GitHub y tengo inglés B2. 
                    Ahora estoy aprendiendo React y construyendo este portfolio 
                    para seguir sumando.
                </p>
                <p className="text-orange-300 font-semibold">
                    Busco mi primer trabajo formal como desarrollador junior.
                </p>
            </div>
        </div>
    )
}