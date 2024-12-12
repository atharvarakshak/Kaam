import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ data }) => {
  const { metric, graph_title, values, units } = data;

  // Transform data into chart.js format
  const chartData = {
    labels: values.map(([_, date]) => date), // Extract dates for x-axis
    datasets: [
      {
        label: `${metric} (${units})`,
        data: values.map(([value]) => value), // Extract values for y-axis
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBackgroundColor: "#1d4ed8",
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow graph to scale dynamically
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: graph_title,
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true, // Start the y-axis from zero
          callback: function (value) {
            return Number(value).toPrecision(3); // Limit to 3 significant digits
          },
        },
        title: {
          display: true,
          text: units,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  const graphContainerStyle = {
    width: "100%",
    height: "400px", // Increase the height of the graph
  };

  return (
    <div style={graphContainerStyle}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
