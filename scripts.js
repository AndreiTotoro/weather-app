const domElements = {
    cityInfo: document.getElementById('cityInfo'),
    temperature: document.getElementById('temperature'),
    feelsLike: document.getElementById('feelsLike'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity'),
};

function knotToKmh(knot) {
    return Math.round(knot * 1.852);
}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

async function getWeatherData(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d434d16c466be64487b49d055ed7aca`,
        {
            mode: 'cors',
        }
    );
    const weatherData = await response.json();

    if (weatherData.cod == '404') {
        return 'No such city';
    }

    weatherChanger(weatherData);
}

function weatherChanger(data) {
    domElements.cityInfo.textContent = data.name + ', ' + data.sys.country;
    domElements.temperature.textContent = `${kelvinToCelsius(data.main.temp)}°`;
    domElements.feelsLike.textContent = `Feels like: ${kelvinToCelsius(data.main.feels_like)}°`;
    domElements.wind.textContent = `Wind: ${knotToKmh(data.wind.speed)} Km/Hr`;
    domElements.humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
