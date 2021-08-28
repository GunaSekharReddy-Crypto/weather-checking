import './App.css';
import React,{useState} from 'react';
import background from './background.gif';
function App(props) {
  // const {data} = props;
  const[city,setCity] = useState("")
  const[result,setResult]= useState("")
  const [max,setMax] =useState("");
  const [min,setMin] =useState("");
  const[visibility,setVisibility]= useState("")
  const [pressure,setPressure]=useState("") 
  const [error,setError] =useState("")
  const [humidity,setHumidity]= useState("")
  const [weather,setWeather]= useState("")
  const [iconurl,setIconUrl] =useState("") 

  const changeHandler = e =>{
    setCity(e.target.value)
  }
  const submitHandler = e =>{
    e.preventDefault();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=965331836319fb6ffcb9f455afc94bf0`).then(
    response => response.json()
    ).then(data =>{
      const kelvin =data.main.temp;
      const celcius = kelvin-273.15;
      console.log(data);
      const max = data.main.temp_max-273.15;
      const min = data.main.temp_min-273.15;
      const pressure=data.main.pressure;
      const humidity =data.main.humidity;
      const weather =data.weather[0].main;
      const visibility = data.visibility/1000;
      setResult( "Temperature in " +city +" is \n " +Math.round(celcius)+" °C" );
      setHumidity(" " +Math.round(humidity)+" %")
      setWeather(" "+weather+"")
      setCity(" ");
      setVisibility(" "+visibility+ "km")
      setMax(""+Math.round(max)+"")
      setMin(""+Math.round(min)+"")
      setPressure(""+pressure+"hPa")

      setIconUrl("http://openweathermap.org/img/wn/" + `${data.weather[0].icon}`+ ".png");
    }).catch(error => 
    setError("Please Enter Correct Name of the Place/Refresh the Page")
   

    );
  }

  return (
    <div className="App">
      <div className="card" style={{ 
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',

}}>
        <div className="card-body">
         
          <div className="card-title" style={{color:"white",fontFamily:"sans-serif",fontSize:"25px"}}>Weather App ☁️</div>
          {city.length===1?<h6 style={{color:"white"}}>{new Date().toLocaleTimeString()}</h6>:<h6></h6>}
          <form onSubmit={submitHandler} style={{fontFamily: "Asap"}}>
            <input type="text" placeholder="Search by location" value={city} onChange={changeHandler}/><br/><br/>
            <input type="submit" value="Get Temperature"/><br/>
          </form>
          <img src={iconurl} className="weather-icon"></img><span style={{color:"white",fontSize:"10px"}}>{weather}</span>

         {city.length===1 ? <h3 style={{color:"white"}}>{result}</h3>:<h6 style={{color:"red"}}>{error}</h6>}
        
        {city.length===1 ?<table>
          <tr>
            <th>Humidity</th>
            <th>Visibility</th>
            <th>Pressure</th>
            <th>Max/Min</th>

          </tr>
          <tr>
            <td>{humidity}</td>
            <td>{visibility}</td>
            <td>{pressure}</td>
            <td>{max}/{min} °C</td>
          </tr>
        </table>:<span>No data loaded</span>}
        </div>
      </div>
    </div>
  );
}

export default App;

