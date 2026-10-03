import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipeContextdata } from "../context/RecipeContext";

const Create = () => {
  const { data, setdata } = useContext(recipeContextdata);
  const { register, handleSubmit, reset } = useForm();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    setdata([...data, recipe]);
    reset();
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
        {...register("instruction")}
        placeholder="Write instruction seperated by comma"
      ></textarea>

      <select
        className="border-b outline-0 p-5 block bg-black"
        {...register("Category")}
      >
        <option value="cat-1">Category-1</option>
        <option value="cat-2">Category-2</option>
        <option value="cat-3">Category-3</option>
      </select>

      <button className="block mt-5 border px-2 py-1 rounded bg-zinc-900">
        Save Recipe
      </button>
    </form>
  );
};

export default Create;
