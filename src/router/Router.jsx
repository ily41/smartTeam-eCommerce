import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import Home from "../components/user/Home";
import Products from "../Pages/user/Products";
import Details from "../Pages/user/Details";
import Cart from "../Pages/user/Cart";
import WishList from "../Pages/user/WishList";
import About from "../Pages/user/About";
import Contact from "../Pages/user/Contact";
import Download from "../Pages/user/Download";
import Secure from "../Pages/user/Secure";
import Software from "../Pages/user/Software";
import Login from "../Pages/user/Login";
import Auth from "./Auth";
import Profile from "../Pages/user/Profile";
import AdminLayout from "../Pages/admin/Adminlayout";
import Users from "../Pages/admin/User";
import Category from "../Pages/admin/Category";
import ProductsUI from "../Pages/admin/ProductsAdmin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* User layout */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="details" element={<Details />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favorites" element={<WishList />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="download" element={<Download />} />
          <Route path="secure" element={<Secure />} />
          <Route path="software" element={<Software />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin layout with Auth wrapper */}
        <Route
          path="/admin"
          element={
            <Auth>
              <AdminLayout />
            </Auth>


          }
        >
          <Route index element={<Users />} />
          <Route path= 'category' element={<Category />} />
          <Route path= 'products' element={<ProductsUI />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
