import React, { useState, useEffect } from "react";
import Display from "./Components/Display/Display";
import SearchBox from "./Components/SearchBox/SearchBox";
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [data, setData] = useState();
  const [pollution, setPollution] = useState();
  const [city, setCity] = useState();
  // const [userLocation, setUserLocation] = useState();

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    // var crd = pos.coords;
    // setUserLocation({ lat: crd.latitude, lon: crd.longitude });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const fetchData = (lat, lon) => {
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
  };

  // User geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            //If prompt then the user will be asked to give permission
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // let storage = JSON.parse(localStorage.getItem("weather"))[0].city.coord;
    if (city) {
      fetchData(city.coord.lat, city.coord.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // SetStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem("weather", JSON.stringify([data, pollution]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // GetStorage
  useEffect(() => {
    const weather = JSON.parse(localStorage.getItem("weather"));
    if (weather) {
      setData(weather[0]);
      setPollution(weather[1]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 sm:px-10 px-5 ">
      <SearchBox setCity={setCity} city={city} />
      {data && <Display data={data} pollution={pollution} />}
    </div>
  );
}

export default App;
