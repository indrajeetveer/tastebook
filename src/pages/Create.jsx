import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipeContextdata } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { data, setdata } = useContext(recipeContextdata);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    setdata([...data, recipe]);
    toast.success("New Recipe Create..!")
    reset();
    navigate("/recipes")
  };

  return (
    <form className="mx-50 my-15" onSubmit={handleSubmit(SubmitHandler)}>
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
  );
};

export default Create;
