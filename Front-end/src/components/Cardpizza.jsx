import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext'; 
import Spinner from './Spinner';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CardGraficoPizza = () => {
  const [chartData, setChartData] = useState(null);
  const { isDarkMode } = useTheme();  

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
        const latestData = response.data.latest_data;

        const statusCounts = { Crítico: 0, Baixo: 0, Médio: 0, Bom: 0, Sobrecarregado: 0 };
        latestData.forEach((entry) => {
          const humidity = entry.humidity;
          if (humidity < 30) {
            statusCounts["Crítico"] += 1;
          } else if (humidity >= 30 && humidity < 50) {
            statusCounts["Baixo"] += 1;
          } else if (humidity >= 50 && humidity < 70) {
            statusCounts["Médio"] += 1;
          } else if (humidity >= 70 && humidity <= 100) {
            statusCounts["Bom"] += 1;
          } else if (humidity > 100) {
            statusCounts["Sobrecarregado"] += 1;
          }
        });

        setChartData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              data: Object.values(statusCounts),
              backgroundColor: [
                '#ef4444',
                '#f97316',
                '#fde047',
                '#22c55e',
                '#a21caf',
              ],
              hoverBackgroundColor: [
                '#dc2626',
                '#ea580c',
                '#facc15',
                '#16a34a',
                '#7c3aed',
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchStatusData();
  }, [isDarkMode]);

  return (
    <div
      className={`max-w-full sm:max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden transition-colors ${
        isDarkMode ? 'dark-bg-2 dark-text' : 'bg-white text-gray-800'
      }`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="h-64 sm:h-80 md:h-96">
          {chartData ? (
            <Pie
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: isDarkMode ? '#CBD5E1' : '#1E293B',
                    },
                  },
                },
              }}
            />
          ) : (
            <div className='mx-auto w-24 h-24'>
              <Spinner className='w-24 h-24' /> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGraficoPizza;
