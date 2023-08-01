import React from "react";
import moment from "moment";
import { CiTempHigh } from "react-icons/ci";
import { IoIosWater } from "react-icons/io";
import { FaWind } from "react-icons/fa";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BiSolidMap, BiTachometer } from "react-icons/bi";

const CurrentWeather = ({ data }) => {
  const RiseSet = (value, timezone) => {
    return moment.utc(value, "X").add(timezone, "seconds").format("h:mm a");
  };

  return (
    <div className="text-xs rounded-2xl col-span-3 md:col-span-2 flex flex-col justify-center text-center ">
      <div className="h-full flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between lg:px-10 text-xl ">
        <div className="flex flex-col sm:flex-row justify-center items-center ">
          <img
            src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
            className="w-40 h-40 object-contain"
            alt="01n"
          />
          <div className="flex flex-wrap flex-col items-start sm:text-start">
            <p className="text-3xl sm:text-5xl w-full">
              {Math.round(data.list[0].main.temp)}°C
            </p>
            <span className="flex items-center flex-wrap gap-1 w-full justify-center sm:justify-start">
              <p>{data.city.name}</p>
              <BiSolidMap className="text-red-500" />
              <p className="text-base text-slate-500">
                {data.list[0].weather[0].description}
              </p>
            </span>
            <p>
              {moment().format("dddd")}, {moment().format("h:mm a")}
            </p>
          </div>
        </div>
        <div className="flex sm:flex-col flex-wrap items-start justify-center gap-3 text-base md:text-2xl">
          <div className="flex items-center gap-3">
            <CiTempHigh />
            <p>{Math.round(data.list[0].main.feels_like)}°C</p>
            <p className="hidden sm:block">Real Feel</p>
          </div>
          <div className="flex items-center gap-3">
            <IoIosWater />
            <p>{data.list[0].main.humidity}%</p>
            <p className="hidden sm:block">Humidity</p>
          </div>
          <div className="flex items-center gap-3">
            <FaWind />
            <p>{data.list[0].wind.speed} m/s</p>
            <p className="hidden sm:block">Wind</p>
          </div>
          <div className="flex items-center gap-3">
            <BiTachometer />
            <p>{data.list[0].main.pressure} hPa</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full items-center justify-around mt-3 text-base md:text-xl">
        <div className="flex items-center gap-1 ">
          <BsSunrise />
          <p>Rise: {RiseSet(data.city.sunrise, data.city.timezone)}</p>
        </div>
        <div className="flex items-center gap-1 ">
          <BsSunset />
          <p>Set: {RiseSet(data.city.sunset, data.city.timezone)}</p>
        </div>
        <div className="flex items-center gap-1 ">
          <AiOutlineArrowUp />
          <p>High: {Math.round(data.list[0].main.temp_max)}°C</p>
        </div>
        <div className="flex items-center gap-1 ">
          <AiOutlineArrowDown />
          <p>Low: {Math.round(data.list[0].main.temp_min)}°C</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
