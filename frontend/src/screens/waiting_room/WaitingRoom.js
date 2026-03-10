import { useParams } from 'react-router-dom';
import './WaitingRoom.css';

const WaitingRoom = () => {
    const params = useParams();
    return <div>
        <h2>Sala de espera</h2>
        <p>Código: {params.codigo}</p>
    </div>
}

export default WaitingRoom;