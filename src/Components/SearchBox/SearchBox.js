import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BiSolidMap } from "react-icons/bi";
import cityList from "../../city.list.json";

const SearchBox = ({ setCity, city }) => {
  const [cities, setCities] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const updateInput = (e) => {
    const { value } = e.target;
    if (value.length > 1) {
      fetchCities(value);
    } else setCities([]);
  };

  const fetchCities = (value) => {
    let arr = [];
    for (let city of cityList) {
      if (arr.length >= 5) break;
      if (city.name.toLowerCase().startsWith(value.toLowerCase())) {
        arr.push(city);
      }
    }
    return setCities(arr);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="flex items-center justify-between pt-2 sm:pt-5 max-w-7xl m-auto sm:mb-5">
      <div className="hidden sm:flex items-center justify-center gap-1">
        <TiWeatherPartlySunny className="text-xl" />
        <p>Weather</p>
      </div>
      <div className="flex items-center justify-center sm:justify-end gap-5 w-full">
        <div className="w-full sm:w-72 relative" ref={searchRef}>
          <input
            className="rounded-xl pl-10 px-5 h-10 w-full bg-slate-800 text-slate-100 "
            placeholder="Search place..."
            // value={city.name || ""}
            onChange={(e) => updateInput(e)}
            onFocus={() => setShowSearch(true)}
          />
          <FiSearch className="absolute top-2 left-2 text-2xl" />
          {cities.length > 0 && showSearch && (
            <div className="bg-slate-200 w-full h-auto flex flex-col absolute top-12 shadow text-black">
              {cities.map((v, i) => (
                <div
                  key={i}
                  className="hover:bg-slate-500 px-2 py-1 cursor-pointer flex items-center gap-1 hover:text-slate-100"
                  onClick={() => {
                    setCity(v);
                    return setShowSearch(false);
                  }}
                >
                  <BiSolidMap className="text-red-500" />
                  {v.name},{v.country}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
