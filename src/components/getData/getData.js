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
  const gustRounded = gust ? gust.toFixed(2) : false;

  return `${direction} ${speedRounded} ${gustRounded ? `(${gustRounded})` : ''} м/с`; //Если данных по порыву ветра нет, то выводим только скорость
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

  if (alertText.length > 100 && alertText.length < 250) {
    let alertBlock = document.querySelector('.alertBlock');
    alertBlock.style.height = '10rem';
    return alertText;
  } else if (alertText.length > 250) {
    let alertBlock = document.querySelector('.alertBlock');
    alertBlock.style.height = '20rem';
    return alertText;
  }

  return alertText;
}

// ========== ВРЕМЯ РАССВЕТА И ЗАКАТА ==========

let sunriseMinutesGlobal, sunsetMinutesGlobal, dayLengthGlobal;
let sunInterval = null; // ЗАПУСК ДВИЖЕНИЯ СОЛНЦА

const GROUND_HEIGHT = 1; // Высота земли в пикселях

function SunriseSunset(weatherData) {
  weatherData.sunrise =
    weatherData.sunrise.getHours().toString().padStart(2, '0') +
    ':' +
    weatherData.sunrise.getMinutes().toString().padStart(2, '0'); //Время рассвета в формате ЧЧ:ММ
  weatherData.sunset =
    weatherData.sunset.getHours().toString().padStart(2, '0') +
    ':' +
    weatherData.sunset.getMinutes().toString().padStart(2, '0'); //Время заката в формате ЧЧ:ММ

  // Конвертируем "HH:MM" в минуты от полуночи
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Сохраняем в глобальные переменные
  sunriseMinutesGlobal = timeToMinutes(weatherData.sunrise);
  sunsetMinutesGlobal = timeToMinutes(weatherData.sunset);
  dayLengthGlobal = sunsetMinutesGlobal - sunriseMinutesGlobal;

  // Конвертируем минуты в "HH:MM"
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  // Получаем данные о рассвете и закате из объекта
  const sunriseMinutes = timeToMinutes(weatherData.sunrise);
  const sunsetMinutes = timeToMinutes(weatherData.sunset);
  const dayLength = sunsetMinutes - sunriseMinutes; // продолжительность дня в минутах

  // Отображаем рассвет и закат в интерфейсе
  document.getElementById('sunrise').innerText = weatherData.sunrise;
  document.getElementById('sunset').innerText = weatherData.sunset;

  // Элементы
  const sun = document.getElementById('sun');
  const horizon = document.getElementById('horizon');

  // Запускаем движение солнца
  startSunMovement();
}

// Функция для вычисления позиции солнца на дуге
// Процент дня от 0 (рассвет) до 1 (закат)
function getSunPosition(percent, horizon) {
  // Ограничиваем percent от 0 до 1
  percent = Math.min(1, Math.max(0, percent));

  // Ширина контейнера
  const containerWidth = horizon.clientWidth;
  const containerHeight = horizon.clientHeight;

  // Земля занимает нижние 80px, значит "небо" высотой containerHeight - 80
  const skyHeight = containerHeight - GROUND_HEIGHT;

  // X: от 5% слева до 95% справа (чтобы солнце не упиралось в края)
  const minX = containerWidth * 0.05;
  const maxX = containerWidth * 0.95;
  const x = minX + (maxX - minX) * percent;

  // Y: по синусоиде - в полдень (percent = 0.5) максимальная высота
  // В процентах: максимальная высота = 70% от высоты неба
  const maxHeightPercent = 0.7;
  const maxHeight = skyHeight * maxHeightPercent;

  // sin(pi * percent) даёт 0 в начале и конце, 1 в середине
  const yFactor = Math.sin(Math.PI * percent);
  // Высота от земли: чем больше yFactor, тем выше
  const heightFromGround = maxHeight * yFactor;

  // Y координата = высота неба - высота от земли + смещение от земли
  const y = containerHeight - GROUND_HEIGHT - heightFromGround + 20;

  return { x, y };
}

// Обновить положение солнца по текущему времени (в минутах)
function updateSunByMinutes(currentMinutes, sunriseMinutes, sunsetMinutes, dayLength) {
  // Если текущее время вне диапазона рассвет-закат -> солнце не видно или за горизонтом
  let percent = 0;
  let isDay = true;
  const sun = document.getElementById('sun');

  if (!sun) return; // Если элемента нет, выходим

  if (currentMinutes <= sunriseMinutes) {
    // До рассвета -> солнце в 0% (на горизонте слева, но невидимо)
    percent = 0;
    isDay = false;
  } else if (currentMinutes >= sunsetMinutes) {
    // После заката -> солнце в 100% (за горизонтом справа)
    percent = 1;
    isDay = false;
  } else {
    // Дневное время: рассчитываем процент от рассвета до заката
    percent = (currentMinutes - sunriseMinutes) / dayLength;
    isDay = true;
  }

  // Показываем/скрываем солнце в зависимости от времени суток
  if (isDay && dayLength > 0) {
    sun.style.display = 'block';
    const horizon = document.getElementById('horizon');
    if (horizon) {
      const { x, y } = getSunPosition(percent, horizon);
      sun.style.left = `${x - sun.offsetWidth / 2}px`;
      sun.style.bottom = `${y}px`;
      sun.style.top = 'auto'; // используем bottom для удобства

      // Дополнительно меняем яркость/размер в зависимости от высоты
      const brightness = 0.5 + Math.sin(Math.PI * percent) * 0.5;
      sun.style.opacity = 0.7 + brightness * 0.3;
      sun.style.transform = `scale(${0.8 + brightness * 0.4})`;
    }
  } else {
    // Если ночь - прячем солнце или делаем тусклым под горизонтом
    sun.style.display = 'none';
  }
}

// Получить текущее реальное время в минутах
function getCurrentRealMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function startSunMovement() {
  // Останавливаем старый интервал, если есть
  if (sunInterval) clearInterval(sunInterval);

  // Функция обновления
  function updateSunPosition() {
    if (
      sunriseMinutesGlobal !== undefined &&
      sunsetMinutesGlobal !== undefined &&
      dayLengthGlobal > 0
    ) {
      const currentMinutes = getCurrentRealMinutes();
      updateSunByMinutes(
        currentMinutes,
        sunriseMinutesGlobal,
        sunsetMinutesGlobal,
        dayLengthGlobal,
      );
    }
  }

  // Обновляем сразу
  updateSunPosition();

  // И каждую минуту
  sunInterval = setInterval(updateSunPosition, 60000);
}

// Также добавляем обновление при изменении размера окна
window.addEventListener('resize', () => {
  if (
    sunriseMinutesGlobal !== undefined &&
    sunsetMinutesGlobal !== undefined &&
    dayLengthGlobal > 0
  ) {
    const currentMinutes = getCurrentRealMinutes();
    updateSunByMinutes(currentMinutes, sunriseMinutesGlobal, sunsetMinutesGlobal, dayLengthGlobal);
  }
});

// ========== ОКОНЧАНИЕ ВРЕМЯ РАССВЕТА И ЗАКАТА ==========

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
  const url = 'http://localhost:3001/api/weather';

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

      // 9. Время рассвета и заката
      if (data?.current?.sunrise && data?.current?.sunset) {
        const sunrise = new Date(data.current.sunrise * 1000);
        const sunset = new Date(data.current.sunset * 1000);
        const weatherData = {
          sunrise, // рассвет (утро)
          sunset, // закат (вечер)
        };

        SunriseSunset(weatherData);
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
