import React, { useContext } from "react";
import { recipeContextdata } from "../context/RecipeContext";

const Racipies = () => {
  const { data } = useContext(recipeContextdata);

  const renderdata = data.map((elem, idx) => {
    return (
      <div kay={idx}>
        <h1>{elem.title}</h1>
      </div>
    );
  });
  return <div>{renderdata}</div>;
};

export default Racipies;
