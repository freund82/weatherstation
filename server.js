const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Порт из окружения Render или 3001 для локальной разработки
const PORT = process.env.PORT || 3001;

// Определяем production: либо NODE_ENV, либо наличие папки build
const isProduction =
  process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, 'build'));

// ========== CORS ==========
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
if (isProduction) {
  console.log(`[SERVER] Production режим: раздача статики из build/`);
  app.use(express.static(path.join(__dirname, 'build')));
} else {
  console.log(`[SERVER] Development режим: статика не раздаётся`);
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
if (isProduction) {
  app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'build', 'index.html');
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(500).send('Build not found. Run "npm run build" first.');
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Прокси-сервер запущен на порту ${PORT}`);
  console.log(`[SERVER] Режим: ${isProduction ? 'production' : 'development'}`);
  console.log(`[SERVER] Эндпоинт: /api/weather`);
});
