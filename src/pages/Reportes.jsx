import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Reportes.css";

export default function Reportes() {
    const [reportes, setReportes] = useState([]);

    const [form, setForm] = useState({
        gastos: "",
        mes: "",
        ingresos: "",
        tipo: "",
    });

    const [editando, setEditando] = useState(null);

    // LISTAR DESDE BACKEND
    const listar = async () => {
        const res = await axios.get("http://localhost:8080/api/reportes");
        setReportes(res.data);
    };

    useEffect(() => {
        listar();
    }, []);

    const cambiar = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // GUARDAR O ACTUALIZAR
    const guardar = async (e) => {
        e.preventDefault();

        if (editando) {
            await axios.put(
                `http://localhost:8080/api/reportes/${editando}`,
                form
            );
            setEditando(null);
        } else {
            await axios.post("http://localhost:8080/api/reportes", form);
        }

        setForm({ gastos: "", mes: "", ingresos: "", tipo: "" });
        listar();
    };

    const editar = (r) => {
        setForm(r);
        setEditando(r.id);
    };

    const eliminar = async (id) => {
        await axios.delete(`http://localhost:8080/api/reportes/${id}`);
        listar();
    };

    return (
        <div className="contenedor">
            <h1>Registro de Reportes</h1>

            <form className="formulario" onSubmit={guardar}>
                <input name="gastos" value={form.gastos} onChange={cambiar} placeholder="Gastos" />
                <input name="mes" value={form.mes} onChange={cambiar} placeholder="Mes" />
                <input name="ingresos" value={form.ingresos} onChange={cambiar} placeholder="Ingresos" />
                <input name="tipo" value={form.tipo} onChange={cambiar} placeholder="Tipo" />

                <button className="btnGuardar">
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
                {reportes.map((r) => (
                    <tr key={r.id}>
                        <td>{r.gastos}</td>
                        <td>{r.mes}</td>
                        <td>{r.ingresos}</td>
                        <td>{r.tipo}</td>
                        <td>
                            <button className="btnEditar" onClick={() => editar(r)}>
                                Editar
                            </button>
                            <button className="btnEliminar" onClick={() => eliminar(r.id)}>
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