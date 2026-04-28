import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./RoleAssignment.css"

const RoleAssignment = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [rol, setRol] = useState(null)
    const [palabraSecreta, setPalabraSecreta] = useState('')
    const [categoria, setCategoria] = useState('')
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8000/api/games/' + params.codigo + '/', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            const partida = response.data
            const username = localStorage.getItem('username')
            const jugador = partida.jugadores.find(j => j.username === username)
            if (jugador) {
                setRol(jugador.rol)
                setPalabraSecreta(partida.palabra_secreta)
                setCategoria(partida.categoria)
            }
        }).catch(() => {
            navigate('/lobby')
        })
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) {
            navigate('/game/' + params.codigo + '/play')
            return
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft])

    const esImpostor = rol === 'IMPOSTOR'

    return <div className={esImpostor ? 'role-page impostor' : 'role-page normal'}>
        <div className="role-container">
            <div className="role-badge">
                {esImpostor ? '🔴 ERES IMPOSTOR' : '🟢 JUGADOR NORMAL'}
            </div>
            <div className="role-icon">
                {esImpostor ? '🎭' : '👤'}
            </div>
            {esImpostor
                ? <div className="role-secret">
                    <p className="role-secret-label">No conoces la palabra</p>
                    <p className="role-secret-word">???</p>
                    <p className="role-secret-hint">Categoría: <strong>{categoria}</strong></p>
                </div>
                : <div className="role-secret">
                    <p className="role-secret-label">La palabra secreta es:</p>
                    <p className="role-secret-word">{palabraSecreta}</p>
                </div>
            }
            <div className="role-instructions">
                {esImpostor
                    ? <div>
                        <p>⚠️ Observa las palabras de los demás</p>
                        <p>⚠️ Escribe algo genérico pero convincente</p>
                        <p>⚠️ Intenta pasar desapercibido</p>
                    </div>
                    : <div>
                        <p>✅ Escribe palabras relacionadas con <strong>{palabraSecreta}</strong></p>
                        <p>✅ No seas demasiado obvio</p>
                        <p>✅ El impostor NO conoce la palabra</p>
                    </div>
                }
            </div>
            <div className="role-timer">
                <span className="role-timer-circle">{timeLeft}</span>
                segundos para continuar
            </div>
            <button className="role-btn" onClick={() => navigate('/game/' + params.codigo + '/play')}>
                ENTENDIDO
            </button>
        </div>
    </div>
}

export default RoleAssignment