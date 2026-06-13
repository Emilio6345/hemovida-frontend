import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.confirmar
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos para crear tu cuenta.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    if (formData.password !== formData.confirmar) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Asegúrate de que ambas contraseñas sean iguales.",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: data.error || "No se pudo crear la cuenta. Inténtalo de nuevo.",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "¡Cuenta creada!",
        text: "Te has registrado correctamente. Ahora puedes iniciar sesión.",
        confirmButtonColor: "#2563eb",
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Inténtalo más tarde.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-info">
          <div className="info-content">
            <div className="logo-register">
  <img
    src="/images/logo-hemovida1.png"
    alt="Hemovida"
  />
</div>  
            <h1>Únete a nosotros</h1>
            <p>
              Crea una cuenta para disfrutar de una experiencia personalizada, seguimiento de pedidos y acceso exclusivo.
            </p>
            <div className="info-footer">
              <p>¿Ya tienes una cuenta?</p>
              
            </div>
          </div>
        </div>

        <div className="register-form-area">
          <div className="form-header">
            <h2>Crear cuenta</h2>
            <p>Completa tus datos para empezar</p>
          </div>

          <form className="register-form" onSubmit={registrar}>
            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.59 3.59"/><path d="m21 21-6.41-6.41"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m2 2 20 20"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>

            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmar"
                placeholder="Confirmar contraseña"
                value={formData.confirmar}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <span className="loader-container">
                  <span className="loader"></span>
                  Procesando...
                </span>
              ) : (
                "Crear mi cuenta"
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <span className="link" onClick={() => navigate("/login")}>
  Inicia sesión aquí
</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};