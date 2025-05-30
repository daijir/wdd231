export async function displayWeather() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=36.11912337775111&lon=139.1995373144133&units=imperial&appid=02495c60755d1096a200615c9df34e83';
  try {
    // Fetch weather data
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Display weather data
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('high-temp').textContent = `High: ${Math.round(data.main.temp_max)}°`;
    document.getElementById('low-temp').textContent = `Low: ${Math.round(data.main.temp_min)}°`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

    // sunrise and sunset
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    document.getElementById('sunrise').textContent = `Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes().toString().padStart(2, '0')}am`;
    document.getElementById('sunset').textContent = `Sunset: ${sunset.getHours()}:${sunset.getMinutes().toString().padStart(2, '0')}pm`;

    // icon and description
    const icon = data.weather[0].icon;
    const desc = data.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = desc;

  } catch (error) {
    console.error("Weather fetch error:", error);
  }
}