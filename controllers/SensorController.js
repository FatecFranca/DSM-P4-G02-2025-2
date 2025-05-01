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
        } else if (frequency[value] === maxFreq) {
          modes.push(value);
        }
      });

      res.json({
        mean: Number(mean.toFixed(2)),
        median: Number(median.toFixed(2)),
        mode: modes.length === 1 ? modes[0] : modes,
        count: humidityValues.length,
        latest_data: rows.slice(-10).reverse() 
      });

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

module.exports = SensorController;