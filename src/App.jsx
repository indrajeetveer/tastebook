import React from "react";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./componetns/Navbar";

const App = () => {
  return (
    <div className="h-screen w-screen text-white bg-gray-800 py-10 px-20">
      <Navbar />
      <Mainroutes />
    </div>
  );
};

export default App;
