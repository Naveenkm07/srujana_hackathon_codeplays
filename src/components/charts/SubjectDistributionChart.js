import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SubjectDistributionChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const data = {
    labels: ['Mathematics', 'Science', 'English', 'History'],
    datasets: [{
      data: [35, 25, 25, 15],
      backgroundColor: [
        '#1FB8CD',
        '#2DA6B2',
        '#218096',
        '#1A6873'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  return <Doughnut data={data} options={options} />;
};

export default SubjectDistributionChart;
