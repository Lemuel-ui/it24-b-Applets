class WeatherApp {
    constructor() {

        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.getLocationBtn = document.getElementById('getLocationBtn');
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.getWeatherBtn.addEventListener('click', () => this.fetchWeather());
        this.getLocationBtn.addEventListener('click', () => this.fetchWeatherByLocation());
    }

    displayWeather(data) {
        this.cityName.textContent = `${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
        this.windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Set the weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.weatherIcon.src = iconUrl;

        this.weatherCard.style.display = 'block';
    }
}

class WeatherService extends WeatherApp {
    async fetchWeather() {
        const apiKey = this.apiKeyInput.value.trim();
        const city = this.cityInput.value.trim();

        if (!apiKey) {
            alert('Please enter your API key.');
            return;
        }

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const data = await this.getWeatherData(city, apiKey);
        if (data) {
            this.displayWeather(data);
        } else {
            alert('City not found. Please try again.');
        }
    }

    async fetchWeatherByLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = this.apiKeyInput.value.trim();
                    const data = await this.getWeatherDataByCoordinates(latitude, longitude, apiKey);

                    if (data) {
                        this.displayWeather(data);
                        this.cityInput.value = '';
                    } else {
                        alert('Unable to retrieve weather data for your location.');
                    }
                },
                () => {
                    alert('Unable to retrieve your location. Please allow location access.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    async getWeatherData(city, apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        return null;
    }

    async getWeatherDataByCoordinates(latitude, longitude, apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data by coordinates:', error);
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = new WeatherService();

    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        
        modalInstance.show();
    } else {
        console.error('Modal element not found');
    }
});
