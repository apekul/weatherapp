import React, { useState } from "react";
import moment from "moment";

import { CiTempHigh } from "react-icons/ci";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IoIosWater } from "react-icons/io";
import { FaWind } from "react-icons/fa";
import { BiTachometer } from "react-icons/bi";

const DayForecast = ({ data }) => {
  const [show, setShow] = useState();

  const updateShow = (i) => {
    if (show === i) return setShow();
    return setShow(i);
  };

  const sortDay = () => {
    let result = [];
    for (let e of data.list) {
      let check = result.some(
        (x) =>
          new Date(x.dt_txt).toLocaleDateString() ===
          new Date(e.dt_txt).toLocaleDateString()
      );
      if (!check && new Date(e.dt_txt).toLocaleTimeString() === "3:00:00 PM") {
        result.push(e);
      }
    }
    return result.slice(1);
  };
  return (
    <div className="bg-slate-800 rounded-2xl flex row-start-2 col-start-3 row-end-4 px-5 flex-col select-none">
      <p className="text-slate-100 font-bold my-2">4 DAY FORECAST</p>
      <div className="flex flex-col justify-around h-full pb-2 gap-2 sm:gap-2">
        {sortDay().map((v, i) => (
          <div key={i} id={i} className="bg-slate-900 rounded-2xl py-2 px-2">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`}
                  className="w-20 h-20 object-contain"
                  alt={v.weather[0].icon}
                />
                <div>
                  <p>{moment(v.dt_txt).format("dddd")}</p>
                  <div className="text-xs">
                    {moment(v.dt_txt).format("MMMM Do")}
                    {/* <p>{v.weather[0].main}</p> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-xl relative">
                <CiTempHigh />
                <p>{Math.round(v.main.temp_max)}°C</p>
                {show === i ? (
                  <AiFillCaretUp
                    className="cursor-pointer"
                    onClick={() => updateShow(i)}
                  />
                ) : (
                  <AiFillCaretDown
                    className="cursor-pointer"
                    onClick={() => updateShow(i)}
                  />
                )}
              </div>

              {show === i && (
                <div className="flex gap-2 items-center justify-around w-full">
                  <div className="flex items-center justify-center gap-1">
                    <IoIosWater className="text-xl" />
                    <p>{Math.round(v.main.humidity)}%</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <FaWind className="text-xl" />
                    <p>{Math.round(v.wind.speed)}m/s</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <BiTachometer className="text-xl" />
                    <p>{Math.round(v.main.pressure)}hPa</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayForecast;
