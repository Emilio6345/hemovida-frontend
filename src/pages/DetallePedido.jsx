import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallePedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) obtenerDetalle();
  }, [id]);

  const obtenerDetalle = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/pedidos/detalle/${id}`
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      setDetalle(data.detalle || []);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setError("Error al cargar el pedido");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <h2>Cargando detalle...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <h2>{error}</h2>
        <button
          className="btn-cancelar"
          onClick={() => navigate("/home/pedidos")}
        >
          Volver
        </button>
      </div>
    );
  }

  if (detalle.length === 0) {
    return (
      <div className="admin-container">
        <h2>Este pedido no tiene productos</h2>
        <button
          className="btn-cancelar"
          onClick={() => navigate("/home/pedidos")}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>📦 Detalle del Pedido #{id}</h1>
        <p>Resumen de productos comprados</p>
      </div>

      <div className="admin-table-card">

        <table className="admin-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>

            {detalle.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre || item.producto_id}</td>
                <td>${item.precio_unitario}</td>
                <td>{item.cantidad}</td>
                <td style={{ fontWeight: "bold", color: "#28a745" }}>
                  ${item.precio_unitario * item.cantidad}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <br />

      <button
        className="btn-cancelar"
        onClick={() => navigate("/home/pedidos")}
      >
        ⬅ Volver a pedidos
      </button>

    </div>
  );
};

export default DetallePedido;