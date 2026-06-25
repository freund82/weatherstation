const express = require('express');
const path = require('path');
const app = express();

// Порт из окружения Render или 3001 для локальной разработки
const PORT = process.env.PORT || 3001;

// ========== CORS ==========
// Должен быть ПЕРЕД всеми маршрутами, включая статику
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ========== PRODUCTION: раздача статики React ==========
// В production режиме сервер отдаёт собранную React-статику из папки build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// ========== Прокси-эндпоинт для OpenWeatherMap OneCall API 3.0 ==========
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon, lang, exclude, units } = req.query;

    const params = new URLSearchParams({
      lat: lat || '56.01',
      lon: lon || '37.47',
      lang: lang || 'ru',
      exclude: exclude || 'minutely,hourly,daily',
      units: units || 'metric',
      appid: '8e17640d1b93c4b9dad01bc0517e26ef',
    });

    const url = `https://api.openweathermap.org/data/3.0/onecall?${params.toString()}`;

    console.log(
      `[SERVER] Прокси-запрос к OpenWeatherMap: ${url.replace(params.get('appid'), '***')}`,
    );

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[SERVER] Ошибка OpenWeatherMap: ${response.status} ${errorText}`);
      return res.status(response.status).json({
        error: `OpenWeatherMap вернул ошибку ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[SERVER] Внутренняя ошибка сервера:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера', details: error.message });
  }
});

// ========== SPA fallback (только production) ==========
// Этот маршрут должен быть ПОСЛЕДНИМ — срабатывает только если
// ни один из вышестоящих middleware не обработал запрос
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Прокси-сервер запущен на порту ${PORT}`);
  console.log(`[SERVER] Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SERVER] Эндпоинт: /api/weather`);
});
