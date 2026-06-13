import { createContext, useState } from "react";

// CREAR CONTEXTO

export const ContextCart = createContext();

// PROVIDER

export const ContextCartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);

    // AGREGAR AL CARRITO

    const agregarAlCarrito = (producto) => {

        setCarrito((prev) => {

            const existe = prev.find(
                item => item.id === producto.id
            );

            // SI YA EXISTE

            if (existe) {

                return prev.map(item =>

                    item.id === producto.id

                        ? {
                            ...item,
                            cantidad: item.cantidad + 1
                        }

                        : item

                );

            }

            // SI NO EXISTE

            return [

                ...prev,

                {
                    ...producto,
                    cantidad: 1
                }

            ];

        });

    };

    // ELIMINAR PRODUCTO

    const eliminarDelCarrito = (productoId) => {

    setCarrito((prev) =>

        prev
            .map(item =>

                item.id === productoId

                    ? {
                        ...item,
                        cantidad: item.cantidad - 1
                    }

                    : item

            )

            .filter(item => item.cantidad > 0)

    );

};

    // VACIAR CARRITO

    const vaciarCarrito = () => {

        setCarrito([]);

    };

    return (

        <ContextCart.Provider

            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito
            }}
        >

            {children}

        </ContextCart.Provider>

    );

};