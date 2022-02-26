import { Link } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";

import Input from "./Input";
import Button from "./Button";

const Register = () => {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="w-[20%]">
        <div className="text-white text-center pb-2 border-b-2 border-solid border-white">
          <h1 className="font-bold text-xl pb-2">Sign Up</h1>
          <p className="text-sm">
            Already have an account?
            <Link to="/" className="text-blue-600 ml-1">
              Sign in
            </Link>{" "}
          </p>
        </div>
        <Input type="text" name="email" label="Email id" />
        <Input type="password" name="password" label="Password" />
        <Input type="text" name="secret" label="Secret" />
        <Button
          isDisabled="false"
          isLoading="false"
          content="Sign up"
          Icon={AiFillLock}
        />
        <p className="text-white text-xs text-center mt-2">
          By clicking the "Sign Up" button, you are creating an account, and you
          agree to Terms of Use
        </p>
      </div>
    </div>
  );
};

export default Register;
