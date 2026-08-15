<?php
/**
 * Прокси-эндпоинт для OpenWeatherMap OneCall API 3.0
 * PHP-версия сервера для размещения на обычном хостинге.
 *
 * Маршрут: /api/weather
 * Принимает query-параметры: lat, lon, lang, exclude, units
 *
 * Ключ API берётся из переменной окружения OWM_API_KEY
 * (см. документацию хостинга / файл .env), либо из захардкоженного
 * значения по умолчанию, если переменная не задана.
 */

// ---------- Заголовки CORS ----------
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Ответ на preflight-запрос OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---------- Конфигурация ----------
// Ключ из окружения (рекомендуется) с fallback на значение по умолчанию
$APPID = getenv('OWM_API_KEY') ?: '8e17640d1b93c4b9dad01bc0517e26ef';

// ---------- Парсинг входных параметров ----------
$lat     = isset($_GET['lat'])     && $_GET['lat'] !== ''     ? $_GET['lat']     : '56.01';
$lon     = isset($_GET['lon'])     && $_GET['lon'] !== ''     ? $_GET['lon']     : '37.47';
$lang    = isset($_GET['lang'])    && $_GET['lang'] !== ''    ? $_GET['lang']    : 'ru';
$exclude = isset($_GET['exclude']) && $_GET['exclude'] !== '' ? $_GET['exclude'] : 'minutely,hourly,daily';
$units   = isset($_GET['units'])   && $_GET['units'] !== ''   ? $_GET['units']   : 'metric';

// ---------- Формируем URL к OpenWeatherMap ----------
$params = http_build_query([
    'lat'     => $lat,
    'lon'     => $lon,
    'lang'    => $lang,
    'exclude' => $exclude,
    'units'   => $units,
    'appid'   => $APPID,
]);

$url = 'https://api.openweathermap.org/data/3.0/onecall?' . $params;

// ---------- Запрос к OpenWeatherMap ----------
$response = null;
$httpStatus = 500;

if (function_exists('curl_init')) {
    // Вариант 1: cURL (предпочтительно)
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT      => 'WeatherStation-PHP-Proxy/1.0',
    ]);
    $response   = curl_exec($ch);
    $curlErr    = curl_error($ch);
    $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($curlErr) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error'   => 'Внутренняя ошибка сервера',
            'details' => 'cURL: ' . $curlErr,
        ]);
        exit;
    }
} else {
    // Вариант 2: file_get_contents (fallback)
    $context = stream_context_create([
        'http' => [
            'method'        => 'GET',
            'timeout'       => 15,
            'ignore_errors' => true,
            'user_agent'    => 'WeatherStation-PHP-Proxy/1.0',
        ],
        'ssl' => [
            'verify_peer'      => true,
            'verify_peer_name' => true,
        ],
    ]);

    $response = @file_get_contents($url, false, $context);

    // Пытаемся извлечь HTTP-статус из HTTP-заголовков $http_response_header
    if (isset($http_response_header[0]) && preg_match('/HTTP\/\d(?:\.\d)?\s+(\d{3})/', $http_response_header[0], $m)) {
        $httpStatus = (int) $m[1];
    }

    if ($response === false) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error'   => 'Внутренняя ошибка сервера',
            'details' => 'file_get_contents: не удалось выполнить запрос к OpenWeatherMap',
        ]);
        exit;
    }
}

// ---------- Отдаём ответ клиенту ----------
header('Content-Type: application/json; charset=utf-8');
http_response_code($httpStatus);
echo $response;