import { useParams } from 'react-router-dom';
import './GameEnd.css';

const GameEnd = () => {
    const params = useParams();
    return <div>
        <h2>Fin de partida</h2>
        <p>Código: {params.codigo}</p>
    </div>
}

export default GameEnd;