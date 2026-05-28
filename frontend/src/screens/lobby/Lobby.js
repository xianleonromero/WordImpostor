import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import GameList from "./components/GameList"
import CreateGameModal from "./components/CreateGameModal"
import "./Lobby.css"

const Lobby = () => {
    const [showModal, setShowModal] = useState(false)
    const [ranking, setRanking] = useState([])
    const navigate = useNavigate()

    const cargarRanking = () => {
        axios.get('http://localhost:8000/api/users/ranking/?limit=5')
            .then(response => setRanking(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        cargarRanking()
        const intervalo = setInterval(cargarRanking, 10000)
        return () => clearInterval(intervalo)
    }, [])

    const onClickCrear = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        setShowModal(true)
    }

    return <div className="lobby">
        <div className="lobby-header">
            <h1 className="lobby-title">🎮 Lobby</h1>
            <button className="lobby-btn-crear" onClick={onClickCrear}>
                + Crear Partida
            </button>
        </div>
        <div className="lobby-body">
            <div className="lobby-main">
                <GameList />
            </div>
            <div className="lobby-sidebar">
                <h2 className="lobby-ranking-title">🏆 Top Jugadores</h2>
                {ranking.length === 0
                    ? <p className="lobby-ranking-empty">Sin datos aún</p>
                    : ranking.map((perfil, index) =>
                        <div key={perfil.usuario.username} className="lobby-ranking-item">
                            <span className="lobby-ranking-pos">{index + 1}</span>
                            <span className="lobby-ranking-name">{perfil.usuario.username}</span>
                            <span className="lobby-ranking-pts">{perfil.puntos_totales} pts</span>
                        </div>
                    )
                }
            </div>
        </div>
        {showModal && <CreateGameModal onClose={() => setShowModal(false)} />}
    </div>
}

export default Lobby