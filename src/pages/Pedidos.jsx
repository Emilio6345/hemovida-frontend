import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Pedidos.css";

export const Pedidos = () => {
  
  
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:3000/api/v1/pedidos",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      const data = await response.json();

      setPedidos(data.pedidos || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los pedidos",
      });
    } finally {
      setLoading(false);
    }
  };

  const eliminarPedido = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Eliminar pedido?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;

      const response = await fetch(
        `http://localhost:3000/api/v1/pedidos/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            data.error ||
            data.mensaje ||
            "No se pudo eliminar",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Pedido eliminado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });

      obtenerPedidos();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema inesperado",
      });
    }
  };

  const getStatusClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pagado":
        return "status-completed";

      case "enviado":
        return "status-processing";

      case "cancelado":
        return "status-cancelled";

      default:
        return "status-default";
    }
  };
console.log(pedidos);
  return (
    <div className="view-container">
     <div className="orders-hero">

  

  <h1>
    Mis Pedidos
  </h1>

  

  <p>
    Consulta el rial completo de tus pedidos,
    revisa estados, pagos realizados y accede
    rápidamente al detalle de cada compra.
  </p>

  <button
    className="btn-refresh"
    onClick={obtenerPedidos}
  >
    Actualizar
  </button>

</div>

      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>

          <div>
            <h3>{pedidos.length}</h3>
            <span>Total pedidos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>

          <div>
            <h3>
              {
                pedidos.filter(
                  (p) => p.estado === "pagado"
                ).length
              }
            </h3>

            <span>Confirmados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚚</div>

          <div>
            <h3>
              {
                pedidos.filter(
                  (p) => p.estado === "enviado"
                ).length
              }
            </h3>

            <span>En proceso</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>
            {
              pedidos.filter(
                (p) => p.estado === "pagado"
              ).length
            }
          </h3>

          <span>Pagados</span>
        </div>

        <div className="stat-card">
          <h3>
            {
              pedidos.filter(
                (p) => p.estado === "enviado"
              ).length
            }
          </h3>

          <span>En proceso</span>
        </div>
      </div>

      <div className="table-card">
        {loading ? (
          <div className="table-loader">
            <div className="spinner"></div>
            <p>Cargando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>

            <h3>No hay pedidos</h3>

            <p>
              Aún no has realizado compras.
            </p>

            <button
              className="btn-primary"
              onClick={() =>
                navigate("/home/products")
              }
            >
              Ver servicios
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="saas-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <span className="order-id">
                        #HV-{pedido.id}
                      </span>
                    </td>
<td>
  {pedido.email || "Sin correo"}
</td>
                    <td>
                      <div className="fecha-cell">
                        <strong>
                          {new Date(
                            pedido.fecha ||
                              Date.now()
                          ).toLocaleDateString()}
                        </strong>

                        <span>
                          {new Date(
                            pedido.fecha ||
                              Date.now()
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="amount">
                        $
                        {Number(
                          pedido.total
                        ).toFixed(2)}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge-status ${getStatusClass(
                          pedido.estado
                        )}`}
                      >
                        {pedido.estado}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action-view"
                          onClick={() =>
                            navigate(
                              `/home/pedidos/${pedido.id}`
                            )
                          }
                          title="Ver detalles"
                        >
                          👁️
                        </button>

                        <button
                          className="btn-action-delete"
                          onClick={() =>
                            eliminarPedido(
                              pedido.id
                            )
                          }
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};