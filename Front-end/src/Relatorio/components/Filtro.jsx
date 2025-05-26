/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { RiLoader4Fill } from "react-icons/ri";

const Filtro = ({ onFiltrar }) => {
  const { isDarkMode } = useTheme();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [minHumidity, setMinHumidity] = useState("");
  const [maxHumidity, setMaxHumidity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiltrar = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Buscando dados...");
    setLoading(true);
    try {
      await onFiltrar({
        start,
        end,
        minHumidity,
        maxHumidity,
      });
      toast.update(toastId, { render: "Dados carregados!", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.update(toastId, { render: "Erro ao buscar dados!", type: "error", isLoading: false, autoClose: 3000 });
    }
    setLoading(false);
  };

  const handleLimpar = () => {
    setStart("");
    setEnd("");
    setMinHumidity("");
    setMaxHumidity("");
  };

  return (
    <div className={`rounded-lg shadow-md p-6 w-full max-w-5xl flex flex-col gap-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Relatorio de umidade</h2>
      <form onSubmit={handleFiltrar} className="flex flex-row flex-wrap gap-4 items-end">
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className={`text-sm mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Data Inicial</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className={`p-2 rounded border ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className={`text-sm mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Data Final</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className={`p-2 rounded border ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className={`text-sm mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Umidade Mínima</label>
          <input
            type="number"
            value={minHumidity}
            onChange={(e) => setMinHumidity(e.target.value)}
            placeholder="Ex: 30"
            className={`p-2 rounded border ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className={`text-sm mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Umidade Máxima</label>
          <input
            type="number"
            value={maxHumidity}
            onChange={(e) => setMaxHumidity(e.target.value)}
            placeholder="Ex: 80"
            className={`p-2 rounded border ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
          />
        </div>
        <div className="flex flex-col gap-2 mb-1">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-60"
          >
            <FaSearch />
            {loading ? <RiLoader4Fill className="animate-spin" /> : "Filtrar"}
          </button>
          <button
            type="button"
            onClick={handleLimpar}
            disabled={loading}
            className={`px-4 py-2 rounded transition-colors ${isDarkMode ? "bg-gray-600 text-white hover:bg-gray-700" : "bg-gray-300 text-gray-800 hover:bg-gray-400"}`}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filtro;