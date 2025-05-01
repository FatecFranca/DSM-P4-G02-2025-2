const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');
const ReportController = require("../controllers/ReportController");
const configSensorController = require('../controllers/ConfigSensorController');

router.post('/data', SensorController.collectData);
router.get('/stats', SensorController.getStats);
router.get("/report", ReportController.getReport);

router.get('/intervalo', configSensorController.getInterval);
router.post('/intervalo', configSensorController.updateInterval);

module.exports = router;