import { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import "./Container.css"

const Container = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const doLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setLoggedIn(false)
    }

    return <div>
        <nav className="navbar">
            <Link to="/" className="navbar-logo">🎭 WORD IMPOSTOR</Link>
            <div className="navbar-links">
                {!loggedIn && <Link to="/login" className="navbar-btn">Iniciar Sesión</Link>}
                {loggedIn && <span className="navbar-user">👤 {localStorage.getItem('username')}</span>}
                {loggedIn && <button className="navbar-btn" onClick={doLogout}>Salir</button>}
            </div>
        </nav>
        <Outlet context={[loggedIn, setLoggedIn]} />
    </div>
}

export default Container