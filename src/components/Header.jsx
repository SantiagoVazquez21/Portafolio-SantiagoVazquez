
export default function Header() {
    
    const secciones = [
        {id: 'sobremi', label: 'Sobre Mi'},
        {id: 'habilidades', label: 'Habilidades'},
        {id: 'proyectos', label: 'Proyectos'},
        {id: 'experiencia', label: 'Experiencia'},
        {id: 'contacto', label: 'Contacto'},
    ]
    
    return(
        <div className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-3 bg-black">

            <div>
                Logo
            </div>
            
            <div className="flex gap-4">
                {secciones.map(s => (
                    <button
                        key={s.id}
                        id={`btn-${s.id}`}
                        onClick={() => document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' })}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

        </div>
    )
}