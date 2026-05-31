export default function KillFeed({ kills }) {
    return (
        <div className="fixed top-25 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            {kills.map(kill => {
                const esCT   = kill.tema === 'antiterror'
                const nombre = esCT ? 'COUNTER-TERRORIST' : 'TERRORIST'
                const arma   = esCT ? '/sprites/M4_Icono.png' : '/sprites/AK47_Icono.png'
                const color  = esCT ? '#8bbfe8' : '#DCA25F'
                return (
                    <div key={kill.id} className="flex items-center gap-1 anim-kill-card px-4 py-0.5 text-sm font-bold rounded-sm border border-red-600"
                        style={{ background: 'rgba(30, 30, 30, 0.88)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.03em' }}>
                        <span style={{ color }}>{nombre}</span>
                        <img src={arma} className="h-4 w-18" />
                        <img src="/sprites/HeadShot_Icono.png" className="h-4 w-5" />
                        <span style={{ color: esCT ? '#DCA25F' : '#8bbfe8' }}>{kill.label}</span>
                    </div>
                )
            })}
        </div>
    )
}

