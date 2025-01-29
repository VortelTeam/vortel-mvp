import { useState, FC } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
interface PasswordInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}

/**
 * Password input component.
 * @param label is the text that goes above the password input field
 * @param value is the text typed in the input field
 * @param setValue is the react hook to change the value
 * @returns password input component
 */
const PasswordInput: FC<PasswordInputFieldProps> = ({
  label,
  value,
  setValue,
  disabled,
  ...inputProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="relative flex-col items-center w-full">
      <div className="flex mb-2">
        <h5 className="text-black">{label}</h5>
      </div>
      <div className="flex relative inline-block rounded-xl w-full">
        <input
          type={isVisible ? "text" : "password"}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          className="disabled:bg-gray-200 w-full p-2 border border-black text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-border"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-200 border-none rounded-xl cursor-pointer text-black p-2 rounded-md hover:bg-gray-300"
        >
          <span style={{ fontSize: "18px" }}>
            {isVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
