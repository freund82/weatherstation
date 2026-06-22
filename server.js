const express = require('express');
const app = express();
const PORT = 3001;

// CORS для разработки (фронтенд на 3000 порту)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Прокси-эндпоинт для OpenWeatherMap OneCall API 3.0
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

app.listen(PORT, () => {
  console.log(`[SERVER] Прокси-сервер запущен на http://localhost:${PORT}`);
  console.log(`[SERVER] Эндпоинт: http://localhost:${PORT}/api/weather`);
});
