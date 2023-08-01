import React from "react";
import moment from "moment";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ScrollContainer from "react-indiana-drag-scroll";

const HForecast = ({ data }) => {
  // const slideLeft = () => {
  //   let slider = document.getElementById("slider");
  //   slider.scrollLeft = slider.scrollLeft - 500;
  // };

  // const slideRight = () => {
  //   let slider = document.getElementById("slider");
  //   slider.scrollLeft = slider.scrollLeft + 500;
  // };

  return (
    <div className="bg-slate-800 md:col-span-2 rounded-2xl text-start sm:px-5 flex flex-col select-none">
      <p className="text-slate-100 font-bold mt-2 lg:block hidden">
        3 HOUR FORECAST
      </p>
      <div className="flex items-center justify-center gap-2 h-full">
        <FaAngleLeft
          size="50"
          className="cursor-pointer hidden sm:block"
          // onClick={() => slideLeft()}
        />
        <ScrollContainer
          id="slider"
          className="flex cursor-grab h-full text-slate-200 font-bold rounded-2xl overflow-x-scroll scroll scrollbar-hide whitespace-nowrap scroll-smooth items-center sm:justify-start "
        >
          {data.list.slice(1).map((v, i) => (
            <div
              key={i}
              className="h-full text-center flex items-center justify-center "
            >
              {/* Day Break Line */}
              {new Date(v.dt_txt).toLocaleTimeString() === "12:00:00 AM" && (
                <div className="h-60 lg:h-56 w-1 bg-slate-900">
                  <div className="ml-6 mt-2 lg:mt-0">
                    {moment(v.dt_txt).format("dddd").toUpperCase()}
                  </div>
                </div>
              )}
              {/* Dawn */}
              {}
              <div className="flex flex-col items-center justify-center h-full w-full px-5 text-slate-200">
                <p>{moment(v.dt_txt).format("h:mm a")}</p>
                <p className="text-xs text-slate-400">
                  {moment(v.dt_txt).format("MMMM Do")}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`}
                  className="object-contain h-20 "
                  alt={v.weather.icon}
                />
                <p>{Math.round(v.main.temp)}°C</p>
                <p className="text-xs">{v.weather[0].main}</p>
              </div>
            </div>
          ))}
        </ScrollContainer>
        <FaAngleRight
          size="50"
          className="cursor-pointer hidden sm:block"
          // onClick={() => slideRight()}
        />
      </div>
    </div>
  );
};

export default HForecast;
