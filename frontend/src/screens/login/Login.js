import { useState } from "react"
import { Link } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import "./Login.css"

const Login = () => {
    const [activeTab, setActiveTab] = useState('login')
    const [animating, setAnimating] = useState(false)

    const switchTab = (tab) => {
        if (tab === activeTab) return
        setAnimating(true)
        setTimeout(() => {
            setActiveTab(tab)
            setAnimating(false)
        }, 200)
    }

    return <div className="login-page">
        <div className="login-card">
            <h1 className="login-logo">🎭 WORD IMPOSTOR</h1>
            <div className="login-tabs">
                <button
                    className={activeTab === 'login' ? 'tab active' : 'tab'}
                    onClick={() => switchTab('login')}
                >Login</button>
                <button
                    className={activeTab === 'register' ? 'tab active' : 'tab'}
                    onClick={() => switchTab('register')}
                >Registro</button>
            </div>
            <div className={animating ? 'tab-content fading' : 'tab-content'}>
                {activeTab === 'login' && <LoginForm />}
                {activeTab === 'register' && <RegisterForm />}
            </div>
            <div className="login-back">
                <Link to="/">← Volver al inicio</Link>
            </div>
        </div>
    </div>
}

export default Login