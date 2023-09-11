import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Weather } from "./components/weather";
import Day from "./components/day";
import Hour from "./components/hour";

function App({tempUnit, speedUnit, pressureUnit, precipitationUnit, distanceUnit}) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Weather/>}/>
                <Route path="/day" element={
                    <Day 
                        tempUnit={tempUnit}
                        speedUnit={speedUnit}
                        pressureUnit={pressureUnit}
                        precipitationUnit={precipitationUnit}
                        distanceUnit={distanceUnit}
                    />
                }/>
                <Route path="/hour" element={
                    <Hour
                        tempUnit={tempUnit}
                        speedUnit={speedUnit}
                        pressureUnit={pressureUnit}
                        precipitationUnit={precipitationUnit}
                        distanceUnit={distanceUnit}
                    />}
                />
            </Routes>
        </div>
    );
}

export default App;
