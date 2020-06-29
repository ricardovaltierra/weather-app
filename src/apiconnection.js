import * as credentials from './credentials';
import { setContent } from './domHandler';
import { getElement } from './elementsHander';

export const cloudCodes = {
  clear: /:(CL|FW)$/i,
  partly_cloudy: /:SC$/i,
  mostly_cloudy: /:(BK|OV)$/i
}

export const weatherCodes = {
  hail: /:A$/i,
  dust_sand: /:(BD|BN)$/i,
  mist_fog: /:(BR|BS|BY|F|H|IF|ZF)$/i,
  frost_snow: /:(FR|IC|IP|S|SW|SI)$/i,
  smoke: /:K$/i,
  rain_drizzle: /:(L|R|RW|RS|ZL|ZR|ZY)$/i,
  wintry_mix: /:WM$/i,
  thunderstorm: /:T$/i,
  unknown: /:UP$/i,
  volc_ash: /:VA$/i,
  waterspouts: /:WP$/i
};

export async function getPlace() {
  const places = require('places.js');
  const placesAutocomplete = await places({
    appID: credentials.algolia.APLICATION_ID,
    apiKey: credentials.algolia.SEARCH_ONLY_KEY,
    container: getElement('address-input'),
  });

  placesAutocomplete.on('change', async e => {
    weatherController([await e.suggestion.name, await e.suggestion.latlng]);
  });
}

export async function getWeather(coordinates) {
  try {
    const response = await fetch(
      'https://api.aerisapi.com/observations/'
      + `closest?p=${coordinates.lat},${coordinates.lng}`
      + '&limit=1&format=json&filter=allstations'
      + '&fields=ob.isDay,ob.dateTimeISO,ob.tempF,ob.tempC,ob.humidity,ob.windSpeedMPH,ob.windSpeedKPH,ob.windDir,ob.weather,ob.feelslikeF,ob.feelslikeC,ob.weatherPrimaryCoded'
      + `&client_id=${credentials.aerisapi.APP_ID}`
      + `&client_secret=${credentials.aerisapi.SECRET_KEY}`,
      { mode: 'cors' },
    );
    const weatherData = await response.json();

    return weatherData;
  } catch (err) {
    errorDisplayer(err);
  }
}

async function weatherController(placeData) {
  let data;
  let date;
  let formatedDate;

  getWeather(placeData[1]).then(weatherData => {
    try {
      data = weatherData.response[0].ob;

      date = new Date(data.dateTimeISO);
      data.dateTimeISO = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      data.placeName = placeData[0];
      setContent(true, data);
    } catch (err) {
      setContent(false, err);
    }
  });
}