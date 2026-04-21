import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./CreateGameModal.css"

const CreateGameModal = (props) => {
    const [maxJugadores, setMaxJugadores] = useState(6)
    const [numImpostores, setNumImpostores] = useState(1)
    const [esPublica, setEsPublica] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        axios.post('http://localhost:8000/api/games/crear/', {
            max_jugadores: maxJugadores,
            num_impostores: numImpostores,
            es_publica: esPublica
        }, {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            navigate('/game/' + response.data.codigo + '/waiting')
        }).catch(error => {
            setError('Error al crear la partida')
        })
    }

    return <div className="modal-overlay" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">⚙️ Crear Partida</h2>
            <form onSubmit={onSubmit}>
                <div className="modal-group">
                    <label>Jugadores máximos</label>
                    <select value={maxJugadores} onChange={e => setMaxJugadores(parseInt(e.target.value))}>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div className="modal-group">
                    <label>Impostores</label>
                    <select value={numImpostores} onChange={e => setNumImpostores(parseInt(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                    </select>
                </div>
                <div className="modal-group">
                    <label>Privacidad</label>
                    <select value={esPublica} onChange={e => setEsPublica(e.target.value === 'true')}>
                        <option value="true">Pública</option>
                        <option value="false">Privada</option>
                    </select>
                </div>
                <p className="modal-error" hidden={error.length === 0}>{error}</p>
                <button type="submit" className="modal-btn">Crear Partida</button>
                <button type="button" className="modal-btn-cancel" onClick={props.onClose}>Cancelar</button>
            </form>
        </div>
    </div>
}

export default CreateGameModal