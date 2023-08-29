// @ts-nocheck
import React, { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
    const [city, setCity] = useState("malappuram");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [city]);

    const fetchData = async () => {
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
            <button onClick={fetchData}>Get Weather</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.location.name} {weatherData.location.region} {weatherData.location.country}</h2>
                    <p>Latitude: {weatherData.location.lat}</p>
                    <p>Longitude: {weatherData.location.lon}</p>
                    <p>Local Time: {weatherData.location.localtime} in {weatherData.location.tz_id} time zone</p>
                    <p>Temperature: {weatherData.current.temp_c} °C</p>
                    <p>Weather: {weatherData.current.condition.text}</p>
                    <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text}/>
                    <p>Feels like: {weatherData.current.feelslike_c} °C</p>
                    <p>Feels like: {weatherData.current.feelslike_f} °F</p>
                    <p>Gust: {weatherData.current.gust_kph} kph</p>
                    <p>Gust: {weatherData.current.gust_mph} mph</p>
                    <p>Humidity: {weatherData.current.humidity}</p>
                    <p>Precipitation: {weatherData.current.precip_in} in</p>
                    <p>Precipitation: {weatherData.current.precip_mm} mm</p>
                    <p>Pressure: {weatherData.current.pressure_in} in</p>
                    <p>Pressure: {weatherData.current.pressure_mb} mb</p>
                    <p>UV: {weatherData.current.uv}</p>
                    <p>Visual: {weatherData.current.vis_km} km</p>
                    <p>Visual: {weatherData.current.vis_miles} miles</p>
                    <p>Wind : {weatherData.current.wind_degree} degree</p>
                    <p>Wind Direction: {weatherData.current.wind_dir}</p>
                    <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
                    <p>Wind Speed: {weatherData.current.wind_mph} mph</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
