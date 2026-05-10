import Currentweather from './components/getData/getData';
import weatherChart from './components/weatherChart/weatherChart';

function App() {
  return (
    <div className="container">
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
