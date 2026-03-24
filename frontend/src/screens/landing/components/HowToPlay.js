import "./HowToPlay.css"

const HowToPlay = () => {
    return <section className="how-to-play">
        <div className="how-container">
            <h2 className="how-title">Cómo Jugar</h2>
            <div className="steps">
                <div className="step">
                    <div className="step-number">1</div>
                    <h3>Recibe tu Rol</h3>
                    <p>Todos reciben la misma palabra secreta... excepto el impostor que solo conoce la categoría.</p>
                </div>
                <div className="step">
                    <div className="step-number">2</div>
                    <h3>Escribe una Palabra</h3>
                    <p>Cada jugador escribe una palabra relacionada (máx 10 caracteres). ¡Sé específico pero no reveles demasiado!</p>
                </div>
                <div className="step">
                    <div className="step-number">3</div>
                    <h3>Vota al Sospechoso</h3>
                    <p>Analiza las palabras de todos y vota a quien creas que es el impostor. ¡La mayoría decide!</p>
                </div>
            </div>
        </div>
    </section>
}

export default HowToPlay