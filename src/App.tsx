import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Cart } from "./components/Cart/Cart";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <Router>
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
