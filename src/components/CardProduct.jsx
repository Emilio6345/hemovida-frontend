import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextCart } from "../services/ContextCart.jsx";

export const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(ContextCart);

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img
          src={product.image || "https://via.placeholder.com/300x200?text=Product"}
          alt={product.name}
          className="card-image"
          onClick={() => navigate(`/home/products/${product.id}`)}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Product";
          }}
        />
        {product.onSale && <span className="badge-sale">Limited Deal</span>}
        
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-category">Servicio Médico</span>
          <span className="card-stock">
            <span className={`status-dot ${product.stock > 0 ? 'online' : 'offline'}`}></span>
            {product.stock > 0 ? 'Disponible' : 'Sin cupos'}
          </span>
        </div>
        
        <h3 className="card-title" onClick={() => navigate(`/home/products/${product.id}`)}>
          {product.name}
        </h3>
        
        <p className="card-description">{product.description}</p>
        
       <div className="card-footer">

  <span className="card-price">
    ${product.price?.toFixed(2)}
  </span>

  <div className="card-actions">

    <button
      className="btn-view"
      onClick={() =>
        navigate(`/home/products/${product.id}`)
      }
    >
      Ver más
    </button>

    <button
      className="btn-buy"
      onClick={() =>
        agregarAlCarrito(product)
      }
    >
      Agendar
    </button>

  </div>

</div>
      </div>
    </div>
  );
};