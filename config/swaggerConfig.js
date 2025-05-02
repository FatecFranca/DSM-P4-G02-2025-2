// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Backend PI',
    version: '1.0.0',
    description: 'Documentação dos endpoints da API do seu projeto PI',
  },
  servers: [
    {
      url: 'http://localhost:5000', 
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
