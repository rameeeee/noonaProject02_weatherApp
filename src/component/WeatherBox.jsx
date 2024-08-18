import React from 'react'
import ForecastBox from './ForecastBox';

const WeatherBox = ({weather, forecast, city}) => {
  console.log('weather?', weather)
  return (
    <>
      <div className="weather-box">
        <div className="city_name">{weather?.name}</div>
        <h3 className="desc">
          <span className="icon_box">
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
          </span>
          {weather?.weather[0].description}
        </h3>
        <h2 className="info">{weather?.main.temp}C / {(weather?.main.temp * 1.8 + 32).toFixed(1)}F</h2>
        <div className="add_info">
          <span className="text01">Humidity: {weather?.main.humidity}%</span>
        </div>
        <div className="add_info">
          <span className="text02">Speed: {weather?.wind.speed}km/h</span>
        </div>
      </div>
      {city === '' ? <ForecastBox forecast={forecast}/> :''}
    </>
  )
}

export default WeatherBox
