import { useParams } from 'react-router-dom';
import './RoleAssignment.css';

const RoleAssignment = () => {
    const params = useParams();
    return <div>
        <h2>Asignación de rol</h2>
        <p>Código: {params.codigo}</p>
    </div>
}

export default RoleAssignment;