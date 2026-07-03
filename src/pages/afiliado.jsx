import { useState } from 'react'
import Header from './assets/components/Header'
import NavBar from './assets/components/NavBar'
import Footer from './assets/components/Footer'
import AfiliadoForm from './assets/components/AfiliadoForm'
import AfiliadosList from './assets/components/AfiliadosList'
import './App.css'

function App() {
  const [refreshList, setRefreshList] = useState(false)
  const [editingAfiliado, setEditingAfiliado] = useState(null)

  const handleFormSubmit = () => {
    setRefreshList(!refreshList)
  }

  const handleEdit = (afiliado) => {
    setEditingAfiliado(afiliado)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingAfiliado(null)
  }

  return (
    <div className="app">
      <Header />
      <NavBar />
      
      <main className="main-content">
        <div className="container">
          <div className="page-layout">
            <div className="form-section">
              <AfiliadoForm 
                onFormSubmit={handleFormSubmit}
                editingAfiliado={editingAfiliado}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="list-section">
              <AfiliadosList 
                refresh={refreshList}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
