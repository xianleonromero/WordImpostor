import { useNavigate } from "react-router-dom"
import "./GameCard.css"
import axios from "axios"

const GameCard = (props) => {
    const navigate = useNavigate()

    const onClickUnirse = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        axios.post('http://localhost:8000/api/games/' + props.game.codigo + '/unirse/', {}, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            navigate('/game/' + props.game.codigo + '/waiting')
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error)
            } else {
                alert('Error al unirse a la partida')
            }
        })
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