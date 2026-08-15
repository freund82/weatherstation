/**
 * Конфигурация API-эндпоинта.
 *
 * Возвращает полный URL для запросов к прокси погоды.
 *
 * Логика:
 * - На localhost используется Node-прокси (порт 3001) для разработки.
 * - На продакшене путь вычисляется относительно каталога приложения.
 *   Это позволяет размещать проект как в корне сайта (=> /api/weather),
 *   так и во вложенной папке (например /weatherstation/ => /weatherstation/api/weather).
 */

function getApiUrl() {
  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Локальная разработка: Node-прокси на порту 3001
  if (isLocalhost) {
    return 'http://localhost:3001/api/weather';
  }

  // Продакшен: вычисляем базовый каталог приложения из текущего пути страницы.
  // Примеры:
  //   https://site.ru/                    -> base ''        -> /api/weather
  //   https://site.ru/weatherstation/     -> base '/weatherstation' -> /weatherstation/api/weather
  let base = window.location.pathname.replace(/\/+$/, '');
  base = base.replace(/\/index\.html$/, '');

  return `${base}/api/weather`;
}

export default getApiUrl;
