function Currentweather() {
  const currDate = new Date().toLocaleDateString();
  let rr = document.querySelector('#city');
  let alertBlock = document.querySelector('.alertBlock');
  let alert = document.querySelector('.alert');
  let Lobnya =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://ru.api.openweathermap.org/data/3.0/onecall?lat=56.01&lon=37.47&lang=ru&exclude=minutely,hourly,daily&units=metric&appid=6ec173dc6f65d2c9a0e7cbe434e68bb8',
    ); //Так нужно делать через создание прокси так как бесплатный план не позволяет делать запросы напрямую из-за политики cors в openweathermap
  fetch(Lobnya)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      /*alert info*/
      if (data?.alerts) {
        alertBlock.style.opacity = 1;
        alert.innerHTML = `ALLERT!!! ${data.alerts.description}`;
      }
      /*end alert info*/
      rr.innerHTML = 'Лобня' + ' ' + currDate;
      var weatherId = data.current.weather[0].id;
      switch (weatherId) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/11d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/10d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 511:
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/13d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
        case 520:
        case 521:
        case 522:
        case 531:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/09d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/50d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 800:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/01d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 801:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/02d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 802:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/03d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
        case 803:
        case 804:
          var xx = document.createElement('img');
          xx.setAttribute('src', 'https://openweathermap.org/img/wn/04d.png');
          xx.setAttribute('width', '200', 'height', '200');
          var kk = document.querySelector('.cityWeatherItem');
          kk.innerHTML = '';
          kk.appendChild(xx);
          break;
      }
      var humid = document.querySelector('#hum');
      humid.innerHTML = `${data.current.humidity} %`;
      var wind = document.querySelector('.wind');
      if (data.current.wind_deg === 0 || data.current.wind_deg === 359) {
        wind.innerHTML = `c ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg > 0 && data.current.wind_deg < 90) {
        wind.innerHTML = `св ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg === 90) {
        wind.innerHTML = `в ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg > 90 && data.current.wind_deg < 180) {
        wind.innerHTML = `юв ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg === 180) {
        wind.innerHTML = `ю ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg > 180 && data.current.wind_deg < 270) {
        wind.innerHTML = `юз ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg === 270) {
        wind.innerHTML = `з ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else if (data.current.wind_deg > 270 && data.current.wind_deg < 359) {
        wind.innerHTML = `cз ${data.current.wind_speed} (${data.current.wind_gust})м/с`;
      } else {
        wind.innerHTML = `штиль`;
      }
    });
}

function weatherPressure() {
  let rr = document.querySelector('#pressure');
  let Lobnya =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://ru.api.openweathermap.org/data/3.0/onecall?lat=56.01&lon=37.47&lang=ru&exclude=minutely,hourly,daily&units=metric&appid=6ec173dc6f65d2c9a0e7cbe434e68bb8',
    );
  fetch(Lobnya)
    .then((response) => response.json())
    .then(
      (data) => (rr.innerHTML = (data.current.pressure * 0.750064 - 18).toFixed(0) + ' ' + 'мм'),
    );
}

function weatherTemperature() {
  let rr = document.querySelector('.Temperature');
  let Lobnya =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://ru.api.openweathermap.org/data/3.0/onecall?lat=56.01&lon=37.47&lang=ru&exclude=minutely,hourly,daily&units=metric&appid=6ec173dc6f65d2c9a0e7cbe434e68bb8',
    );
  fetch(Lobnya)
    .then((response) => response.json())
    .then((data) => (rr.innerHTML = data.current.temp.toFixed(0) + ' ' + '&deg;C'));
}

function weatherCity() {
  let rr = document.querySelector('.cityWeather');
  let Lobnya =
    'https://api.codetabs.com/v1/proxy?quest=' +
    encodeURIComponent(
      'https://ru.api.openweathermap.org/data/3.0/onecall?lat=56.01&lon=37.47&lang=ru&exclude=minutely,hourly,daily&units=metric&appid=6ec173dc6f65d2c9a0e7cbe434e68bb8',
    );
  fetch(Lobnya)
    .then((response) => response.json())
    .then((data) => (rr.innerHTML = `${data.current.weather[0].description}`));
}

function weatherCityDisplayHide() {
  var disp = document.querySelector('.cityWeather');
  var dispWind = document.querySelector('.wind');
  disp.style.display = 'none';
  dispWind.style.display = 'block';
}

setInterval(weatherCityDisplayHide, 30000);

function weatherCityDisplayShow() {
  var disp = document.querySelector('.cityWeather');
  var dispWind = document.querySelector('.wind');
  disp.style.display = 'block';
  dispWind.style.display = 'none';
}
setInterval(weatherCityDisplayShow, 60000);

/*Пропоруия по таймеру 1 к 2 30 секунд выключено и 60 секунд включено. У меня в коде ясно горит 30 секунд и затем на 30 секунд отключается и в это время 30 секунд горит ветер*/

/*function weatherCityZ(){
    let rr=document.querySelector(".cityWeather")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&units=metric&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>console.log(data))
  }*/

setTimeout(Currentweather, 1000);
setInterval(Currentweather, 600000);

setTimeout(weatherPressure, 1000);
setInterval(weatherPressure, 600000);

setTimeout(weatherTemperature, 1000);
setInterval(weatherTemperature, 600000);

setTimeout(weatherCity, 1000);
setInterval(weatherCity, 600000);

/*setTimeout(weatherCityZ, 1000)
  setInterval(weatherCityZ, 600000)*/
