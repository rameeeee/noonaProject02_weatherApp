import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태
// 3. 5개의 버튼이 있다. (1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.
function App() {
  let [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ['london', 'New Zealand', 'melbourne', 'chiang mai', 'tailand', 'seoul']
  const [apiError, setApiError] = useState("");


  

  const getCurrentLocation = () => {
    // 1-1. 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log('현재 위치', lat, lon);
      getWeatherByCurrentLocation(lat, lon);
      // 1-2. 현재 위치 날씨 가져오기
      /** 검색하여 찾은 내용
       * https://stackoverflow.com/questions/45244284/how-to-get-the-weather-conditions-based-on-the-user-s-current-gps-location
       * https://www.shecodes.io/athena/40467-how-to-log-the-current-temperature-with-latitude-and-longitude-in-javascript
      */
      // 작성해 본 코드 (결과 노출 o)
      /*
      const apiKey = '18daf91688e53d81ea9bb5a2acb1b9cc'
      const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
      
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weather = data.weather[0].main;
        console.log(`The current weather is ${weather}`);
      })
      .catch(error => console.log(error));
      */
    });

    
  }

  const getWeatherByCurrentLocation = async(lat, lon) => {
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=18daf91688e53d81ea9bb5a2acb1b9cc&units=metric`
      const response = await fetch(url)
      const data = await response.json()
      console.log('data', data)
      setWeather(data)
      setLoading(false)
    } catch(error) {
      console.log(error);
      setApiError(error.message);
      setLoading(false);
    }
  }

  // 작성해 본 코드 
  /*
  const getWeatherByCity = async(city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18daf91688e53d81ea9bb5a2acb1b9cc&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log('city data', data)
    setWeather(data)
  }
  */
  /**
   * getWeatherByCity를 props로 전달 
   * WeatherButton의 Button에서 onClick={() => getWeatherByCity('Paris')}와 같이 도시명 입력
   */
  
  const getWeatherByCity = async() => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18daf91688e53d81ea9bb5a2acb1b9cc&units=metric`
      const response = await fetch(url)
      const data = await response.json()
      console.log('city data', data)
      setWeather(data)
      setLoading(false)
    } catch(error) {
      console.log(error);
      setApiError(error.message);
      setLoading(false);
    }
  }


  useEffect(() => {
    if(city===""){
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  

  return (
    <div>
      <div className={`bg_area ${weather?.weather[0].main.toLowerCase()}`}></div>
      {loading 
        ? (
          <div className="container">
            <ClipLoader color="#0d6efd" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )
        : (
          <div className="container">
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} setCity={setCity} city={city}/>
          </div>
        )
      }
    </div>
  );
}

export default App;
