import { useState, useEffect } from "react"
import axios from "axios"
import GameCard from "./GameCard"
import "./GameList.css"

const GameList = () => {
    const [partidas, setPartidas] = useState([])

    const cargarPartidas = () => {
        axios.get('http://localhost:8000/api/games/?estado=ESPERANDO')
            .then(response => {
                setPartidas(response.data)
            })
            .catch(error => {
                console.log('Error cargando partidas', error)
            })
    }

    useEffect(() => {
        cargarPartidas()
        const intervalo = setInterval(cargarPartidas, 3000)
        return () => clearInterval(intervalo)
    }, [])

    return <div className="game-list">
        <h2 className="game-list-title">🎮 Partidas Disponibles</h2>
        {partidas.length === 0
            ? <p className="game-list-empty">No hay partidas disponibles. ¡Crea una!</p>
            : <div className="game-list-grid">
                {partidas.map(game => <GameCard key={game.codigo} game={game} />)}
            </div>
        }
    </div>
}

export default GameList