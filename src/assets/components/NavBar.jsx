import { useState } from 'react'

export default function NavBar() {
  const [activeTab, setActiveTab] = useState('afiliados')

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'afiliados' ? 'active' : ''}`}
              onClick={() => setActiveTab('afiliados')}
            >
              🏠 Inicio
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'docs' ? 'active' : ''}`}
              onClick={() => setActiveTab('docs')}
            >
              📚 Documentación
            </button>
          </li>
          <li className="nav-item">
            <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noopener noreferrer" className="nav-link">
              📖 API Swagger
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
