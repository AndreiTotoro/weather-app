const domElements = {
    cityInfo: document.getElementById('cityInfo'),
    temperature: document.getElementById('temperature'),
    feelsLike: document.getElementById('feelsLike'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity'),
    searchField: document.getElementById('searchField'),
    submitButton: document.getElementById('submitButton'),
    celsiusButton: document.getElementById('celsiusButton'),
    fahrenheitButton: document.getElementById('fahrenheitButton'),
};

function knotToKmh(knot) {
    return Math.round(knot * 1.852);
}

function knotToMph(knot) {
    return Math.round(knot * 1.151);
}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function kelvinToFahrenheit(kelvin) {
    return Math.round((kelvin - 273.15) * 1.8 + 32);
}

async function getWeatherData() {
    const location = domElements.searchField.value;
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

function changeToCelsius() {
    domElements.temperature.textContent = `${kelvinToCelsius(data.main.temp)}°`;
    domElements.feelsLike.textContent = `Feels like: ${kelvinToCelsius(data.main.feels_like)}°`;
    domElements.wind.textContent = `Wind: ${knotToKmh(data.wind.speed)} Km/Hr`;
}

function changeToFahrenheit() {
    domElements.temperature.textContent = `°${kelvinToFahrenheit(data.main.temp)}`;
    domElements.feelsLike.textContent = `Feels like: °${kelvinToFahrenheit(data.main.feels_like)}`;
    domElements.wind.textContent = `Wind: ${knotToMph(data.wind.speed)} Mph/Hr`;
}

domElements.submitButton.addEventListener('click', getWeatherData);
domElements.celsiusButton.addEventListener('click', changeToCelsius);
domElements.fahrenheitButton.addEventListener('click', changeToFahrenheit);
