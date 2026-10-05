import React, { useContext } from "react";
import { recipeContextdata } from "../context/RecipeContext";
import RecipeCard from "../componetns/RecipeCard";

const Racipies = () => {
  const { data } = useContext(recipeContextdata);

  const renderdata = data.map((recipe) => {
    return (
      <RecipeCard key={recipe.id} recipe={recipe}/>
    );
  });
  return <div className="flex items-center justify-center gap-20 flex-wrap">{data.length > 0 ? renderdata :'No recipes are found'}</div>;
};

export default Racipies;
