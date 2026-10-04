import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const {
    id,
    image,
    title,
    chef,
    description,
    ingredients,
    instructions,
    category,
  } = props.recipe;
  return (
    <Link  to={`/recipes/details/${id}`} className=" mt-10 block w-[20vw] rounded overflow-hidden shadow ">
      <img className=" object-cover w-full h-[20vh]" src={image} alt="img" />
      <h1 className="text-white font-semibold text-xl px-2 mt-2">{title}</h1>
      <small className="px-2 text-red-400 text-sm">{chef}</small>
      <p className="px-2 pb-2 ">
        {description.slice(0, 100)}...{" "}
        <small className="text-blue-400">more</small>
      </p>
    </Link>
  );
};

export default RecipeCard;
