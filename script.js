const apiKey = '8eb322f57330cd05035758d91a89289d'; 
const weatherInfoDiv = document.getElementById('weatherInfo');

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (data.cod !== 200) {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        const { main, wind, weather } = data;

        weatherInfoDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Temperature:</strong> ${main.temp} °C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
            <p><strong>Condition:</strong> ${weather[0].description}</p>
        `;
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>Error fetching weather data</p>`;
    }
}
