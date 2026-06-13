import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextCart } from "../services/ContextCart.jsx";
import "../styles/ProductDetail.css";

export const ProductDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { agregarAlCarrito } = useContext(ContextCart);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const obtenerProducto = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/api/v1/productos/${id}`
      );

      const data = await response.json();

      setProduct(data.producto);

    } catch (error) {

      console.log(error);

    }

  };

  if (!product) {
    return <h2>Cargando servicio...</h2>;
  }

  const productoCarrito = {
    id: product.id,
    name: product.nombre,
    description: product.descripcion,
    price: Number(product.precio),
    stock: product.stock,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
  };

  return (

    <div className="service-detail-container">

      <button
        className="back-btn"
        onClick={() => navigate("/home/products")}
      >
        ← Volver a servicios
      </button>

      <div className="service-detail-top">

        <div className="service-image-box">

  <img
    src={
      product.imagen ||
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
    }
    alt={product.nombre}
  />

</div>

        <div className="service-price-box">

          <p>Precio del servicio</p>

          <h1>
            ${Number(product.precio).toFixed(2)}
          </h1>

          <button
            className="btn-comprar"
            onClick={() => {

              agregarAlCarrito(productoCarrito);

              navigate("/home/carrito");

            }}
          >
            Comprar ahora
          </button>

          <button
            className="btn-carrito"
            onClick={() =>
              agregarAlCarrito(productoCarrito)
            }
          >
            Agregar al carrito
          </button>

          <hr />

          <ul>
            <li>✓ Atención especializada</li>
            <li>✓ Médicos certificados</li>
            <li>✓ Servicio seguro</li>
          </ul>

        </div>

      </div>

      <div className="service-description-box">

        <h1>{product.nombre}</h1>

        <p>{product.descripcion}</p>

        <h2>Beneficios del servicio</h2>

        <div className="benefits-grid">

          <div>✓ Atención profesional</div>
          <div>✓ Recuperación supervisada</div>
          <div>✓ Equipos modernos</div>
          <div>✓ Seguimiento médico</div>

        </div>

      </div>

    </div>

  );

};