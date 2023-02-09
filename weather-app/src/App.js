import "./App.css";
import CurrentWeather from "./Components/Current-weather/CurrentWeather";
import Search from "./Components/Search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import { useState } from "react";
import Forecast from "./Components/Forecast/Forecast";

// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const handleOnSearchChange =  (searchData) => {
//     const [lat, lon] = searchData.value.split(" ");

//      fetch(
//       `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric`
//     )
//     .then((response) => response.json())
//             .then((response) => {
//               setCurrentWeather({ city: searchData.label, ...response });
//             })
//      fetch(
//       `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric`,
    
//     ).then((response) => response.json())
//     .then((response) => {
//         setForecast({ city: searchData.label, ...response });
//     });
//   };
//   console.log(currentWeather);
//   console.log(forecast);
//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange} />
//       {currentWeather && <CurrentWeather data={currentWeather} />}
//       {forecast && <Forecast data={forecast} />}
//     </div>
//   );
// }

// export default App;
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
