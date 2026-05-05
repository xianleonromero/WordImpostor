import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./GameEnd.css"

const GameEnd = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [partida, setPartida] = useState(null)
    const username = localStorage.getItem('username')

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8000/api/games/' + params.codigo + '/', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            setPartida(response.data)
        }).catch(() => navigate('/lobby'))
    }, [])

    if (!partida) return <div className="gameend-loading">Cargando...</div>

    const jugadorActual = partida.jugadores.find(j => j.username === username)
    const esImpostor = jugadorActual && jugadorActual.rol === 'IMPOSTOR'
    const impostoresVivos = partida.jugadores.filter(j => !j.eliminado && j.rol === 'IMPOSTOR')
    const ganaron = esImpostor ? impostoresVivos.length > 0 : impostoresVivos.length === 0
    const impostores = partida.jugadores.filter(j => j.rol === 'IMPOSTOR')

    return <div className="gameend-page">
        <div className="gameend-container">

            <div className={ganaron ? 'gameend-banner win' : 'gameend-banner lose'}>
                <div className="gameend-banner-icon">{ganaron ? '🏆' : '💀'}</div>
                <h1 className="gameend-banner-title">
                    {ganaron ? '¡VICTORIA!' : '¡DERROTA!'}
                </h1>
                <p className="gameend-banner-subtitle">
                    {impostoresVivos.length === 0
                        ? '¡Los jugadores normales ganaron!'
                        : '¡Los impostores ganaron!'}
                </p>
            </div>

            <div className="gameend-secret">
                <p className="gameend-secret-label">La palabra secreta era</p>
                <p className="gameend-secret-word">{partida.palabra_secreta}</p>
                <p className="gameend-secret-category">Categoría: {partida.categoria}</p>
            </div>

            <div className="gameend-impostores">
                <h3 className="gameend-section-title">🎭 Los impostores eran</h3>
                <div className="gameend-impostores-list">
                    {impostores.map(imp =>
                        <div key={imp.username} className="gameend-impostor-item">
                            <div className="gameend-impostor-avatar">
                                {imp.username[0].toUpperCase()}
                            </div>
                            <span>{imp.username}</span>
                            {imp.eliminado && <span className="gameend-eliminated">💀 Eliminado</span>}
                        </div>
                    )}
                </div>
            </div>

            <div className="gameend-tabla">
                <h3 className="gameend-section-title">📊 Resultados</h3>
                <div className="gameend-tabla-header">
                    <span>Jugador</span>
                    <span>Rol</span>
                    <span>Estado</span>
                </div>
                {partida.jugadores.map(jugador =>
                    <div
                        key={jugador.username}
                        className={jugador.username === username ? 'gameend-tabla-row highlight' : 'gameend-tabla-row'}
                    >
                        <span className="gameend-tabla-name">
                            {jugador.username === username ? '👉 ' : ''}{jugador.username}
                        </span>
                        <span className={jugador.rol === 'IMPOSTOR' ? 'gameend-rol impostor' : 'gameend-rol normal'}>
                            {jugador.rol === 'IMPOSTOR' ? '🎭 Impostor' : '👤 Normal'}
                        </span>
                        <span className={jugador.eliminado ? 'gameend-estado eliminado' : 'gameend-estado vivo'}>
                            {jugador.eliminado ? '💀 Eliminado' : '✅ Sobrevivió'}
                        </span>
                    </div>
                )}
            </div>

            <div className="gameend-buttons">
                <button className="gameend-btn-lobby" onClick={() => navigate('/lobby')}>
                    Volver al Lobby
                </button>
            </div>
        </div>
    </div>
}

export default GameEnd