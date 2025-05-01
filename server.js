/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const dotenv = require("dotenv");
const sensorRoutes = require("./routes/SensorRoutes");

dotenv.config();



const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);


app.get('/health', (req, res) => {
  res.json({ 
    status: 'online',
    db: 'MySQL',
    auth: 'JWT'
  });
});

app.use('/api/sensor', sensorRoutes);



const PORT = 5000;
app.listen(PORT, () => {
  console.log('- DB_HOST:', process.env.DB_HOST);
  console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '***' : 'Não definida');
});