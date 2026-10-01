import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center gap-70 font-semibold text-xl">
      <NavLink className={(e) => e.isActive && "text-red-500"} to="/">
        Home
      </NavLink>
      <NavLink className={(e) => e.isActive && "text-red-500"} to="/recipes">
        Recipes
      </NavLink>
      <NavLink className={(e) => e.isActive && "text-red-500"} to="/about">
        About
      </NavLink>
      <NavLink className={(e) => e.isActive && "text-red-500"} to="/create">
        Create Recipe
      </NavLink>
    </div>
  );
};

export default Navbar;
