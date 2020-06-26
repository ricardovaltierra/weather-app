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

export function cleanFields() {
  const previous = getElement('main');
  if (previous != null) {
    previous.remove();
  }

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
  let place = createElement('input', 'address-input', 'search-place-input', '');
  let card = createElement('div', 'main', 'card', '');
  let title = createElement('h1', 'main-title', 'div-element', 'Here\'s your weather!');
  let city = createElement('h2', 'city-desc', 'div-element', 'City');
  let date = createElement('p', 'date-desc', 'div-element', 'Date');
  let weather = createElement('p', 'weather-desc', 'div-element', 'Weather');
  let temperature = createElement('p', 'temperature-desc', 'div-element', 'Temperature');
  let realFeel = createElement('p', 'realFeel-desc', 'div-element', 'Real Feel');
  let windSpeed = createElement('p', 'windSpeed-desc', 'div-element', 'Wind Speed');
  let humidity = createElement('p', 'humidity-desc', 'div-element', 'Humidity');
  let windDirection = createElement('p', 'windDirection-desc', 'div-element', 'Wind Direction');
  let childElements = [title, city, date, weather, temperature, realFeel, windSpeed, humidity, windDirection];  

  place.placeholder = 'Current weather of...';
  
  let divs = createDivs(childElements);
  appendChilds(card, divs);
  appendToBody(place);
  appendToBody(card);
}

export function setFields(name, data, formatedDate) {
  
  setInner(card, `Here's your weather:
                            <br> ${name}
                            <br> Date: ${formatedDate}
                            <br> Weather: ${data.weather}
                            <br> Weather image code: ${data.weatherPrimaryCoded}
                            <br> Temp °C: ${data.tempC}
                            <br> Temp °F: ${data.tempF}
                            <br> Real feel °C: ${data.feelslikeC}
                            <br> Real feel °C: ${data.feelslikeF}
                            <br> Wind speed K/h: ${data.windSpeedKPH}
                            <br> Wind speed M/h: ${data.windSpeedMPH}
                            <br> Humidity: ${data.humidity}
                            <br> Wind direction: ${data.windDir}
                            <br> Is day: ${data.isDay}`);

  document.body.appendChild(card);
}

export function render() {
  createElements();
  getPlace();
}
