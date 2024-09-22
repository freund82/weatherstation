import { Chart, registerables } from 'chart.js';

let pressureValues = [];

// Сохранение последнего значения давления в localStorage перед закрытием окна браузера
window.addEventListener('beforeunload', function () {
  const lastPressureValue = pressureValues[pressureValues.length - 1];
  localStorage.setItem('lastPressureValue', lastPressureValue);
});

// Загрузка последнего значения давления из localStorage при открытии окна
window.addEventListener('load', function () {
  const lastPressureValue = localStorage.getItem('lastPressureValue');
  if (lastPressureValue !== null) {
    pressureValues.push(lastPressureValue);
    drawChart();
  }
});

Chart.register(...registerables);

let myChart = null;

function chartWeather() {
  var LobnyaChart =
    'https://ru.api.openweathermap.org/data/2.5/weather?id=534595&units=metric&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39';
  fetch(LobnyaChart)
    .then((responce) => responce.json())
    .then(
      (p) => {
        pressureValues.push((p.main.pressure * 0.750064 - 18).toFixed(0)); // Add new value to pressureValues array
        drawChart(); // Update chart with new data
      } /*(localStorage.length-1==10)?localStorage.clear():null;*/,
    ); /*(p=>pres.push((((p.main.pressure)*0.750064)-18).toFixed(0)))*/
}

setInterval(chartWeather, 600000);

function drawChart() {
  if (myChart) {
    myChart.destroy(); // Destroy the previous chart
  }
  const ctx = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: pressureValues.map((value, index) => `${index + 1}`),
      datasets: [
        {
          pointRadius: 0, // disable for a single dataset
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
          min: 720,
          max: 790,
        },
      },
    },
  });
}

//setInterval(drawChart, 599500);

export default chartWeather();

document.onkeydown = function (e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key === 68) {
    localStorage.clear();
    window.location.reload();
  }
};
