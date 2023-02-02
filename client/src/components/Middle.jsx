import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useAppContext } from "../context/AppContext";

let data = {
  labels: "",
  datasets: [
    {
      label: "Number of Students ",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(67, 56, 202)",
      borderColor: "rgba(67, 56, 202)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(67, 56, 202)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(67, 56, 202)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: "",
    },
  ],
};

const Middle = () => {
  const { studentsStats } = useAppContext();

  useEffect(() => {
    data.labels = studentsStats.monthlyApplications?.map((item) => item.date);
    data.datasets[0].data = studentsStats.monthlyApplications?.map(
      (item) => item.count
    );
  }, [studentsStats]);

  return (
    <div className=" bg-white shadow-sm w-8/12 border rounded-xl border-gray-100">
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold  ">Monthly Submission </p>
      </div>
      <div>
        {data.labels && data.datasets[0].data ? (
          <Line data={data} />
        ) : (
          "LOADING..."
        )}
      </div>
    </div>
  );
};

export default Middle;
