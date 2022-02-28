import { AiFillLock } from "react-icons/ai";
import axios from "axios";
import url from "../utils/env.js";

import Input from "./Input";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { validateByRegex } from "../utils/regesUtils";
import { AppContext } from "../context/appContext";

let initialState = {
  email: "",
  password: "",
  secret: "",
};

const Auth = () => {
  let {
    authToken,
    isLogin,
    setLogin,
    isLoading,
    setLoading,
    setUser,
    getAllComments,
    comments,
  } = useContext(AppContext);
  const [isSignUp, setSignUp] = useState(true);
  const [isForgotPwd, setForgotPwd] = useState(false);
  const [isShowEmailErr, setShowEmailErr] = useState(false);
  const [isShowPasswordErr, setShowPwdErr] = useState(false);
  const [isShowSecretErr, setShowSecretErr] = useState(false);
  const [isShowInfo, setShowInfo] = useState(false);
  const [isDisabled, setDisable] = useState(true);
  // const [isLoading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState(initialState);
  const [isAuth, setAuth] = useState();

  const switchMode = () => {
    setSignUp((prevState) => !prevState);
  };
  const switchForgotMode = () => {
    setForgotPwd((prevState) => !prevState);
  };

  const handleChange = (e, name) => {
    let value = e.target.value;
    if (name === "email") {
      let isValid = validateByRegex(name, value);
      setShowEmailErr(() => !isValid);
    }
    setFormdata({ ...formdata, [name]: value });
    disableBtn();
  };

  const handleSubmit = () => {
    if (isLoading) return;
    setLoading(!isLoading);
    let { email, password, secret } = formdata;
    if (!isForgotPwd) {
      axios
        .post(`${url}/api/${isSignUp ? "register" : "login"}`, {
          email,
          password,
          secret,
        })
        .then((res) => {
          if (isSignUp) return switchMode();
          let { token, user } = res.data;
          localStorage.setItem("AuthToken", JSON.stringify(token));
          authToken = token;
          setUser(() => user);
          setLogin(() => !isLogin);
          location.reload();
        })
        .catch((err) =>
          alert(`${isSignUp ? "user already exists" : "Unable to find user"}`)
        )
        .finally(() => setLoading((prevState) => !prevState));
    } else {
      axios
        .post(`${url}/api/forgot`, { email, secret })
        .then((res) => {
          let { password } = res.data;
          if (password) {
            switchForgotMode();
            alert(password);
          }
        })
        .catch((err) => alert("Invalid Secret Key"))
        .finally(() => setLoading((prevState) => !prevState));
    }
  };

  const disableBtn = () => {
    setDisable(() => {
      if (isForgotPwd)
        return (
          !(formdata.email && formdata.secret) ||
          isShowEmailErr ||
          isShowPasswordErr ||
          isShowSecretErr
        );
      if (isSignUp)
        return (
          !(formdata.email && formdata.password && formdata.secret) ||
          isShowEmailErr ||
          isShowPasswordErr ||
          isShowSecretErr
        );
      if (!isSignUp)
        return (
          !(formdata.email && formdata.password) ||
          isShowEmailErr ||
          isShowPasswordErr ||
          isShowSecretErr
        );
    });
  };

  return (
    <>
      {authToken === null && isLogin === false && (
        <div className="min-h-screen flex justify-center items-center">
          {!isForgotPwd && (
            <div className="w-[20%]">
              <div className="text-white text-center pb-2 border-b-2 border-solid border-white">
                <h1 className="font-bold text-xl pb-2">
                  {isSignUp ? "Sign Up" : "Login"}
                </h1>
                <p className="text-sm">
                  {isSignUp
                    ? " Already have an account?"
                    : "Don't have an account?"}
                  <span
                    className="text-blue-600 ml-1 cursor-pointer"
                    onClick={switchMode}
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </span>
                </p>
              </div>
              <Input
                type="text"
                name="email"
                label="Email id"
                errText="Email Id is incorrect"
                showError={isShowEmailErr}
                showInfo={isShowInfo}
                handleChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                errText="Incorrect password"
                showError={isShowPasswordErr}
                showInfo={isShowInfo}
                handleChange={handleChange}
              />
              {isSignUp && (
                <Input
                  type="text"
                  name="secret"
                  label="Secret"
                  errText="Please enter valid secret"
                  showError={isShowSecretErr}
                  showInfo={isShowInfo}
                  handleChange={handleChange}
                />
              )}
              {!isSignUp && (
                <p className="text-blue-500 text-right mt-3 text-sm italic">
                  <span className="cursor-pointer" onClick={switchForgotMode}>
                    Forgot Password?
                  </span>
                </p>
              )}
              <Button
                isDisabled={isDisabled}
                isLoading={isLoading}
                classProps="w-full mt-5 "
                content={isSignUp ? "Sign up" : "Sign in"}
                Icon={AiFillLock}
                handleClick={handleSubmit}
              />
              {isSignUp && (
                <p className="text-white text-xs text-center mt-2">
                  By clicking the "Sign Up" button, you are creating an account,
                  and you agree to Terms of Use
                </p>
              )}
            </div>
          )}
          {isForgotPwd && (
            <div className="w-[20%]">
              <h1 className="text-white text-center font-bold text-xl pb-2 border-b-2 border-solid border-white">
                Forgot Pasword
              </h1>
              <Input
                type="text"
                name="email"
                label="Email id"
                errText="Email Id is incorrect"
                showError={isShowEmailErr}
                showInfo={isShowInfo}
                handleChange={handleChange}
              />
              <Input
                type="text"
                name="secret"
                label="Secret"
                errText="Please enter valid secret"
                showError={isShowSecretErr}
                showInfo={isShowInfo}
                handleChange={handleChange}
              />
              <Button
                isDisabled={isDisabled}
                isLoading={isLoading}
                classProps="w-full mt-5 "
                content="Sign in"
                Icon={AiFillLock}
                handleClick={handleSubmit}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
