import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductosCategoria = () => {

    const { id } = useParams();

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        obtenerProductos();

    }, [id]);

    const obtenerProductos = async () => {

        try {

            const response = await fetch(
                `import.meta.env.VITE_API_URL/categorias/${id}/productos`
            );

            const data = await response.json();

            setProductos(data.productos);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            style={{
                width: "95%",
                margin: "40px auto"
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "40px"
                }}
            >

                <h1
                    style={{
                        fontSize: "48px",
                        fontWeight: "800",
                        marginBottom: "10px"
                    }}
                >
                    Productos de la Categoría
                </h1>

                <p
                    style={{
                        color: "#6b7280",
                        fontSize: "18px"
                    }}
                >
                    Total encontrados: {productos.length}
                </p>

            </div>

            <div className="container-products">

                {productos.map(producto => (

                    <div
                        key={producto.id}
                        className="card"
                    >

                        <img
                            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                            alt={producto.nombre}
                        />

                        <div className="card-content">

                            <h3>
                                {producto.nombre}
                            </h3>

                            <p>
                                {producto.descripcion}
                            </p>

                            <div
                                style={{
                                    marginBottom: "15px",
                                    color: "#6b7280",
                                    fontSize: "14px"
                                }}
                            >
                                Stock disponible: {producto.stock}
                            </div>

                            <div className="bottom-card">

                                <span className="price">
                                    ${producto.precio}
                                </span>

                                <button
                                    className="btn-buy"
                                >
                                    Comprar
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};