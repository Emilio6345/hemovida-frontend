import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/AdminProductos.css";

export const AdminProductos = () => {

const [productos, setProductos] = useState([]);
const [categorias, setCategorias] = useState([]);
const [editando, setEditando] = useState(null);

const [formData, setFormData] = useState({
categoria_id: "",
nombre: "",
descripcion: "",
precio: "",
stock: "",
imagen: ""
});

useEffect(() => {


obtenerProductos();
obtenerCategorias();


}, []);

const obtenerProductos = async () => {


try {

 const response = await fetch(
  `${import.meta.env.VITE_API_URL}/productos`
);

  const data = await response.json();

  setProductos(data.productos);

} catch (error) {

  console.log(error);

}


};

const obtenerCategorias = async () => {


try {

 const response = await fetch(
  `${import.meta.env.VITE_API_URL}/categorias`
);
  const data = await response.json();

  setCategorias(data.categorias);

} catch (error) {

  console.log(error);

}


};

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value
});


};

const limpiarFormulario = () => {


setFormData({
  categoria_id: "",
  nombre: "",
  descripcion: "",
  precio: "",
  stock: ""
});

setEditando(null);


};

const guardarProducto = async (e) => {


e.preventDefault();

try {

  const token =
    localStorage.getItem("token");

const url = editando
  ? `${import.meta.env.VITE_API_URL}/productos/${editando}`
  : `${import.meta.env.VITE_API_URL}/productos`;


  const metodo = editando
    ? "PUT"
    : "POST";

  const response = await fetch(url, {

    method: metodo,

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify(formData)

  });

  const data = await response.json();

  if (!response.ok) {

    
   Swal.fire({
  icon: "error",
  title: "Error",
  text:
    data.error ||
    data.mensaje ||
    "Ocurrió un error",
  confirmButtonColor: "#dc2626"
});

    return;

  }

  Swal.fire({
  icon: "success",
  title: editando
    ? "Producto actualizado"
    : "Producto creado",
  text: editando
    ? "El producto fue actualizado correctamente."
    : "El producto fue creado correctamente.",
  confirmButtonColor: "#2563eb"
});

  obtenerProductos();

  limpiarFormulario();

} catch (error) {

  console.log(error);

  alert("Error conectando servidor");

}


};

const editarProducto = (producto) => {


setEditando(producto.id);

setFormData({

  categoria_id: producto.categoria_id,
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: producto.precio,
  stock: producto.stock

});

window.scrollTo({
  top: 0,
  behavior: "smooth"
});


};

const eliminarProducto = async (id) => {


const resultado = await Swal.fire({
  title: "¿Eliminar producto?",
  text: "Esta acción no se puede deshacer.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#6b7280",
  confirmButtonText: "Sí, eliminar",
  cancelButtonText: "Cancelar"
});

if (!resultado.isConfirmed) return;

try {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/productos/desactivar/${id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

  const data = await response.json();

if (!response.ok) {

  Swal.fire({
    icon: "error",
    title: "No se pudo eliminar",
    text: data.error || data.mensaje,
    confirmButtonColor: "#dc2626"
  });

  return;

}

Swal.fire({
  icon: "success",
  title: "Producto desactivado",
  text: "El producto fue ocultado de la tienda correctamente.",
  confirmButtonColor: "#2563eb"
});

obtenerProductos();

} catch (error) {

  console.log(error);

  Swal.fire({
  icon: "error",
  title: "Servidor no disponible",
  text: "No fue posible conectar con el servidor.",
  confirmButtonColor: "#dc2626"
});

}


};

return (

<div className="admin-container">

  <div className="admin-header">

    <h1> Gestión de Servicios</h1>

    <p>
      Administra el catálogo de tu tienda
    </p>

  </div>

  <div className="admin-form-card">

    <h2>

      {editando
        ? "✏️ Editar Producto"
        : "➕ Nuevo Producto"}

    </h2>

    <form onSubmit={guardarProducto}>

      <div className="form-grid">

        <select
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          required
        >

          <option value="">
            Seleccione categoría
          </option>

          {categorias.map(cat => (

            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.nombre}
            </option>

          ))}

        </select>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />

        <input
  type="text"
  name="imagen"
  placeholder="URL de imagen"
  value={formData.imagen}
  onChange={handleChange}
/>

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

      </div>

      <div className="admin-buttons">

        <button
          type="submit"
          className="btn-guardar"
        >

          {editando
            ? "Actualizar"
            : "Guardar"}

        </button>

        {editando && (

          <button
            type="button"
            className="btn-cancelar"
            onClick={limpiarFormulario}
          >

            Cancelar

          </button>

        )}

      </div>

    </form>

  </div>

  <div className="admin-table-card">

    <h2>📋 Productos Registrados</h2>

    <table className="admin-table">

      <thead>

        <tr>

          <th>ID</th>
          <th>Categoría</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>

        </tr>

      </thead>

      <tbody>

        {productos.map(producto => (

          <tr key={producto.id}>

            <td>{producto.id}</td>

            <td>
              {
                categorias.find(
                  c => c.id === producto.categoria_id
                )?.nombre || "-"
              }
            </td>

            <td>{producto.nombre}</td>

            <td>{producto.descripcion}</td>

            <td>${producto.precio}</td>

            <td>{producto.stock}</td>

            <td>

              <button
                className="btn-editar"
                onClick={() =>
                  editarProducto(producto)
                }
              >
                Editar
              </button>

              <button
                className="btn-eliminar"
                onClick={() =>
                  eliminarProducto(producto.id)
                }
              >
                Eliminar
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

);

};
