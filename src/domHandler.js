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

async function setData() {
  let places = require('places.js'),
      placesAutocomplete = await places({
        appID: credentials.algolia.APLICATION_ID,
        apiKey: credentials.algolia.SEARCH_ONLY_KEY,
        container: getElement('address-input')
      });
  
  placesAutocomplete.on('change', async e => { 
    const placeData = [await e.suggestion.name, await e.suggestion.latlng];

    let card = createElement('div', 'main', 'card', '');

    getWeather(placeData[1]).then(weatherData => {

      try{
        const data = weatherData.response[0].ob;

        const date = new Date(data.dateTimeISO); 
        const formatedDate = date.getFullYear()+'-' + (date. getMonth()+1) + '-'+date. getDate();
    
        setInner(card, `Here's your weather:
                            <br> ${placeData[0]}
                            <br> Date: ${formatedDate}
                            <br> Weather: ${data.weather}
                            <br> Temp °C: ${data.tempC}
                            <br> Temp °F: ${data.tempF}
                            <br> Real feel °C: ${data.feelslikeC}
                            <br> Real feel °C: ${data.feelslikeF}
                            <br> Wind speed K/h: ${data.windSpeedKPH}
                            <br> Wind speed M/h: ${data.windSpeedMPH}
                            <br> Humidity: ${data.humidity}
                            <br> Wind direction: ${data.windDir}
                            <br> Is day: ${data.isDay}`);

      } catch(err) {
        alert("We're sorry, somthing went wrong    :(");
      }
    });

    let previous = document.getElementById("main");
    if(previous != null){
      previous.remove();
    }
    
    document.getElementById('address-input').value = '';
    document.body.appendChild(card);
  });
}

async function getWeather(placeData) {
  try {
    const response = await fetch(
      `https://api.aerisapi.com/observations/` + 
      `closest?p=${placeData.lat},${placeData.lng}` +
      `&limit=1&format=json&filter=allstations` + 
      `&fields=ob.isDay,ob.dateTimeISO,ob.tempF,ob.tempC,ob.humidity,ob.windSpeedMPH,ob.windSpeedKPH,ob.windDir,ob.weather,ob.feelslikeF,ob.feelslikeC` + 
      `&client_id=${credentials.aerisapi.APP_ID}` + 
      `&client_secret=${credentials.aerisapi.SECRET_KEY}`, 
      {mode: 'cors'}
    );
    const weatherData = await response.json();
  
    return weatherData;
  } catch (err) {
    alert(err);
  }
}

export function render() {
  let place = createElement('input', 'address-input', 'search-place-input', '');
  place.placeholder = "Current weather of..."
  appendChild(document.body, place);
  setData();
}