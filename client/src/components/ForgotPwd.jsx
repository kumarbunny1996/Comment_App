import { AiFillLock } from "react-icons/ai";

import Input from "./Input";
import Button from "./Button";

const ForgotPwd = () => {
  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="w-[20%]">
        <h1 className="text-white text-center font-bold text-xl pb-2 border-b-2 border-solid border-white">
          Forgot Pasword
        </h1>
        <Input type="text" name="email" label="Email id" />
        <Input type="text" name="secret" label="Secret" />
        <Button
          isDisabled="false"
          isLoading="false"
          content="Sign in"
          Icon={AiFillLock}
        />
      </div>
    </div>
  );
};

export default ForgotPwd;
