import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:8080/api/afiliados'

export default function AfiliadosList({ refresh, onEdit }) {
  const [afiliados, setAfiliados] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAfiliados()
  }, [refresh])

  const fetchAfiliados = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error fetching data')
      const data = await response.json()
      setAfiliados(data)
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este afiliado?')) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error deleting')
      fetchAfiliados()
      alert('Afiliado eliminado exitosamente')
    } catch (err) {
      alert('Error al eliminar: ' + err.message)
    }
  }

  if (loading) return <div className="loading">Cargando afiliados...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="afiliados-list">
      <h2>Lista de Afiliados</h2>
      
      {afiliados.length === 0 ? (
        <p className="no-data">No hay afiliados registrados</p>
      ) : (
        <div className="table-container">
          <table className="afiliados-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo de Afiliado</th>
                <th>Fecha/Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {afiliados.map((afiliado) => (
                <tr key={afiliado.id}>
                  <td>{afiliado.id}</td>
                  <td>{afiliado.nombre}</td>
                  <td>{afiliado.tipoAfiliado}</td>
                  <td>{new Date(afiliado.fechaHora).toLocaleString('es-BO')}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => onEdit(afiliado)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(afiliado.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
