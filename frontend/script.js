const BASE_URL = 'http://localhost:5000/api';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const saveBtn = document.getElementById('saveBtn');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMsg');
const weatherCard = document.getElementById('weatherCard');
const forecastContainer = document.getElementById('forecastContainer');
const savedList = document.getElementById('savedList');

let currentCity = '';

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
  weatherCard.classList.add('hidden');
  forecastContainer.innerHTML = '';
}

function clearError() {
  errorMsg.classList.add('hidden');
}

async function fetchWeather(city) {
  showLoading(true);
  clearError();
  try {
    const res = await fetch(`${BASE_URL}/weather?city=${city}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch weather');

    currentCity = data.name;
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temp').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
    document.getElementById('weatherIcon').src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCard.classList.remove('hidden');

    await fetchForecast(city);
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

async function fetchForecast(city) {
  const res = await fetch(`${BASE_URL}/forecast?city=${city}`);
  const data = await res.json();
  if (!res.ok) return;

  const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  forecastContainer.innerHTML = dailyData.map(day => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `
      <div class="forecast-day">
        <p>${dayName}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
        <p>${Math.round(day.main.temp)}°C</p>
      </div>
    `;
  }).join('');
}

function getSavedCities() {
  return JSON.parse(localStorage.getItem('savedCities') || '[]');
}

function renderSavedCities() {
  const cities = getSavedCities();
  savedList.innerHTML = cities.map(c => `<li onclick="fetchWeather('${c}')">${c}</li>`).join('');
}

saveBtn.addEventListener('click', () => {
  if (!currentCity) return;
  const cities = getSavedCities();
  if (!cities.includes(currentCity)) {
    cities.push(currentCity);
    localStorage.setItem('savedCities', JSON.stringify(cities));
    renderSavedCities();
  }
});

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

renderSavedCities(); 