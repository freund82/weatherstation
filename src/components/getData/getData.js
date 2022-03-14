
setTimeout(function Currentweather(){
    const currDate = new Date().toLocaleDateString();
    let rr=document.querySelector("#city")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>{rr.innerHTML=data.name+' '+currDate;
    var weatherId=data.weather[0].id;
    switch(weatherId){
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
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/11d.png,");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/10d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
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
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/13d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
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
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/09d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
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
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/50d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
            case 800: 
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/01d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
            case 801: 
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/02d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
            case 802: 
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/03d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
            case 803:
            case 804: 
            var xx=document.createElement("img");
            xx.setAttribute("src","http://openweathermap.org/img/wn/04d.png");
            xx.setAttribute("width", "200", "height", "200")
            var kk=document.querySelector(".cityWeatherItem");
            kk.appendChild(xx);
            break;
          }
  
  })
  }, 1000)


  function weatherPressure(){
    let rr=document.querySelector("#pressure")
    let Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(data=>rr.innerHTML=(((data.main.pressure)*0.750064)-18).toFixed(0)+" "+"мм")
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