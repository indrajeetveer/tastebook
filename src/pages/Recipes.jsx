import React, { useContext, useState } from "react";
import { recipeContextdata } from "../context/RecipeContext";
import RecipeCard from "../componetns/RecipeCard";
import { Link } from "react-router-dom";

const Recipes = () => {
  const { data } = useContext(recipeContextdata);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "breakfast", "lunch", "supper", "dinner"];

  // Filter recipes by title/chef search and selected category
  const filteredRecipes = data?.filter((recipe) => {
    if (!recipe) return false;

    const matchesSearch =
      recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.chef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      recipe.category?.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderData = filteredRecipes?.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-xl">
              <i className="ri-book-open-line"></i>
            </div>
            <h1 className="text-3xl font-bold text-white">All Recipes</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Browse through our entire collection of hand-crafted recipes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px] sm:min-w-[320px]">
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, chefs, ingredients..."
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-11 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 border ${
                selectedCategory === cat
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                  : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60">
          Showing{" "}
          <span className="text-white font-bold">
            {filteredRecipes?.length || 0}
          </span>{" "}
          recipe(s)
        </span>
      </div>

      {/* Grid or Empty State */}
      {filteredRecipes && filteredRecipes.length > 0 ? (
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {renderData}
        </div>
      ) : (
        <div className="max-w-md mx-auto my-12 p-8 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-3xl mb-4">
            <i className="ri-search-eye-line"></i>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            No recipes found!
          </h3>

          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search terms or filters to find what you're looking for."
              : "There are currently no recipes available in the collection."}
          </p>

          <div className="flex items-center gap-3">
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-all"
              >
                Reset Filters
              </button>
            )}

            <Link
              to="/create"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-sm font-medium shadow-lg shadow-red-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <i className="ri-add-line"></i> Add Recipe
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
