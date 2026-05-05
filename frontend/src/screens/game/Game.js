import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import GameHeader from "./components/GameHeader"
import PlayersSidebar from "./components/PlayersSidebar"
import WritePhase from "./components/WritePhase"
import ShowPhase from "./components/ShowPhase"
import VotePhase from "./components/VotePhase"
import "./Game.css"

const Game = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [partida, setPartida] = useState(null)
    const [fase, setFase] = useState('ESCRIBIR')
    const [timeLeft, setTimeLeft] = useState(20)
    const faseRef = useRef('ESCRIBIR')
    const username = localStorage.getItem('username')

    const cambiarFase = (nuevaFase, tiempo) => {
        faseRef.current = nuevaFase
        setFase(nuevaFase)
        setTimeLeft(tiempo)
    }

    const cargarPartida = () => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8000/api/games/' + params.codigo + '/', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            setPartida(response.data)

            if (response.data.estado === 'FINALIZADA') {
                navigate('/game/' + params.codigo + '/end')
                return
            }

            if (faseRef.current === 'ESCRIBIR') {
                const jugadoresVivos = response.data.jugadores.filter(j => !j.eliminado)
                const todosEscribieron = jugadoresVivos.length > 0 &&
                    jugadoresVivos.every(j => j.palabra_escrita && j.palabra_escrita.length > 0)
                if (todosEscribieron) {
                    cambiarFase('MOSTRAR', 10)
                }
            }

            if (faseRef.current === 'VOTAR') {
                const jugadoresVivos = response.data.jugadores.filter(j => !j.eliminado)
                const todosVotaron = jugadoresVivos.every(j => j.puntos_obtenidos > 0)
                if (todosVotaron) {
                    cambiarFase('ESCRIBIR', 20)
                }
            }

        }).catch(() => navigate('/lobby'))
    }

    useEffect(() => {
        cargarPartida()
        const intervalo = setInterval(cargarPartida, 2000)
        return () => clearInterval(intervalo)
    }, [])

    useEffect(() => {
        if (timeLeft <= 0) {
            if (faseRef.current === 'MOSTRAR') {
                cambiarFase('VOTAR', 20)
            }
            return
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft])

    const onEnviarPalabra = (palabra) => {
        const token = localStorage.getItem('token')
        axios.post('http://localhost:8000/api/games/' + params.codigo + '/palabra/', {
            palabra: palabra
        }, {
            headers: { Authorization: 'Bearer ' + token }
        }).catch(error => console.log(error))
    }

    const onVotar = (votadoUsername) => {
        const token = localStorage.getItem('token')
        axios.post('http://localhost:8000/api/games/' + params.codigo + '/votar/', {
            votado: votadoUsername
        }, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            if (response.data.fin) {
                navigate('/game/' + params.codigo + '/end')
            } else if (response.data.siguiente_ronda) {
                cambiarFase('ESCRIBIR', 20)
            }
        }).catch(error => console.log(error))
    }

    if (!partida) return <div className="game-loading">Cargando...</div>

    const jugador = partida.jugadores.find(j => j.username === username)
    const esImpostor = jugador && jugador.rol === 'IMPOSTOR'

    return <div className="game-page">
        <GameHeader
            ronda={partida.ronda_actual}
            timeLeft={timeLeft}
            fase={fase}
            esImpostor={esImpostor}
            palabraSecreta={partida.palabra_secreta}
        />
        <div className="game-body">
            <PlayersSidebar jugadores={partida.jugadores} />
            <div className="game-center">
                {fase === 'ESCRIBIR' && <WritePhase
                    esImpostor={esImpostor}
                    palabraSecreta={partida.palabra_secreta}
                    onEnviarPalabra={onEnviarPalabra}
                />}
                {fase === 'MOSTRAR' && <ShowPhase
                    jugadores={partida.jugadores}
                    esImpostor={esImpostor}
                    palabraSecreta={partida.palabra_secreta}
                />}
                {fase === 'VOTAR' && <VotePhase
                    jugadores={partida.jugadores}
                    esImpostor={esImpostor}
                    palabraSecreta={partida.palabra_secreta}
                    onVotar={onVotar}
                />}
            </div>
        </div>
    </div>
}

export default Game