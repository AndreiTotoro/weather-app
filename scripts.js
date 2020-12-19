const domElements = {
    cityInfo: document.getElementById('cityInfo'),
    temperature: document.getElementById('temperature'),
    feelsLike: document.getElementById('feelsLike'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity'),
    searchField: document.getElementById('searchField'),
    celsiusButton: document.getElementById('celsiusButton'),
    fahrenheitButton: document.getElementById('fahrenheitButton'),
    submitButton: document.getElementById('submitButton'),
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

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((5 / 9) * (fahrenheit - 32));
}

function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
}

let i = 0;

async function getWeatherData() {
    if (i === 0) {
        i = i + 1;
        console.log(i);
        const location = 'Bucharest';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d434d16c466be64487b49d055ed7aca`,
            {
                mode: 'cors',
            }
        );
        const weatherData = await response.json();
        return weatherData;
    } else {
        console.log('log');
        const location = domElements.searchField.value;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d434d16c466be64487b49d055ed7aca`,
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
    domElements.feelsLike.textContent = `${kelvinToCelsius(data.main.feels_like)}°C`;
    domElements.wind.textContent = `${knotToKmh(data.wind.speed)} Km/Hr`;
    domElements.humidity.textContent = `${data.main.humidity}%`;
}

async function changeToCelsius() {
    domElements.temperature.textContent = `${fahrenheitToCelsius(parseInt(domElements.temperature.textContent))}°C`;
    domElements.feelsLike.textContent = `${fahrenheitToCelsius(parseInt(domElements.feelsLike.textContent))}°C`;
}

async function changeToFahrenheit() {
    domElements.temperature.textContent = `${celsiusToFahrenheit(parseInt(domElements.temperature.textContent))}°F`;
    domElements.feelsLike.textContent = `${celsiusToFahrenheit(parseInt(domElements.feelsLike.textContent))}°F`;
}

domElements.celsiusButton.addEventListener('click', () => {
    if (domElements.celsiusButton.className != 'active') {
        domElements.celsiusButton.classList.add('active');
        domElements.fahrenheitButton.classList.remove('active');
        changeToCelsius();
    }
});
domElements.fahrenheitButton.addEventListener('click', () => {
    if (domElements.fahrenheitButton.className != 'active') {
        domElements.fahrenheitButton.classList.add('active');
        domElements.celsiusButton.classList.remove('active');
        changeToFahrenheit();
    }
});
domElements.submitButton.addEventListener('click', weatherChanger);
domElements.searchField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        weatherChanger();
    }
});

weatherChanger();
