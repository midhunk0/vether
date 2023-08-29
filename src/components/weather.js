// @ts-nocheck
import React, { useState, useEffect } from "react";

const apiKey = process.env.REACT_APP_API_KEY;

const Weather = () => {
    const [city, setCity] = useState("Dallas");
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                const weatherData = await res.json();
                setData(weatherData);
            } catch (error) {
                console.error("Error fetching the data:", error);
            }
        };
        fetchData();
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div>
            <input type="text" value={city} onChange={handleCityChange} />
            <button onClick={() => setCity(city)}>Get Weather</button>
            {/* {data && (
                <div>
                    <h2>Weather in {data.name}</h2>
                    <p>Temperature: {data.main.temp} K</p>
                    <p>Weather: {data.weather[0].main}</p>
                </div>
            )} */}
        </div>
    );
}

export default Weather;




/*

get data from a particular location -- temperature(min,max and feels like), air quality index and other gases data, wind speed and direction, max wind gusts, humidity, dew points, pressure, cloud cover, visibility, sun rise and sun set, moon rise and moon set
live forecast, day forecast, weekly forecast, monthly forecast
monthly data -- graph and callendar
charts - -chance of precipitation, wind, humidity, uv, dew points, temperature
maps -- temperature, clouds, ...

*/