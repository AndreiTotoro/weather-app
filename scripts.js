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

    return weatherData;
}
