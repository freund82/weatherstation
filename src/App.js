import Currentweather from "./components/getData/getData";
import weatherChart from "./components/weatherChart/weatherChart";



function App() {
  return (
    <div className="container">
      <div className="weatherBlock">
      <div className="city">
        <div className="cityWeatherItem">
          
        </div>
        <div className="cityWeather">
          
        </div>
        <div id="city" className="cityDate">
        </div>
      </div>
     {/*Weather block*/}
      <div className="weather">
        <div className="Temperature">
          
        </div>
        <hr></hr>
        
        <div id="pressure">
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
