import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Cart } from "./components/Cart/Cart";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
