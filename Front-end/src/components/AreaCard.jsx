import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import Spinner from "./Spinner";
import ChartSkeleton from "./AreaCardskeleton";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const AreaCard = () => {
  const [chartData, setChartData] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get(
          "https://back-end-pi-27ls.onrender.com/api/sensor/stats"
        );
        const latestData = response.data.latest_data;

        const sortedData = latestData.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        const labels = sortedData.map((entry) => {
          const date = new Date(entry.timestamp);
          return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
          });
        });

        const data = sortedData.map((entry) => entry.humidity);

        setChartData({
          labels,
          datasets: [
            {
              label: "Umidade (%)",
              data,
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchAreaData();
  }, []);

  return (
    <div
      className={`w-full h-screen rounded-xl shadow-lg overflow-hidden ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="h-full">
      
        <div className="h-full">
          {chartData ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Data",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Umidade (%)",
                    },
                    beginAtZero: true,
                  },
                },
              }}
              height={null} // Permitir que o gráfico ocupe toda a altura
              width={null} // Permitir que o gráfico ocupe toda a largura
            />
          ) : (
            <ChartSkeleton/>
        )}
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
