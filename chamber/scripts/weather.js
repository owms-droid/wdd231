import { ge } from "./utils.mjs";

// #region testing & debug stuff
const testOk = true;
const testWeatherEvents = 1;
const liveData = true;
const log = false;

const weatherEvents = (c) => (c > 1) ? (c > 2) ? (c > 3) ? [{ "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }] : [{ "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }] : [{ "description": "clear sky", "icon": "01d" }, { "description": "clear sky", "icon": "01d" }] : [{ "description": "clear sky", "icon": "01d" }];

const testRes = (ok) => ({ ok: ok, text: () => { return 'This is a test' }, json: () => { return { "TEST RESULTS": "does not contain live info", "weather": weatherEvents(testWeatherEvents), "main": { "temp": 75.99, "temp_min": 69.73, "temp_max": 85.82, "humidity": 69 }, "sys": { "sunrise": 1728135978, "sunset": 1728178073 }, "list": [{ "main": { "temp": 75.99 }, "dt_txt": "2024-10-05 18:00:00" }, {}, {}, {}, {}, {}, {}, {}, { "main": { "temp": 83.97 }, "dt_txt": "2024-10-06 18:00:00" }, {}, {}, {}, {}, {}, {}, {}, { "main": { "temp": 86.56 }, "dt_txt": "2024-10-07 18:00:00" }] } } });

const errorRes = { "main": { "temp": 0, "temp_min": 0, "temp_max": 0, "humidity": 0 }, "sys": { "sunrise": 0, "sunset": 0 }, "weather": [{ "description": "Please contact the site administrator.", "icon": "01d" }], "list": [{ "main": {} }, {}, {}, {}, {}, {}, {}, {}, { "main": {} }, {}, {}, {}, {}, {}, {}, {}, { "main": {} }] }
// #endregion testing & debug stuff

async function apiFetch(url, disp, live = true, ok = true) {
    try {
        const response = (live) ? await fetch(url) : testRes(ok);
        if (response.ok) { disp(await response.json()) }
        else { throw Error(await response.text()); }
    }
    catch (e) {
        console.error(`==So there was an error loading weather data==\n"${e}"\n==Please send this to the site administrator==`);
        disp(errorRes)
    }
}
function displayCurrent(data) {
    if (log) console.log(data);
    const weatherEvents = ge('weather-events');
    const buildIcon = (i, d, s) => `<img src='https://openweathermap.org/img/wn/${i}${(s >= 2) ? `@${s}x` : ''}.png' alt='${d} conditions' width='100' height='100'>`;
    const build = () => {
        const weatherEvent = document.createElement('li');
        weatherEvent.classList.add('weather-event');
        return weatherEvent;
    }
    weatherEvents.innerHTML = ``
    for (let i = 0; i < data.weather.length && i < 4; i++) {
        const weatherEvent = build();
        const description = data.weather[i].description;
        weatherEvent.innerHTML = buildIcon(data.weather[i].icon, description, (data.weather.length > 4) ? '1' : (data.weather.length == 1) ? '4' : '2');
        if (data.weather.length > 1) {
            const weatherDesc = document.createElement('span');
            weatherDesc.textContent = description;
            weatherEvent.appendChild(weatherDesc);
        }
        else {
            ge('weather-desc').innerHTML = description;
            weatherEvents.classList.add('single-event')
        }
        weatherEvents.appendChild(weatherEvent)
    }
    ge('temp-current').innerHTML = Math.round(data.main.temp);
    ge('temp-high').innerHTML = Math.round(data.main.temp_max);
    ge('temp-low').innerHTML = Math.round(data.main.temp_min);
    ge('humidity').textContent = Math.round(data.main.humidity);
    const sunrise = new Date(data.sys.sunrise * 1000)
    ge('sunrise').textContent = `${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}`
    const sunset = new Date(data.sys.sunset * 1000)
    ge('sunset').textContent = `${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}`
}
function displayForecast(data) {
    if (log) console.log(data);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Error'];
    const forecast = [ge('forecast-today'), ge('forecast-tomorrow'), ge('forecast-overmorrow')];
    const today = days[new Date().getDay()];
    for (let i = 0, l = 0; i < data.list.length, l < 3; i += 8, l++) {
        const d = new Date(data.list[i].dt_txt).getDay()
        const day = days[(isNaN(d) ? 7 : d)];
        forecast[l].textContent = `${(day == today) ? 'Today' : day}: ${Math.round(data.list[i].main.temp) || 'Contact Admin'}`;
    }
}
apiFetch(`https://api.openweathermap.org/data/2.5/weather?lat=-9.93&lon=-76.24&units=imperial&appid=014f8762f68760ab95452ccb754edabd`, displayCurrent, liveData, testOk);
apiFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=-9.93&lon=-76.24&units=imperial&cnt=17&appid=014f8762f68760ab95452ccb754edabd`, displayForecast, liveData, testOk);