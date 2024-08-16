import React from 'react'

const WeatherBox = ({weather}) => {
  console.log('weather?', weather)
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}C / {(weather?.main.temp * 1.8 + 32).toFixed(2)}F</h2>
      <h3>
        {weather?.weather[0].description}
        <span className="icon_box">
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
        </span>
      </h3>
    </div>
  )
}

export default WeatherBox
