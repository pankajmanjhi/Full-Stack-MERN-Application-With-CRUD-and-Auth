import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/delete' element={<h1>Delete Product Component</h1>} />
            <Route path='/profile' element={<h1>Profile Component</h1>} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
