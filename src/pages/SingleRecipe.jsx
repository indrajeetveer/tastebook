import { useContext } from "react";
import { useParams } from "react-router-dom";
import { recipeContextdata } from "../context/RecipeContext";
import { useForm } from "react-hook-form";

const SingleRecipe = () => {
  const { register, handleSubmit, reset } = useForm();

  const SubmitHandler = (recipe) => {};
  const { data } = useContext(recipeContextdata);
  const params = useParams();

  const recipe = data.find((recipe) => params.id == recipe.id);
  console.log(data, params.id);
  console.log(recipe);

  return recipe ? (
    <div className="w-full flex mt-10">
      <div className="left w-1/2 p-2">
        <h1 className="text-5xl font-semibold ">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} alt="img" />
      </div>

      <form
        className="mx-50  w-1/2 p-2"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          className="block border-b outline-0 p-5"
          {...register("image")}
          type="url"
          placeholder="Enter image url"
        />

        <small className="text-red-400">This is an how an error is shown</small>

        <input
          className=" block border-b outline-0 p-5"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />

        <input
          className="block border-b outline-0 p-5"
          {...register("chef")}
          type="text"
          placeholder="Enter Chef name"
        />

        <textarea
          className="border-b outline-0 p-5 block"
          {...register("description")}
          placeholder="Recipe Description"
        ></textarea>

        <textarea
          className="border-b outline-0 p-5 block"
          {...register("ingredients")}
          placeholder="Write ingredients seperated by comma"
        ></textarea>

        <textarea
          className="border-b outline-0 p-5 block"
          {...register("instructions")}
          placeholder="Write instruction seperated by comma"
        ></textarea>

        <select
          className="border-b outline-0 p-5 block bg-black"
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="block mt-5 border px-2 py-1 rounded bg-zinc-900">
          Save Recipe
        </button>
      </form>
    </div>
  ) : (
    "Loading"
  );
};

export default SingleRecipe;
