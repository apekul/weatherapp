import React, { useState } from "react";
import LineChart from "../LineChart";

const Overview = ({ data }) => {
  const [chartKey, setChartKey] = useState("weather");

  return (
    <div className="bg-slate-800 flex justify-start md:col-span-2 rounded-2xl text-start flex-col px-5 p-5 lg:p-2 lg:px-5 h-full">
      <div className=" items-center justify-center sm:justify-between flex">
        <p className="text-slate-100 font-bold hidden sm:block">OVERVIEW</p>
        <div className="flex bg-slate-900 py-1 px-2 text-sm rounded-full relative select-none">
          {/* <div
            className={`bg-white absolute top-1 w-1/3 h-5 rounded-full transition-all
              ${chartKey === "weather" && "left-1"}
              ${chartKey === "humidity" && "left-1/3"}
              ${chartKey === "pressure" && "left-[150px]"}`}
          ></div> */}
          <p
            className={`z-10 cursor-pointer px-2 transition-all bg-slate-900 ease-in-out ${
              chartKey === "weather" && "text-black bg-white rounded-full"
            }`}
            onClick={(e) => setChartKey(e.currentTarget.id)}
            id="weather"
          >
            Weather
          </p>
          <p
            className={`z-10 cursor-pointer px-2 transition-all bg-slate-900 ease-in-out ${
              chartKey === "humidity" && "text-black bg-white rounded-full"
            }`}
            onClick={(e) => setChartKey(e.currentTarget.id)}
            id="humidity"
          >
            Humidity
          </p>
          <p
            className={`z-10 cursor-pointer px-2 transition-all bg-slate-900 ease-in-out ${
              chartKey === "pressure" && "text-black bg-white rounded-full"
            }`}
            onClick={(e) => setChartKey(e.currentTarget.id)}
            id="pressure"
          >
            Pressure
          </p>
        </div>
      </div>
      <LineChart weather={data} chartKey={chartKey} />
    </div>
  );
};

export default Overview;
