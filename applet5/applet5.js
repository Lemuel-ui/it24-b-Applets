class WeatherApp {
    constructor() {
        this.apiKey = document.getElementById('apiKeyInput');
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.getLocationBtn = document.getElementById('getLocationBtn');
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');

        this.getWeatherBtn.addEventListener('click', () => this.fetchWeather());
        this.getLocationBtn.addEventListener('click', () => this.fetchWeatherByLocation());
    }

    displayWeather(data) {
        this.cityName.textContent = `${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
        this.windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weatherIcon').src = iconUrl;
    
        this.weatherCard.style.display = 'block';
    }
}

class WeatherService extends WeatherApp {
    fetchWeather() {
        const city = this.cityInput.value;
        const apiKey = this.apiKey.value;
        const mockWeatherData = {
            name: city,
            sys: { country: 'US' },
            coord: { lat: 40.7128, lon: -74.0060 },
            main: { temp: 20, humidity: 60 },
            weather: [{ description: 'Clear sky', icon: '01d' }],
            wind: { speed: 5 }
        };

        if (city) {
            this.displayWeather(mockWeatherData);
        } else {
            alert('Please enter a city name.');
        }
    }

    fetchWeatherByLocation() {
        const latitude = 40.7128;
        const longitude = -74.0060;

        const mockWeatherData = {
            name: 'New York',
            sys: { country: 'US' },
            coord: { lat: latitude, lon: longitude },
            main: { temp: 22, humidity: 65 },
            weather: [{ description: 'Partly cloudy', icon: '02d' }],
            wind: { speed: 3 }
        };

        this.displayWeather(mockWeatherData);
        this.cityInput.value = '';
    }
}

const weatherApp = new WeatherService();
