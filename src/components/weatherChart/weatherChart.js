import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

let pressureValues = [];
let myChart = null;

// Сохранение последнего значения давления в localStorage перед закрытием окна браузера
window.addEventListener('beforeunload', function () {
  if (pressureValues.length > 0) {
    const lastPressureValue = pressureValues[pressureValues.length - 1];
    localStorage.setItem('lastPressureValue', lastPressureValue);
  }
});

// Загрузка последнего значения давления из localStorage при открытии окна
window.addEventListener('load', function () {
  const lastPressureValue = localStorage.getItem('lastPressureValue');
  if (lastPressureValue !== null && !isNaN(lastPressureValue)) {
    pressureValues.push(lastPressureValue);
    drawChart();
  }
});

function chartWeather() {
  const weatherApiUrl =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://api.openweathermap.org/data/2.5/weather?id=534595&units=metric&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39',
    );

  fetch(weatherApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then((data) => {
      const pressureValue = (data.main.pressure * 0.750064 - 18).toFixed(0);
      pressureValues.push(pressureValue);
      drawChart();
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
}

function drawChart() {
  if (myChart) {
    myChart.destroy(); // Уничтожить предыдущий график
  }

  const ctx = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: pressureValues.map((value, index) => `${index + 1}`),
      datasets: [
        {
          pointRadius: 0, // Отключить точки на графике
          label: 'мм рт.с',
          data: pressureValues,
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 710,
          max: 790,
        },
      },
    },
  });
}

// Обновление данных каждые 10 минут
setInterval(chartWeather, 600000);

// Очистка localStorage и перезагрузка страницы при нажатии клавиши "D"
document.onkeydown = function (e) {
  e = e || window.event;
  const key = e.which || e.keyCode;
  if (key === 68) {
    localStorage.clear();
    pressureValues = []; // Очистить массив значений
    window.location.reload();
  }
};

export default chartWeather;
