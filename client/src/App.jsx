import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Comments from "./components/Comments";
import ForgotPwd from "./components/ForgotPwd";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Login />}></Route>
      <Route path="/forgot" element={<ForgotPwd />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/comments" element={<Comments />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
