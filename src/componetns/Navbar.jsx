import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center gap-60 font-semibold text-xl">
      <NavLink
        className={(e) => (e.isActive ? "text-red-500" : undefined)}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={(e) => (e.isActive ? "text-red-500" : undefined)}
        to="/recipes"
      >
        Recipes
      </NavLink>

      <NavLink
        className={(e) => (e.isActive ? "text-red-500" : undefined)}
        to="/about"
      >
        About
      </NavLink>

      <NavLink
        className={(e) => (e.isActive ? "text-red-500" : undefined)}
        to="/create"
      >
        Create Recipe
      </NavLink>
    </div>
  );
};

export default Navbar;
