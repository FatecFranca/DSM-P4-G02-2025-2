const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');
const ReportController = require("../controllers/ReportController");
const configSensorController = require('../controllers/ConfigSensorController');

/**
 * @swagger
 * /api/sensor/data:
 *   post:
 *     summary: Salva um novo dado de umidade do sensor
 *     description: Recebe o valor de umidade e armazena no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               humidity:
 *                 type: number
 *                 example: 55.2
 *             required:
 *               - humidity
 *     responses:
 *       201:
 *         description: Dado salvo com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/data', SensorController.collectData);

/**
 * @swagger
 * /api/sensor/stats:
 *   get:
 *     summary: Retorna estatísticas dos dados de umidade
 *     description: Retorna média, mediana, moda, quantidade e os 10 dados mais recentes de umidade.
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *       404:
 *         description: Nenhum dado encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/stats', SensorController.getStats);

/**
 * @swagger
 * /api/sensor/report:
 *   get:
 *     summary: Retorna relatório filtrado dos dados de umidade
 *     description: Permite filtrar por data e faixa de umidade.
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final (YYYY-MM-DD)
 *       - in: query
 *         name: minHumidity
 *         schema:
 *           type: number
 *         description: Umidade mínima
 *       - in: query
 *         name: maxHumidity
 *         schema:
 *           type: number
 *         description: Umidade máxima
 *     responses:
 *       200:
 *         description: Relatório retornado com sucesso
 *       500:
 *         description: Erro ao buscar relatório
 */
router.get("/report", ReportController.getReport);

/**
 * @swagger
 * /api/sensor/intervalo:
 *   get:
 *     summary: Consulta o intervalo de coleta do sensor
 *     description: Retorna o valor atual do intervalo de coleta configurado.
 *     responses:
 *       200:
 *         description: Intervalo retornado com sucesso
 *       404:
 *         description: Configuração não encontrada
 *       500:
 *         description: Erro ao buscar intervalo
 */
router.get('/intervalo', configSensorController.getInterval);

/**
 * @swagger
 * /api/sensor/intervalo:
 *   post:
 *     summary: Atualiza o intervalo de coleta do sensor
 *     description: Atualiza o valor do intervalo de coleta no banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               intervalo:
 *                 type: integer
 *                 example: 60
 *             required:
 *               - intervalo
 *     responses:
 *       200:
 *         description: Intervalo atualizado com sucesso
 *       400:
 *         description: Intervalo inválido
 *       500:
 *         description: Erro ao atualizar intervalo
 */
router.post('/intervalo', configSensorController.updateInterval);

module.exports = router;