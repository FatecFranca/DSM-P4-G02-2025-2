import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error505.json";
import { useTheme } from "../contexts/ThemeContext";

const Error505 = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="w-72 h-72 mb-8">
        <Lottie animationData={errorAnimation} loop autoplay />
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: isDarkMode ? "#f87171" : "#dc2626" }}>
        Erro 505
      </h1>
      <p className={`text-lg mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        Ocorreu um erro de conexão com o servidor.
      </p>
      <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        Por favor, tente novamente mais tarde ou verifique sua conexão.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Voltar para o início
      </a>
    </div>
  );
};

export default Error505;