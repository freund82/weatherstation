const weatherIcons = {
  200: '11d',
  201: '11d',
  202: '11d',
  210: '11d',
  211: '11d',
  212: '11d',
  221: '11d',
  230: '11d',
  231: '11d',
  232: '11d',
  500: '10d',
  501: '10d',
  502: '10d',
  503: '10d',
  504: '10d',
  511: '13d',
  600: '13d',
  601: '13d',
  602: '13d',
  611: '13d',
  612: '13d',
  613: '13d',
  615: '13d',
  616: '13d',
  620: '13d',
  621: '13d',
  622: '13d',
  300: '09d',
  301: '09d',
  302: '09d',
  310: '09d',
  311: '09d',
  312: '09d',
  313: '09d',
  314: '09d',
  321: '09d',
  520: '09d',
  521: '09d',
  522: '09d',
  531: '09d',
  701: '50d',
  711: '50d',
  721: '50d',
  731: '50d',
  741: '50d',
  751: '50d',
  761: '50d',
  762: '50d',
  771: '50d',
  781: '50d',
  800: '01d',
  801: '02d',
  802: '03d',
  803: '04d',
  804: '04d',
};

const windDirections = {
  0: 'с',
  360: 'с',
  90: 'в',
  180: 'ю',
  270: 'з',
};

function getWeatherData() {
  return fetch(
    'https://api.codetabs.com/v1/proxy?quest=' +
      encodeURIComponent(
        'https://api.openweathermap.org/data/2.5/weather?id=534595&units=metric&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39',
      ),
  ).then((response) => response.json());
}

function displayWeatherIcon(weatherId) {
  const iconCode = weatherIcons[weatherId];
  if (iconCode) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const iconElement = document.createElement('img');
    iconElement.setAttribute('src', iconUrl);
    iconElement.setAttribute('width', '200');
    iconElement.setAttribute('height', '200');
    const weatherContainer = document.querySelector('.cityWeatherItem');
    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(iconElement);
  }
}

function getWindDirection(deg) {
  if (deg > 0 && deg < 90) return 'св';
  if (deg > 90 && deg < 180) return 'юв';
  if (deg > 180 && deg < 270) return 'юз';
  if (deg > 270 && deg < 360) return 'сз';
  return windDirections[deg] || 'штиль';
}

function toggleWeatherDisplay() {
  const cityWeatherElement = document.querySelector('.cityWeather');
  const windElement = document.querySelector('.wind');

  if (cityWeatherElement && windElement) {
    // Переключение видимости
    if (cityWeatherElement.style.display === 'none') {
      cityWeatherElement.style.display = 'block';
      windElement.style.display = 'none';
    } else {
      cityWeatherElement.style.display = 'none';
      windElement.style.display = 'block';
    }
  }
}

function updateWeather() {
  getWeatherData()
    .then((data) => {
      const currDate = new Date().toLocaleDateString();
      document.querySelector('#city').innerHTML = `${data.name} ${currDate}`;
      displayWeatherIcon(data.weather[0].id);
      document.querySelector('#hum').innerHTML = `${data.main.humidity} %`;
      document.querySelector('.wind').innerHTML = `${getWindDirection(data.wind.deg)} ${
        data.wind.speed
      } м/с`;
      document.querySelector('#pressure').innerHTML = `${(
        data.main.pressure * 0.750064 -
        18
      ).toFixed(0)} мм`;
      document.querySelector('.Temperature').innerHTML = `${data.main.temp.toFixed(0)} &deg;C`;
      document.querySelector('.cityWeather').innerHTML = data.weather[0].description;

      // Сохраняем текущее состояние видимости
      const cityWeatherElement = document.querySelector('.cityWeather');
      const windElement = document.querySelector('.wind');
      if (cityWeatherElement.style.display === 'none') {
        cityWeatherElement.style.display = 'block';
        windElement.style.display = 'none';
      } else {
        cityWeatherElement.style.display = 'none';
        windElement.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
}

// Первое обновление данных при загрузке страницы
setTimeout(updateWeather, 1000);

// Обновление данных каждые 10 минут
setInterval(updateWeather, 600000);

// Переключение видимости каждые 2 минуты
setInterval(toggleWeatherDisplay, 120000);

// Первое переключение при загрузке страницы
toggleWeatherDisplay();
