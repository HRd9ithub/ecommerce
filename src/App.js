import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Sign-up/Signup';
import Header from './Components/Header';
import Product from './Components/Product';
import About from './Components/About';
import Contact from './Components/Contact';
import ProductDetail from './Components/ProductDetail';
import Card from './Components/Card';
import CheckOut from './Components/CheckOut';
import Footer from './Components/Footer';
import Tabpanel from './Components/Tabpanel';
import Thanks from './Components/Thanks';
import Order from './Components/Order';

const App = () => {
  
  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product' element={<Product />} />
          <Route exact path='/product/:id' element={<ProductDetail />} />
          <Route exact path='/card' element={<Card />} />
          <Route exact path='/checkout' element={<CheckOut />} />
          <Route exact path='/thankyou' element={<Thanks />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/tabpanel' element={<Tabpanel />} />
          <Route exact path='/orderview/:id' element={<Order />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>

  )
}

export default App;
