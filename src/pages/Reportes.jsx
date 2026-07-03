import { useState } from "react";
import "../css/Reportes.css";

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [editando, setEditando] = useState(null);

    const [form, setForm] = useState({
        gastos: "",
        mes: "",
        ingresos: "",
        tipo: "",
    });

    const cambiar = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const guardar = (e) => {
        e.preventDefault();

        if (!form.gastos || !form.mes || !form.ingresos || !form.tipo) {
            alert("Completa todos los campos");
            return;
        }

        if (editando) {
            setReportes(
                reportes.map((r) =>
                    r.id === editando ? { ...form, id: editando } : r
                )
            );
            setEditando(null);
        } else {
            setReportes([...reportes, { id: Date.now(), ...form }]);
        }

        setForm({ gastos: "", mes: "", ingresos: "", tipo: "" });
    };

    const editar = (reporte) => {
        setForm(reporte);
        setEditando(reporte.id);
    };

    const eliminar = (id) => {
        const confirmar = confirm("¿Seguro que deseas eliminar este reporte?");
        if (confirmar) {
            setReportes(reportes.filter((r) => r.id !== id));
        }
    };

    return (
        <div className="contenedor">
            <h1>Registro de Reportes</h1>

            <form className="formulario" onSubmit={guardar}>
                <input
                    type="number"
                    name="gastos"
                    placeholder="Gastos"
                    value={form.gastos}
                    onChange={cambiar}
                />

                <select name="mes" value={form.mes} onChange={cambiar}>
                    <option value="">Seleccione mes</option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>

                <input
                    type="number"
                    name="ingresos"
                    placeholder="Ingresos"
                    value={form.ingresos}
                    onChange={cambiar}
                />

                <select name="tipo" value={form.tipo} onChange={cambiar}>
                    <option value="">Tipo de reporte</option>
                    <option value="Mensual">Mensual</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Anual">Anual</option>
                </select>

                <button className="btnGuardar" type="submit">
                    {editando ? "Actualizar" : "Guardar"}
                </button>
            </form>

            <table>
                <thead>
                <tr>
                    <th>Gastos</th>
                    <th>Mes</th>
                    <th>Ingresos</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {reportes.map((reporte) => (
                    <tr key={reporte.id}>
                        <td>{reporte.gastos} Bs</td>
                        <td>{reporte.mes}</td>
                        <td>{reporte.ingresos} Bs</td>
                        <td>{reporte.tipo}</td>
                        <td>
                            <button className="btnEditar" onClick={() => editar(reporte)}>
                                Editar
                            </button>
                            <button className="btnEliminar" onClick={() => eliminar(reporte.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}