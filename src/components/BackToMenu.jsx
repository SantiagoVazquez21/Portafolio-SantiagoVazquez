import {useNavigate} from "react-router-dom";

function BackToMenu() {

    const navigate = useNavigate();

    return(
        <button
            onClick={() => navigate('/menu')}
            className="fixed top-4 right-4 z-10 px-4 py-2 border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white text-sm font-semibold"
        >
            Volver al menú
        </button>
    )}

export default BackToMenu