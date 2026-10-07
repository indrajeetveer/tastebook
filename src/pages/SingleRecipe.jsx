import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { recipeContextdata } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipeContextdata);
  const params = useParams();
  const navigate = useNavigate();

  // Safely find recipe even if context data is null/undefined during initial mount
  const recipe = data?.find((r) => r.id === params.id);

  // Maintain local state for favorites to force re-render when toggling
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fav")) || [];
    } catch {
      return [];
    }
  });

  const { register, handleSubmit, reset } = useForm();

  // Keep form values in sync when the recipe finishes loading or updates
  useEffect(() => {
    if (recipe) {
      reset({
        image: recipe.image || "",
        title: recipe.title || "",
        chef: recipe.chef || "",
        description: recipe.description || "",
        ingredients: recipe.ingredients || "",
        instructions: recipe.instructions || "",
        category: recipe.category || "breakfast",
      });
    }
  }, [recipe, reset]);

  const isFavorite = favorites.some((f) => f?.id === recipe?.id);

  const toggleFavoriteHandler = () => {
    if (!recipe) return;

    let updatedFavs;
    if (isFavorite) {
      updatedFavs = favorites.filter((f) => f.id !== recipe.id);
      toast.info("Removed from Favorites");
    } else {
      updatedFavs = [...favorites, recipe];
      toast.success("Added to Favorites");
    }
    setFavorites(updatedFavs);
    localStorage.setItem("fav", JSON.stringify(updatedFavs));
  };

  const UpdateHandler = (updated) => {
    if (!data) return;
    const index = data.findIndex((r) => r.id === params.id);
    if (index === -1) return;

    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...updated };
    setdata(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));
    toast.success("Recipe Updated");
  };

  const DeleteHandler = () => {
    if (!data) return;
    const filterData = data.filter((r) => r.id !== params.id);
    setdata(filterData);
    localStorage.setItem("recipe", JSON.stringify(filterData));
    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

  if (!data || !recipe) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-full border-2 border-red-500 border-t-transparent animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium">Loading recipe details...</p>
      </div>
    );
  }

  const inputStyle =
    "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200";

  // Parse comma-separated ingredients and instructions into lists
  const ingredientList = recipe.ingredients
    ? recipe.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const instructionList = recipe.instructions
    ? recipe.instructions
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      {/* Back Button */}
      <Link
        to="/recipes"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors"
      >
        <i className="ri-arrow-left-line"></i> Back to Recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recipe Display Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden relative p-6 sm:p-8">
          {/* Favorite Heart Button */}
          <button
            onClick={toggleFavoriteHandler}
            type="button"
            className="absolute top-6 right-6 w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur flex items-center justify-center text-2xl text-red-500 hover:scale-110 active:scale-95 transition-all z-10"
          >
            <i
              className={isFavorite ? "ri-heart-3-fill" : "ri-heart-3-line"}
            ></i>
          </button>

          {/* Badge & Title */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-red-500/10 border border-red-500/20 text-red-400">
              {recipe.category || "Recipe"}
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <i className="ri-user-3-line"></i> By{" "}
              {recipe.chef || "Unknown Chef"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 pr-12 leading-tight">
            {recipe.title}
          </h1>

          {/* Recipe Hero Image */}
          <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border border-slate-700/50 bg-slate-900">
            <img
              className="w-full h-full object-cover"
              src={recipe.image}
              alt={recipe.title || "Recipe"}
            />
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base leading-relaxed mb-8 border-b border-slate-700/60 pb-6">
            {recipe.description}
          </p>

          {/* Ingredients Section */}
          {ingredientList.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <i className="ri-list-check text-red-400"></i> Ingredients
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredientList.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-700/40"
                  >
                    <i className="ri-checkbox-blank-circle-fill text-[6px] text-red-400"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions Section */}
          {instructionList.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <i className="ri-footprint-line text-red-400"></i> Instructions
              </h3>
              <ol className="space-y-3">
                {instructionList.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-700/40"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right Column: Edit Form Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/60 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700/60">
            <i className="ri-edit-box-line text-red-400 text-xl"></i>
            <h2 className="text-xl font-bold text-white">
              Edit Recipe Details
            </h2>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(UpdateHandler)}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Image URL
              </label>
              <input
                className={inputStyle}
                {...register("image")}
                type="url"
                placeholder="Image URL"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Recipe Title
              </label>
              <input
                className={inputStyle}
                {...register("title")}
                type="text"
                placeholder="Title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Chef Name
              </label>
              <input
                className={inputStyle}
                {...register("chef")}
                type="text"
                placeholder="Chef"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Description
              </label>
              <textarea
                className={`${inputStyle} min-h-[80px] resize-y`}
                {...register("description")}
                placeholder="Description"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Ingredients (comma separated)
              </label>
              <textarea
                className={`${inputStyle} min-h-[70px] resize-y`}
                {...register("ingredients")}
                placeholder="Ingredients"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Instructions (comma separated)
              </label>
              <textarea
                className={`${inputStyle} min-h-[70px] resize-y`}
                {...register("instructions")}
                placeholder="Instructions"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Category
              </label>
              <select
                className={`${inputStyle} cursor-pointer`}
                {...register("category")}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="supper">Supper</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700/60">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-save-line"></i> Update
              </button>

              <button
                type="button"
                onClick={DeleteHandler}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <i className="ri-delete-bin-line"></i> Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
