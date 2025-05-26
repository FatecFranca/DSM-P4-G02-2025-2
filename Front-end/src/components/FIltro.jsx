/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi"; 
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext"; 

const FiltroComTabela = () => {
  const [activeTab, setActiveTab] = useState("media");
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ mean: null, median: null, mode: null });
  const { isDarkMode } = useTheme(); 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
        setStats({
          mean: response.data.mean,
          median: response.data.median,
          mode: response.data.mode,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas do backend:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      className={`relative max-w-4xl mx-auto p-4 rounded-lg shadow transition-colors duration-300 ${
        isDarkMode ? "dark-bg dark-text" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex space-x-4 border-b pb-2">
        {["media", "mediana", "moda"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsOpen(true); 
            }}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab
                ? isDarkMode
                  ? "border-b-2 border-green-500 text-green-500"
                  : "border-b-2 border-blue-500 text-blue-500"
                : isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "media" ? "Ver Média" : tab === "mediana" ? "Ver Mediana" : "Ver Moda"}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute top-2 left-0 w-full p-6 rounded-lg shadow-lg z-50 transition-colors duration-300 ${
                isDarkMode ? "dark-bg-2 dark-text" : "bg-white text-gray-800"
              }`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-2 right-2 transition-all ${
                  isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"
                }`}
              >
                <FiX size={20} />
              </button>

              <h2
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "dark-text" : "text-gray-800"
                }`}
              >
                {activeTab === "media" && "Média"}
                {activeTab === "mediana" && "Mediana"}
                {activeTab === "moda" && "Moda"}
              </h2>

              <div className="mt-4">
                {activeTab === "media" && (
                  <h3 className={`font-semibold ${isDarkMode ? "dark-text" : "text-gray-800"}`}>
                    Média: {stats.mean !== null && stats.mean !== undefined ? stats.mean.toFixed(2) : "Carregando..."}
                  </h3>
                )}
                {activeTab === "mediana" && (
                  <h3 className={`font-semibold ${isDarkMode ? "dark-text" : "text-gray-800"}`}>
                    Mediana: {stats.median !== null && stats.median !== undefined ? stats.median.toFixed(2) : "Carregando..."}
                  </h3>
                )}
                {activeTab === "moda" && (
                  <h3 className={`font-semibold ${isDarkMode ? "dark-text" : "text-gray-800"}`}>
                    Moda: {stats.mode !== null && stats.mode !== undefined ? stats.mode.toFixed(2) : "Carregando..."}
                  </h3>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FiltroComTabela;
