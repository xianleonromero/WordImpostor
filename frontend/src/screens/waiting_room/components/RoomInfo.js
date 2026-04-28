import "./RoomInfo.css"

const RoomInfo = (props) => {
    const onClickCopiar = () => {
        navigator.clipboard.writeText(props.codigo)
        alert('Código copiado: ' + props.codigo)
    }

    return <div className="room-info">
        <div className="room-info-codigo">
            <span className="room-info-label">Código de partida</span>
            <div className="room-info-code-row">
                <span className="room-info-code">{props.codigo}</span>
                <button className="room-info-copy" onClick={onClickCopiar}>📋 Copiar</button>
            </div>
        </div>
        <div className="room-info-config">
            <div className="room-info-item">
                <span className="room-info-item-label">Jugadores</span>
                <span className="room-info-item-value">
                    {props.jugadoresActuales} / {props.maxJugadores}
                </span>
            </div>
            <div className="room-info-item">
                <span className="room-info-item-label">Impostores</span>
                <span className="room-info-item-value">{props.numImpostores}</span>
            </div>
            <div className="room-info-item">
                <span className="room-info-item-label">Privacidad</span>
                <span className="room-info-item-value">{props.esPublica ? '🌍 Pública' : '🔒 Privada'}</span>
            </div>
        </div>
        <div className="room-info-bar">
            <div
                className="room-info-bar-fill"
                style={{width: (props.jugadoresActuales / props.maxJugadores * 100) + '%'}}
            />
        </div>
    </div>
}

export default RoomInfo