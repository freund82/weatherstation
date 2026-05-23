import Currentweather from './components/getData/getData';
import weatherChart from './components/weatherChart/weatherChart';
import SunImg from './assets/icons/sun.png';

function App() {
  return (
    <div className="container">
      {/*Sunrise and sunset block*/}
      <div className="sunBlock">
        <img id="sun" className="sunImg" src={SunImg} className="sunImg" alt="sun"></img>
        <div className="sunRiseTime">
          <div>
            <span>Восход</span>
            <br></br>
            <span id="sunrise"></span>
          </div>
          <div>
            <span>Закат</span>
            <br></br>
            <span id="sunset"></span>
          </div>
        </div>
        <div className="horizon" id="horizon"></div>
      </div>
      {/*End*/}
      <div className="weatherBlock">
        <div className="city">
          <div className="cityWeatherItem"></div>
          {/*Weather alerts*/}
          <div className="alertBlock">
            <pre className="alert">Alert!!!</pre>
            {/*Данный тег отображает текст так, как его изначально напечатали*/}
          </div>
          {/*End*/}
          <div className="cityW">
            <span className="cityWeather"></span>
            <span className="wind"></span>
          </div>
          <div id="city" className="cityDate"></div>
        </div>
        {/*Weather block*/}
        <div className="weather">
          <div className="Temperature"></div>
          <hr></hr>
          <div className="press">
            <span id="pressure"></span> <span>/</span> <span id="hum"></span>
          </div>

          <hr></hr>

          <div className="chart">
            <h4 className="chartTitle">График давления</h4>
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
        {/*End*/}
      </div>
    </div>
  );
}

export default App;
