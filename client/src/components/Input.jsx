import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({
  label,
  type,
  name,
  handleChange,
  showInfo,
  showError,
  errText,
}) => {
  let isPassword = type === "password";
  let [isPasswordShown, setPasswordShown] = useState(false);
  let [inputType, setType] = useState(type);

  const togglePassword = () => {
    let isPassword = inputType === "password";
    setType(() => (isPassword ? "text" : "password"));
    setPasswordShown(!isPasswordShown);
  };

  return (
    <div className="flex flex-col justify-start items-start mt-5">
      <label className="text-white text-lg font-semibold">{label} *</label>
      <input
        type={type === "password" ? inputType : type}
        name={name}
        onChange={(e) => handleChange(e, name)}
        className="w-full border-none outline-none bg-white text-sm text-gray-600 p-3 mt-2"
        required
      />
      {isPassword && (
        <em
          className="text-gray-500 text-lg cursor-pointer self-end mr-3 relative top-[-30px]"
          onMouseDown={togglePassword}
        >
          {isPasswordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </em>
      )}
      <div className="text-white self-center text-sm">
        {showInfo && <p className="mt-1 text-white"></p>}
        {showError && <p className="mt-1 text-red-500">{errText}</p>}
      </div>
    </div>
  );
};

export default Input;
