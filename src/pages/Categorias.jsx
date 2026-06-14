import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Categorias.css";

export const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

const categoriasPorPagina = 6;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "import.meta.env.VITE_API_URL/categorias"
      );

      const data = await response.json();

      const imagenesEspecialidades = {
  "Cardiología":
    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634",

  "Pediatría":
    "https://images.unsplash.com/photo-1584515933487-779824d29309",

  "Neurología":
    "https://images.unsplash.com/photo-1559757175-5700dde675bc",

  "Dermatología":
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",

  "Ginecología":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118",

  "Medicina General":
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7",

  "Cirugía General":
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",

  "Cirugía Bariátrica":
    "https://images.unsplash.com/photo-1580281657527-47f249e8f4df",

  "Cirugía Plástica":
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09",

  "Cirugía Vascular":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118",

  "Urología":
    "https://images.unsplash.com/photo-1581595219315-a187dd40c322",

  "Otorrinolaringología":
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",

  "Oftalmología":
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",

  "Traumatología y Ortopedia":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef",

  "Neurocirugía":
    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28",

  "Patología":
    "https://images.unsplash.com/photo-1579154204601-01588f351e67",

  "Anestesiología":
    "https://images.unsplash.com/photo-1516549655169-df83a0774514",

  "Gastroenterología":
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f"
};
      setCategorias(
        data.categorias.map((cat) => ({
          ...cat,
          image:
  imagenesEspecialidades[cat.nombre.trim()] ||
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
        }))
      );
    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();

    if (!nuevaCategoria) return;

    try {
      const response = await fetch(
        "import.meta.env.VITE_API_URL/categorias",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: nuevaCategoria,
            activa: 1,
          }),
        }
      );

      if (response.ok) {
        setNuevaCategoria("");
        obtenerCategorias();

        Swal.fire({
          icon: "success",
          title: "Especialidad creada",
          text: "Se agregó correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminar = async (id) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar especialidad?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!resultado.isConfirmed) return;

    try {
      const response = await fetch(
        `import.meta.env.VITE_API_URL/categorias/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminada",
          text: data.mensaje,
          timer: 1500,
          showConfirmButton: false,
        });

        obtenerCategorias();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.mensaje,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error de conexión con el servidor",
      });
    }
  };
const handleEditar = async (categoria) => {
  const { value: nuevoNombre } = await Swal.fire({
    title: "Editar Especialidad",
    input: "text",
    inputValue: categoria.nombre,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
  });

  if (!nuevoNombre) return;

  try {
    const response = await fetch(
      `import.meta.env.VITE_API_URL/categorias/${categoria.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({
  nombre: nuevoNombre,
  activa: 1
}),
      }
    );

    if (response.ok) {
      Swal.fire(
        "Actualizado",
        "Especialidad actualizada correctamente",
        "success"
      );

      obtenerCategorias();
    }
  } catch (error) {
    Swal.fire(
      "Error",
      "No se pudo actualizar",
      "error"
    );
  }
};

  const categoriasFiltradas = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCategory =
  currentPage * categoriasPorPagina;

const indexOfFirstCategory =
  indexOfLastCategory - categoriasPorPagina;

const categoriasActuales =
  categoriasFiltradas.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

const totalPages = Math.ceil(
  categoriasFiltradas.length /
  categoriasPorPagina
);
  return (
    <div className="view-container">
      <div className="specialties-hero">

  <span className="hero-tag">
    Catálogo Médico
  </span>

  <h1>
    Especialidades Médicas
  </h1>

  <h3>
    Nuestras especialidades
  </h3>

  <p>
    Contamos con un equipo de especialistas altamente
    calificados en las principales ramas de la medicina
    para cuidar tu salud de manera integral.
  </p>

</div>

<div className="header-actions-below">

  <form
    className="quick-create-form"
    onSubmit={handleCrear}
  >

    <input
      type="text"
      placeholder="Nueva Especialidad..."
      value={nuevaCategoria}
      onChange={(e) =>
        setNuevaCategoria(e.target.value)
      }
      required
    />

    <button
      type="submit"
      className="btn-primary"
    >
      + Crear
    </button>

  </form>

</div>
      
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Buscar especialidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="view-loader">
          <div className="spinner"></div>
          <p>Cargando especialidades...</p>
        </div>
      ) : (
        <div className="collections-grid">
          {categoriasActuales.map((cat) => (
            <div
              key={cat.id}
              className="specialty-card"
            >
              <div className="specialty-image">
                <img
                  src={cat.image}
                  alt={cat.nombre}
                />
              </div>

              <div className="specialty-content">
                <div className="specialty-header">
                  <h3>{cat.nombre}</h3>

                  <span className="specialty-status">
                    Disponible
                  </span>
                </div>

                <p className="specialty-description">
                  Atención médica especializada con
                  profesionales altamente capacitados.
                </p>

                <div className="specialty-footer">

  <button
    className="specialty-btn"
    onClick={() =>
      navigate(`/home/categorias/${cat.id}/productos`)
    }
  >
    Ver Servicios
  </button>

  <div className="specialty-actions">

    <button
      className="specialty-edit"
      onClick={() => handleEditar(cat)}
      title="Editar Especialidad"
    >
      ✏️
    </button>

    <button
      className="specialty-delete"
      onClick={() => handleEliminar(cat.id)}
      title="Eliminar Especialidad"
    >
      🗑️
    </button>

  </div>

</div>
              </div>
            </div>
          ))}
        </div>
      )}
<div className="pagination">

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.max(prev - 1, 1)
      )
    }
    disabled={currentPage === 1}
  >
    ←
  </button>

  {Array.from(
    { length: totalPages },
    (_, index) => (
      <button
        key={index + 1}
        className={
          currentPage === index + 1
            ? "active-page"
            : ""
        }
        onClick={() =>
          setCurrentPage(index + 1)
        }
      >
        {index + 1}
      </button>
    )
  )}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
  >
    →
  </button>

</div>


    </div>
  );
};