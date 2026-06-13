import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout.jsx';

import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';

import { Home } from './pages/Home.jsx';
import { Products } from './pages/Products.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Contact } from './pages/Contact.jsx';
import { Services } from './pages/Services.jsx';

import { NotFound } from "./pages/NotFound.jsx";
import { Categorias } from "./pages/Categorias.jsx";  
import { Carrito } from "./pages/Carrito.jsx";
import { AdminProductos } from "./pages/AdminProductos.jsx";
import { ProductosCategoria } from "./pages/ProductosCategoria.jsx";
import { Pedidos } from "./pages/Pedidos.jsx";
import  DetallePedido  from "./pages/DetallePedido.jsx";
import { PrivateAdminRoute } from './routes/PrivateAdminRoute.jsx';
function App() {

return (

<BrowserRouter> 

<Routes>

<Route path="/" element={<Navigate to="/home" />} />
<Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route path="/home" element={<MainLayout />}>

    <Route path="" element={<Home />} />

    <Route path="products" element={<Products />} />

    <Route path="products/:id" element={<ProductDetail />} />

    <Route path="contact" element={<Contact />} />

    <Route path="services" element={<Services />} />

    <Route path="categorias" element={<Categorias />} />
      <Route path="carrito" element={<Carrito />} />
        <Route path="admin-productos" element={<PrivateAdminRoute> <AdminProductos /> </PrivateAdminRoute>}/>
          <Route path="categorias/:id/productos" element={<ProductosCategoria />} />
           <Route path="pedidos" element={<Pedidos />} />

<Route path="pedidos/:id" element={<DetallePedido />} />

</Route>

 <Route path="*" element={<NotFound />} />

</Routes>

</BrowserRouter>

);

}

export default App;