import { React, useState } from 'react' // El useState lo pase al padre en App.jsx... 
import '../App.css'

// const WeatherCard = ({ weather, temperature, setCityName, handleCitySearch, isCelsius, handleChangeTemperature, inputCityName, setInputCityName, handleSubmit }) => {
const WeatherCard = ({ weather, temperature, isCelsius, handleChangeTemperature, inputCityName, setInputCityName, handleSubmit }) => {
    if (!weather) {
        return null;
    }

    let description = weather?.weather[0].description;
    let rewriteDescription = description.trim().replace(/\s+/g, '_').toLowerCase();

    return (
        <div className='weatherCardMain'>
            <article className='weatherCardContainer'>
                <h1>Weather App</h1>
                <h2>{weather?.name}, {weather?.sys.country}</h2>
                <section className='weatherInfo'>
                    <header className='weatherIcon'>
                        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt={'Icono_clima__' + rewriteDescription} />
                    </header>
                    <article className='weatherDetails'>
                        <h3>"{weather?.weather[0].description}"</h3>
                        <ul>
                            <ul><span>Wind Speed: </span>{weather?.wind.speed} m/sec</ul>
                            <ul><span>Clouds: </span>{weather?.clouds.all} %</ul>
                            <ul><span>Pressure: </span>{weather?.main.pressure} hPa</ul>
                        </ul>
                    </article>
                </section>
                <footer>
                    <h2>
                        {
                            isCelsius
                                ? `${temperature?.celsius} °C`
                                : `${temperature?.farenheit} °F`
                        }
                    </h2>
                    <button onClick={handleChangeTemperature}>Cambiar a °{isCelsius ? 'F' : 'C'}</button>
                </footer>
            </article>

            <article className="searchCityContainer">
                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Escriba otra ciudad"
                        value={inputCityName}
                        onChange={(e) => setInputCityName(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </article>

        </div>
    )
}

export default WeatherCard


{
    //! Valores de interes al testear WeatherCard.jsx
    // console.log(weather)        // Muchos values de interes de la API 
    // console.log(temperature)    // celsius, farenheit
    // console.log(weather?.name)  // Ciudad

    // let icon = weather?.weather[0].icon;                     // Termino sin ser usado...
    // let timeOfDay = icon.includes('d') ? 'Dia' : 'Noche';    // Termino sin ser usado...
}

{
    //! Backup... Pasar esto a App.jsx SINO descomentar (No olvidar las props !!!)
    // const [isCelsius, setIsCelsius] = useState(true);
    // const handleChangeTemperature = () => setIsCelsius(!isCelsius)

    // const [inputCityName, setInputCityName] = useState('');

    // const handleSubmit = (e) => { 
    //     e.preventDefault(); 
    //     setCityName(inputCityName); 
    //     handleCitySearch(inputCityName); 
    // }; 
}