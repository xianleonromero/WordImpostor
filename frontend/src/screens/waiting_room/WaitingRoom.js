import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import RoomInfo from "./components/RoomInfo"
import PlayersList from "./components/PlayersList"
import "./WaitingRoom.css"

const WaitingRoom = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [partida, setPartida] = useState(null)
    const [error, setError] = useState('')

    const cargarPartida = () => {
        axios.get('http://localhost:8000/api/games/' + params.codigo + '/')
            .then(response => {
                setPartida(response.data)
                if (response.data.estado === 'JUGANDO') {
                    navigate('/game/' + params.codigo + '/role')
                }
            })
            .catch(error => {
                setError('Partida no encontrada')
            })
    }

    useEffect(() => {
        cargarPartida()
        const intervalo = setInterval(cargarPartida, 2000)
        return () => clearInterval(intervalo)
    }, [])

    const onClickSalir = () => {
        navigate('/lobby')
    }

    const onClickIniciar = () => {
        const token = localStorage.getItem('token')
        axios.put('http://localhost:8000/api/games/' + params.codigo + '/update/', {
            estado: 'JUGANDO'
        }, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(() => {
            navigate('/game/' + params.codigo + '/role')
        }).catch(() => {
            setError('Error al iniciar la partida')
        })
    }

    if (error) return <div className="waiting-room">
        <p className="waiting-error">{error}</p>
    </div>

    if (!partida) return <div className="waiting-room">
        <p className="waiting-loading">Cargando...</p>
    </div>

    const username = localStorage.getItem('username')
    const esCreadoR = partida.creador_username === username
    const puedeIniciar = esCreadoR && partida.jugadores.length >= 3

    return <div className="waiting-room">
        <h1 className="waiting-title">⏳ Sala de Espera</h1>
        <RoomInfo
            codigo={partida.codigo}
            jugadoresActuales={partida.jugadores.length}
            maxJugadores={partida.max_jugadores}
            numImpostores={partida.num_impostores}
            esPublica={partida.es_publica}
        />
        <PlayersList jugadores={partida.jugadores} />
        <p className="waiting-error" hidden={error.length === 0}>{error}</p>
        <div className="waiting-buttons">
            <button className="waiting-btn-salir" onClick={onClickSalir}>
                Salir de la partida
            </button>
            {esCreadoR && <button
                className="waiting-btn-iniciar"
                onClick={onClickIniciar}
                disabled={!puedeIniciar}
            >
                {puedeIniciar ? 'Iniciar Partida' : 'Mínimo 3 jugadores'}
            </button>}
        </div>
    </div>
}

export default WaitingRoom