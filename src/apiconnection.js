import * as places from 'places.js';
import { getElement } from './elementsHander';
import { setContent } from './domHandler';

async function getWeather(coordinates) {
  let weatherData = null;

  try {
    const response = await fetch(
      'https://api.aerisapi.com/observations/'
      + `closest?p=${coordinates.lat},${coordinates.lng}`
      + '&limit=1&format=json&filter=allstations'
      + '&fields=ob.isDay,ob.dateTimeISO,ob.tempF,ob.tempC,ob.humidity,ob.windSpeedMPH,ob.windSpeedKPH,ob.windDir,ob.weather,ob.feelslikeF,ob.feelslikeC,ob.weatherPrimaryCoded'
      + `&client_id=${process.env.AERISAPI_APP_ID}`
      + `&client_secret=${process.env.AERISAPI_SECRET_KEY}`,
      { mode: 'cors' },
    );

    console.log(`AERIS_API_APP_ID: ${process.env['fix/set-environment-variables']}`);
    weatherData = await response.json();
  } catch (err) {
    weatherData = await err.json();
    setContent(false, weatherData);
  }

  return weatherData;
}

async function weatherController(placeData) {
  const name = placeData[0];
  let data;
  let date;

  getWeather(placeData[1]).then(weatherData => {
    try {
      data = weatherData.response[0].ob;

      date = new Date(data.dateTimeISO);
      data.dateTimeISO = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      data.placeName = name;
      setContent(true, data);
    } catch (err) {
      setContent(false, err);
    }
  });
}

export default async function getPlace() {
  const placesAutocomplete = await places({
    appID: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SEARCH_ONLY_KEY,
    container: getElement('address-input'),
  });

  console.log(`ALGOLIA_APP_ID: ${process.env.ALGOLIA_APP_ID}`);

  placesAutocomplete.on('change', async e => {
    weatherController([await e.suggestion.name, await e.suggestion.latlng]);
  });
}
