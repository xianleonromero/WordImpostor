import { useState } from "react"
import "./WritePhase.css"

const WritePhase = (props) => {
    const [palabra, setPalabra] = useState('')
    const [enviada, setEnviada] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (palabra.length === 0) return
        props.onEnviarPalabra(palabra)
        setEnviada(true)
    }

    if (enviada) return <div className="write-phase">
        <h2 className="write-phase-title">✅ Palabra enviada</h2>
        <p className="write-phase-word">{palabra}</p>
        <p className="write-phase-waiting">Esperando a los demás jugadores...</p>
    </div>

    return <div className="write-phase">
        <h2 className="write-phase-title">✏️ ¡ES TU TURNO!</h2>
        <p className="write-phase-subtitle">
            Escribe una palabra relacionada con{' '}
            {props.esImpostor
                ? 'la categoría (no conoces la palabra)'
                : <strong>{props.palabraSecreta}</strong>
            }
        </p>
        {!props.esImpostor && <p className="write-phase-secret">{props.palabraSecreta}</p>}
        <form className="write-phase-form" onSubmit={onSubmit}>
            <input
                type="text"
                className="write-phase-input"
                placeholder="Tu palabra..."
                maxLength={10}
                value={palabra}
                onChange={e => setPalabra(e.target.value.toUpperCase())}
                autoFocus
            />
            <p className="write-phase-counter">{palabra.length}/10</p>
            <button
                type="submit"
                className="write-phase-btn"
                disabled={palabra.length === 0}
            >
                ENVIAR PALABRA
            </button>
        </form>
    </div>
}

export default WritePhase