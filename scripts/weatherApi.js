document.addEventListener('DOMContentLoaded', function() {

    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=36.11912337775111&lon=139.1995373144133&units=metric&appid=02495c60755d1096a200615c9df34e83';

    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log('fetch error:', error); 
        }
    }

    function displayResults(data) {
        if (!data) return; 
        currentTemp.innerHTML = `${data.main.temp}&deg;C`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
    }

    apiFetch().then(displayResults);
});