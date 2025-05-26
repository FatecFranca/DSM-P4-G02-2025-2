import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const METRICAS = ["Crítico", "Baixo", "Médio", "Bom", "Sobrecarregado"];
const COLORS = [
  "rgba(239,68,68,0.7)",     
  "rgba(249,115,22,0.7)",     
  "rgba(253,224,71,0.7)",     
  "rgba(34,197,94,0.7)",      
  "rgba(162,28,175,0.7)",     
];

function getStatus(value) {
  if (value < 30) return 0; // Crítico
  if (value >= 30 && value < 50) return 1; // Baixo
  if (value >= 50 && value < 70) return 2; // Médio
  if (value >= 70 && value <= 100) return 3; // Bom
  return 4; // Sobrecarregado
}

const CardRadar = () => {
  const [dataRadar, setDataRadar] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        // Conta as métricas do mês atual
        const counts = [0, 0, 0, 0, 0];
        (res.data.latest_data || []).forEach(item => {
          const d = new Date(item.timestamp);
          if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
            counts[getStatus(item.humidity)] += 1;
          }
        });

        setDataRadar({
          labels: METRICAS,
          datasets: [
            {
              label: "Ocorrências no mês",
              data: counts,
              backgroundColor: "rgba(59,130,246,0.2)", // azul-500 transparente
              borderColor: "rgba(59,130,246,1)", // azul-500
              pointBackgroundColor: COLORS,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: COLORS,
            },
          ],
        });
      } catch (err) {
        console.error("Erro ao buscar dados do backend:", err);
        setDataRadar(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`rounded-xl shadow-lg p-4 ${isDarkMode ? "dark-bg-2 dark-text" : "bg-white text-gray-800"}`}>
      <div className="h-80">
        {dataRadar ? (
          <Radar
            data={dataRadar}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: isDarkMode ? "#fff" : "#1e293b",
                  },
                },
              },
              scales: {
                r: {
                  angleLines: { color: isDarkMode ? "#334155" : "#e5e7eb" },
                  grid: { color: isDarkMode ? "#334155" : "#e5e7eb" },
                  pointLabels: { color: isDarkMode ? "#fff" : "#1e293b" },
                  ticks: { color: isDarkMode ? "#fff" : "#1e293b", stepSize: 1, precision: 0 },
                  min: 0,
                },
              },
            }}
          />
        ) : (
          <div className="text-center text-gray-400">Sem dados para o mês atual.</div>
        )}
      </div>
    </div>
  );
};

export default CardRadar;