// График давления: вся история хранится в localStorage,
// поэтому данные не теряются при сворачивании окна/вкладки.
// Очистка происходит ТОЛЬКО при закрытии окна браузера (beforeunload).
import { Chart, registerables } from 'chart.js';
import getApiUrl from '../../apiConfig';

const PRESSURE_HISTORY_KEY = 'pressureHistory'; // Ключ хранения всей истории давления

let pressureValues = [];

// Сохранение ВСЕЙ истории давления в localStorage
function savePressureHistory() {
  try {
    localStorage.setItem(PRESSURE_HISTORY_KEY, JSON.stringify(pressureValues));
  } catch (error) {
    console.error('Не удалось сохранить историю давления:', error);
  }
}

// Загрузка ВСЕЙ истории давления из localStorage
function loadPressureHistory() {
  try {
    const raw = localStorage.getItem(PRESSURE_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        pressureValues = parsed.filter((value) => value !== null && value !== undefined);
      }
    }
  } catch (error) {
    console.error('Не удалось загрузить историю давления:', error);
    pressureValues = [];
  }
}

// Полная очистка истории давления
function clearPressureHistory() {
  localStorage.removeItem(PRESSURE_HISTORY_KEY);
}

Chart.register(...registerables);

let myChart = null;

let lastChartUpdateTime = 0; // Время последнего обновления (защита от частых вызовов)

function chartWeather() {
  // Защита от повторных вызовов за короткий промежуток времени
  // (например, когда обновление запускается и таймером, и событием visibilitychange)
  const now = Date.now();
  if (now - lastChartUpdateTime < 30000) return;
  lastChartUpdateTime = now;

  fetch(getApiUrl())
    .then((responce) => responce.json())
    .then((p) => {
      pressureValues.push((p.current.pressure * 0.750064 - 18).toFixed(0)); // Добавляем новое значение
      savePressureHistory(); // Сохраняем ВСЮ историю, чтобы она не пропала при сворачивании окна
      drawChart(); // Обновляем график
    });
}

setInterval(chartWeather, 600000);

// Если окно было свёрнуто (вкладка работала в фоне или была выгружена браузером),
// при возврате к странице сразу получаем свежие данные, не дожидаясь следующего таймера
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    chartWeather();
  }
});

function drawChart() {
  const canvas = document.getElementById('myChart');
  if (!canvas) return; // Если холст ещё не отрисован React, выходим

  if (myChart) {
    myChart.destroy(); // Уничтожаем предыдущий график
  }
  const ctx = canvas.getContext('2d');

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
          min: 710,
          max: 790,
        },
      },
    },
  });
}

// При загрузке (или восстановлении) страницы возвращаем сохранённую историю.
// Это работает и тогда, когда браузер перезагрузил свёрнутую вкладку:
// история берётся из localStorage целиком, а не начинается с одной точки.
window.addEventListener('load', function () {
  loadPressureHistory();
  if (pressureValues.length > 0) {
    drawChart();
  }
});

// При закрытии окна браузера очищаем историю.
// Сворачивание окна/вкладки НЕ вызывает beforeunload, поэтому данные при этом сохраняются.
window.addEventListener('beforeunload', function () {
  clearPressureHistory();
});

export default chartWeather;

document.onkeydown = function (e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key === 68) {
    clearPressureHistory();
    window.location.reload();
  }
};
