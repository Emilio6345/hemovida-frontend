import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/login.css";

import {
  FiUser,
  FiLock,
  FiEye,
  FiShield,
  FiGlobe
} from "react-icons/fi";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, ingresa tus credenciales.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/auth/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);

      const data = await response.json();

      console.log("RESPUESTA LOGIN:", data);

      setLoading(false);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error de acceso",
          text: data.error || "Credenciales incorrectas",
        });
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
  "usuario",
  JSON.stringify(data.usuario)
);

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/home");
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar al servidor",
      });
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "url('/images/hospital-bg.png')",
        
      }}
    >
      <div className="top-logo">
        <img
          src="/images/logo-hemovida1.png"
          alt="Hemovida"
        />
      </div>

      <div className="login-card-v2">

        <div className="login-left">

          <div className="login-header-v2">
            <h1>Bienvenido</h1>
            <p>Inicia sesión para continuar</p>
          </div>

          <form
            onSubmit={iniciarSesion}
            className="login-form-v2"
          >
            <div className="input-box">
              <span className="icon">
  <FiUser />
</span>

              <input
                type="email"
                name="email"
                placeholder="Usuario o correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <span className="icon">
  <FiLock />
</span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />

              <button
  type="button"
  className="eye-btn"
  onClick={() => setShowPassword(!showPassword)}
>
  <FiEye />
</button>
            </div>

            <div className="forgot-row">
              <a href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              className="btn-login-v2"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Verificando..."
                : "→ Iniciar sesión"}
            </button>

            <div className="register-link-login">
  ¿No tienes una cuenta?{" "}
  <NavLink to="/register">
    Regístrate gratis
  </NavLink>
</div>

            <div className="separator">
              <span></span>
              <p>o continúa con</p>
              <span></span>
            </div>

          <div className="shield-icon">
  <FiShield />
</div>
            <div className="secure-text">
              🔒 Conexión segura y encriptada
            </div>

          </form>

        </div>

        <div className="login-right">

          <div className="language-selector">
  <FiGlobe />
  <span>Español</span>
</div>

          <div className="doctor-container">
            <img
              src="/images/doctor3.png"
              alt="Doctora"
              className="doctor-image"
            />
          </div>

          <div className="info-banner">
            <div className="shield-icon">
              🛡️
            </div>

            <div>
              <h3>
                Tu salud, nuestra especialidad
              </h3>

              <p>
                Tecnología avanzada y atención
                integral para tu bienestar.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;