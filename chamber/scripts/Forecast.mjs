export async function displayForecast() {
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=36.11912337775111&lon=139.1995373144133&units=imperial&appid=02495c60755d1096a200615c9df34e83';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data); 

        // 今日・明日・明後日の日付取得
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayafter = new Date(today);
        dayafter.setDate(today.getDate() + 2);

        // 日付ごとに最高気温を抽出
        function getMaxTempForDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const dayStr = `${y}-${m}-${d}`;
        const temps = data.list.filter(item => item.dt_txt.startsWith(dayStr)).map(item => item.main.temp_max);
        return temps.length ? Math.round(Math.max(...temps)) : null;
        }

        document.getElementById('forecast-today').innerHTML = `Today: <strong>${getMaxTempForDate(today) ?? '--'}°F</strong>`;
        document.getElementById('forecast-tomorrow').innerHTML = `${tomorrow.toLocaleDateString('en-US', { weekday: 'long' })}: <strong>${getMaxTempForDate(tomorrow) ?? '--'}°F</strong>`;
        document.getElementById('forecast-dayafter').innerHTML = `${dayafter.toLocaleDateString('en-US', { weekday: 'long' })}: <strong>${getMaxTempForDate(dayafter) ?? '--'}°F</strong>`;
    } catch (error) {
        document.getElementById('weather-forecast').innerHTML += "<p>Forecast data could not be loaded.</p>";
        console.error("Forecast fetch error:", error);
    }
}