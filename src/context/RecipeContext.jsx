import React, { createContext, useState } from "react";

export const recipeContextdata = createContext(null);

const RecipeContext = (props) => {

  const [data, setdata] = useState([
    {
      id:"1",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      title: "Creamy Garlic Pasta",
      chef: "Indrajeet Veer",
      description:
        "A delicious and creamy garlic pasta made with simple ingredients. It is quick to prepare and perfect for a tasty dinner.",
      ingredients:
        "Pasta, Garlic, Butter, Fresh Cream, Parmesan Cheese, Black Pepper, Salt, Parsley",
      instructions:
        "Boil the pasta until al dente, Melt butter in a pan, Add chopped garlic and saute until fragrant, Add fresh cream and mix well, Add parmesan cheese and stir until creamy, Season with salt and black pepper, Add the cooked pasta and mix well, Garnish with parsley and serve hot",
      category: "Category-1",
    },
  ]);
  console.log(data);
  return (
    <recipeContextdata.Provider value={{ data, setdata }}>
      {props.children}
    </recipeContextdata.Provider>
  );
};

export default RecipeContext;
