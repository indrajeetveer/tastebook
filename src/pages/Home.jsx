import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/products");
      console.log(data);
      // Adjust according to your API structure (e.g., data.data or data)
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-red-400 text-sm font-medium mb-8">
          <i className="ri-fire-fill"></i> Welcome to RecipeHub
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Discover, Cook & Share{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Delicious Recipes
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          Explore thousands of mouthwatering dishes, save your favorites, and
          share your own culinary masterpieces with our global community.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/recipes"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 font-semibold text-white shadow-lg shadow-red-500/25 hover:scale-105 transition-all flex items-center gap-2"
          >
            <i className="ri-compass-3-line text-xl"></i> Explore All Recipes
          </Link>

          <Link
            to="/create"
            className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-slate-200 hover:scale-105 transition-all flex items-center gap-2"
          >
            <i className="ri-add-circle-line text-xl"></i> Create Recipe
          </Link>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-800/80 w-full max-w-3xl">
          <div>
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="text-slate-400 text-sm mt-1">Curated Recipes</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">100%</h3>
            <p className="text-slate-400 text-sm mt-1">Free & Open</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-bold text-white">4.9★</h3>
            <p className="text-slate-400 text-sm mt-1">Community Rating</p>
          </div>
        </div>
      </section>

      {/* API Product Fetch Testing Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/60">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-slate-400 text-sm">
              Data loaded directly from your Axios API route.
            </p>
          </div>

          <button
            onClick={getProduct}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <i
              className={`ri-refresh-line ${loading ? "animate-spin" : ""}`}
            ></i>
            {loading ? "Fetching..." : "Refresh Data"}
          </button>
        </div>

        {/* Data Container */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item, index) => (
              <div
                key={item.id || index}
                className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur"
              >
                <h4 className="font-semibold text-lg text-white mb-1 line-clamp-1">
                  {item.title || item.name || `Product #${index + 1}`}
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {item.description || "No description available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/40 text-center text-slate-400">
            {loading
              ? "Loading product data from API..."
              : "No items found. Click 'Refresh Data' to re-fetch."}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
