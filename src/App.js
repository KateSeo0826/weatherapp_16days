import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/form';
import Weather from './components/weather';
import HourlyWeather from './components/hourly_weather';
import 'weather-icons/css/weather-icons.css';


const API_KEY = "6bf112b92bec3bd1e22c9fbeb00aa886";

export default class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    icon: undefined,
    main: undefined,
    temperature: undefined,
    temp_max: undefined,
    temp_min: undefined,
    humidity: undefined,
    wind: undefined,
    description: "",
    error: false,
    weathers: []
  }

  tempRoundUp(temp) {
    let num = Math.round(temp);
    return num;
  }

  iconWeather = {
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog'
  };

  getWeatherIcon(icons, idRange) {
    switch (true) {
      case idRange >= 200 && idRange < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case idRange >= 300 && idRange <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case idRange >= 500 && idRange <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case idRange >= 600 && idRange <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case idRange >= 701 && idRange <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case idRange === 800:
        this.setState({ icon: icons.Clear });
        break;
      case idRange >= 801 && idRange <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const weather_apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      const res = await weather_apiCall.json();
      this.setState({
        weathers: res.list
      })

      const weather_day_apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await weather_day_apiCall.json();
      this.setState({
        city: `${res.city.name}, ${res.city.country}`,
        temperature: this.tempRoundUp(data.main.temp),
        temp_max: this.tempRoundUp(data.main.temp_max),
        temp_min: this.tempRoundUp(data.main.temp_min),
        humidity: this.tempRoundUp(data.main.humidity),
        wind: this.tempRoundUp(data.wind.speed),
        description: data.weather[0].description,
        error: false,
        weathers: res.list
      })
      this.getWeatherIcon(this.iconWeather, data.weather[0].id);
    }
    else {
      this.setState({ error: true });
    }
  }
  render() {
    return (
      <Fragment>
        <Form
          loadWeather={this.getWeather}
          error={this.state.error}
        />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temp}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          iconWeather={this.state.icon}
          humidity={this.state.humidity}
          wind={this.state.wind}
        />
        <HourlyWeather
          iconWeather={this.state.icon}
          weathers={this.state.weathers}
        />
      </Fragment>
    )
  }
}