import { useState } from 'react'
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../../data/constants'

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const valid = email.trim().length > 0 && password.length > 0
  function submit(event) {
    event.preventDefault()
    if (!valid) return
    if (email.trim().toLowerCase() !== LOGIN_EMAIL || password !== LOGIN_PASSWORD) {
      setError('El correo o la contraseña no son correctos.')
      return
    }
    setError('')
    onLogin()
  }
  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand login-brand"><span className="brand-mark">S</span><span>Study<span className="brand-accent">Manager</span></span></div>
        <p className="eyebrow warm">BIENVENIDO DE NUEVO</p>
        <h1>Inicia sesión</h1>
        <p className="login-copy">Organiza tus cursos, tareas y entregas en un solo lugar.</p>
        <form className="login-form" onSubmit={submit}>
          <label>Correo electrónico<input className="form-input" type="email" placeholder="tu@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Contraseña<input className="form-input" type="password" placeholder="Tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={!valid}>Entrar</button>
        </form>
      </section>
    </main>
  )
}
