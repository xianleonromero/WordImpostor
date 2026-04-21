import { useNavigate } from "react-router-dom"
import "./GameCard.css"

const GameCard = (props) => {
    const navigate = useNavigate()

    const onClickUnirse = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        navigate('/game/' + props.game.codigo + '/waiting')
    }

    return <div className="game-card">
        <div className="game-card-header">
            <span className="game-card-codigo">{props.game.codigo}</span>
            <span className="game-card-estado">{props.game.estado}</span>
        </div>
        <div className="game-card-info">
            <p>👥 {props.game.jugadores.length} / {props.game.max_jugadores} jugadores</p>
            <p>🎭 {props.game.num_impostores} impostor{props.game.num_impostores > 1 ? 'es' : ''}</p>
            <p>👑 {props.game.creador_username}</p>
        </div>
        <button className="game-card-btn" onClick={onClickUnirse}>
            Unirse
        </button>
    </div>
}

export default GameCard