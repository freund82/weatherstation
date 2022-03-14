import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);




var pres=[]


function chartWeather(){
    var i=0;
    const currDate = new Date().toLocaleDateString();
    var rr=document.querySelector("#city")
    var Lobnya="http://api.openweathermap.org/data/2.5/weather?id=534595&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39";
    fetch(Lobnya)
    .then(responce=>responce.json())
    .then(p=>pres.push((((p.main.pressure)*0.750064)-18).toFixed(0))) 
}


setInterval(chartWeather, 600000)

function local(){
    pres.map((item, index)=>localStorage.setItem(index, item))
}
setInterval(local, 600000)

function clearData(){
    localStorage.clear()
}

setInterval(clearData, 2400000)

setTimeout(function drawChart(){
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "10"],
        datasets: [{
            label: 'мм рт.с',
            data: [localStorage.getItem(0), localStorage.getItem(1), localStorage.getItem(2), localStorage.getItem(3), localStorage.getItem(4), localStorage.getItem(5), localStorage.getItem(6), localStorage.getItem(7), localStorage.getItem(8), localStorage.getItem(9), localStorage.getItem(10)],
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
  })
}, 1000)



export default chartWeather()