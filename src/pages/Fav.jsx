import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RecipeCard from "../componetns/RecipeCard";

export const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite recipes from localStorage when page loads
  useEffect(() => {
    try {
      const storedFavs = JSON.parse(localStorage.getItem("fav")) || [];
      setFavorites(storedFavs);
    } catch {
      setFavorites([]);
    }
  }, []);

  const clearAllFavorites = () => {
    localStorage.setItem("fav", JSON.stringify([]));
    setFavorites([]);
    toast.info("Cleared all favorite recipes");
  };

  // Filter out any invalid items safely
  const renderData = favorites
    ?.filter((recipe) => recipe !== null)
    .map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-xl">
              <i className="ri-heart-3-fill"></i>
            </div>
            <h1 className="text-3xl font-bold text-white">Favorite Recipes</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Quickly access all the recipes you've saved for later.
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/30 text-slate-300 hover:text-red-400 text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            <i className="ri-delete-bin-line"></i> Clear Favorites
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {favorites.length > 0 ? (
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {renderData}
        </div>
      ) : (
        <div className="max-w-md mx-auto my-12 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-3xl mb-4">
            <i className="ri-heart-add-line"></i>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            No favorite recipes added yet!
          </h3>

          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Click the heart icon on any recipe page or recipe card to bookmark
            your top dishes here.
          </p>

          <Link
            to="/recipes"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium shadow-lg shadow-red-500/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <i className="ri-compass-3-line"></i> Explore Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Fav;
