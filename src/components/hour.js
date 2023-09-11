import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Hour({tempUnit, speedUnit, pressureUnit, precipitationUnit, distanceUnit}){
    const navigate = useNavigate();
    const location = useLocation();
    const hour = location.state.selectedHour;
    return(
        <div className="hour-forecast">
            <h1>Forecast</h1>
            <div className="topbar">
                <button className="less-button" onClick={()=>navigate("/")}>Show Less</button>
                <button className="less-button" onClick={()=>navigate("/")}>Show Less</button>
            </div>
            <div className="current-weather">
                <div className="current1">
                    <h2>Details on {hour.time.split(' '[1])}</h2>
                    <div className="current11">
                        <div className="current111">
                            <p className="current-condition">{hour.condition.text}</p>
                            {tempUnit === "°C" 
                                ? (
                                    <>
                                        <p className="current-temp">Temperature: {hour.temp_c}°C</p>
                                        <p className="normal-text">Feels Like: {hour.feelslike_c}°C</p>
                                    </>
                                ) 
                                : (
                                    <>
                                        <p className="current-temp">Temperature: {hour.temp_f}°F</p>
                                        <p className="normal-text">Feels Like: {hour.feelslike_f}°F</p>
                                    </>
                                )
                            }
                        </div>
                        <img src={hour.condition.icon} alt={hour.condition.text}/>
                    </div>
                </div>
                <div className="current2">
                    <div className="current21">
                        {tempUnit === "°C"
                            ? (
                                <>
                                    <p className="normal-text">Wind Chill: {hour.windchill_c}°C</p>
                                    <p className="normal-text">Heat Index: {hour.heatindex_c}°C</p>
                                    <p className="normal-text">Dew Point: {hour.dewpoint_c}°C</p>
                                </>
                            )
                            : (
                                <>
                                    <p className="normal-text">Wind Chill: {hour.windchill_f}°F</p>
                                    <p className="normal-text">Heat Index: {hour.heatindex_f}°F</p>
                                    <p className="normal-text">Dew Point: {hour.dewpoint_f}°F</p>
                                </>
                            )
                        }
                        <p className="normal-text">Humidity: {hour.humidity}</p>
                    </div>
                    <div className="current22">
                        {pressureUnit === "mb" 
                            ? <p className="normal-text">Pressure: {hour.pressure_mb}mb</p>
                            : <p className="normal-text">Pressure: {hour.pressure_in}in</p>
                        }
                        {precipitationUnit === "mm" 
                            ? <p className="normal-text">Precipitation: {hour.precip_mm}mm</p>
                            : <p className="normal-text">Precipitation: {hour.precip_in}in</p>
                        }
                        <p className="normal-text">Chance of rain: {hour.chance_of_rain}</p>
                        <p className="normal-text">Chance of snow: {hour.chance_of_snow}</p>
                    </div>
                </div>
            </div>
            <div className="full-div">
                <div className="half-div">
                    {speedUnit === "kph" 
                        ? <p className="normal-text">Wind Speed: {hour.wind_kph}kph</p>
                        : <p className="normal-text">Wind Speed: {hour.wind_mph}mph</p>
                    }
                    <p className="normal-text">Wind Degree: {hour.wind_degree}</p>
                    <p className="normal-text">Wind Direction: {hour.wind_dir}</p>

                </div>
                <div className="half-div">
                    {distanceUnit === "km" 
                        ? <p className="normal-text">Visual Clarity: {hour.vis_km}km</p>
                        : <p className="normal-text">Visual Clarity: {hour.vis_miles}miles</p>
                    }
                    {speedUnit === "kph" 
                        ? <p className="normal-text">Gust Speed: {hour.gust_kph}kph</p>
                        : <p className="normal-text">Gust Speed: {hour.gust_mph}mph</p>
                    }
                    <p className="normal-text">Clouds: {hour.cloud}</p>
                    <p className="normal-text">UV: {hour.uv}</p>
                </div>
            </div>
        </div>
    )
}