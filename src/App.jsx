import React from "react";
import './App.css'
import Loading from "./components/Loading/Loading";
import axios from "axios";

function App() {
    const nowDate = new Date()
    const [currentInfo, setCurrentInfo] = React.useState({})
    const [latitude, setLatitude] = React.useState(null)
    const [longitude, setLongitude] = React.useState(null)
    const [isWeatherLoaded, setIsWeatherLoaded] = React.useState(false)
    const [isCelsius, setIsCelsius] = React.useState(true)
    const [searchTownValue, setSearchTownValue] = React.useState('')
    const getData = (lat, lon) => {
        axios.get(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&lang=en_US&=limit=4`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-Yandex-API-Key': '02426e65-a0da-4b0d-8342-da0c80a5d38a'
            }
        })
            .then((res) => setCurrentInfo(res.data))
            .then(() => setIsWeatherLoaded(true))
            .catch((error) => {
                console.log(error)
            })
    }
    React.useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (location) {
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
        })
    }, [])
    React.useEffect(() => {
        // getData(latitude, longitude)
        console.log(currentInfo)
    }, [longitude, isWeatherLoaded])

    const send = () => {

        axios.post('https://cleaner.dadata.ru/api/v1/clean/address', [searchTownValue], {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + "5660c0c72ad2e98b646d5f5771382c1872a12e18" ,
                "X-Secret": "cb9a791b29f4c93068200742fd60b81bb68cb065"
            },
        })
            .then((res) => getData(res.data[0].geo_lat, res.data[0].geo_lon))
    }
    return (
        <div className="App" style={isWeatherLoaded ? {} : {justifyContent: 'center', alignItems: 'center'}}>
            {
                isWeatherLoaded ?
                <div style={{display: 'flex'}}>
                    <div className="leftSidebar">
                        <div className="weatherIconAndMeasurement">
                            <div onClick={() => setIsCelsius(!isCelsius)} className="switch-button">
                                <input className="switch-button-checkbox" type="checkbox"/>
                                <label className="switch-button-label">
                            <span className="switch-button-label-span">
                                C
                            </span>
                                </label>
                            </div>
                        </div>
                        <div className="currentTemperature">
                      <span className="temperature">
                          {isCelsius ? currentInfo.fact.temp : currentInfo.fact.temp * 1.8 + 32 }
                      </span>
                            {isCelsius ? <span className="measureTemperature">° C</span> :
                                <span className="measureTemperature"> ° F </span>}
                            <span className="temperatureFeelsLike">feels like {isCelsius ? currentInfo.fact.feels_like : currentInfo.fact.feels_like * 1.8 + 32 } {isCelsius ?
                                <span>° C</span> : <span> ° F </span>} </span>
                        </div>
                        <div className="currentDate">
                            <p>{nowDate.getUTCDate()} / {nowDate.getMonth() + 1} / {nowDate.getFullYear()}</p>
                        </div>
                        <div className="windHumRain">
                            <svg width="19" height="16" viewBox="0 0 19 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.0646 7.81581C15.2274 7.88467 15.2274 8.11533 15.0646 8.18419L3.00205 13.2876C2.83055 13.3602 2.66168 13.1796 2.74556 13.0133L4.73684 9.06667L4.8265 8.88497C5.10176 8.3271 5.10176 7.6729 4.8265 7.11503L4.73684 6.93333L2.74556 2.98669C2.66168 2.82044 2.83055 2.63985 3.00205 2.7124L15.0646 7.81581ZM17.7776 8.92345C18.5994 8.58201 18.5994 7.41799 17.7776 7.07655L1.23756 0.203689C0.941259 0.0805667 0.59989 0.149446 0.37451 0.37783C0.148304 0.607052 0.0843849 0.950873 0.213099 1.24608L2.80937 7.20065C3.03162 7.71038 3.03162 8.28962 2.80937 8.79935L0.213099 14.7539C0.0843868 15.0491 0.148304 15.3929 0.374512 15.6222C0.59989 15.8506 0.941259 15.9194 1.23756 15.7963L17.7776 8.92345Z"
                                    fill="white"/>
                            </svg>
                            <span className="breaker">Wind {currentInfo.fact.wind_speed} m/s</span>
                            <span className="breaker">|</span>
                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.00012 2.84224L4.46263 7.37974C3.5653 8.27716 2.95424 9.4205 2.70671 10.6652C2.45917 11.9099 2.58628 13.2 3.07196 14.3725C3.55764 15.5449 4.38008 16.547 5.43528 17.2521C6.49049 17.9571 7.73106 18.3334 9.00012 18.3334C10.2692 18.3334 11.5098 17.9571 12.565 17.2521C13.6202 16.547 14.4426 15.5449 14.9283 14.3725C15.414 13.2 15.5411 11.9099 15.2935 10.6652C15.046 9.4205 14.4349 8.27716 13.5376 7.37974L9.00012 2.84224ZM9.00012 0.249908L14.8338 6.08358C15.9876 7.23736 16.7733 8.70737 17.0916 10.3077C17.4099 11.9081 17.2465 13.5668 16.6221 15.0743C15.9977 16.5818 14.9403 17.8703 13.5836 18.7768C12.2269 19.6833 10.6318 20.1672 9.00012 20.1672C7.36843 20.1672 5.77338 19.6833 4.41668 18.7768C3.05998 17.8703 2.00256 16.5818 1.37813 15.0743C0.753703 13.5668 0.59032 11.9081 0.90864 10.3077C1.22696 8.70737 2.01269 7.23736 3.16646 6.08358L9.00012 0.249908Z"
                                    fill="white"/>
                            </svg>
                            <span className="breaker">Hum {currentInfo.fact.humidity} %</span>
                            <span className="breaker">|</span>
                            <svg width="23" height="20" viewBox="0 0 23 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenOdd" clipRule="evenOdd"
                                      d="M17.5 4.00001C16.9317 4.00001 17.7801 4.00001 17 4.00001C16 2 14 0 10.5 0C7 0 4.56176 2.12215 4 5.50001C1.78249 5.50001 0 7.74206 0 10C0.5 12.5 1 13.5 3.52173 14H17.6495C20.324 14 22.5 11.7835 22.5 9.05945C22.5 6.3354 20.1744 4.00001 17.5 4.00001ZM21.0998 8.86379C21.0998 10.869 19.4815 12.5 17.4916 12.5H4.33634C2.77226 12.5 1.4998 11.2181 1.4998 9.64235C1.4998 8.06616 2.77226 6.78392 4.33634 6.78392C4.44072 6.78392 4.55466 6.79226 4.69489 6.80934L5.15662 6.86733L5.20284 6.40337C5.48808 3.57156 7.8362 1.43607 10.6648 1.43607C12.979 1.43607 15.0558 2.91494 15.8331 5.11636L15.9801 5.53186L16.3988 5.398C16.7542 5.28519 17.1219 5.22798 17.4916 5.22798C19.4815 5.22798 21.0998 6.85899 21.0998 8.86379Z"
                                      fill="white"/>
                                <path fillRule="evenOdd" clipRule="evenOdd"
                                      d="M4.12321 16.0214C4.69565 17.0637 5.26809 18.1053 5.84112 19.1476C6.23944 19.8729 7.35212 19.2254 6.9532 18.4995C6.38076 17.4573 5.80833 16.415 5.23529 15.3728C4.83697 14.6474 3.7243 15.2949 4.12321 16.0214Z"
                                      fill="white"/>
                                <path fillRule="evenOdd" clipRule="evenOdd"
                                      d="M8.38542 16.0214C8.95783 17.0635 9.53023 18.1051 10.1026 19.1473C10.5015 19.8726 11.6141 19.2252 11.2152 18.4993C10.6428 17.4571 10.0704 16.4149 9.49743 15.3728C9.09914 14.6475 7.98594 15.2949 8.38542 16.0214Z"
                                      fill="white"/>
                                <path fillRule="evenOdd" clipRule="evenOdd"
                                      d="M12.8647 16.0213C13.4376 17.0633 14.01 18.1048 14.5823 19.1468C14.9805 19.8721 16.0936 19.2247 15.6948 18.4989C15.1224 17.4568 14.5495 16.4148 13.9772 15.3727C13.5789 14.6475 12.4658 15.2949 12.8647 16.0213Z"
                                      fill="white"/>
                                <path fillRule="evenOdd" clipRule="evenOdd"
                                      d="M17.1934 16.0213C17.7658 17.0633 18.3387 18.1047 18.911 19.1468C19.3093 19.872 20.4223 19.2247 20.0235 18.4989C19.4506 17.4568 18.8782 16.4148 18.3059 15.3727C17.9071 14.6475 16.7946 15.2949 17.1934 16.0213Z"
                                      fill="white"/>
                            </svg>
                            <span className="breaker">Rain {currentInfo.fact.prec_strength} %</span>
                        </div>
                        <div className="futureDaysWeather">
                            {currentInfo.forecasts.splice(0,4).map(
                                (futureDay) =>
                                    <div className="futureDay" key={futureDay.date}>
                                        <div className="futureDayTemperature">
                                            {futureDay.parts.day_short.temp}
                                        </div>
                                        <div className="futureDayWeatherImg">
                                            {futureDay.parts.day_short.condition}
                                        </div>
                                        <div className="futureDayDate">
                                            {futureDay.date}
                                        </div>
                                    </div>
                            )}
                        </div>
                    </div>
                    <div className="rightSidebar">
                        <div className="search">
                            <input onChange={(e) => setSearchTownValue(e.target.value)} type="text" placeholder="Find the city..."/>
                            <button onClick={() => send()}>
                                <svg width="25" height="26" viewBox="0 0 25 26" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24.1239 24.7031C24.8077 24.0075 24.8077 22.8922 24.1239 22.1965L18.7478 16.7278C19.9906 14.989 20.7254 12.8505 20.7254 10.5408C20.7254 4.72875 16.0768 0 10.3622 0C4.6486 0 0 4.72875 0 10.5408C0 16.354 4.6486 21.0817 10.3622 21.0817C12.5283 21.0817 14.5401 20.4024 16.2057 19.2422L21.5741 24.7031C22.2746 25.4158 23.4233 25.4158 24.1239 24.7031ZM3.03943 10.5408C3.03943 6.43283 6.32487 3.09075 10.3632 3.09075C14.4016 3.09075 17.6871 6.43283 17.6871 10.5408C17.6871 14.6488 14.4016 17.9909 10.3632 17.9909C6.3238 17.9909 3.03943 14.6488 3.03943 10.5408Z"
                                        fill="white"/>
                                </svg>
                            </button>
                        </div>
                        <div className="currentLocation">
                            <p>{currentInfo.geo_object.locality.name}, {currentInfo.geo_object.country.name}</p>
                        </div>
                    </div>
                </div>
                    :
                <Loading/>
            }
        </div>
    )
}
export default App;
