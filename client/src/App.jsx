import React, { useContext } from "react";
import Authentication from "./components/Auth";
import Comments from "./components/Comments";

const App = () => {
  return (
    <>
      <Authentication />
      <Comments />
    </>
  );
};

export default App;
