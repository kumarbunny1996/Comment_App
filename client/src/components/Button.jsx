import Loader from "./Loader";

const Button = ({
  content,
  isLoading,
  isDisabled,
  handleClick,
  Icon,
  classProps,
}) => {
  return (
    <div
      className={` text-white flex justify-center items-centertext-lg cursor-pointer text-center bg-blue-600 p-3 ${classProps} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${isLoading ? "cursor-wait" : ""}`}
      onClick={(e) => !isDisabled && !isLoading && handleClick(e)}
    >
      {Icon != undefined && (
        <Icon className="text-white self-center flex-none" />
      )}
      <div className="flex-initial w-[90%]">
        {isLoading ? <Loader /> : content}
      </div>
    </div>
  );
};

export default Button;
