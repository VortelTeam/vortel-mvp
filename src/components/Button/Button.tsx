"use client";
import { useState } from "react";

// This ensures the component is rendered on the client

interface ButtonProps {
  label: string;
  onClick: () => void;
  containerStyles?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  disabled?: boolean;
  disabledOnClick?: () => void;
  hoverMessage?: string;
  hoverCondition?: boolean;
}

/**
 * This is the Button component, a generic blue button which
 * should be provided a label and function to run
 * @param label the label (text) to show inside the button
 * @param onClick the function to run when the button is clicked
 * @param containerStyles optional additional styles for the button, as CSS styles
 * @param labelStyles optional additional styles for the button's label, as CSS styles
 * @param disabled (false by default) whether or not the button is disabled
 * @param disabledOnClick optional function to call when button is clicked while disabled
 * @param hoverMessage optional message to display to the user on hover
 * @param hoverCondition optional boolean condition to check if hover message should display
 * .
 */
const Button = ({
  label,
  onClick,
  containerStyles = {},
  labelStyles = {},
  disabled = false,
  disabledOnClick,
  hoverMessage = "",
  hoverCondition = true,
}: ButtonProps) => {
  const [hoverTooltip, setHoverTooltip] = useState(false);

  return (
    <button
      disabled={disabled && !disabledOnClick}
      className={`${
        disabled
          ? "bg-background cursor-not- border-gray-600 border"
          : "border border-black bg-button-bg hover:bg-highlight"
      }  w-full rounded-xl py-2 px-4 transition-colors duration-200`}
      onClick={
        !disabled ? onClick : disabledOnClick ? disabledOnClick : onClick
      }
      style={containerStyles}
      onMouseEnter={() => {
        setHoverTooltip(true);
      }}
      onMouseLeave={() => {
        setHoverTooltip(false);
      }}
    >
      <p
        className={`text-black whitespace-nowrap text-lg font-bold`}
        style={labelStyles}
      >
        {label}
      </p>
      <div className="relative min-w-max ml-2">
        {hoverTooltip && hoverMessage && hoverCondition && (
          <div
            className="absolute min-w-full border border-gray-300 z-10 p-3 rounded-2xl bg-white text-black"
            style={{
              top: 0,
              left: 0,
              transform: "translate(0%, -140%)",
            }}
          >
            <p className="text-sm mb-2 mt-2">{hoverMessage}</p>
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
