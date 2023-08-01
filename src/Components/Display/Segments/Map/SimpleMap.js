import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const SimpleMap = ({ coord }) => {
  return (
    <ComposableMap
      className="row-start-1 col-start-3 bg-slate-800 rounded-xl"
      projection="geoMercator"
      projectionConfig={{
        center: [coord.lon, coord.lat],
        scale: 1100,
        fill: "red",
      }}
      style={{
        width: "100%",
        height: "270",
        default: { outline: "none" },
        hover: { outline: "none" },
        pressed: { outline: "none" },
      }}
    >
      <Geographies geography={geoUrl} fill={"#020617"}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      <Marker coordinates={[coord.lon, coord.lat]}>
        <circle r={15} fill="#FF5533" />
      </Marker>
    </ComposableMap>
  );
};

export default SimpleMap;
