import React from "react";
import { useForm } from "react-hook-form";

export const Create = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form>
      <input
        className="block border-b outline-0 p-2"
        {...register("image")}
        type="url"
        placeholder="Enter image Url"
      />

      <small className="text-red-500">This is how an error is show</small>
      
      <input
        className="block border-b outline-0 p-2"
        {...register("title")}
        type="text"
        placeholder="Recipe title"
      />

      <textarea
        className="block border-b outline-0 p-2"
        {...register("Description")}
        placeholder="//start from here">
      </textarea>
    
      <textarea
        className="block border-b outline-0 p-2"
        {...register("Ingredients")}
        placeholder="//write ingredients by comma">
      </textarea>

      <textarea
        className="block border-b outline-0 p-2"
        {...register("instruction")}
        placeholder="//write an instruction here">
      </textarea>
      
      <button className="block mt-5 bg-gray-900 px-4 py-2 rounded">Save Recipe</button>
    </form>
  );
};
