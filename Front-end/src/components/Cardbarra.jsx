import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext'; 
import { FaSpinner } from 'react-icons/fa';
import Spinner from './Spinner';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CardGraficoBarras = () => {
  const [chartData, setChartData] = useState(null);
  const { isDarkMode } = useTheme();  

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
        const latestData = response.data.latest_data;

        const monthlyData = {};
        latestData.forEach((entry) => {
          const date = new Date(entry.timestamp);
          const month = date.toLocaleString('default', { month: 'short' });
          if (!monthlyData[month]) {
            monthlyData[month] = { total: 0, count: 0 };
          }
          monthlyData[month].total += entry.humidity;
          monthlyData[month].count += 1;
        });

        const labels = Object.keys(monthlyData).slice(-6); 
        const data = labels.map((month) => (monthlyData[month].total / monthlyData[month].count).toFixed(2));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Média Mensal (%)',
              data,
              backgroundColor: isDarkMode
                ? ['#4D96FF', '#6BCB77', '#FFD93D', '#FF6B6B', '#845EC2', '#FFC75F']
                : ['#0C4F48', '#318A84', '#4D8B00', '#6C5C04', '#4A90E2', '#F5A623'],
              hoverBackgroundColor: isDarkMode
                ? ['#357EDD', '#4CAF50', '#FFC300', '#FF4C4C', '#6A4FBF', '#E5A347']
                : ['#0A3B37', '#276F69', '#3A6900', '#5A4D03', '#3A78C2', '#D48A1A'],
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchMonthlyData();
  }, [isDarkMode]);

  return (
    <div
      className={`max-w-full sm:max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden transition-colors ${
        isDarkMode ? 'dark-bg-2 dark-text' : 'bg-white text-gray-800'
      }`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center">
          {chartData ? (
            <Bar
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
                scales: {
                  x: {
                    ticks: {
                      color: isDarkMode ? '#CBD5E1' : '#1E293B',
                    },
                  },
                  y: {
                    ticks: {
                      color: isDarkMode ? '#CBD5E1' : '#1E293B',
                    },
                  },
                },
              }}
            />
          ) : (
<Spinner className='mx-auto'/>          )}
        </div>
      </div>
    </div>
  );
};

export default CardGraficoBarras;
