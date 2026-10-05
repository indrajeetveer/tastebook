import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipeContextdata } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipeContextdata);
  const params = useParams();
  const navigate = useNavigate();

  const recipe = data.find((r) => r.id === params.id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: recipe?.image,
      title: recipe?.title,
      chef: recipe?.chef,
      description: recipe?.description,
      ingredients: recipe?.ingredients,
      instructions: recipe?.instructions,
      category: recipe?.category,
    },
  });

  const SubmitHandler = (updated) => {
    const index = data.findIndex((r) => r.id === params.id);
    const copydata = [...data];
    copydata[index] = { ...copydata[index], ...updated };
    setdata(copydata);
    toast.success("Recipe Updated");
  };

  const DeleteHandler = () => {
    setdata(data.filter((r) => r.id !== params.id));
    toast.success("Recipe Deleted");
    navigate("/recipes");
  };

  if (!recipe) return "Loading";

  return (
    <div className="w-full flex mt-10">
      <div className="left w-1/2 p-2">
        <h1 className="text-5xl font-semibold">{recipe.title}</h1>
        <img className="h-[20vh]" src={recipe.image} alt="img" />
      </div>

      <form className="w-1/2 p-2" onSubmit={handleSubmit(SubmitHandler)}>
        <input
          className="block border-b outline-0 p-5"
          {...register("image")}
          type="url"
          placeholder="Enter image url"
        />

        <input
          className="block border-b outline-0 p-5"
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
          placeholder="Write ingredients separated by comma"
        ></textarea>

        <textarea
          className="border-b outline-0 p-5 block"
          {...register("instructions")}
          placeholder="Write instructions separated by comma"
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

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="mt-5 border px-2 py-1 rounded bg-blue-700"
          >
            Update Recipe
          </button>

          <button
            type="button"
            onClick={DeleteHandler}
            className="mt-5 border px-2 py-1 rounded bg-red-600"
          >
            Delete Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleRecipe;
