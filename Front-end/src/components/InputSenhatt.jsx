import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext"; 

const InputPassword = ({ 
  placeholder = "Sua senha",
  value,
  onChange,
  className = "",
  required = false,
  showStrength = false,
  iconStart = null 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useTheme();  

  return (
    <div className="relative w-full">
      {iconStart && (
        <span
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg transition-colors ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {iconStart}
        </span>
      )}

      <input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 rounded-md border mt-5 pr-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
            : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-sky-500 focus:border-sky-500"
        } ${iconStart ? "pl-10" : ""} ${className}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className={`absolute inset-y-0 right-3 flex items-center transition-colors duration-300 ${
          isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
        }`}
      >
        {showPassword ? (
          <FaEyeSlash size={20} />
        ) : (
          <FaEye size={20} />
        )}
      </button>

      {showStrength && value && (
        <div className="mt-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-full rounded-sm ${
                value.length > i * 2
                  ? isDarkMode
                    ? "bg-green-500"
                    : "bg-green-400"
                  : isDarkMode
                  ? "bg-gray-600"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputPassword;
