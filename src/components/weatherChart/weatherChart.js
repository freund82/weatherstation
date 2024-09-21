import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function chartWeather() {
  var LobnyaChart =
    'http://ru.api.openweathermap.org/data/2.5/weather?id=534595&units=metric&lang=ru&appid=0a3b8b46154405dbda0b3fe953256d39';
  fetch(LobnyaChart)
    .then((responce) => responce.json())
    .then((p) => {
      var i = localStorage.length;
      localStorage.setItem(i, (p.main.pressure * 0.750064 - 18).toFixed(0));
      if (localStorage.length - 1 == 71) {
        localStorage.clear();
      } /*(localStorage.length-1==10)?localStorage.clear():null;*/
    }); /*(p=>pres.push((((p.main.pressure)*0.750064)-18).toFixed(0)))*/
}

setInterval(chartWeather, 600000);

setTimeout(function drawChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59',
        '60',
        '61',
        '62',
        '63',
        '64',
        '65',
        '66',
        '67',
        '68',
        '69',
        '70',
        '71',
        '72',
      ],
      datasets: [
        {
          pointRadius: 0, // disable for a single dataset
          label: 'мм рт.с',
          data: [
            localStorage.getItem(0),
            localStorage.getItem(1),
            localStorage.getItem(2),
            localStorage.getItem(3),
            localStorage.getItem(4),
            localStorage.getItem(5),
            localStorage.getItem(6),
            localStorage.getItem(7),
            localStorage.getItem(8),
            localStorage.getItem(9),
            localStorage.getItem(10),
            localStorage.getItem(11),
            localStorage.getItem(12),
            localStorage.getItem(13),
            localStorage.getItem(14),
            localStorage.getItem(15),
            localStorage.getItem(16),
            localStorage.getItem(17),
            localStorage.getItem(18),
            localStorage.getItem(19),
            localStorage.getItem(20),
            localStorage.getItem(21),
            localStorage.getItem(22),
            localStorage.getItem(23),
            localStorage.getItem(24),
            localStorage.getItem(25),
            localStorage.getItem(26),
            localStorage.getItem(27),
            localStorage.getItem(28),
            localStorage.getItem(29),
            localStorage.getItem(30),
            localStorage.getItem(31),
            localStorage.getItem(32),
            localStorage.getItem(33),
            localStorage.getItem(34),
            localStorage.getItem(35),
            localStorage.getItem(36),
            localStorage.getItem(37),
            localStorage.getItem(38),
            localStorage.getItem(39),
            localStorage.getItem(40),
            localStorage.getItem(41),
            localStorage.getItem(42),
            localStorage.getItem(43),
            localStorage.getItem(44),
            localStorage.getItem(45),
            localStorage.getItem(46),
            localStorage.getItem(47),
            localStorage.getItem(48),
            localStorage.getItem(49),
            localStorage.getItem(50),
            localStorage.getItem(51),
            localStorage.getItem(52),
            localStorage.getItem(53),
            localStorage.getItem(54),
            localStorage.getItem(55),
            localStorage.getItem(56),
            localStorage.getItem(57),
            localStorage.getItem(58),
            localStorage.getItem(59),
            localStorage.getItem(60),
            localStorage.getItem(61),
            localStorage.getItem(62),
            localStorage.getItem(63),
            localStorage.getItem(64),
            localStorage.getItem(65),
            localStorage.getItem(66),
            localStorage.getItem(67),
            localStorage.getItem(68),
            localStorage.getItem(69),
            localStorage.getItem(70),
            localStorage.getItem(71),
            localStorage.getItem(72),
          ],
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}, 1000);

function update() {
  window.location.reload();
}
setInterval(update, 599500);

export default chartWeather();

document.onkeydown = function (e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key == 68) {
    localStorage.clear();
    window.location.reload();
  }
};
