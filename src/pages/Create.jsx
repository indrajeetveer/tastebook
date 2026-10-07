import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipeContextdata } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { data, setdata } = useContext(recipeContextdata);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "breakfast",
    },
  });

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();

    const currentData = Array.isArray(data) ? data : [];
    const copydata = [...currentData, recipe];

    setdata(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));
    toast.success("New Recipe Created!");
    reset();
    navigate("/recipes");
  };

  const inputStyle =
    "w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {/* Form Container Card */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700/60 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Subtle Decorative Glow Background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-700/50">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-xl">
            <i className="ri-restaurant-line"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Recipe</h2>
            <p className="text-slate-400 text-sm">
              Add a new culinary delight to your personal cookbook collection.
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(SubmitHandler)}
        >
          {/* Image URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ri-image-line text-red-400"></i> Image URL
            </label>
            <input
              className={inputStyle}
              {...register("image", { required: "Image URL is required" })}
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
            />
            {errors.image && (
              <span className="text-red-400 text-xs font-medium flex items-center gap-1 mt-0.5">
                <i className="ri-error-warning-line"></i> {errors.image.message}
              </span>
            )}
          </div>

          {/* Title & Chef Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <i className="ri-book-open-line text-red-400"></i> Recipe Title
              </label>
              <input
                className={inputStyle}
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="e.g. Creamy Alfredo"
              />
              {errors.title && (
                <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>{" "}
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <i className="ri-user-3-line text-red-400"></i> Chef Name
              </label>
              <input
                className={inputStyle}
                {...register("chef", { required: "Chef name is required" })}
                type="text"
                placeholder="e.g. Gordon Ramsay"
              />
              {errors.chef && (
                <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                  <i className="ri-error-warning-line"></i>{" "}
                  {errors.chef.message}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ri-file-text-line text-red-400"></i> Short
              Description
            </label>
            <textarea
              className={`${inputStyle} min-h-[90px] resize-y`}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Brief overview of the dish, taste profile, or backstory..."
            ></textarea>
            {errors.description && (
              <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                <i className="ri-error-warning-line"></i>{" "}
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ri-list-check text-red-400"></i> Ingredients
            </label>
            <textarea
              className={`${inputStyle} min-h-[80px] resize-y`}
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              placeholder="Pasta, Garlic, Olive oil, Parmesan (separated by commas)"
            ></textarea>
            {errors.ingredients && (
              <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                <i className="ri-error-warning-line"></i>{" "}
                {errors.ingredients.message}
              </span>
            )}
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ri-footprint-line text-red-400"></i> Preparation
              Instructions
            </label>
            <textarea
              className={`${inputStyle} min-h-[90px] resize-y`}
              {...register("instructions", {
                required: "Instructions are required",
              })}
              placeholder="Boil water, Saute garlic, Mix together (separated by commas)"
            ></textarea>
            {errors.instructions && (
              <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                <i className="ri-error-warning-line"></i>{" "}
                {errors.instructions.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <i className="ri-price-tag-3-line text-red-400"></i> Category
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 font-semibold text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-add-circle-line text-lg"></i>
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
