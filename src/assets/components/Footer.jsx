import './Footer.css'

export default function Footer() {
  const integrantes = [
    'Diana', 'Samira', 'Armando', 'Alfredo', 'Fatima', 'Benjamin', 'Ximena'
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Integrantes</h4>
          <ul>
            {integrantes.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Información</h4>
          <p>Materia: Tecnologías Emergentes</p>
          <p>Gestión: 2026</p>
          <p>Universidad Autónoma Tomás Frías</p>
        </div>

        <div className="footer-section">
          <h4>Tecnologías</h4>
          <ul>
            <li>Spring Boot 4.0.6</li>
            <li>React 19</li>
            <li>Vite</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Seguro Universitario Potosí - Todos los derechos reservados</p>
      </div>
    </footer>
  )
}
