const Input = ({ label, type, name, handleChange }) => {
  return (
    <div className="flex flex-col justify-start items-start mt-5">
      <label className="text-white text-lg font-semibold">
        {label} *
      </label>
      <input
        type={type}
        name={name}
        onChange={(e)=>handleChange(e)}
        className="w-full border-none outline-none bg-white text-sm text-gray-600 p-3 mt-2"
        required
      />
    </div>
  );
};

export default Input;
