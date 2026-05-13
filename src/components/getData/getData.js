// ========== УТИЛИТЫ ==========

// Определение направления ветра
function getWindDirection(deg) {
  if (deg === undefined || deg === null) return '';
  if (deg === 0) return 'с';
  if (deg > 0 && deg < 90) return 'св';
  if (deg === 90) return 'в';
  if (deg > 90 && deg < 180) return 'юв';
  if (deg === 180) return 'ю';
  if (deg > 180 && deg < 270) return 'юз';
  if (deg === 270) return 'з';
  if (deg > 270 && deg < 360) return 'сз';
  return '';
}

// Форматирование строки ветра
function formatWind(speed, gust, direction) {
  if (!speed || speed === 0) return 'штиль';

  const speedRounded = speed.toFixed(2);
  const gustRounded = gust ? gust.toFixed(2) : '0';

  return `${direction} ${speedRounded} (${gustRounded}) м/с`;
}

// Установка иконки погоды по ID
function setWeatherIcon(weatherId) {
  let iconName;

  if ([200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(weatherId)) {
    iconName = '11d';
  } else if ([500, 501, 502, 503, 504].includes(weatherId)) {
    iconName = '10d';
  } else if ([511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(weatherId)) {
    iconName = '13d';
  } else if (
    [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531].includes(weatherId)
  ) {
    iconName = '09d';
  } else if ([701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(weatherId)) {
    iconName = '50d';
  } else if (weatherId === 800) {
    iconName = '01d';
  } else if (weatherId === 801) {
    iconName = '02d';
  } else if (weatherId === 802) {
    iconName = '03d';
  } else if ([803, 804].includes(weatherId)) {
    iconName = '04d';
  } else {
    iconName = '01d';
  }

  const img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${iconName}.png`;
  img.width = 200;
  img.height = 200;
  img.alt = 'погода';

  const container = document.querySelector('.cityWeatherItem');
  if (container) {
    container.innerHTML = '';
    container.appendChild(img);
  }
}

// Конвертация давления (гПа → мм рт. ст. с поправкой на высоту Лобни)
function convertPressure(hpa) {
  // 1 гПа = 0.750064 мм рт. ст.
  // Поправка -18 мм для высоты ~146м над уровнем моря
  return (hpa * 0.750064 - 18).toFixed(0);
}

//Вывод alert сообщений
function alertData(alerts) {
  let alertText = [...new Set(alerts.map((alert) => alert.description))].join('\n');
  if (alertText.length > 100 && alertText.length < 300) {
    let alertBlock = document.querySelector('.alertBlock');
    alertBlock.style.height = '10rem';
    return alertText;
  } else if (alertText.length > 300) {
    let alertBlock = document.querySelector('.alertBlock');
    alertBlock.style.height = '20rem';
    return alertText;
  }

  return alertText;
}

// ========== ПЕРЕКЛЮЧЕНИЕ ОТОБРАЖЕНИЯ ==========

let showWind = true; // true = показываем ветер, false = показываем описание

function toggleDisplay() {
  const descriptionElement = document.querySelector('.cityWeather');
  const windElement = document.querySelector('.wind');

  if (!descriptionElement || !windElement) return;

  if (showWind) {
    // Показываем ветер, прячем описание
    descriptionElement.style.display = 'none';
    windElement.style.display = 'block';
  } else {
    // Показываем описание, прячем ветер
    descriptionElement.style.display = 'block';
    windElement.style.display = 'none';
  }

  // Переключаем флаг на следующий раз
  showWind = !showWind;
}

// ========== ОСНОВНАЯ ФУНКЦИЯ ОБНОВЛЕНИЯ ==========

function updateWeather() {
  const url =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://ru.api.openweathermap.org/data/3.0/onecall?lat=56.01&lon=37.47&lang=ru&exclude=minutely,hourly,daily&units=metric&appid=6ec173dc6f65d2c9a0e7cbe434e68bb8',
    );

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Данные получены:', data);

      // 1. Дата и город
      const currDate = new Date().toLocaleDateString('ru-RU');
      const cityElement = document.querySelector('#city');
      cityElement.innerHTML = `Лобня ${currDate}`;

      // 2. Alert (штормовое предупреждение)
      const alertBlock = document.querySelector('.alertBlock');
      const alertElement = document.querySelector('.alert');
      if (data?.alerts && alertBlock && alertElement) {
        alertBlock.style.opacity = '1';
        alertElement.innerHTML = alertData(data.alerts);
      } else if (alertBlock) {
        alertBlock.style.opacity = '0';
      }

      // 3. Иконка погоды
      if (data.current?.weather?.[0]?.id) {
        setWeatherIcon(data.current.weather[0].id);
      }

      // 4. Влажность (всегда показываем)
      const humidElement = document.querySelector('#hum');
      if (humidElement && data.current?.humidity !== undefined) {
        humidElement.innerHTML = `${data.current.humidity} %`;
      }

      // 5. Давление (всегда показываем)
      const pressureElement = document.querySelector('#pressure');
      if (pressureElement && data.current?.pressure !== undefined) {
        pressureElement.innerHTML = `${convertPressure(data.current.pressure)} мм`;
      }

      // 6. Температура (всегда показываем)
      const tempElement = document.querySelector('.Temperature');
      if (tempElement && data.current?.temp !== undefined) {
        tempElement.innerHTML = `${data.current.temp.toFixed(0)} &deg;C`;
      }

      // 7. Описание погоды (обновляем данные, но показываем/скрываем по таймеру)
      const descElement = document.querySelector('.cityWeather');
      if (descElement && data.current?.weather?.[0]?.description) {
        descElement.innerHTML = data.current.weather[0].description;
      }

      // 8. Данные ветра (обновляем, но показываем/скрываем по таймеру)
      const windElement = document.querySelector('.wind');
      if (windElement && data.current) {
        const windDeg = data.current.wind_deg;
        const windSpeed = data.current.wind_speed;
        const windGust = data.current.wind_gust;
        const direction = getWindDirection(windDeg);
        windElement.innerHTML = formatWind(windSpeed, windGust, direction);
      }

      // Важно: после обновления данных синхронизируем отображение
      // (чтобы не сбилось, если showWind в нужном состоянии)
      const descriptionElement = document.querySelector('.cityWeather');
      const windDisplayElement = document.querySelector('.wind');

      if (descriptionElement && windDisplayElement) {
        if (showWind) {
          descriptionElement.style.display = 'none';
          windDisplayElement.style.display = 'block';
        } else {
          descriptionElement.style.display = 'block';
          windDisplayElement.style.display = 'none';
        }
      }
    })
    .catch((error) => {
      console.error('Ошибка при получении погоды:', error);
    });
}

// ========== ЗАПУСК ==========

// Первоначальная загрузка данных через 1 секунду
setTimeout(() => {
  updateWeather();
}, 1000);

// Автообновление данных каждые 10 минут
setInterval(updateWeather, 600000);

// Переключение отображения: 30 секунд ветер / 30 секунд описание
setInterval(toggleDisplay, 30000); // Переключаем каждые 30 секунд

// Запускаем первое переключение через 30 секунд после загрузки страницы
// Чтобы сразу показать описание (по умолчанию showWind = true, значит сначала ветер)
// Если хотите сначала описание, измените showWind = false
