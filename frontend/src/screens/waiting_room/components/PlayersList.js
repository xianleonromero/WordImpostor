import "./PlayersList.css"

const PlayersList = (props) => {
    return <div className="players-list">
        <h2 className="players-list-title">👥 Jugadores en sala</h2>
        <div className="players-list-grid">
            {props.jugadores.map((jugador, index) =>
                <div key={jugador.username} className="players-list-item">
                    <div className="players-list-avatar">
                        {jugador.username[0].toUpperCase()}
                    </div>
                    <span className="players-list-name">{jugador.username}</span>
                    {index === 0 && <span className="players-list-crown">👑</span>}
                </div>
            )}
        </div>
    </div>
}

export default PlayersList