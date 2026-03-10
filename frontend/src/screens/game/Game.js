import { useParams } from 'react-router-dom';
import './Game.css';

const Game = () => {
    const params = useParams();
    return <div>
        <h2>Partida en juego</h2>
        <p>Código: {params.codigo}</p>
    </div>
}

export default Game;