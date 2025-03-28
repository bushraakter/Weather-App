const API_KEY = f5613448e2e6a7e49a9dc1312a9c98fa; 

async function getWeather(city = "") {
    if (!city) {
        city = document.getElementById("city").value;
    }
    
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

async function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            fetchWeatherData(url);
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherDescription = data.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.body.style.backgroundColor = getBackgroundColor(data.weather[0].main);

            document.getElementById("weather-info").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="${icon}" class="weather-icon">
                <p><strong>${weatherDescription}</strong></p>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            document.getElementById("weather-info").innerHTML = `<p style="color:red;">City not found!</p>`;
        }
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p style="color:red;">Error fetching weather!</p>`;
    }
}

function getBackgroundColor(weather) {
    switch (weather) {
        case "Clear": return "#FFD700"; // Sunny
        case "Clouds": return "#B0C4DE"; // Cloudy
        case "Rain": return "#4682B4"; // Rainy
        case "Snow": return "#E0FFFF"; // Snowy
        case "Thunderstorm": return "#483D8B"; // Stormy
        default: return "#87CEEB"; // Default (Blue Sky)
    }
}