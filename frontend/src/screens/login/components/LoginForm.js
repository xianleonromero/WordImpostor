import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"
import "./LoginForm.css"

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useOutletContext()

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) return

        axios.post('http://localhost:8000/api/auth/login/', {
            email: email,
            password: password
        }).then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            setLoggedIn(true)
            navigate('/lobby')
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                setError('Email o contraseña incorrectos')
            } else {
                setError('Error al iniciar sesión')
            }
        })
    }

    return <form className="login-form" onSubmit={onSubmit}>
        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={onChangeEmail}
            />
        </div>
        <div className="form-group">
            <label>Contraseña</label>
            <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={onChangePassword}
            />
        </div>
        <p className="form-error" hidden={error.length === 0}>{error}</p>
        <button type="submit" className="btn-submit">Iniciar Sesión</button>
    </form>
}

export default LoginForm