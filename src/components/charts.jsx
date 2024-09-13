import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export function LineChart() {
  const [chartSeries, setChartSeries] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      chart: {
        id: "transactions-chart",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      colors: ["#008FFB", "#00E396"],
      stroke: {
        curve: "straight",
        width: 2,
      },
      xaxis: {
        categories: [
          "Aug 1",
          "Aug 3",
          "Aug 6",
          "Aug 9",
          "Aug 12",
          "Aug 15",
          "Aug 18",
          "Aug 21",
          "Aug 24",
          "Aug 27",
          "Aug 30",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
          formatter: function (val) {
            if (val === 0) {
              return "Php " + val.toFixed(2);
            }
            return val.toFixed(2);
          },
        },
      },
      grid: {
        borderColor: "#333",
        strokeDashArray: 5,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: 0,
        labels: {
          colors: "#ffffff",
        },
        itemMargin: {
          horizontal: 10,
        },
      },
      tooltip: {
        theme: "dark",
      },
    });

    setChartSeries([
      {
        name: "This Month",
        data: [
          1000, 3000, 4000, 6000, 7000, 9000, 8000, 12000, 14000, 15000, 20000,
        ],
      },
      {
        name: "Last Month",
        data: [
          2000, 4000, 3000, 8000, 9000, 5000, 10000, 11000, 13000, 16000, 19000,
        ],
      },
    ]);
  }, []);

  return (
    <div className="pt-12 pb-6">
      {chartSeries.length && (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="350"
        />
      )}
    </div>
  );
}
