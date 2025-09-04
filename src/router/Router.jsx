import { BrowserRouter, Route, Routes } from 'react-router'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import Home from '../components/user/Home'
import Products from '../Pages/user/Products'
import Details from '../Pages/user/Details'
import Cart from '../Pages/user/Cart'
import WishList from '../Pages/user/WishList'
import About from '../Pages/user/About'

const router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/products' element = {<Products />} />
            <Route path='/details' element = {<Details />} />
            <Route path='/cart' element = {<Cart />} />
            <Route path='/favorites' element = {<WishList />} />
            <Route path='/about' element = {<About />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default router