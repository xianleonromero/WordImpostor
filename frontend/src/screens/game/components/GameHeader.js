import "./GameHeader.css"

const GameHeader = (props) => {
    return <div className="game-header">
        <div className="game-header-left">
            <span className="game-header-ronda">RONDA {props.ronda} / 5</span>
        </div>
        <div className="game-header-center">
            <div className="game-header-timer">{props.timeLeft}</div>
            <div>
                <div className="game-header-timer-label">Tiempo</div>
                <div className="game-header-fase">{props.fase}</div>
            </div>
        </div>
        <div className="game-header-right">
            <span className={props.esImpostor ? 'game-header-rol impostor' : 'game-header-rol normal'}>
                {props.esImpostor ? '🎭 IMPOSTOR' : '👤 ' + props.palabraSecreta}
            </span>
        </div>
    </div>
}

export default GameHeader