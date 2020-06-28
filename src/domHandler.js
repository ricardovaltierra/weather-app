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

export let dataArray = {
  name: 'City',
  data: 
    {
    feelslikeC: '--',
    feelslikeF: '--',
    humidity: '--',
    isDay: false,
    tempC: '--',
    tempF: '--',
    weather: '--',
    weatherPrimaryCoded: '--',
    windDir: '--',
    windSpeedKPH: '--',
    windSpeedMPH: '--'
    },
  date: '--'

  
};

export function cleanInput() {
  getElement('address-input').value = '';
}

export function errorDisplayer(err) {
  console.log(err.message);
  alert("We're sorry, somthing went wrong    :(");
}

function createDivs(childElements){
  let divs = [];

  for (var i = 0; i < childElements.length; ++i) {
      divs[i] = createElement('div', `div${i}`, 'divElement', ``);
      appendChild(divs[i], childElements[i]);
  }
  return divs;
}

function createElements() {
  let place = createElement('input', 'address-input', 'search-place-input', ''),
      card = createElement('div', 'main', 'main-card', ''),
      title = createElement('h1', 'main-title', 'div-element', 'Here\'s your weather!'),
      city = createElement('h2', 'city-desc', 'div-element', 'City'),
      date = createElement('p', 'date-desc', 'div-element', 'Date:  --'),
      weather = createElement('p', 'weather-desc', 'div-element', 'Weather:  --'),
      temperature = createElement('p', 'temperature-desc', 'div-element', 'Temperature:  -- °C'),
      realFeel = createElement('p', 'realFeel-desc', 'div-element', 'Real Feel:  -- °C'),
      windSpeed = createElement('p', 'windSpeed-desc', 'div-element', 'Wind Speed:  -- K/hr'),
      humidity = createElement('p', 'humidity-desc', 'div-element', 'Humidity:  --'),
      windDirection = createElement('p', 'windDirection-desc', 'div-element', 'Wind Direction:  --'),
      toggleCFDiv = createElement('div', '', 'field', ''),
      toggleCF = createElement('input', 'switchCF', 'switch', ''),
      CLabel = createElement('label', 'clabel', '', 'C°'),
      FLabel = createElement('label', 'flabel', '', 'F° '),
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

  appendChilds(toggleCFDiv, [FLabel, toggleCF, CLabel]);
  appendChilds(card, divs);

  appendToBody(place);
  appendToBody(card);

  setClickListener(toggleCF, setFields);
}

export function setFields() {

  let data= dataArray.data;

  if(getElement('switchCF').checked) {

    setInner(getElement('city-desc'), `${dataArray.name || '--'}`);
    setInner(getElement('date-desc'), `Date:  ${dataArray.date || '--'}`);
    setInner(getElement('weather-desc'), `Weather:  ${data.weather || '--'}`);
    setInner(getElement('temperature-desc'), `Temperature:  ${data.tempC || '--'} °C`);
    setInner(getElement('realFeel-desc'), `Real Feel:  ${data.feelslikeC || '--'} °C`);
    setInner(getElement('windSpeed-desc'), `Wind Speed:  ${data.windSpeedKPH || '--'} K/Hr`);
    setInner(getElement('humidity-desc'), `Humidity:  ${data.humidity || '--'}`);
    setInner(getElement('windDirection-desc'), ` Wind direction: ${data.windDir || '--'}`);

  } else {

    setInner(getElement('city-desc'), `${dataArray.name || '--'}`);
    setInner(getElement('date-desc'), `Date:  ${dataArray.date || '--'}`);
    setInner(getElement('weather-desc'), `Weather:  ${data.weather || '--'}`);
    setInner(getElement('temperature-desc'), `Temperature:  ${data.tempF || '--'} °F`);
    setInner(getElement('realFeel-desc'), `Real Feel:  ${data.feelslikeF || '--'} °F`);
    setInner(getElement('windSpeed-desc'), `Wind Speed:  ${data.windSpeedMPH || '--'} Mi/hr`);
    setInner(getElement('humidity-desc'), `Humidity:  ${data.humidity || '--'}`);
    setInner(getElement('windDirection-desc'), ` Wind direction: ${data.windDir || '--'}`);
  }
  
  // data.weatherPrimaryCoded
  // data.isDay
}

export function render() {
  createElements();
  getPlace();
}
