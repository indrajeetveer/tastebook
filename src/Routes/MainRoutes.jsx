import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Recipes from "../Pages/Recipes";
import About from "../Pages/About";

const Mainroutes = () => {
  return;
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/recipes" element={<Recipes />} />
    <Route path="/about" element={<About />} />
  </Routes>;
};

export default Mainroutes;
