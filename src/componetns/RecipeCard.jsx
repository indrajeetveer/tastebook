import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  const { id, image, title, chef, description = "", category } = recipe;

  return (
    <Link
      to={`/recipes/details/${id}`}
      className="group relative w-full sm:w-[280px] md:w-[320px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      {/* Recipe Image & Category Tag */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-900">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title || "Recipe"}
        />
        {category && (
          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-red-400 text-xs font-semibold px-3 py-1 rounded-full border border-red-500/30 uppercase tracking-wider">
            {category}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-xl line-clamp-1 group-hover:text-red-400 transition-colors">
          {title}
        </h3>

        {chef && (
          <p className="text-slate-400 text-sm font-medium mt-1 mb-3">
            By <span className="text-slate-200">{chef}</span>
          </p>
        )}

        <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        {/* View Details CTA */}
        <div className="mt-auto pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs font-semibold text-red-400 group-hover:text-red-300">
          <span>View Full Recipe</span>
          <i className="ri-arrow-right-line text-base transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
