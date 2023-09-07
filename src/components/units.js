// units.js
import React from "react";

const Units = ({
  tempUnit,
  setTempUnit,
  speedUnit,
  setSpeedUnit,
  pressureUnit,
  setPressureUnit,
  precipitationUnit,
  setPrecipitationUnit,
  distanceUnit,
  setDistanceUnit,
}) => {
  const setUnit = (unitOptions, selectedUnit, setUnitCallback) => (
    unitOptions.map(unit => (
      <button
        key={unit}
        onClick={() => setUnitCallback(unit)}
        className="unit-button"
        style={{
          background: selectedUnit === unit ? "red" : "white",
          color: selectedUnit === unit ? "white" : "black",
        }}
      >
        {unit}
      </button>
    ))
  );

  return (
    <div className="offcanvas-menu">
      <div className="offcanvas-content">
        <ul>
          Temperature<li>{setUnit(['°C', '°F'], tempUnit, setTempUnit)}</li>
          Speed<li>{setUnit(['kph', 'mph'], speedUnit, setSpeedUnit)}</li>
          Pressure<li>{setUnit(['mb', 'in'], pressureUnit, setPressureUnit)}</li>
          Precipitation<li>{setUnit(['mm', 'in'], precipitationUnit, setPrecipitationUnit)}</li>
          Distance<li>{setUnit(['km', 'miles'], distanceUnit, setDistanceUnit)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Units;
