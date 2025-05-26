import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/loader.json';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

const ListConfig = () => {
  const [intervalo, setIntervalo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    
    axios.get('https://back-end-pi-27ls.onrender.com/api/sensor/intervalo')
      .then(res => {
        
        setIntervalo(res.data.intervalo);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card className={isDarkMode ? "dark-bg-2 dark-text" : ""}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Configuração do Sensor
        </Typography>
        {loading ? (
          <Lottie
            animationData={loaderAnimation}
            className="w-48 h-48"
            loop
            autoplay
          />
        ) : intervalo !== null ? (
          <Typography>
            A configuração do sensor atual é: fazer a verificação a cada <b>{intervalo}</b> minutos.
          </Typography>
        ) : (
          <Typography color="error">Não foi possível carregar a configuração.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ListConfig;