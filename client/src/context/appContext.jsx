import axios from "axios";
import url from "../utils/env.js";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ childern }) => {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  let authToken = JSON.parse(localStorage.getItem("AuthToken"));

  const axiosConfig = {
    headers: {
      Authorization: authToken,
    },
  };

  const getProfile = () => {
    if (authToken === null) return;
    axios
      .get(`${url}/api/user/profile`, axiosConfig)
      .then((data) => {
        console.log(data.data);
        setUser(() => data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAllComments = () => {
    if (authToken === null) return;
    if (comments.length !== 0) {
      return setShowComments((prevstate) => !prevstate);
    }
    axios
      .get(`${url}/api/user/comments`, axiosConfig)
      .then((data) => {
        let list = data.data;
        if (comments.length === 0) {
          setShowComments((prevstate) => !prevstate);
        }
        setAllComments(() => list.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllComments();
    getProfile();
  }, []);

  return (
    <AppContext.Provider
      value={{
        authToken,
        isLogin,
        setLogin,
        isLoading,
        setLoading,
        user,
        setUser,
        showComments,
        comments,
        setAllComments,
        setShowComments,
        getAllComments,
      }}
    >
      {childern}
    </AppContext.Provider>
  );
};
