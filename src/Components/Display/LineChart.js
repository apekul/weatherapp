import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip
);

const LineChart = ({ weather, chartKey }) => {
  const roundedWeather = weather.list.map((v, i) => Math.round(v.main.temp));
  const humidity = weather.list.map((v, i) => v.main.humidity);
  const pressure = weather.list.map((v, i) => v.main.pressure);

  const dataSwitch = () => {
    if (chartKey === "humidity") return humidity;
    if (chartKey === "pressure") return pressure;
    return roundedWeather;
  };
  const data = {
    labels: weather.list.map((v, i) => v.dt_txt),
    datasets: [
      {
        data: dataSwitch(),
        backgroundColor: "white",
        borderColor: "white",
        pointBorderColor: "white",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            if (chartKey === "humidity") {
              return context.formattedValue + "%";
            }
            if (chartKey === "pressure") {
              return context.formattedValue + "hPa";
            }
            return context.formattedValue + "°C";
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "gray",
        },
        border: {
          color: "gray",
        },
      },
      y: {
        grid: {
          color: `gray`,
        },
        ticks: {
          color: "white",
        },
        border: {
          color: `gray`,
        },
        beginAtZero: true,
        min: Math.min(...dataSwitch()) - 1,
        max: Math.max(...dataSwitch()) + 2,
      },
    },
  };
  return (
    <>
      <div className="w-full flex flex-col items-start ">
        <div className="h-52 w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default LineChart;
