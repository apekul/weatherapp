import React, { useState, useEffect } from "react";
import Display from "./Components/Display/Display";
import SearchBox from "./Components/SearchBox/SearchBox";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [data, setData] = useState();
  const [pollution, setPollution] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((error) => console.log(error));
      fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setPollution(res))
        .catch((error) => console.log(error));
    }
  }, [city]);
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 sm:px-10 px-5 ">
      <SearchBox setCity={setCity} city={city} />
      {data && <Display data={data} pollution={pollution} />}
    </div>
  );
}

export default App;
