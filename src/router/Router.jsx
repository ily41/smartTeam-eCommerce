import { BrowserRouter, Route, Routes } from 'react-router'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import Home from '../components/user/Home'
import Products from '../Pages/admin/user/Products'
import Details from '../Pages/admin/user/Details'

const router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/products' element = {<Products />} />
            <Route path='/details' element = {<Details />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default router