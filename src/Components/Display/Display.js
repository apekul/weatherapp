import React from "react";
import HForecast from "./Segments/HForecast";
import CurrentWeather from "./Segments/CurrentWeather";
import Overview from "./Segments/Overview";
import DayForecast from "./Segments/DayForecast";
import OpenLayersMap from "./Segments/Map/SimpleMap";
import AirPollution from "./Segments/AirPollution";

const Display = ({ data, pollution }) => {
  return (
    <div className="flex flex-col lg:grid grid-cols-3 grid-rows-4 gap-3 max-w-7xl m-auto pb-5">
      {/* Current Weather */}
      <CurrentWeather data={data} />

      {/* 3H forecast */}
      <HForecast data={data} />

      {/* Overview */}
      <Overview data={data} />

      {/* Map */}
      <OpenLayersMap coord={data.city.coord} />

      {/* 4 dayforecast */}
      <DayForecast data={data} />

      {/* AirPollution */}
      <AirPollution pollution={pollution} />
    </div>
  );
};

export default Display;
