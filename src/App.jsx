import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'


function App() {

  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [backgroundName, setBackgroundName] = useState(localStorage.getItem('backgroundName') || '000');
  const [appHasLocation, setAppHasLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState(''); // Tiene 2 usos: Geolocation del user (If ...) y handleCitySearch

  //! Exclusivo del WeatherCard.jsx (for now...)

  const [isCelsius, setIsCelsius] = useState(true);
  const handleChangeTemperature = () => setIsCelsius(!isCelsius)

  const [inputCityName, setInputCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCityName(inputCityName);
    handleCitySearch(inputCityName);
  };

  //! Capturar datos de la ubicacion del USER
  //! NOTA: Inicialmente, weather es undefined... Usar eso para decidir si cargo Loading
  useEffect(() => {

    const success = pos => {
      // console.log(pos)      // console.log(pos.coords)
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      }
      setLatlon(obj)
      setAppHasLocation(true)
      setLoading(false);
    }

    const error = err => {
      console.log(err);
      setAppHasLocation(false)
      setLoading(false);
    }

    navigator.geolocation.getCurrentPosition(success, error)  // es una peticion asincronica?

  }, []) //NOTA: Es una peticion asincronica, ... Necesito una peticion aninada...

  {
    // console.log(latlon) //Para ver: lat, lon

    // TESTEO de si funciona appHasLocation... --> SI
    // useEffect(() => {
    //   console.log("App tiene locacion? " + appHasLocation);
    // }, [appHasLocation]);
  }

  useEffect(() => {

    if (latlon && !cityName) {  //zzz BC - Revisar useState of cityName...
      const apikey = 'b5ccb25205a98784410be7f4b2599886'   //PROFE: Esto en realidad se guardaria en un folder
      // GUIDE: https://openweathermap.org/current
      // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} // OJO - Para el input
      // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`;

      axios.get(url)
        .then(res => {
          setWeather(res.data);
          const kelvin = res.data.main.temp;
          const celsius = (kelvin - 273.15).toFixed(1);
          const farenheit = ((kelvin - 273.15) * 1.8 + 32).toFixed(1);
          setTemperature({ celsius, farenheit });
        }, 0)
        .catch(err => console.log(err));
    }
  }, [latlon]);  //IMPORTANTE, se renderizara si hay un cambio
  // console.log(weather) // console.log(cityName)

  //! Para cuando aplique buscar por ciudad en especifico: (NOTA: Casi es copy/paste del 2do useEffect() ... Modularizar?)
  const handleCitySearch = (city) => {
    const searchCity = city || cityName;  // Agarra "city" si existe, sino se regresa por default al useState del cityName
    const apikey = 'b5ccb25205a98784410be7f4b2599886';   //PROFE: Esto en realidad se guardaria en un folder
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apikey}`;

    axios.get(url)
      .then(res => {
        setWeather(res.data); //IMPORTANTE, para renderizar denuevo la App
        const kelvin = res.data.main.temp;
        const celsius = (kelvin - 273.15).toFixed(1);
        const farenheit = ((kelvin - 273.15) * 1.8 + 32).toFixed(1);
        // console.log({celsius, farenheit}); // {celsius: '31.2', farenheit: '88.1'}
        setTemperature({ celsius, farenheit });
      })
      .catch(err => console.log(err));
  };


  //! Para control de backgrounds
  useEffect(() => {

    if (weather) {

      let icon = weather?.weather[0].icon; // console.log("Icon: " + icon)
      setBackgroundName(`${icon}`);   //Example: 01d
      localStorage.setItem('backgroundName', `${icon}`); // console.log(backgroundName);
    }
  }, [weather]);

  const appStyle = {
    backgroundImage: `url('/backgrounds/${backgroundName}.jpg')`,
  };
  //  console.log(`url('/backgrounds/${backgroundName}.jpg')`) // url('/backgrounds/01n.jpg')


  //! MAIN

  return (
    <div className="App backgroundImage" style={appStyle}>
      {
        weather
          ?
          <WeatherCard
            weather={weather}
            temperature={temperature}
            // setCityName={setCityName}            // Era util cuando no pasaba los sig props
            // handleCitySearch={handleCitySearch}  // Era util cuando no pasaba los sig props
            isCelsius={isCelsius}
            handleChangeTemperature={handleChangeTemperature}
            inputCityName={inputCityName}
            setInputCityName={setInputCityName}
            handleSubmit={handleSubmit}
          />
          :
          <Loading
            weather={weather}
            backgroundName={backgroundName}
            appHasLocation={appHasLocation}
            loading={loading}
          />
      }
    </div>
  )
}

export default App
