const Button = ({ content, isLoading, isDisabled, handleClick, Icon }) => {
  return (
    <div
      className={`w-full text-white flex justify-center items-centertext-lg mt-5 cursor-pointer text-center bg-blue-600 p-3 ${
        !isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${!isLoading ? "cursor-wait" : ""}`}
      onClick={(e) => !isDisabled && !isLoading && handleClick(e)}
    >
      {Icon != undefined && <Icon className="text-white self-center flex-none" />}
      <p className="flex-initial w-[90%]">{content}</p>
    </div>
  );
};

export default Button;
