import React from 'react'
import { format } from 'date-fns';

const ForecastBox = ({forecast}) => {
    console.log('forecastbox', forecast)
    
    return (
        <div className="forecast-box">
            <div className="forecast_list_wrap">
                <ul className="forecast_list">
                    {forecast?.list.map((item) => (
                        <li key={item.dt} className="forecast_item">
                            {format(item.dt_txt, 'MMMM do, h:mm a')}
                            <div className="forecast_icon_box">
                                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                            </div>
                            <div className="forecast_desc">
                                {item.weather[0].description}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ForecastBox
