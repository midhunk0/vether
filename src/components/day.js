import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Day({tempUnit, speedUnit, pressureUnit, precipitationUnit, distanceUnit}){
    const navigate = useNavigate();
    const location = useLocation();
    const day = location.state.selectedDay;
    // #E7F6F2-light  #2C3333-dark  #395B64-green
    return(
        <div className="day-forecast">
            <h1>Forecast</h1>
            <div className="topbar">
                <button className="less-button" onClick={()=>navigate("/")}>Show Less</button>
                <button className="less-button" onClick={()=>navigate("/")}>Show Less</button>
            </div>
            <div className="current-weather">
                <div className="current1">
                    <h2>Details on {day.date}</h2>
                    <div className="current11">
                        <div className="current111">
                            <p className="current-condition">{day.day.condition.text}</p>
                            {tempUnit === "°C" 
                                ? (
                                    <>
                                        <p className="current-temp">{day.day.avgtemp_c}°C</p>
                                        <p className="normal-text">{day.day.mintemp_c}°C / {day.day.maxtemp_c}°C</p>
                                    </>
                                ) 
                                : (
                                    <>
                                        <p className="current-temp">{day.day.avgtemp_f}°F</p>
                                        <p className="normal-text">{day.day.mintemp_f}°F / {day.day.maxtemp_f}°F</p>
                                    </>
                                )
                            }
                        </div>
                        <img src={day.day.condition.icon} alt={day.day.condition.text} style={{width:"100px", height:"100px"}}/>
                    </div>
                </div>
                <div className="current2">
                    <div className="current21">
                        <p className="normal-text">Average Humidity: {day.day.avghumidity}</p>
                        {speedUnit === "kph" 
                            ? <p className="normal-text">Maximum Wind Speed: {day.day.maxwind_kph}kph</p>
                            : <p className="normal-text">Maximum Wind Speed: {day.day.maxwind_mph}mph</p>
                        }
                        {distanceUnit === "km" 
                            ? <p className="normal-text">Average Visual Clarity: {day.day.avgvis_km}km</p>
                            : <p className="normal-text">Average Visual Clarity: {day.day.avgvis_miles}miles</p>
                        }
                        <p className="normal-text">UV: {day.day.uv}</p>
                    </div>
                    <div className="current22">
                        <p className="normal-text">Chance of rain: {day.day.daily_chance_of_rain}</p>
                        {precipitationUnit === "mm" 
                            ? <p className="normal-text">Total Precipitation: {day.day.totalprecip_mm}mm</p>
                            : <p className="normal-text">Total Precipitation: {day.day.totalprecip_in}in</p>
                        }
                        <p className="normal-text">Chance of snow: {day.day.daily_chance_of_snow}</p>
                        <p className="normal-text">Total Snow: {day.day.totalsnow_cm}cm</p>
                    </div>
                </div>
            </div>
            <div className="normal-div">
                <p className="normal-text">Sunrise and Sunset: {day.astro.sunrise} and {day.astro.sunset}</p>
                <p className="normal-text">Moonrise and Moonset: {day.astro.sunrise} and {day.astro.sunset}</p>
                <p className="normal-text">Moon Phase: {day.astro.moon_phase}</p>
                <p className="normal-text">Moon Illumination: {day.astro.moon_illumination}</p>
            </div>
        </div>
    )
}