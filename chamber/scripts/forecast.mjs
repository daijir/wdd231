export async function displayForecast() {
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=36.11912337775111&lon=139.1995373144133&units=imperial&appid=02495c60755d1096a200615c9df34e83';
    try {
        // Fetch forecast data
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);

        // get the date of today, tomorrow, and the day after
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayafter = new Date(today);
        dayafter.setDate(today.getDate() + 2);

        // get the temprature for today, tomorrow, and the day after
        function getTempForDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const dayStr = `${y}-${m}-${d}`;
        const temps = data.list.filter(item => item.dt_txt.startsWith(dayStr)).map(item => item.main.temp);
        return temps.length ? Math.round(Math.max(...temps)) : null;
        }

        // Display the forecast data
        document.getElementById('forecast-today').innerHTML = `Today: <strong>${getTempForDate(today) ?? '--'}°F</strong>`;
        document.getElementById('forecast-tomorrow').innerHTML = `${tomorrow.toLocaleDateString('en-US', { weekday: 'long' })}: <strong>${getTempForDate(tomorrow) ?? '--'}°F</strong>`;
        document.getElementById('forecast-dayafter').innerHTML = `${dayafter.toLocaleDateString('en-US', { weekday: 'long' })}: <strong>${getTempForDate(dayafter) ?? '--'}°F</strong>`;
    } catch (error) {
        document.getElementById('weather-forecast').innerHTML += "<p>Forecast data could not be loaded.</p>";
        console.error("Forecast fetch error:", error);
    }
}