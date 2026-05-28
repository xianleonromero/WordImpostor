import { Link } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
    return <div className="notfound-page">
        <div className="notfound-container">
            <div className="notfound-icon">🎭</div>
            <h1 className="notfound-title">404</h1>
            <p className="notfound-subtitle">Esta página no existe</p>
            <p className="notfound-description">
                Parece que te has perdido. El impostor te ha llevado por el camino equivocado.
            </p>
            <Link to="/" className="notfound-btn">Volver al inicio</Link>
        </div>
    </div>
}

export default NotFound