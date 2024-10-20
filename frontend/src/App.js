
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Product} from './Pages/product'
import {ShopCategory} from './Pages/ShopCategory'
import { Cart } from './Pages/Cart'
import Shop from './Pages/shop'
import {LoginSignup} from './Pages/LoginSignup'
// import { Footwear } from './Pages/footwear';
// import {Signup} from './Pages/Signup'
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div className="nav">
    <BrowserRouter> 
      <Navbar/>
      <Routes>
      <Route path='/' element={<Shop/>} />
      <Route path='/men' element={<ShopCategory banner={men_banner} category="men" />} />
      <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>} />
      <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kids"/>} />
      <Route path='/product' element={<Product/>} >
        <Route path=':productId' element={<Product/>} />
      </Route>
      <Route path='/cart' element={<Cart/>} />
      {/* <Route path='/footwear' element={<Footwear/>} /> */}
      <Route path='/login' element={<LoginSignup/>} />
      {/* <Route path='/signup' element={<Signup/>} /> */}
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
