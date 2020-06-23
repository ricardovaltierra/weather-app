import * as credentials from './credentials';
import {
  createElement,
  getElement,
  setInner,
  setClickListener,
  addToClass,
  setToClass,
  removeToClass,
  addToInner,
  setValue,
  appendChild,
} from './elementsHander';


async function getWeather() {
  try {
    const response = await fetch(
      `https://api.aerisapi.com/observations/` + 
      `guanajuato,mx?` + 
      `&format=json&filter=allstations&limit=1` + 
      `&fields=id,ob.dateTimeISO,ob.tempF,ob.tempC,ob.humidity,ob.windSpeedMPH,ob.windSpeedKPH,ob.windDir,ob.weather,ob.feelslikeF,ob.feelslikeC` + 
      `&client_id=${credentials.id}` + 
      `&client_secret=${credentials.key}`, 
      {mode: 'cors'}
    );
    const weatherData = await response.json();
  
    return weatherData;
  } catch (err) {
    alert(err);
  }
}

function setCard() {
  let container = createElement('div', 'main', 'card', '');


  getWeather().then((weatherData) => {
    const data = weatherData.response.ob;
    let dateTimeISO,
        weather,
        tempC,
        tempF,
        feelslikeC,
        feelslikeF,
        windSpeedKPH,
        windSpeedMPH,
        humidity,
        windDir;

    setInner(container, `Your weather:
                         <br> Date: ${data.dateTimeISO}
                         <br> Weather: ${data.weather}
                         <br> Temp °C: ${data.tempC}
                         <br> Temp °F: ${data.tempF}
                         <br> Real feel °C: ${data.feelslikeC}
                         <br> Real feel °C: ${data.feelslikeF}
                         <br> Wind speed K/h: ${data.windSpeedKPH}
                         <br> Wind speed M/h: ${data.windSpeedMPH}
                         <br> Humidity: ${data.humidity}
                         <br> Wind direction: ${data.windDir}`);

    console.log(data);
  });
  

  return container;
}

export function render() {
  
  appendChild(document.body, setCard());
}