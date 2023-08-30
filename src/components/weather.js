// @ts-nocheck
import React, { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
    const [city, setCity] = useState("malappuram");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [temp, setTemp] = useState("celcius");
    const [speed, setSpeed] = useState("kph");
    const [precip, setPrecip] = useState("in");
    const [pressure, setPressure] = useState("in");
    const [distance, setDistance] = useState("km");

    useEffect(() => {
        if (city) {
            fetchCurrentData();
        }
    },[city]);

    const fetchCurrentData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            const data = await res.json();
            if (res.ok) {
                setWeatherData(data);
                console.log(data)
            } else {
                setError("City not found");
            }
        } catch (error) {
            setError("An error occurred while fetching the data");
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input type="text" placeholder="Enter city name" value={city} onChange={handleCityChange} />
            <button onClick={fetchCurrentData}>Get Weather</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.location.name} {weatherData.location.region} {weatherData.location.country}</h2>
                    <div style={{display:"flex" ,gap:"10px"}}>
                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <p>Temperature in: </p>
                            <select onChange={(e)=>setTemp(e.target.value)} style={{height:"20px"}}>
                                <option value="celcius">°C</option>
                                <option value="fahrenheit">°F</option>
                            </select> 
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <p>Speed in: </p>
                            <select onChange={(e)=>setSpeed(e.target.value)} style={{height:"20px"}}>
                                <option value="kph">kph</option>
                                <option value="mph">mph</option>
                            </select> 
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <p>Precipitation in: </p>
                            <select onChange={(e)=>setPrecip(e.target.value)} style={{height:"20px"}}>
                                <option value="in">in</option>
                                <option value="mm">mm</option>
                            </select> 
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <p>Pressure in: </p>
                            <select onChange={(e)=>setPressure(e.target.value)} style={{height:"20px"}}>
                                <option value="in">in</option>
                                <option value="mp">mb</option>
                            </select> 
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                            <p>Distance in: </p>
                            <select onChange={(e)=>setDistance(e.target.value)} style={{height:"20px"}}>
                                <option value="km">km</option>
                                <option value="miles">miles</option>
                            </select> 
                        </div>
                    </div>

                    <div style={{marginBottom:"-10px"}}>
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                            <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                                Temperature:
                                {temp==="celcius" 
                                    ? <p>{weatherData.current.temp_c} °C</p> 
                                    : <p>{weatherData.current.temp_f} °F</p>
                                }
                            </div>
                            <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                                Feels like:
                                {temp==="celcius" 
                                    ? <p>{weatherData.current.feelslike_c} °C</p> 
                                    : <p>{weatherData.current.feelslike_f} °F</p>
                                }
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                            <p>Weather: {weatherData.current.condition.text}</p>
                            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text}/>
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center", justifyContent:"center"}}>
                            Gust:
                            {speed==="kph" 
                                ? <p>{weatherData.current.gust_kph} kph</p> 
                                : <p>{weatherData.current.gust_mph} mph</p>
                            }
                        </div>
                        <p style={{display:"flex" ,justifyContent:"center"}}>Humidity: {weatherData.current.humidity}</p>
                        <div style={{display:"flex", gap:"10px", alignItems:"center", justifyContent:"center"}}>
                            Precipitation:
                            {precip==="in" 
                                ? <p>{weatherData.current.precip_in} in</p> 
                                : <p>{weatherData.current.precip_mm} mm</p>
                            }
                        </div>
                        <div style={{display:"flex", gap:"10px", alignItems:"center", justifyContent:"center"}}>
                            Pressure:
                            {pressure==="in" 
                                ? <p>{weatherData.current.pressure_in} in</p> 
                                : <p>{weatherData.current.pressure_mb} mb</p>
                            }
                        </div>
                        <p style={{display:"flex" ,justifyContent:"center"}}>UV: {weatherData.current.uv}</p>
                        <div style={{display:"flex", gap:"10px", alignItems:"center", justifyContent:"center"}}>
                            Visual:
                            {distance==="km" 
                                ? <p>{weatherData.current.vis_km} km</p> 
                                : <p>{weatherData.current.vis_miles} miles</p>
                            }
                        </div>
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                            <p>Wind : {weatherData.current.wind_degree} degree</p>
                            <p>Wind Direction: {weatherData.current.wind_dir}</p>
                            <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                                Wind Speed:
                                {speed==="kph" 
                                    ? <p>{weatherData.current.wind_kph} kph</p> 
                                    : <p>{weatherData.current.wind_mph} mph</p>
                                }
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-around"}}>
                            <p>Latitude: {weatherData.location.lat}</p>
                            <p>Longitude: {weatherData.location.lon}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;


