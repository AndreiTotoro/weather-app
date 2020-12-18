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
    i = 0;

    if (i == 0) {
        const location = 'Bucharest';
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d434d16c466be64487b49d055ed7aca`,
            {
                mode: 'cors',
            }
        );
        const weatherData = await response.json();
        i++;
        return weatherData;
    } else {
        const location = domElements.searchField.value;
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d434d16c466be64487b49d055ed7aca`,
            {
                mode: 'cors',
            }
        );
        const weatherData = await response.json();
        return weatherData;
    }
}

async function dataGetter() {
    const data = await getWeatherData();
    return data;
}

async function weatherChanger() {
    const data = await dataGetter();
    domElements.cityInfo.textContent = data.name + ', ' + data.sys.country;
    domElements.temperature.textContent = `${kelvinToCelsius(data.main.temp)}°C`;
    domElements.feelsLike.textContent = `Feels like: ${kelvinToCelsius(data.main.feels_like)}°C`;
    domElements.wind.textContent = `Wind: ${knotToKmh(data.wind.speed)} Km/Hr`;
    domElements.humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

async function changeToCelsius() {
    const data = await dataGetter();
    domElements.temperature.textContent = `${kelvinToCelsius(data.main.temp)}°C`;
    domElements.feelsLike.textContent = `Feels like: ${kelvinToCelsius(data.main.feels_like)}°C`;
    domElements.wind.textContent = `Wind: ${knotToKmh(data.wind.speed)} Km/Hr`;
}

async function changeToFahrenheit() {
    const data = await dataGetter();
    domElements.temperature.textContent = `${kelvinToFahrenheit(data.main.temp)}°F`;
    domElements.feelsLike.textContent = `Feels like: ${kelvinToFahrenheit(data.main.feels_like)}°F`;
    domElements.wind.textContent = `Wind: ${knotToMph(data.wind.speed)} Mph/Hr`;
}

domElements.submitButton.addEventListener('click', weatherChanger);
domElements.celsiusButton.addEventListener('click', changeToCelsius);
domElements.fahrenheitButton.addEventListener('click', changeToFahrenheit);

weatherChanger();
