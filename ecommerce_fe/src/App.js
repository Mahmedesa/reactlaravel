import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateProduct from "./components/createComponent";
import EditProduct from "./components/editComponent";
import Products from "./components/listComponent";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Product</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/product/create">Create Product</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
