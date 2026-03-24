import { useState } from "react"
import axios from "axios"
import "./RegisterForm.css"

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirm) {
            setError('Las contraseñas no coinciden')
            return
        }
        axios.post('http://localhost:8000/api/auth/register/', {
            email: email,
            username: username,
            password: password
        }).then(response => {
            setSuccess(true)
            setError('')
        }).catch(error => {
            if (error.response && error.response.status === 409) {
                setError('El usuario ya existe')
            } else {
                setError('Error al registrarse')
            }
        })
    }

    return <form className="register-form" onSubmit={onSubmit}>
        <p className="register-success" hidden={!success}>¡Registro exitoso! Ya puedes iniciar sesión.</p>
        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Username</label>
            <input
                type="text"
                placeholder="3-15 caracteres"
                value={username}
                minLength={3}
                maxLength={15}
                onChange={e => setUsername(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Contraseña</label>
            <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                minLength={6}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
                type="password"
                placeholder="Repite tu contraseña"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
            />
        </div>
        <p className="form-error" hidden={error.length === 0}>{error}</p>
        <button type="submit" className="btn-submit">Registrarse</button>
    </form>
}

export default RegisterForm