import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GameList from "./components/GameList"
import CreateGameModal from "./components/CreateGameModal"
import "./Lobby.css"

const Lobby = () => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

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
        <GameList />
        {showModal && <CreateGameModal onClose={() => setShowModal(false)} />}
    </div>
}

export default Lobby