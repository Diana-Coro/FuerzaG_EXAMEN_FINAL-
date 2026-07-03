import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:8080/api/afiliados'

export default function AfiliadoForm({ onFormSubmit, editingAfiliado, onCancelEdit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipoAfiliado: 'Estudiante',
    fechaHora: new Date().toISOString().slice(0, 16)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (editingAfiliado) {
      setFormData({
        nombre: editingAfiliado.nombre,
        tipoAfiliado: editingAfiliado.tipoAfiliado,
        fechaHora: new Date(editingAfiliado.fechaHora).toISOString().slice(0, 16)
      })
    } else {
      setFormData({
        nombre: '',
        tipoAfiliado: 'Estudiante',
        fechaHora: new Date().toISOString().slice(0, 16)
      })
    }
    setError(null)
  }, [editingAfiliado])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.nombre.trim()) {
      setError('El nombre es requerido')
      setLoading(false)
      return
    }

    try {
      const payload = {
        ...formData,
        fechaHora: new Date(formData.fechaHora).toISOString()
      }

      const url = editingAfiliado ? `${API_URL}/${editingAfiliado.id}` : API_URL
      const method = editingAfiliado ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const result = await response.json()
      alert(editingAfiliado ? 'Afiliado actualizado exitosamente' : 'Afiliado creado exitosamente')
      
      setFormData({
        nombre: '',
        tipoAfiliado: 'Estudiante',
        fechaHora: new Date().toISOString().slice(0, 16)
      })
      
      onFormSubmit()
      
      if (editingAfiliado) {
        onCancelEdit()
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="afiliado-form">
      <h2>{editingAfiliado ? 'Editar Afiliado' : 'Crear Nuevo Afiliado'}</h2>
      
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoAfiliado">Tipo de Afiliado:</label>
          <select
            id="tipoAfiliado"
            name="tipoAfiliado"
            value={formData.tipoAfiliado}
            onChange={handleChange}
          >
            <option>Estudiante</option>
            <option>Docente</option>
            <option>Personal Administrativo</option>
            <option>Egresado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fechaHora">Fecha y Hora:</label>
          <input
            type="datetime-local"
            id="fechaHora"
            name="fechaHora"
            value={formData.fechaHora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (editingAfiliado ? 'Actualizar' : 'Crear')}
          </button>
          
          {editingAfiliado && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
