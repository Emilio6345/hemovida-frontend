import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextCart } from "../services/ContextCart.jsx";

export const MainLayout = () => {
  const { carrito } = useContext(ContextCart);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const usuario = JSON.parse(
  localStorage.getItem("usuario")
);

const esAdmin = usuario?.rol === "ADMIN";
  

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);


  return (
    <div className="layout-wrapper">
      <header className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="nav-logo" onClick={() => navigate("/home")}>
              <img src="/images/logo-hemovida1.png" alt="Hemovida" className="logo-img-nav" />
              <span className="logo-text">Hemo<span>vida</span></span>
            </div>
            
            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <NavLink to="/home" end className={({ isActive }) => isActive ? 'active' : ''}>
                Portal
              </NavLink>
              <NavLink to="/home/products">Servicios</NavLink>
              <NavLink to="/home/categorias">Especialidades</NavLink>
              <NavLink to="/home/pedidos">
  {esAdmin ? "Gestión de Pedidos" : "Mis Pedidos"}
</NavLink>


{esAdmin && (
  <NavLink
    to="/home/admin-productos"
    className="admin-link"
  >
    Gestión
  </NavLink>
)}
            </nav>
          </div>

          <div className="nav-right">
          <div className="nav-actions">



  <NavLink
    to="/home/carrito"
    className="cart-trigger"
    title="Mi Carrito"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>

    {totalItems > 0 && (
      <span className="cart-badge">
        {totalItems}
      </span>
    )}
  </NavLink>

  <NavLink to="/login" className="auth-btn login-btn">
    Iniciar Sesión
  </NavLink>

  <NavLink to="/register" className="auth-btn register-btn">
    Registrarse
  </NavLink>

  <button
    className="mobile-toggle"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {isMenuOpen ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    )}
  </button>

</div>
          </div>
        </div>
      </header>

      <main className="main-content">
  <Outlet />
</main>

      <footer className="main-footer">
  <div className="footer-container">

    <div className="footer-grid">

      <div className="footer-brand">

  <img
    src="/images/logo-hemovida1.png"
    alt="Hemovida"
    className="footer-brand-image"
  />

</div>

      <div className="footer-column">
        <h4>Enlaces rápidos</h4>

        <ul>
          <li><NavLink to="/home">Inicio</NavLink></li>
          <li><NavLink to="/home/products">Servicios</NavLink></li>
          <li><NavLink to="/home/categorias">Especialidades</NavLink></li>
          {usuario && (
  <li>
    <NavLink to="/home/pedidos">
      {esAdmin ? "Gestión de Citas" : "Mis Citas"}
    </NavLink>
  </li>
)}
        </ul>
      </div>

      <div className="footer-column">
        <h4>Servicios</h4>

        <ul>
          <li>Consultas Médicas</li>
          <li>Laboratorio Clínico</li>
          <li>Imagenología</li>
          <li>Procedimientos</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Contacto</h4>

        <ul>
          <li>📞 +1 (809) 123-4567</li>
          <li>✉ info@hemovida.com</li>
          <li>📍 Santo Domingo, RD</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Síguenos</h4>

        <div className="social-icons">
          <a href="#">F</a>
          <a href="#">I</a>
          <a href="#">W</a>
          <a href="#">Y</a>
        </div>
      </div>

    </div>

    <div className="footer-divider"></div>

    <div className="footer-bottom">
      <p>
        © 2026 Clínica de Especialidades Médicas Hemovida.
        Todos los derechos reservados.
      </p>

      <div className="footer-security">
        🔒 Sitio seguro y confiable
      </div>
    </div>

  </div>
</footer>
    </div>
  );
};