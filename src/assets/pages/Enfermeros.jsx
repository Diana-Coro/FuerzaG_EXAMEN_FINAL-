import { useEffect, useState } from "react";
import {
  listarEnfermeros,
  buscarEnfermeroPorId,
  guardarEnfermero,
  actualizarEnfermero,
  eliminarEnfermero,
} from "../../services/enfermeroService";

import "./Enfermeros.css";

function Enfermeros() {
  const [enfermeros, setEnfermeros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [area, setArea] = useState("");
  const [celular, setCelular] = useState("");

  const [idEditar, setIdEditar] = useState(null);
  const [idBuscar, setIdBuscar] = useState("");
  const [enfermeroSeleccionado, setEnfermeroSeleccionado] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("");
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const cargarEnfermeros = async () => {
    try {
      const datos = await listarEnfermeros();
      setEnfermeros(datos || []);
    } catch (error) {
      console.error("Error al cargar enfermeros", error);
      setEnfermeros([]);
    }
    setEnfermeroSeleccionado(null);
  };

  useEffect(() => {
    setTimeout(() => {
      cargarEnfermeros();
    }, 0);
  }, []);

  const buscarPorId = async () => {
    if (idBuscar === "") {
      alert("Ingrese un ID para buscar");
      return;
    }

    try {
      const dato = await buscarEnfermeroPorId(idBuscar);
      setEnfermeros([dato]);
      setEnfermeroSeleccionado(null);
    } catch {
      alert("No se encontró un enfermero con ese ID");
    }
  };

  const seleccionarFila = (enfermero) => {
    setEnfermeroSeleccionado(enfermero);
  };

  const nuevo = () => {
    setModoFormulario("nuevo");
    setIdEditar(null);
    setNombre("");
    setFechaIngreso("");
    setArea("");
    setCelular("");
    setMostrarFormulario(true);
  };

  const editarSeleccionado = () => {
    if (enfermeroSeleccionado === null) {
      alert("Seleccione un enfermero de la tabla");
      return;
    }

    setModoFormulario("editar");
    setIdEditar(enfermeroSeleccionado.id);
    setNombre(enfermeroSeleccionado.nombre);
    setFechaIngreso(enfermeroSeleccionado.fechaIngreso);
    setArea(enfermeroSeleccionado.area);
    setCelular(enfermeroSeleccionado.celular);
    setMostrarFormulario(true);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || fechaIngreso === "" || area.trim() === "" || celular.trim() === "") {
      alert("Por favor complete todos los campos");
      return;
    }

    const enfermero = {
      nombre: nombre,
      fechaIngreso: fechaIngreso,
      area: area,
      celular: celular
    };

    if (modoFormulario === "nuevo") {
      await guardarEnfermero(enfermero);
    } else {
      // Al actualizar pasamos el ID que estamos editando
      await actualizarEnfermero(idEditar, { ...enfermero, id: idEditar });
    }

    setMostrarFormulario(false);
    limpiarFormulario();
    setEnfermeroSeleccionado(null);
    cargarEnfermeros();
  };

  const cancelarFormulario = () => {
    setMostrarFormulario(false);
    limpiarFormulario();
    setIdEditar(null);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setFechaIngreso("");
    setArea("");
    setCelular("");
  };

  const eliminarSeleccionado = () => {
    if (enfermeroSeleccionado === null) {
      alert("Seleccione un enfermero para eliminar");
      return;
    }

    setMostrarEliminar(true);
  };

  const confirmarEliminar = async () => {
    await eliminarEnfermero(enfermeroSeleccionado.id);

    setMostrarEliminar(false);
    setEnfermeroSeleccionado(null);
    cargarEnfermeros();
  };

  const cancelarEliminar = () => {
    setMostrarEliminar(false);
  };

  const seleccionarEnfermero = () => {
    if (enfermeroSeleccionado === null) {
      alert("Seleccione un enfermero de la tabla");
      return;
    }

    alert(
      "Enfermero seleccionado: " +
        enfermeroSeleccionado.id +
        " - " +
        enfermeroSeleccionado.nombre
    );
  };

  const salir = () => {
    alert("Saliendo de la administración de Enfermeros");
  };

  return (
    <div className="estado-page">
      <div className="estado-panel">
        <div className="estado-header">ADMINISTRACIÓN DE ENFERMEROS</div>

        <div className="estado-busqueda">
          <input
            type="number"
            placeholder="Buscar por ID"
            value={idBuscar}
            onChange={(e) => setIdBuscar(e.target.value)}
          />

          <button type="button" onClick={buscarPorId}>
            Buscar
          </button>

          <button type="button" onClick={cargarEnfermeros}>
            Mostrar todos
          </button>
        </div>

        <div className="tabla-contenedor">
          <table className="estado-tabla">
            <thead>
              <tr>
                <th>ID (Código)</th>
                <th>Nombre</th>
                <th>Fecha Ingreso</th>
                <th>Área</th>
                <th>Celular</th>
              </tr>
            </thead>

            <tbody>
              {enfermeros.length > 0 ? (
                enfermeros.map((enfermero) => (
                  <tr
                    key={enfermero.id}
                    onClick={() => seleccionarFila(enfermero)}
                    className={
                      enfermeroSeleccionado?.id === enfermero.id
                        ? "fila-seleccionada"
                        : ""
                    }
                  >
                    <td>{enfermero.id}</td>
                    <td>{enfermero.nombre}</td>
                    <td>{enfermero.fechaIngreso}</td>
                    <td>{enfermero.area}</td>
                    <td>{enfermero.celular}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay enfermeros registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="botones-panel">
          <button type="button" onClick={nuevo}>
            Nuevo
          </button>

          <button type="button" onClick={editarSeleccionado}>
            Editar
          </button>

          <button type="button" onClick={eliminarSeleccionado}>
            Eliminar
          </button>

          <button type="button" onClick={seleccionarEnfermero}>
            Seleccionar
          </button>

          <button type="button" onClick={salir}>
            Salir
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">
              {modoFormulario === "nuevo"
                ? "NUEVO ENFERMERO"
                : "EDITAR ENFERMERO"}
            </div>

            <form onSubmit={guardar} className="modal-formulario">
              <label>Nombre completo:</label>
              <input
                type="text"
                placeholder="Ingrese nombre del enfermero"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />

              <label>Fecha de ingreso:</label>
              <input
                type="date"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
              />

              <label>Área:</label>
              <input
                type="text"
                placeholder="Ingrese área de trabajo"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />

              <label>Celular:</label>
              <input
                type="text"
                placeholder="Ingrese número de celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />

              <div className="modal-botones">
                <button type="submit">
                  {modoFormulario === "nuevo" ? "Guardar" : "Actualizar"}
                </button>

                <button type="button" onClick={cancelarFormulario}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarEliminar && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <div className="modal-header">ELIMINAR ENFERMERO</div>

            <p className="modal-texto">
              ¿Seguro que desea eliminar al enfermero{" "}
              <b>{enfermeroSeleccionado?.nombre}</b>?
            </p>

            <div className="modal-botones">
              <button type="button" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>

              <button type="button" onClick={cancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Enfermeros;
