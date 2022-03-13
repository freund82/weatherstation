
setTimeout(function Currentweather(){
    const currDate = new Date().toLocaleDateString();
    var rr=document.querySelector("#city")
    var Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=data.name+' '+currDate)
  }, 1000)


  function weatherPressure(){
    var rr=document.querySelector("#test")
    var Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=((data.main.pressure)*0.750064).toFixed(0)+" "+"мм")
  }

  function weatherTemperature(){
    var rr=document.querySelector(".Temperature")
    var Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=((data.main.temp)-273.15).toFixed(2)+" "+"&deg; C")
  }

  function weatherCity(){
    var rr=document.querySelector(".cityWeather")
    var Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=(data.weather[0].description))
  }

  setTimeout(weatherPressure, 1000)
  setInterval(weatherPressure, 900000)

  setTimeout(weatherTemperature, 1000)
  setInterval(weatherTemperature, 900000)

  setTimeout(weatherCity, 1000)
  setInterval(weatherCity, 900000)