import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const SERVICE_ID  = 'service_hsxsi29'
const TEMPLATE_ID = 'template_ysqres8'
const PUBLIC_KEY  = 'OdcvPWJSKNcTu61Is'

export default function Contacto() {
    const formRef = useRef(null)
    // status controla qué muestra el botón y el feedback: idle | sending | success | error
    const [status, setStatus] = useState('idle')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')

        try {
            // sendForm toma el <form> y extrae los inputs por su atributo name
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            setStatus('success')
            formRef.current.reset()
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-8 py-8">
            <h2 className="text-4xl font-bold text-orange-400 mb-2">Contacto</h2>
            <p className="text-gray-500 text-sm mb-8">
                ¿Tenés una propuesta o querés charlar? Mandame un mensaje.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-sm">Tu email</label>
                    <input
                        type="email"
                        name="from_email"
                        required
                        placeholder="nombre@ejemplo.com"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm
                            placeholder:text-gray-700
                            focus:outline-none focus:border-orange-400/50 focus:bg-white/8
                            transition-colors duration-200"
                    />
                </div>

                {/* Asunto */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-sm">Asunto</label>
                    <input
                        type="text"
                        name="subject"
                        required
                        placeholder="¿De qué se trata?"
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm
                            placeholder:text-gray-700
                            focus:outline-none focus:border-orange-400/50 focus:bg-white/8
                            transition-colors duration-200"
                    />
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 text-sm">Mensaje</label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Escribí tu mensaje acá..."
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm
                            placeholder:text-gray-700 resize-none
                            focus:outline-none focus:border-orange-400/50 focus:bg-white/8
                            transition-colors duration-200"
                    />
                </div>

                {/* Botón enviar */}
                <button
                    data-kill
                    type="submit"
                    disabled={status === 'sending'}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm
                        transition-all duration-200
                        ${status === 'sending'
                            ? 'bg-orange-400/30 text-orange-400/50 cursor-not-allowed'
                            : 'bg-orange-400 hover:bg-orange-500 text-black hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                >
                    <FaPaperPlane className={status === 'sending' ? 'animate-pulse' : ''} />
                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </button>

                {/* Feedback de éxito o error */}
                {status === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                        <FaCheckCircle className="flex-shrink-0" />
                        ¡Mensaje enviado! Te respondo a la brevedad.
                    </div>
                )}
                {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                        <FaExclamationCircle className="flex-shrink-0" />
                        Algo salió mal. Intentá de nuevo o escribime directamente.
                    </div>
                )}

            </form>
        </div>
    )
}
