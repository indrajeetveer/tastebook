import React, { createContext, useState } from "react";

export const recipeContextdata = createContext(null);

const RecipeContext = (props) => {
  const [data, setdata] = useState([]);
  console.log(data)
  return (
    <recipeContextdata.Provider value={{ data, setdata }}>
      {props.children}
    </recipeContextdata.Provider>
  );
};

export default RecipeContext;
