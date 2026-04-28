import "./PlayersSidebar.css"

const PlayersSidebar = (props) => {
    return <div className="players-sidebar">
        <h3 className="players-sidebar-title">👥 Jugadores</h3>
        {props.jugadores.map((jugador, index) =>
            <div key={jugador.username} className={jugador.eliminado ? 'sidebar-player eliminated' : 'sidebar-player'}>
                <div className="sidebar-player-avatar">
                    {jugador.username[0].toUpperCase()}
                </div>
                <div className="sidebar-player-info">
                    <div className="sidebar-player-name">{jugador.username}</div>
                    <div className="sidebar-player-status">
                        {jugador.eliminado ? '💀 Eliminado' : jugador.palabra_escrita ? '✅ Listo' : '⏳ Esperando'}
                    </div>
                </div>
            </div>
        )}
    </div>
}

export default PlayersSidebar