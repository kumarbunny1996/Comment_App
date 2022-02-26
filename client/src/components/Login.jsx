import { Link } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="w-[20%]">
        <div className="text-white text-center pb-2 border-b-2 border-solid border-white">
          <h1 className="font-bold text-xl pb-2">Login</h1>
          <p className="text-sm">
            Don't have an account?
            <Link to="/register" className="text-blue-600 ml-1">
              Sign Up
            </Link>{" "}
          </p>
        </div>
        <Input type="text" name="email" label="Email id" />
        <Input type="password" name="password" label="Password" />
        <p className="text-blue-500 text-right mt-3 text-sm italic">
          <Link to="/forgot">Forgot Password?</Link>
        </p>
        <Button isDisabled="false" isLoading="false" content="Sign in" Icon={AiFillLock}></Button>
      </div>
    </div>
  );
};

export default Login;
