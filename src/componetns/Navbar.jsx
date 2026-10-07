import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 font-medium text-base ${
      isActive
        ? "text-red-500 font-semibold border-b-2 border-red-500 pb-1"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-500 to-orange-500 flex items-center justify-center text-white text-xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <i className="ri-restaurant-2-line"></i>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            RecipeHub
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={navLinkClass} to="/recipes">
            Recipes
          </NavLink>

          <NavLink className={navLinkClass} to="/about">
            About
          </NavLink>

          <NavLink className={navLinkClass} to="/fav">
            <span className="flex items-center gap-1.5">
              <i className="ri-heart-3-fill text-red-500"></i>
              Favorites
            </span>
          </NavLink>

          {/* Action Button */}
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-md ${
                isActive
                  ? "bg-red-600 text-white shadow-red-600/30 ring-2 ring-red-400"
                  : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 hover:scale-105"
              }`
            }
          >
            <i className="ri-add-line text-lg"></i>
            Create Recipe
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
