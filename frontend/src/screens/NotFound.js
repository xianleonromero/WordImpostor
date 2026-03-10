import { Link } from "react-router-dom";

const NotFound = () => {
    return <div>
        <h2>Página no encontrada</h2>
        <p>Esta página no existe.</p>
        <Link to='/'>Volver al inicio</Link>
    </div>
}

export default NotFound;