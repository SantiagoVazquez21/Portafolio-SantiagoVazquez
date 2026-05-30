export default function KillFeed({ kills }) {
    return (
        <div className="fixed top-25 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            {kills.map(kill => (
                <div key={kill.id} className="flex items-center gap-1 anim-kill-card px-4 py-0.5 text-sm font-bold rounded-sm border border-red-600"
                    style={{ background: 'rgba(30, 30, 30, 0.88)', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.03em' }}>
                    <span style={{ color: '#DCA25F' }}>TERRORIST</span>
                    <img src="/sprites/AK47_Icono.png" className="h-4 w-18" />
                    <img src="/sprites/HeadShot_Icono.png" className="h-4 w-5" />
                    <span style={{ color: '#8bbfe8' }}>{kill.label}</span>
                </div>
            ))}
        </div>
    )
}

