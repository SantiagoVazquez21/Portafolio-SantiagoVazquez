import { useEffect, useRef, useState } from 'react'

// Detecta cuando un elemento entra al viewport y dispara la animación.
// Se desconecta solo después de la primera vez para no seguir observando.
export function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return [ref, inView]
}
