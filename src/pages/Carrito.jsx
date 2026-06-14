import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextCart } from "../services/ContextCart.jsx";
import Swal from "sweetalert2";

export const Carrito = () => {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito
  } = useContext(ContextCart);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  console.log("CARRITO:", carrito);

  console.log("PRIMER PRODUCTO:", carrito[0]);
console.log("IMAGEN:", carrito[0]?.image);

  const totalItems = carrito.reduce(
  (acc, item) => acc + item.cantidad,
  0
);

  const handleRealizarPedido = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const usuario = JSON.parse(
  localStorage.getItem("usuario")
);
      

      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Inicia sesión",
          text: "Debes iniciar sesión para realizar un pedido.",
          confirmButtonColor: "var(--primary)"
        });
        return;
      }

      if (carrito.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "Agrega productos antes de realizar un pedido.",
          confirmButtonColor: "var(--primary)"
        });
        return;
      }

      const confirmar = await Swal.fire({
        title: "¿Confirmar pedido?",
        text: `Total a pagar: $${total.toFixed(2)}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar Pedido",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "var(--primary)",
        cancelButtonColor: "var(--text-muted)"
      });

      if (!confirmar.isConfirmed) {
        setLoading(false);
        return;
      }

      const res = await fetch("${import.meta.env.VITE_API_URL}/pedidos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
  usuario_id: usuario.id,
  total,
  estado: "pagado",
  carrito: carrito.map((item) => ({
    producto_id: item.id,
    precio_unitario: item.price,
    cantidad: item.cantidad
  }))
})
      });

      const data = await res.json();

      if (!data.ok) {
        Swal.fire({
          icon: "error",
          title: "Pedido rechazado",
          text: data.error || data.mensaje || "Error al realizar pedido",
          confirmButtonColor: "var(--error)"
        });
        return;
      }


vaciarCarrito();

if (usuario?.rol === "ADMIN") {

  await Swal.fire({
    icon: "success",
    title: "¡Pedido realizado!",
    text: "La solicitud ha sido registrada correctamente.",
    confirmButtonColor: "var(--success)"
  });

  navigate("/home/pedidos");

} else {

  await Swal.fire({
    icon: "success",
    title: "Solicitud enviada correctamente",
    html: `
      <p style="margin-bottom:10px">
        Hemos recibido tu solicitud de atención médica.
      </p>

      <p>
         Nuestro equipo de Clínica Hemovida revisará tu solicitud y se pondrá en contacto contigo dentro de las próximas 24 horas para brindarte información detallada sobre el servicio seleccionado, resolver tus inquietudes y coordinar los pasos necesarios para continuar con el procedimiento médico solicitado.
      </p>

      <br>

      <strong>
        Gracias por confiar en Hemovida.
      </strong>
    `,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#2563eb"
  });

  navigate("/home");
}

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No fue posible procesar el pedido. Revisa tu conexión.",
        confirmButtonColor: "var(--error)"
      });
    } finally {
      setLoading(false);
    }
  };
console.log("CARRITO:", carrito);
  return (
    <div className="view-container">
      <header className="view-header">
        <div className="header-content">
          <h1>Servicios Agendados</h1>
        Tienes {totalItems} servicios seleccionados
        </div>
      </header>

      {carrito.length === 0 ? (
        <div className="empty-cart-view">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Browse our products and find something you love.</p>
          <button className="btn-primary" onClick={() => navigate("/home/products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="checkout-grid">
  <div className="cart-items-panel">
    {carrito.map((item) => (
  <div key={item.id} className="cart-item-card">

    <div className="item-main-info">
      <div className="item-image-placeholder">
        <img
          src={item.image}
          alt={item.name}
          className="cart-product-image"
        />
      </div>

      <div className="item-text">
        <h3>{item.name}</h3>
        <p className="item-unit-price">
          ${item.price?.toFixed(2)} por unidad
        </p>
      </div>
    </div>

    <div className="item-controls">
      <div className="quantity-selector">
        <button
          onClick={() => eliminarDelCarrito(item.id)}
          className="qty-btn"
        >
          −
        </button>

        <span className="qty-value">
          {item.cantidad}
        </span>

        <button
          onClick={() => agregarAlCarrito(item)}
          className="qty-btn"
        >
          +
        </button>
      </div>

      <div className="item-subtotal">
        <span className="label">Subtotal</span>
        <span className="value">
          ${(item.price * item.cantidad).toFixed(2)}
        </span>
      </div>
    </div>

  </div>
))}
            <div className="cart-footer-actions">
              <button className="btn-text-danger" onClick={vaciarCarrito}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                Clear Cart
              </button>
            </div>
          </div>

          <aside className="checkout-summary-panel">
            <div className="summary-card">
              <h3>Resumen de la compra</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envio</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Iva</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="btn-checkout-primary" 
                onClick={handleRealizarPedido}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner-sm"></span>
                    Processing...
                  </span>
                ) : (
                  "Confirmar Pedido"
                )}
              </button>

              <p className="secure-text">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>

  <div>
    <strong>Pago 100% seguro y protegido</strong>
    <span>Tus datos están protegidos con encriptación SSL</span>
  </div>
</p>
            </div>

            <div className="promo-panel">
              <p>Tienes un código de promoción?</p>
              <div className="promo-input">
                <input type="text" placeholder="Promo code" />
                <button>Apply</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};