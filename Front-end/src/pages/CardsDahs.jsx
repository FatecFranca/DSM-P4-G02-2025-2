import StatusUmidade from "../Dashboard/Components/StatusUmidade";
import CardGraficoBarras from "../components/Cardbarra";
import CardGraficoPizza from "../components/Cardpizza";
import FiltroComTabela from "../components/FIltro";
import AreaCard from "../components/AreaCard"; 
import { useTheme } from "../contexts/ThemeContext"; 
import CardRadar from "../Dashboard/Components/CardRadar";
import StatsDashboard from "../Dashboard/Card";

export default function CardDash() {
  const { isDarkMode } = useTheme(); 

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors duration-300 ${
        isDarkMode ? "dark-bg dark-text" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex flex-col items-center w-full md:w-auto">
            <h1
              className={`text-4xl font-bold mb-4 md:mb-0 ${
                isDarkMode ? "dark-Tittle" : "text-gray-800"
              }`}
            >
              Dashboard de Monitoramento
            </h1>
            <div className="mb-4">
              <StatusUmidade />
            </div>
          </div>
          <FiltroComTabela />
        </div>

        <div className="w-full mb-2">
          <StatsDashboard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "dark-text" : "text-gray-700"
              }`}
            >
              Distribuição de Status do Solo
            </h3>
            <CardGraficoPizza />
          </div>
          <div>
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "dark-text" : "text-gray-700"
              }`}
            >
              Média Mensal de Umidade
            </h3>
            <CardGraficoBarras />
          </div>
          <div>
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "dark-text" : "text-gray-700"
              }`}
            >
              Radar de Umidade (Mês Atual)
            </h3>
            <CardRadar />
          </div>
        </div>

        <div className="w-full">
          <h3
            className={`text-xl font-semibold mb-6 text-center ${
              isDarkMode ? "dark-text" : "text-gray-700"
            }`}
          >
            Histórico de Umidade
          </h3>
          <AreaCard />
        </div>
      </div>
    </div>
  );
}
