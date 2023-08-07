import React from "react";

const AirPollution = ({ pollution }) => {
  const AQIValue = (v) => {
    if (v === 1) return { quality: "Good", color: "text-green-500" };
    if (v === 2) return { quality: "Fair", color: "text-yellow-500" };
    if (v === 3) return { quality: "Moderate", color: "text-orange-500" };
    if (v === 4) return { quality: "Poor", color: "text-red-500" };
    return { quality: "Very Poor", color: "text-red-800" };
  };

  return (
    <div className="bg-slate-800 md:col-span-2 rounded-2xl text-start px-5 py-2 sm:py-0 flex flex-col select-none ">
      <div className="flex items-center justify-center sm:justify-between mt-2 ">
        <p className="text-slate-100 font-bold sm:block hidden ">
          Air Pollution
        </p>
        <p>
          Air Quality:{" "}
          <span className={`${AQIValue(pollution.list[0].main.aqi).color}`}>
            {AQIValue(pollution.list[0].main.aqi).quality}
          </span>
        </p>
      </div>

      <div className="w-full h-full items-center justify-center flex flex-wrap  gap-2 py-2">
        {Object.keys(pollution.list[0].components).map((v, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-40 py-2 bg-slate-900 rounded-lg"
          >
            <p className="font-bold">
              {Math.round(pollution.list[0].components[v])}
            </p>
            <p>{v.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AirPollution;
