import React from "react";
interface ButtonsProps {
  label: string | null | React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}
export const Button: React.FC<ButtonsProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false, //Valeur par défaut
}) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? undefined : "#FF5A00",
          // backgroundColor: disabled ? undefined : "transparent",
        }}
        className={`text-2xl text-white font-bold cursor-pointer border h-[50px] rounded-xl p-1 w-[250px] md:w-[250px] hover:transition ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-300 border-gray-400"
            : "cursor-pointer hover:text-black"
        } ${className}`}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = "#FF5A00";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = "#FF5A00";
          }
        }}
      >
        <span
          className={`font-light ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </span>
      </button>
    </div>
  );
};
