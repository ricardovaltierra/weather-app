import { weatherCodes, cloudCodes } from './apiconnection';
import { getPlace } from './apiconnection';
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
  appendChilds,
  appendToBody,
} from './elementsHander';

let catchData = 
  {
    dateTimeISO: '--',
    feelslikeC: '--',
    feelslikeF: '--',
    humidity: '--',
    isDay: false,
    placeName: 'City',
    tempC: '--',
    tempF: '--',
    weather: '--',
    weatherPrimaryCoded: '::UP',
    windDir: '--',
    windSpeedKPH: '--',
    windSpeedMPH: '--'
  };

function createDivs(childElements){
  let divs = [];

  for (var i = 0; i < childElements.length; ++i) {
      divs[i] = createElement('div', `div${i}`, 'divElement', ``);
      appendChild(divs[i], childElements[i]);
  }
  return divs;
}

function createElements() {
  let main          = createElement('main', '', 'main-container', ''),
      divPlace      = createElement('div', 'divPlace', '', ''),
      place         = createElement('input', 'address-input', 'search-place-input', ''),
      card          = createElement('div', 'main', 'main-card', ''),
      title         = createElement('h1', 'main-title', 'div-element', 'Here\'s your weather!'),
      city          = createElement('h2', 'city-desc', 'div-element', 'City'),
      date          = createElement('p', 'date-desc', 'div-element', 'Date:  --'),
      weather       = createElement('p', 'weather-desc', 'div-element', 'Weather:  --'),
      temperature   = createElement('p', 'temperature-desc', 'div-element', 'Temperature:  -- °C'),
      realFeel      = createElement('p', 'realFeel-desc', 'div-element', 'Real Feel:  -- °C'),
      windSpeed     = createElement('p', 'windSpeed-desc', 'div-element', 'Wind Speed:  -- K/hr'),
      humidity      = createElement('p', 'humidity-desc', 'div-element', 'Humidity:  --'),
      windDirection = createElement('p', 'windDirection-desc', 'div-element', 'Wind Direction:  --'),
      toggleCFDiv   = createElement('div', '', 'field', ''),
      toggleCF      = createElement('input', 'switchCF', 'switch', ''),
      CLabel        = createElement('label', 'clabel', '', 'C°'),
      FLabel        = createElement('label', 'flabel', '', 'F° '),
      Wicon         = createElement('div', 'wicon', 'partly_cloudy', ''),
      childElements,
      divs;

  place.placeholder = 'Current weather of...';
  toggleCF.type     = 'checkbox';
  toggleCF.name     = 'switchCF';
  toggleCF.checked  = 'checked';
  FLabel.htmlFor    = 'switchCF';
  CLabel.htmlFor    = 'switchCF';
  childElements     = [title, city, date, weather, temperature, realFeel, windSpeed, humidity, windDirection, toggleCFDiv];
  divs              = createDivs(childElements);

  appendChild(divPlace, place);
  appendChilds(toggleCFDiv, [FLabel, toggleCF, CLabel]);
  appendChilds(card, divs);
  appendChilds(main, [divPlace, card, Wicon]);

  appendToBody(main);

  setClickListener(toggleCF, setFields);
}

function errorDisplayer() {
  console.log(catchData.message);
  alert("We're sorry, somthing went wrong    :(");
}

function cleanInput() {
  setValue(getElement('address-input'), '');
}

function setImages() {

  let isDay = catchData.isDay;
  let code = catchData.weatherPrimaryCoded;

  // TOTAL OF 66 IMAGES
  // 11 FOR WEATHER CONDITIONS
  // * 3 ON CLOUD CONDITIONS
  // * 2 PER DAY/NIGHT

  console.log(catchData);

  if(isDay) {
    
    if(cloudCodes.clear.test(code)) {
      console.log(`is day and clear ${code}`);
      // getElement('wicon').src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyd3w5tMY-Ml9FStLbNdBT5CUZNv2TUzifb45qNKfROA804C0&s';
    }
    else if (cloudCodes.partly_cloudy.test(code)){
      console.log(`is day and partly cloudy ${code}`);
      getElement('wicon').src = 'http://pluspng.com/img-png/partly-cloudy-png-hd-simple-weather-icons-partly-cloudy-600.png';
    }
    else if (cloudCodes.mostly_cloudy.test(code)){
      console.log(`is day and mostly cloudy ${code}`);
      getElement('wicon').src = 'data:image/jpeg;base64,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';
    }
    else if(weatherCodes.hail.test(code)){
      console.log(`is day with hail ${code}`);
    }
    else if(weatherCodes.dust_sand.test(code)){
      console.log(`is day with dust || sand ${code}`);
    }
    else if(weatherCodes.mist_fog.test(code)){
      console.log(`is day with mist || fog ${code}`);
    }
    else if(weatherCodes.frost_snow.test(code)){
      console.log(`is day with frost || snow ${code}`);
    }
    else if(weatherCodes.smoke.test(code)){
      console.log(`is day with smoke ${code}`);
    }
    else if(weatherCodes.rain_drizzle.test(code)){
      console.log(`is day with rain || drizzle ${code}`);
    }
    else if(weatherCodes.wintry_mix.test(code)){
      console.log(`is day with wintry mix ${code}`);
    }
    else if(weatherCodes.thunderstorm.test(code)){
      console.log(`is day with thunderstorm ${code}`);
    }
    else if(weatherCodes.volc_ash.test(code)){
      console.log(`is day with volcanic ash ${code}`);
    }
    else if(weatherCodes.waterspouts.test(code)){
      console.log(`is day with waterspouts ${code}`);
    }
    else {
      console.log(`is day and with unknown climate ${code}`);
    }

  } else {
    
    if(cloudCodes.clear.test(code)) {
      console.log(`is night and clear ${code}`);
    }
    else if (cloudCodes.partly_cloudy.test(code)){
      console.log(`is night and partly cloudy ${code}`);
      getElement('wicon').src = 'png/21.png';
    }
    else if (cloudCodes.mostly_cloudy.test(code)){
      console.log(`is night and mostly cloudy ${code}`);
      getElement('wicon').src = 'png/21.png';
    }
    else if(weatherCodes.hail.test(code)){
      console.log(`is night with hail ${code}`);
    }
    else if(weatherCodes.dust_sand.test(code)){
      console.log(`is night with dust || sand ${code}`);
    }
    else if(weatherCodes.mist_fog.test(code)){
      console.log(`is night with mist || fog ${code}`);
    }
    else if(weatherCodes.frost_snow.test(code)){
      console.log(`is night with frost || snow ${code}`);
    }
    else if(weatherCodes.smoke.test(code)){
      console.log(`is night with smoke ${code}`);
    }
    else if(weatherCodes.rain_drizzle.test(code)){
      console.log(`is night with rain || drizzle ${code}`);
    }
    else if(weatherCodes.wintry_mix.test(code)){
      console.log(`is night with wintry mix ${code}`);
    }
    else if(weatherCodes.thunderstorm.test(code)){
      console.log(`is night with thunderstorm ${code}`);
    }
    else if(weatherCodes.volc_ash.test(code)){
      console.log(`is night with volcanic ash ${code}`);
    }
    else if(weatherCodes.waterspouts.test(code)){
      console.log(`is night with waterspouts ${code}`);
    }
    else {
      console.log(`is night and with unknown climate ${code}`);
    }

  }
}
// el cairo mist and fog
function setFields() {

  if(getElement('switchCF').checked) {

    setInner(getElement('city-desc'), `${catchData.placeName || 'City'}`);
    setInner(getElement('date-desc'), `Date:  ${catchData.dateTimeISO || '--'}`);
    setInner(getElement('weather-desc'), `Weather:  ${catchData.weather || '--'}`);
    setInner(getElement('temperature-desc'), `Temperature:  ${catchData.tempC || '--'} °C`);
    setInner(getElement('realFeel-desc'), `Real Feel:  ${catchData.feelslikeC || '--'} °C`);
    setInner(getElement('windSpeed-desc'), `Wind Speed:  ${catchData.windSpeedKPH || '--'} K/Hr`);
    setInner(getElement('humidity-desc'), `Humidity:  ${catchData.humidity || '--'}`);
    setInner(getElement('windDirection-desc'), ` Wind direction: ${catchData.windDir || '--'}`);

  } else {

    setInner(getElement('city-desc'), `${catchData.placeName || 'City'}`);
    setInner(getElement('date-desc'), `Date:  ${catchData.dateTimeISO || '--'}`);
    setInner(getElement('weather-desc'), `Weather:  ${catchData.weather || '--'}`);
    setInner(getElement('temperature-desc'), `Temperature:  ${catchData.tempF || '--'} °F`);
    setInner(getElement('realFeel-desc'), `Real Feel:  ${catchData.feelslikeF || '--'} °F`);
    setInner(getElement('windSpeed-desc'), `Wind Speed:  ${catchData.windSpeedMPH || '--'} Mi/hr`);
    setInner(getElement('humidity-desc'), `Humidity:  ${catchData.humidity || '--'}`);
    setInner(getElement('windDirection-desc'), ` Wind direction: ${catchData.windDir || '--'}`);
  }
}

export function setContent(flag, response) {

  catchData = response;

  if (flag) {
    cleanInput();
    setImages();
    setFields();
  } else {
    errorDisplayer();
  }
}

export function render() {
  createElements();
  getPlace();
}
