
setTimeout(function Currentweather(){
    const currDate = new Date().toLocaleDateString();
    let rr=document.querySelector("#city")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=data.name+' '+currDate)
  }, 1000)


  function weatherPressure(){
    let rr=document.querySelector("#test")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=((data.main.pressure)*0.750064).toFixed(0)+" "+"мм")
  }

  function weatherTemperature(){
    let rr=document.querySelector(".Temperature")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=((data.main.temp)-273.15).toFixed(0)+" "+"&deg;C")
  }

  function weatherCity(){
    let rr=document.querySelector(".cityWeather")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=(data.weather[0].description))
  }

  function weatherCityZ(){
    let rr=document.querySelector(".cityWeather")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>console.log(data))
  }

  setTimeout(weatherPressure, 1100)
  setInterval(weatherPressure, 900000)

  setTimeout(weatherTemperature, 1200)
  setInterval(weatherTemperature, 900000)

  setTimeout(weatherCity, 1300)
  setInterval(weatherCity, 900000)

  setTimeout(weatherCityZ, 1400)
  setInterval(weatherCityZ, 900000)