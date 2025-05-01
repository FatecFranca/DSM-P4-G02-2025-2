const pool = require('../config/db');

const updateInterval = async (req, res) => {
    const { intervalo } = req.body; 

    if (!intervalo || isNaN(intervalo) || intervalo <= 0) {
        return res.status(400).json({ error: 'Intervalo inválido.' });
    }

    try {
        await pool.query('UPDATE config_sensor SET intervalo = ? WHERE id = 1', [intervalo]);
        res.json({ message: 'Intervalo atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar intervalo.' });
    }
};

const getInterval = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT intervalo FROM config_sensor WHERE id = 1');
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Configuração não encontrada.' });
        }
        res.json({ intervalo: rows[0].intervalo });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar intervalo.' });
    }
};

module.exports = {
    updateInterval,
    getInterval
};
