import { Link } from "react-router-dom"
import "./HeroSection.css"

const HeroSection = () => {
    return <section className="hero">
        <div className="hero-container">
            <h1 className="hero-title">WORD IMPOSTOR</h1>
            <p className="hero-subtitle">¿Puedes descubrir al impostor antes de que te engañe?</p>
            <p className="hero-description">
                Juego multijugador de deducción social. Escribe palabras relacionadas con la palabra secreta,
                vota al sospechoso y gana. ¡Pero cuidado! El impostor está entre vosotros.
            </p>
            <div className="hero-buttons">
                <Link to="/login" className="btn-primary">Jugar Ahora</Link>
            </div>
        </div>
    </section>
}

export default HeroSection