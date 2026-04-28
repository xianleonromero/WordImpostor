import { useState } from "react"
import "./VotePhase.css"

const VotePhase = (props) => {
    const [votado, setVotado] = useState(null)
    const [enviado, setEnviado] = useState(false)
    const username = localStorage.getItem('username')

    const onVotar = (jugador) => {
        if (enviado) return
        setVotado(jugador.username)
    }

    const onConfirmar = () => {
        if (!votado) return
        props.onVotar(votado)
        setEnviado(true)
    }

    return <div className="vote-phase">
        <h2 className="vote-phase-title">🗳️ VOTA AL SOSPECHOSO</h2>
        <p className="vote-phase-subtitle">Selecciona al jugador que crees que es el impostor</p>
        {!props.esImpostor && <p className="vote-phase-secret">{props.palabraSecreta}</p>}
        <div className="vote-phase-grid">
            {props.jugadores.filter(j => !j.eliminado).map(jugador =>
                <div
                    key={jugador.username}
                    className={
                        jugador.username === username ? 'vote-card disabled' :
                        votado === jugador.username ? 'vote-card selected' : 'vote-card'
                    }
                    onClick={() => jugador.username !== username && !enviado && onVotar(jugador)}
                >
                    <div className="vote-card-avatar">
                        {jugador.username[0].toUpperCase()}
                    </div>
                    <div className="vote-card-name">{jugador.username}</div>
                    <div className="vote-card-word">{jugador.palabra_escrita}</div>
                    {jugador.username === username &&
                        <div className="vote-card-you">No puedes votarte</div>
                    }
                </div>
            )}
        </div>
        {enviado
            ? <p className="vote-phase-waiting">✅ Voto enviado. Esperando a los demás...</p>
            : <button
                className="vote-phase-btn"
                onClick={onConfirmar}
                disabled={!votado}
            >
                CONFIRMAR VOTO
            </button>
        }
    </div>
}

export default VotePhase