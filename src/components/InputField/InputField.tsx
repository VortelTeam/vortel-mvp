import React, { FC } from "react";
import { IconType } from "react-icons";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputTitle?: string;
  value: string;
  setValue: (value: string) => void;
  rightIcon?: IconType;
  isRequired?: boolean;
  isError?: boolean;
  containerStyles?: React.CSSProperties;
}

/**
 * Component for input fields.
 * @param inputTitle (optional) the title that goes above the input field
 * @param value is the input text
 * @param setValue is the useState set function that changes the input text
 * @param rightIcon is the icon to show on the right side of the input field
 * @param isRequired shows blue (Optional) text when false, none when true
 * @param disabled disables the input field when true, enable otherwise
 * @param isError causes the input field to become red if the given error state is true
 * @param containerStyles Optional additional styles for the input field container
 * @param inputProps allows any input props (type, name, id, placeholder etc.). Simply add placeholder = "placeholder text" when instantiating the inputfield component.
 * @returns input field component with text above
 */
const InputField: FC<InputFieldProps> = ({
  inputTitle = "",
  value,
  setValue,
  rightIcon: RightIcon,
  isRequired,
  disabled,
  isError = false,
  containerStyles = {},
  ...inputProps
}) => {
  return (
    <div
      style={containerStyles}
      className="relative flex-col items-center w-full"
    >
      {inputTitle && (
        <div className="flex mb-1.5">
          <h5 className={`${isError ? "text-error-red" : "text-black"}`}>
            {inputTitle}
          </h5>
          {!isRequired && (
            <h5 className="ml-2 text-brand-brown"> (Optional)</h5>
          )}
        </div>
      )}
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          required={isRequired}
          aria-required={isRequired ? "true" : "false"}
          {...inputProps}
          className={`w-full text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-border
            disabled:bg-gray-200 disabled:placeholder-black disabled:cursor-not-allowed
            ${
              isError
                ? "border-error-red text-error-red"
                : "border-black text-black"
            }
            ${RightIcon ? "pr-10" : "pr-2"}`}
        />
        {RightIcon && (
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none font-bold
            ${isError ? "text-error-red" : "text-black"}`}
          >
            <span style={{ fontSize: "24px" }}>
              <RightIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
