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
      Wicon         = createElement('img', 'wicon', '', ''),
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
  Wicon.src         = 'http://pluspng.com/img-png/partly-cloudy-png-hd-simple-weather-icons-partly-cloudy-600.png';
  Wicon.width       = '150';

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

  // TOTAL OF 66 IMAGES
  // 11 FOR WEATHER CONDITIONS
  // * 3 ON CLOUD CONDITIONS
  // * 2 PER DAY/NIGHT

  console.log(`Code: ${catchData.weatherPrimaryCoded}`);
  console.log(`Day?: ${catchData.isDay}`);
}

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
