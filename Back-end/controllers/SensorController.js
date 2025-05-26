const pool = require('../config/db');

const SensorController = {
  collectData: async (req, res) => {
    try {
      const { humidity } = req.body;
      
      const [result] = await pool.execute(
        'INSERT INTO SensorData (humidity) VALUES (?)',
        [humidity]
      );
      
      res.status(201).json({
        message: 'Dado salvo com sucesso',
        id: result.insertId
      });
      
    } catch (error) {
      console.error('Erro ao salvar dado:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  getStats: async (req, res) => {
    try {
      const [rows] = await pool.execute(
        'SELECT humidity, timestamp FROM SensorData ORDER BY timestamp ASC'
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Nenhum dado encontrado' });
      }

      const humidityValues = rows.map(row => row.humidity);
      const timestamps = rows.map(row => new Date(row.timestamp).getTime());

      const total = humidityValues.reduce((acc, val) => acc + val, 0);
      const mean = total / humidityValues.length;

      const sortedValues = [...humidityValues].sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);
      const median = sortedValues.length % 2 !== 0 
        ? sortedValues[mid] 
        : (sortedValues[mid - 1] + sortedValues[mid]) / 2;

      const frequency = {};
      let maxFreq = 0;
      let modes = [];

      sortedValues.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFreq) {
          maxFreq = frequency[value];
          modes = [value];
        } else if (frequency[value] === maxFreq && !modes.includes(value)) {
          modes.push(value);
        }
      });

     
      const variance = humidityValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / humidityValues.length;
      const stdDev = Math.sqrt(variance);

      
      const skewness = humidityValues.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 3), 0) / humidityValues.length;
      const kurtosis = humidityValues.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 4), 0) / humidityValues.length - 3;

      
      const min = Math.min(...humidityValues);
      const max = Math.max(...humidityValues);
      const uniform = (max - min) < 5 ? "quase uniforme" : "Não uniforme";

     
      const n = humidityValues.length;
      const avgX = timestamps.reduce((acc, val) => acc + val, 0) / n;
      const avgY = mean;

      let num = 0;
      let den = 0;
      for (let i = 0; i < n; i++) {
        num += (timestamps[i] - avgX) * (humidityValues[i] - avgY);
        den += Math.pow(timestamps[i] - avgX, 2);
      }

      const slope = num / den;
      const intercept = avgY - slope * avgX;

      const nextTimestamp = Date.now() + 1000 * 60 * 60 * 24;
      const predictedHumidity = slope * nextTimestamp + intercept;

      const classify = (val) => {
        if (val < 30) return "baixo";
        if (val < 60) return "medio";
        if (val < 80) return "alta";
        return "critica";
      };

      const bins = { low: 0, medium: 0, high: 0, critical: 0 };
      humidityValues.forEach(v => bins[classify(v)]++);

      res.json({
        mean: Number(mean.toFixed(2)),
        median: Number(median.toFixed(2)),
        mode: modes.length === 1 ? modes[0] : modes,
        std_dev: Number(stdDev.toFixed(2)),
        skewness: Number(skewness.toFixed(2)),
        kurtosis: Number(kurtosis.toFixed(2)),
        uniform_distribution: uniform,
        binomial_distribution: bins,
        trend: {
          slope: Number(slope.toFixed(6)),
          intercept: Number(intercept.toFixed(2)),
          tomorrow_prediction: Number(predictedHumidity.toFixed(2)),
          predicted_classification: classify(predictedHumidity)
        },
        count: humidityValues.length,
        latest_data: rows.slice(-30).reverse()
      });

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

module.exports = SensorController;



