import { twMerge } from "tailwind-merge";

export const TYPE_BUTTON = {
  PRIMARY: "PRIMARY",
  DANGER: "DANGER",
  DEFAULT: "DEFAULT",
};
export const Button = (props) => {
  return (
    <>
      {props.type === TYPE_BUTTON.PRIMARY && <ButtonPrimary {...props} />}
      {props.type === TYPE_BUTTON.DANGER && <ButtonDanger {...props} />}
      {props.type === TYPE_BUTTON.DEFAULT && <ButtonDefault {...props} />}
    </>
  );
};
export const ButtonDanger = ({ onClick, className, title, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        `bg-red-600 h-9 flex justify-center items-center hover:bg-red-700 font-semibold text-white py-2
         px-4 border border-red-600 hover:border-transparent rounded-lg duration-300 disabled:cursor-not-allowed`,
        className
      )}
    >
      {title}
    </button>
  );
};
export const ButtonPrimary = ({ onClick, className, title, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        `bg-blue-600 h-9 flex justify-center items-center hover:bg-blue-700 font-semibold text-white py-2 
        px-4 border border-blue-600 hover:border-transparent rounded-lg duration-300 disabled:cursor-not-allowed`,
        className
      )}
    >
      {title}
    </button>
  );
};
export const ButtonDefault = ({ onClick, className, title, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        `h-9 flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-600 
        font-semibold py-2 px-4 hover:border-transparent rounded-lg duration-300 disabled:cursor-not-allowed`,
        className
      )}
    >
      {title}
    </button>
  );
};
