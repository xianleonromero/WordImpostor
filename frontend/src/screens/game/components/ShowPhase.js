import "./ShowPhase.css"

const ShowPhase = (props) => {
    return <div className="show-phase">
        <h2 className="show-phase-title">📋 PALABRAS ESCRITAS</h2>
        <p className="show-phase-subtitle">Analiza las palabras de todos</p>
        {!props.esImpostor && <p className="show-phase-secret">{props.palabraSecreta}</p>}
        <div className="show-phase-grid">
            {props.jugadores.map(jugador =>
                <div key={jugador.username} className={jugador.eliminado ? 'show-card eliminated' : 'show-card'}>
                    <div className="show-card-avatar">
                        {jugador.username[0].toUpperCase()}
                    </div>
                    <div className="show-card-name">{jugador.username}</div>
                    <div className="show-card-word">
                        {jugador.palabra_escrita || '?????'}
                    </div>
                </div>
            )}
        </div>
    </div>
}

export default ShowPhase