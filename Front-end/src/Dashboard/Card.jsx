import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsDashboard = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats");
      setStats(res.data);
    };
    fetchData();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className={`${isDarkMode ? 'dark-bg text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="">
        <div className="mb-8 flex justify-center">
          <div className={`p-4 rounded-lg w-full max-w-xs ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold mb-2">Correlação e Regressão</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-xs">Inclinação</p>
                <p className="text-lg">{stats.trend.slope.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs">Interceptação</p>
                <p className="text-lg">{stats.trend.intercept.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold">Assimetria</h3>
            <p className="text-xl">{stats.skewness.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold">Curtose</h3>
            <p className="text-xl">{stats.kurtosis.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold">Desvio Padrão</h3>
            <p className="text-xl">{stats.std_dev.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold">Previsão Amanhã</h3>
            <p className="text-xl">{stats.trend.tomorrow_prediction.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;