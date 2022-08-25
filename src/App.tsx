import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Example from './components/example'
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { API_key, Weather_API_URL } from "./api";
function App() {

  const [count, setCount] = useState(0)
  //se crean hooks para imprimir los datos de repsuesta del api
  const [getWeather, setWeather] = useState(null);
  const [getForecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData: any) => {
    //console.log(searchData);
    const [lan, lon] = searchData.value.split(" ");
    
    const getWeather = fetch(
      `${Weather_API_URL}/weather?lat=${lan}&lon=${lon}&appid=${API_key}&units=metric`
    );
    const getForecast = fetch(
      `${Weather_API_URL}/forecast?lat=${lan}&lon=${lon}&appid=${API_key}&units=metric`
    );

    Promise.all([getWeather, getForecast])
      .then(async (response) => {
        //se guardan las respuestas en json en variables
        const weatherresponse = await response[0].json()
        const forecastresponse = await response[1].json()
        //setear las respuestas a los hooks setWeather y setForecast
        //se extiende(hace como un push al array desde el otro component) con el dato label de la funcion seachData setWeather({city: searchData.city.label, ...weatherresponse})
        setWeather(weatherresponse)
        setForecast(forecastresponse)
      })
      .catch((err) => {
        console.log(err)
      });
      console.log(getWeather)
  };  
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Example/>
      <Search onSearchChange={handleOnSearchChange}/>
      {getWeather && <CurrentWeather data={getWeather} />}
    </div>
  )
}

export default App
