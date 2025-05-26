import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const SkeletonStatusUmidade = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center w-72 h-36 rounded-lg relative shadow-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      } animate-pulse`}
    >
      <div className={`h-5 w-40 mb-2 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className={`h-3 w-44 mb-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className={`h-8 w-24 mb-2 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className={`h-4 w-16 mb-2 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
      <div className="absolute bottom-[-20px] right-[-20px] opacity-10">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 5 10.25 5 15.25C5 19.25 8.25 22 12 22C15.75 22 19 19.25 19 15.25C19 10.25 12 2 12 2Z"
            fill={isDarkMode ? "#fff" : "#000"}
            opacity="0.2"
          />
        </svg>
      </div>
    </div>
  );
};

export default SkeletonStatusUmidade;