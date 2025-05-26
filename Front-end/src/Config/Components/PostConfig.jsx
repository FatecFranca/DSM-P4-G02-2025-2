import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import Lottie from 'lottie-react';
import loaderAnimation from '../../assets/loader.json';
import { toast } from 'react-toastify';
import axios from 'axios';

const PostConfig = () => {
  const [intervalo, setIntervalo] = useState('');
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Atualizando configuração...');
    try {
      const res = await axios.post('https://back-end-pi-27ls.onrender.com/api/sensor/intervalo', {
        intervalo: Number(intervalo)
      });
      toast.update(toastId, {
        render: res.data.message || 'Intervalo atualizado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      setIntervalo('');
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.error || 'Erro ao atualizar intervalo.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={isDarkMode ? "dark-bg-2 dark-text" : ""}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Atualizar Configuração do Sensor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Novo intervalo (minutos)"
            type="number"
            value={intervalo}
            onChange={(e) => setIntervalo(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1 }}
            disabled={loading}
            className={isDarkMode ? "input-dark" : "input-light"}
            InputLabelProps={{
              style: { color: isDarkMode ? 'var(--text-primary)' : 'var(--text-secondary)' }
            }}
            InputProps={{
              style: { color: isDarkMode ? 'var(--text-primary)' : 'var(--text-primary)' }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !intervalo}
            sx={{ mt: 2 }}
            className={isDarkMode ? "btn-dark" : "btn-light"}
          >
            Atualizar
          </Button>
        </form>
        {loading && (
          <Lottie
            animationData={loaderAnimation}
            className="w-32 h-32"
            loop
            autoplay
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PostConfig;