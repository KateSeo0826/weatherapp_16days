import React from '../../node_modules/react';
import "./hourly_weather.css";

const HourlyWeather = (props) => {
    let weathers = props.weathers.map(weather => {
        const days = {
            'Mon': 'Monday',
            'Tue': 'Tuesday',
            'Wed': 'Wednesday',
            'Thu': 'Thursday',
            'Fri': 'Friday',
            'Sat': 'Saturday',
            'Sun': 'Sunday'
        }
        const timeRewrote = {
            "06:00": "Morning",
            "12:00": "Afternoon",
            "18:00": "Evening",
            "21:00": "Night"
        }

        let date = weather.dt_txt.slice(0, 10).split("-");
        let day = new Date(date).toDateString().split(' ')[0];
        let time = weather.dt_txt.slice(11, -3);

        if (time === "06:00" || time === "12:00" || time === "18:00" || time === "21:00") {
            return (
                <div className ="weathers">
                <div className="row days-weather d-flex justify-content-center" key={weather.dt} >
                    <div className="col-3 col-md-2 col-lg-1   days-p">
                        <h5>{days[day]}</h5>
                        <p>{timeRewrote[time]}</p>
                    </div>
                    <div className="col-2 col-md-2 col-lg-2   w-icon">
                        <i className={`wi ${getWeatherIcon(weather.weather[0].id)} display-4`}></i>
                    </div>
                    <div className="col-2 col-md-2 col-lg-1  w-temp">
                        <h3>{tempRoundUp(weather.main.temp)}&deg;</h3>
                    </div>
                    <div className="col-5 col-md-3 col-lg-2   hum-wind">
                        <p>Humidity : {tempRoundUp(weather.main.humidity)}%</p>
                        <p>Wind : {tempRoundUp(weather.wind.speed)}m/s</p>
                    </div>
                    <div className="col-12 col-md-2 col-lg-1  ">
                        <h5>{weather.weather[0].description.toUpperCase()}</h5>
                    </div>

                </div>

                </div>

            )

        } else {
            return null
        }
    })


    return (
        <div className="container">
            {weathers}
        </div>
    )
}
const tempRoundUp = (temp) => {
    let num = Math.round(temp)
    return num;
}
const getWeatherIcon = (rangeId) => {

    let icon;
    switch (true) {
        case rangeId >= 200 && rangeId < 232:
            icon = "wi-thunderstorm";
            break;
        case rangeId >= 300 && rangeId <= 321:
            icon = "wi-sleet";
            break;
        case rangeId >= 500 && rangeId <= 521:
            icon = "wi-storm-showers";
            break;
        case rangeId >= 600 && rangeId <= 622:
            icon = "wi-snow";
            break;
        case rangeId >= 701 && rangeId <= 781:
            icon = "wi-fog";
            break;
        case rangeId === 800:
            icon = "wi-day-sunny";
            break;
        case rangeId >= 801 && rangeId <= 804:
            icon = "wi-day-fog";
            break;
        default:
            icon = "wi-sleet";
    }
    return icon
}


export default HourlyWeather;