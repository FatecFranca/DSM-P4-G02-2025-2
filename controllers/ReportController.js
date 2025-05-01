const pool = require("../config/db");

// GET /api/report?start=2024-04-01&end=2024-04-30&minHumidity=30&maxHumidity=80
const getReport = async (req, res) => {
  try {
    const { start, end, minHumidity, maxHumidity } = req.query;

    let query = "SELECT humidity, timestamp FROM SensorData WHERE 1=1";
    const params = [];

    if (start) {
      query += " AND timestamp >= ?";
      params.push(start);
    }
    if (end) {
      query += " AND timestamp <= ?";
      params.push(end);
    }
    if (minHumidity) {
      query += " AND humidity >= ?";
      params.push(minHumidity);
    }
    if (maxHumidity) {
      query += " AND humidity <= ?";
      params.push(maxHumidity);
    }

    query += " ORDER BY timestamp ASC";

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar relatório:", error);
    res.status(500).json({ error: "Erro ao buscar relatório" });
  }
};

module.exports = {
  getReport,
};