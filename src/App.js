import Currentweather from "./components/getData/getData";



function App() {
  var x="Test"
  return (
    <div className="container">
      <div className="weatherBlock">
      <div className="city">
        <div className="cityWeatherItem">
          {x}
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
        <div id="test">
        </div>
      </div>
      {/*End*/}
      </div>
    </div>
  );
}

export default App;
