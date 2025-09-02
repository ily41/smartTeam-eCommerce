import { BrowserRouter, Route, Routes } from 'react-router'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import Home from '../components/user/Home'
import Products from '../Pages/admin/user/Products'

const router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/products' element = {<Products />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default router