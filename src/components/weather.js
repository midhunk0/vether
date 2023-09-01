/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
    const [city, setCity] = useState("malappuram");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (city) {
            fetchForecast();
        }
    },[city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchForecast = async () => {
        setLoading(true);
        setError(null)
        try{
            const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`);
            const weatherData = await res.json();
            if(res.ok){
                setData(weatherData);
                console.log(weatherData);
            }
        }
        catch(error){
            setError("An error occured while fetching the forecast data");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Weather App</h1>
            <input type="text" placeholder="Enter city name" value={city} onChange={handleCityChange} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            

            {data && (
                <div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <h2>Details of {data.location.name}, {data.location.region}, {data.location.country}</h2>
                        <div style={{display:"flex", gap:"10px"}}>
                            <div style={{display:"flex", flexDirection:"column", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                <h3>Coordinates</h3>
                                <p>Latitudes: {data.location.lat}</p>
                                <p>Logitudes: {data.location.lon}</p>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                <h3>Current Weather</h3>
                                <p>Condition: {data.current.condition.text}</p>
                                <img src={data.current.condition.icon} alt="weather-img" style={{width:"70px", height:"70px"}}/>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                    <p>Temperature: {data.current.temp_c}°C or {data.current.temp_f}°F</p>
                                    <p>Feels Like: {data.current.feelslike_c}°C or {data.current.feelslike_f}°F</p>
                                </div>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                    <p>Wind Speed: {data.current.wind_mph}mph or {data.current.wind_kph}kph</p>
                                    <p>Wind Direction: {data.current.wind_degree} {data.current.wind_dir}</p>
                                </div>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                <p>Humidity: {data.current.humidity}</p>
                                <p>Clouds: {data.current.cloud}</p>
                                <p>UV: {data.current.uv}</p>
                            </div>
                            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                    <p>Pressure: {data.current.pressure_mb}mb or {data.current.pressure_in}in</p>
                                    <p>Precipitation: {data.current.precip_mm}mm or {data.current.precip_in}in</p>
                                </div>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", border:"1px solid black", borderRadius:"16px", padding:"10px"}}>
                                    <p>Visual clarity: {data.current.vis_km}km or {data.current.vis_miles}miles</p>
                                    <p>Gust Speed: {data.current.gust_mph}mph or {data.current.gust_kph}kph</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>7 Day Forecast</h3>
                    {data && data.forecast && data.forecast.forecastday && (
                        <div style={{display:"flex", overflowX:"auto", gap:"10px"}}>
                            {data.forecast.forecastday.slice(0, 7).map((day, index) => (
                            <div key={index} style={{gap:"10px", alignItems:"center", border:"1px solid black", borderRadius:"16px", padding:"10px", minWidth:"300px"}}>
                                <p>{day.date}</p>
                                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <p>{day.day.condition.text}</p>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                </div>
                                <div>
                                    <p>Maximum Temperature: {day.day.maxtemp_c}°C or {day.day.maxtemp_f}°F</p>
                                    <p>Minimum Temperature: {day.day.mintemp_c}°C or {day.day.mintemp_f}°F</p>
                                    <p>Average Temperature: {day.day.avgtemp_c}°C or {day.day.avgtemp_f}°F</p>
                                    <p>Maximum Wind Speed: {day.day.maxwind_kph}kph or {day.day.maxwind_mph}mph</p>
                                    <p>Maximum Temperature: {day.day.maxtemp_c}°C or {day.day.maxtemp_f}°F</p>
                                    <p>Total Precipitation: {day.day.totalprecip_mm}mm or {day.day.totalprecip_in}in</p>
                                    <p>Total Snow: {day.day.totalsnow_cm}cm</p>
                                    <p>Average Visual Clarity: {day.day.avgvis_km}km or {day.day.avgvis_miles}miles</p>
                                    <p>Average Humidity: {day.day.avghumidity}</p>
                                    <p>Chance of rain: {day.day.daily_chance_of_rain}</p>
                                    <p>Chance of snow: {day.day.daily_chance_of_snow}</p>
                                    <p>UV: {day.day.uv}</p>
                                </div>
                                <div>
                                    <p>Sunrise and Sunset: {day.astro.sunrise} and {day.astro.sunset}</p>
                                    <p>Moonrise and Moonset: {day.astro.sunrise} and {day.astro.sunset}</p>
                                    <p>Moon Phase: {day.astro.moon_phase}</p>
                                    <p>Moon Illumination: {day.astro.moon_illumination}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}

                    <h3>Hourly Forecast</h3>
                    {data && data.forecast && data.forecast.forecastday && (
                        <div style={{display:"flex", overflowX:"auto", gap:"10px"}}>
                            {data.forecast.forecastday[0].hour.map((hour, index) => (
                                <div key={index} style={{gap:"10px", alignItems:"center", border:"1px solid black", borderRadius:"16px", padding:"10px", minWidth:"300px"}}>
                                    <p>Time: {hour.time.split(' ')[1]}</p>
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <p>{hour.condition.text}</p>
                                        <img src={hour.condition.icon} alt={hour.condition.text}/>
                                    </div>
                                    <div>
                                        <p>Temperature: {hour.temp_c}°C or {hour.temp_f}°F</p>
                                        <p>Feels Like: {hour.feelslike_c}°C or {hour.feelslike_f}°F</p>
                                        <p>Wind Chill: {hour.windchill_c}°C or {hour.windchill_f}°F</p>
                                        <p>Heat Index: {hour.heatindex_c}°C or {hour.heatindex_f}°F</p>
                                        <p>Dew Point: {hour.dewpoint_c}°C or {hour.dewpoint_f}°F</p>
                                        <p>Wind Speed: {hour.wind_kph}kph or {hour.wind_mph}mph</p>
                                        <p>Wind Degree: {hour.wind_degree}</p>
                                        <p>Wind Direction: {hour.wind_dir}</p>
                                        <p>Pressure: {hour.pressure_mb}mb or {hour.precip_in}in</p>
                                        <p>Precipitation: {hour.precip_mm}mm or {hour.precip_in}in</p>
                                        <p>Humidity: {hour.humidity}</p>
                                        <p>Clouds: {hour.cloud}</p>
                                        <p>Chance of rain: {hour.chance_of_rain}</p>
                                        <p>Chance of snow: {hour.chance_of_snow}</p>
                                        <p>Visual Clarity: {hour.vis_km}km or {hour.vis_miles}miles</p>
                                        <p>Gust Speed: {hour.gust_kph}kph or {hour.gust_mph}mph</p>
                                        <p>UV: {hour.uv}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeatherApp;


