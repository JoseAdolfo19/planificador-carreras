import { useState } from 'react'
import { navItems } from '../../data/constants'

function ProfileForm({ profile, setProfile, onClose, onLogout }) {
  const [name, setName] = useState(profile.name)
  const [detail, setDetail] = useState(profile.detail)
  const valid = name.trim().length > 0 && detail.trim().length > 0
  function submit(event) { event.preventDefault(); if (!valid) return; setProfile({ name: name.trim(), detail: detail.trim() }); onClose() }
  return <form className="profile-form" onSubmit={submit}><label>Nombre<input className="form-input" value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Información académica<input className="form-input" value={detail} onChange={(event) => setDetail(event.target.value)} required /></label><div className="profile-form-actions"><button className="primary-button" type="submit" disabled={!valid}>Guardar</button><button className="profile-cancel" type="button" onClick={onClose}>Cancelar</button></div><button className="profile-logout" type="button" onClick={onLogout}>Cerrar sesión</button></form>
}

export default function Sidebar({ activeNav, setActiveNav, pendingCount, semesterProgress, profile, setProfile, onLogout, onConfig }) {
  const [editingProfile, setEditingProfile] = useState(false)
  return <aside className="sidebar"><div className="brand"><span className="brand-mark">S</span><span>Study<span className="brand-accent">Manager</span></span></div><div className="profile-card"><div className="avatar">{profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><strong>{profile.name}</strong><span>{profile.detail}</span></div><button className="icon-button" aria-label="Editar perfil" onClick={() => setEditingProfile((current) => !current)}>•••</button></div>{editingProfile && <ProfileForm profile={profile} setProfile={setProfile} onClose={() => setEditingProfile(false)} onLogout={onLogout} />}<nav aria-label="Navegacion principal"><span className="nav-label">Workspace</span>{navItems.map(([icon, label]) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label)}><span className="nav-icon">{icon}</span>{label}{label === 'Mis tareas' && <span className="nav-count">{pendingCount}</span>}</button>)}</nav><div className="sidebar-bottom"><button className="nav-item" onClick={onConfig}><span className="nav-icon">⚙</span>Configuracion</button><div className="semester-card"><span className="eyebrow">SEMESTRE ACTUAL</span><strong>2026 - II</strong><div className="semester-line"><span>Progreso</span><b>{semesterProgress}%</b></div><div className="progress-track"><span style={{ width: `${semesterProgress}%` }} /></div></div><span className="sidebar-foot">StudyManager v0.2 · Local mode</span></div></aside>
}
