import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

export default function DashboardUmidade() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("https://back-end-pi-27ls.onrender.com/api/sensor/stats")
      .then((response) => {
        const data = response.data;

        const distribuicaoRaw = data.latest_data.map((item) => ({
          date: new Date(item.timestamp),
          valor: item.humidity
        }));

        // Agrupando por mês
        const mensal = {};
        distribuicaoRaw.forEach((d) => {
          const mes = d.date.toLocaleString('pt-BR', { month: 'short' });
          if (!mensal[mes]) mensal[mes] = { total: 0, count: 0 };
          mensal[mes].total += d.valor;
          mensal[mes].count += 1;
        });

        const mesesOrdenados = Object.keys(mensal).slice(-6);
        const mediaMensal = {};
        mesesOrdenados.forEach((mes) => {
          mediaMensal[mes] = mensal[mes].total / mensal[mes].count;
        });

        // Classificação por categoria
        const distribuicao = {
          critico: 0,
          baixo: 0,
          medio: 0,
          bom: 0,
          sobrecarregado: 0
        };

        const historico = data.latest_data
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Ordenar cronologicamente
          .map((item) => ({
            label: new Date(item.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            valor: item.humidity
          }));

        data.latest_data.forEach((item) => {
          const h = item.humidity;
          if (h < 30) distribuicao.critico++;
          else if (h < 50) distribuicao.baixo++;
          else if (h < 70) distribuicao.medio++;
          else if (h <= 100) distribuicao.bom++;
          else distribuicao.sobrecarregado++;
        });

        const total = data.latest_data.length;
        const distribuicaoPercentual = {
          critico: (distribuicao.critico / total) * 100,
          baixo: (distribuicao.baixo / total) * 100,
          medio: (distribuicao.medio / total) * 100,
          bom: (distribuicao.bom / total) * 100,
          sobrecarregado: (distribuicao.sobrecarregado / total) * 100
        };

        setStats({
          media: data.mean,
          mediana: data.median,
          moda: data.mode,
          desvioPadrao: data.std_dev,
          assimetria: data.skewness,
          curtose: data.kurtosis,
          previsaoAmanha: data.trend?.tomorrow_prediction || 0,
          statusAmanha: data.trend?.predicted_classification || '',
          statusAtual: data.latest_data?.[0]?.humidity || 0,
          distribuicao: distribuicaoPercentual,
          mediaMensal,
          historico,
          mesesOrdenados
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do dashboard:", error);
      });
  }, []);

  function getStatusInfo(humidity) {
    if (humidity < 30) return { status: "Crítico", color: "#e74c3c" };
    else if (humidity < 50) return { status: "Baixo", color: "#f39c12" };
    else if (humidity < 70) return { status: "Médio", color: "#f1c40f" };
    else if (humidity <= 100) return { status: "Bom", color: "#2ecc71" };
    else return { status: "Sobrecarregado", color: "#9b59b6" };
  }

  const pieData = [
    {
      name: `% Crítico`,
      population: parseFloat((stats?.distribuicao?.critico || 0).toFixed(1)),
      color: '#e74c3c',
      legendFontColor: '#333',
      legendFontSize: 12
    },
    {
      name: `% Baixo`,
      population: parseFloat((stats?.distribuicao?.baixo || 0).toFixed(1)),
      color: '#f39c12',
      legendFontColor: '#333',
      legendFontSize: 12
    },
    {
      name: `% Médio`,
      population: parseFloat((stats?.distribuicao?.medio || 0).toFixed(1)),
      color: '#f1c40f',
      legendFontColor: '#333',
      legendFontSize: 12
    },
    {
      name: `% Bom`,
      population: parseFloat((stats?.distribuicao?.bom || 0).toFixed(1)),
      color: '#2ecc71',
      legendFontColor: '#333',
      legendFontSize: 12
    },
    {
      name: `% Sobrecarregado`,
      population: parseFloat((stats?.distribuicao?.sobrecarregado || 0).toFixed(1)),
      color: '#9b59b6',
      legendFontColor: '#333',
      legendFontSize: 12
    }
  ];

  const barData = {
    labels: stats?.mesesOrdenados || [],
    datasets: [
      {
        data: stats?.mesesOrdenados?.map(mes => parseFloat(stats.mediaMensal[mes].toFixed(2))) || [],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
      }
    ]
  };

  const lastFiveHistorico = stats?.historico?.slice(-5) || [];

  const lineData = {
  labels: lastFiveHistorico.map(item => item.label),
  datasets: [
    {
      data: lastFiveHistorico.map(item => item.valor),
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      strokeWidth: 2
    }
  ],
  legend: ['Umidade (%)']
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard de Monitoramento</Text>

      {stats && (
        <View style={[styles.cardDynamic, { backgroundColor: getStatusInfo(stats.statusAtual).color }]}>
          <Text style={styles.cardTitle}>Status Atual de Umidade</Text>
          <Text style={styles.percent}>{stats.statusAtual.toFixed(2)}%</Text>
          <Text style={styles.goodText}>{getStatusInfo(stats.statusAtual).status}</Text>
        </View>
      )}

      <View style={styles.statsHorizontal}>
        <Text style={styles.statsText}>Média: {stats?.media?.toFixed(2) || '---'}%</Text>
        <Text style={styles.statsText}>Mediana: {stats?.mediana?.toFixed(2) || '---'}%</Text>
        <Text style={styles.statsText}>Moda: {stats?.moda?.toFixed(2) || '---'}%</Text>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.goodText}>Assimetria: {stats?.assimetria || 0}</Text>
        <Text style={styles.goodText}>Curtose: {stats?.curtose || 0}</Text>
      </View>
      <View style={styles.statsBox}>
        <Text style={styles.goodText}>Desvio Padrão: {stats?.desvioPadrao || 0}</Text>
        <Text style={styles.goodText}>Previsão Amanhã: {stats?.previsaoAmanha || 0}</Text>
      </View>

      <Text style={styles.chartTitle}>Distribuição de Status do Solo</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />

      <Text style={styles.chartTitle}>Média Mensal de Umidade</Text>
      <BarChart
        data={barData}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />

      <Text style={styles.chartTitle}>Histórico de Umidade</Text>
      {stats && (
        <LineChart
          data={lineData}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero
          renderDotContent={({ x, y, index }) => (
            <Text
              key={index}
              style={{
                position: 'absolute',
                top: y - 20,
                left: x - 10,
                fontSize: 12,
                color: '#000',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              }}
            >
              {lineData.datasets[0].data[index].toFixed(1)}
            </Text>
          )}
        />
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  fillShadowGradient: '#007bff',
  fillShadowGradientOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForLabels: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  propsForBackgroundLines: {
    stroke: '#e3e3e3'
  },
  decimalPlaces: 0
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#f5f6fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16
  },
  percent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  goodText: {
    color: '#fff'
  },
  statsHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  statsText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  statsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#052338',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-around',
    marginBottom: 20
  },
  chartTitle: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardDynamic: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20
  }
});
