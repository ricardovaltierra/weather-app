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

export function setFields(name, data, formatedDate) {
  let card = createElement('div', 'main', 'card', '');

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
  const place = createElement('input', 'address-input', 'search-place-input', '');
  place.placeholder = 'Current weather of...';
  appendChild(document.body, place);
  getPlace();
}
