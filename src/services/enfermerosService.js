import API_URL from "../api/apiEnfermeros";

export const listarEnfermeros = async () => {
  const respuesta = await fetch(`${API_URL}`);
  return await respuesta.json();
};

export const buscarEnfermeroPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el enfermero");
  }

  return await respuesta.json();
};

export const guardarEnfermero = async (enfermero) => {
  const respuesta = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enfermero),
  });

  return await respuesta.json();
};

export const eliminarEnfermero = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const actualizarEnfermero = async (id, enfermero) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enfermero),
  });

  return await respuesta.json();
};
