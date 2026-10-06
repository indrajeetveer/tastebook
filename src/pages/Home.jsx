import axios from "../utils/axios";
import React from "react";

const Home = () => {
  const getProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>This is an Home Page</h1>
      <button onClick={getProduct}>Click</button>
    </div>
  );
};

export default Home;
