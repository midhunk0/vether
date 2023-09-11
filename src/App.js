import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Weather from "./components/weather";
import Day from "./components/day";
import Hour from "./components/hour";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Weather/>}/>
                <Route path="/day" element={<Day/>}/>
                <Route path="/hour" element={<Hour/>}/>
            </Routes>
        </div>
    );
}

export default App;