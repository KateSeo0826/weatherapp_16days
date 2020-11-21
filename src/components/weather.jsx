import React from '../../node_modules/react';
import "./weather.css";
const weather = (props) => {
    return (
        <div className="container weather-container">
            <div className="cards">
                <h1 className="py-3">{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.iconWeather} display-1`}></i>
                </h5>
                {props.temp? <h1 className="py-2"> Current : {props.temperature}&deg;</h1> &&
                 <h5><span className="px-4 col-12 wind">Wind:{props.wind} m/s</span>
                 <span className="px-4 col-12 hum" > Humidity: {props.humidity}%</span></h5>: null}
                {minMax(props.temp_min, props.temp_max)}
                
                <h4 className="py-3">{props.description.toUpperCase()}</h4>
            </div>
        </div>
    )
}
const minMax = (min, max) => {
   if(min && max){
    return (
        <h3 className="min-max">
            <span className="px-4">Min : {min}&deg;</span>
            <span className="px-4">Max : {max}&deg;</span>
        </h3>
    )
   }
}

export default weather;