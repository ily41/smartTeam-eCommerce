import { BrowserRouter, Routes, Route } from 'react-router';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import Home from '../components/user/Home';
import Products from '../Pages/user/Products';
import Details from '../Pages/user/Details';
import Cart from '../Pages/user/Cart';
import WishList from '../Pages/user/WishList';
import About from '../Pages/user/About';
import Contact from '../Pages/user/Contact';
import Download from '../Pages/user/Download';
import Secure from '../Pages/user/Secure';
import Software from '../Pages/user/Software';
import Login from '../Pages/user/Login';
import Auth from './Auth';
import AdminPanel from '../Pages/admin/AdminPanel';
import Profile from '../Pages/user/Profile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without Header/Footer */}
        <Route path="/login" element={<Login />} />

        {/* All other pages with Header/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
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
              </Routes>
              <Footer />
            </>
          }
        />


        <Route path='/admin' element = {
          <Auth>
            <AdminPanel />
          </Auth> 
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
