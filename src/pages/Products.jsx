import { useEffect, useState } from 'react';
import { CardProduct } from '../components/CardProduct.jsx';

export const Products = () => {

    const [products, setProducts] = useState([]); // se guarda como arreglo solo una vez, 
    // no se vuelve a guardar cada vez que se renderiza el componente
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 6;

    useEffect(() => { //se encarga de ejecutar la funcion fetchProducts cada vez que se renderiza el componente,
        fetchProducts(); // peticion de java script hacia nuestro backend (servidor) para obtener los productos,
        //  se ejecuta solo una vez al cargar el componente
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await fetch( // fetch es una función nativa de JavaScript que se utiliza para hacer 
            // solicitudes HTTP a un servidor, en este caso, se hace una solicitud GET a la URL
                "http://localhost:3000/api/v1/productos"
            );

            console.log("Status:", response.status);

            const data = await response.json();

            console.log("DATA:", data);

            setProducts(

                data.productos.map(product => ({ //MAP se utiliza para transformar cada producto del arreglo 
                // data.productos en un nuevo objeto con las propiedades id, name, description, price, stock, 
                // image y onSale

                    id: product.id,

                    name: product.nombre,

                    description: product.descripcion,

                    price: Number(product.precio),

                    stock: product.stock,

                    image: product.imagen,
                    onSale: false  // Ejemplo de lógica para determinar si el producto está en oferta

                }))

            );

        } catch(error){

            console.log("ERROR:", error);

        }

    };

    // FILTRAR PRODUCTOS

    const filteredProducts = products.filter(product =>// se recorre el arreglo de productos y se filtra por el nombre del producto,

        product.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const indexOfLastProduct =
  currentPage * productsPerPage;

const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage;

const currentProducts =
  filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

    return (
        

        <div>
            <div className="services-hero">

  <div className="services-hero-content">

    <span className="hero-badge">
      Catálogo Médico
    </span>

    <h1>
      Nuestros Servicios
    </h1>

    <p>
      Encuentra el servicio médico que necesitas.
      Atención especializada, procedimientos quirúrgicos
      y diagnósticos con los más altos estándares de calidad.
    </p>

  </div>

</div>

            {/* BUSCADOR CENTRADO */}

            <div className="services-toolbar">

  <div className="search-box">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>

    <input
      type="text"
      placeholder="Buscar servicios..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

</div>

            {/* TITULO */}

            <div className="services-count">
  {filteredProducts.length} servicios disponibles
</div>

            {/* PRODUCTOS */}

            <div className="container-products">

               {currentProducts.map(product => (

                    <CardProduct
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>
            <div className="pagination">

  <button
    onClick={() =>
      setCurrentPage(prev =>
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
      setCurrentPage(prev =>
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