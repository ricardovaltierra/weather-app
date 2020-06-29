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
  let main          = createElement('main', 'bkg-cont', 'init-bkg', ''),
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
      WiCont         = createElement('div', 'wicon-cont', '', ''),
      Wicon         = createElement('div', 'wicon', 'init-icon', ''),
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
  appendChild(WiCont, Wicon);
  appendChilds(toggleCFDiv, [FLabel, toggleCF, CLabel]);
  appendChilds(card, divs);
  appendChilds(main, [divPlace, card, WiCont]);

  appendToBody(main);

  setClickListener(toggleCF, setFields);
}

function errorDisplayer() {
  alert("We're sorry, somthing went wrong    :(");
}

function cleanInput() {
  setValue(getElement('address-input'), '');
}

function setImages() {

  let isDay = catchData.isDay;
  let code = catchData.weatherPrimaryCoded;

  getElement('main').style.color = '#775e5e';

  if(weatherCodes.hail.test(code)){
    setToClass(getElement('wicon'),'hail');
    setToClass(getElement('bkg-cont'), 'hail-bkg');
  }
  else if(weatherCodes.dust_sand.test(code)){
    setToClass(getElement('wicon'),'dust-sand');
    setToClass(getElement('bkg-cont'), 'dust-sand-bkg');
  }
  else if(weatherCodes.smoke.test(code)){
    setToClass(getElement('wicon'),'smoke');
    setToClass(getElement('bkg-cont'), 'smoke-bkg');
  }
  else if(weatherCodes.wintry_mix.test(code)){
    setToClass(getElement('wicon'),'wintry_mix');
    setToClass(getElement('bkg-cont'), 'wintry_mix-bkg');
  }
  else if(weatherCodes.thunderstorm.test(code)){
    setToClass(getElement('wicon'),'thunderstorm');
    setToClass(getElement('bkg-cont'), 'thunderstorm-bkg');
  }
  else if(weatherCodes.volc_ash.test(code)){
    setToClass(getElement('wicon'),'volc_ash');
    setToClass(getElement('bkg-cont'), 'volc_ash-bkg');
  }
  else {

    if(isDay) {

      getElement('main').style.color = '#000';
    
      if(cloudCodes.clear.test(code)) {
        setToClass(getElement('wicon'),'clear-day');
        setToClass(getElement('bkg-cont'), 'clear-d-bkg');
      }
      else if (cloudCodes.partly_cloudy.test(code)){
        setToClass(getElement('wicon'),'partly_cloudy-day');
        setToClass(getElement('bkg-cont'), 'partly_c-d-bkg');
      }
      else if (cloudCodes.mostly_cloudy.test(code)){
        setToClass(getElement('wicon'),'mostly_cloudy-day');
        setToClass(getElement('bkg-cont'), 'mostly_c-d-bkg');
      }
      else if(weatherCodes.mist_fog.test(code)){
        setToClass(getElement('wicon'),'mist_fog-day');
        setToClass(getElement('bkg-cont'), 'mist_f-d-bkg');
      }
      else if(weatherCodes.frost_snow.test(code)){
        setToClass(getElement('wicon'),'frost_snow-day');
        setToClass(getElement('bkg-cont'), 'frost_s-d-bkg');
      }
      else if(weatherCodes.rain_drizzle.test(code)){
        setToClass(getElement('wicon'),'rain_drizzle-day');
        setToClass(getElement('bkg-cont'), 'rain_d-d-bkg');
      }
      else if(weatherCodes.waterspouts.test(code)){
        setToClass(getElement('wicon'),'waterspouts-day');
        setToClass(getElement('bkg-cont'), 'watersp-d-bkg');
      }
      else {
        setToClass(getElement('wicon'),'unknown');
        setToClass(getElement('bkg-cont'), 'unknown-bkg');
      }
  
    } else {

      getElement('main').style.color = '#ccc';
      
      if(cloudCodes.clear.test(code)) {
        setToClass(getElement('wicon'),'clear-night');
        setToClass(getElement('bkg-cont'), 'clear-n-bkg');
      }
      else if (cloudCodes.partly_cloudy.test(code)){
        setToClass(getElement('wicon'),'partly_cloudy-night');
        setToClass(getElement('bkg-cont'), 'partly_c-n-bkg');
      }
      else if (cloudCodes.mostly_cloudy.test(code)){
        setToClass(getElement('wicon'),'mostly_cloudy-night');
        setToClass(getElement('bkg-cont'), 'mostly_c-n-bkg');
      }
      else if(weatherCodes.mist_fog.test(code)){
        setToClass(getElement('wicon'),'mist_fog-night');
        setToClass(getElement('bkg-cont'), 'mist_f-n-bkg');
      }
      else if(weatherCodes.frost_snow.test(code)){
        setToClass(getElement('wicon'),'frost_snow-night');
        setToClass(getElement('bkg-cont'), 'frost_s-n-bkg');
      }
      else if(weatherCodes.rain_drizzle.test(code)){
        setToClass(getElement('wicon'),'rain_drizzle-night');
        setToClass(getElement('bkg-cont'), 'rain_d-n-bkg');
      }
      else if(weatherCodes.waterspouts.test(code)){
        setToClass(getElement('wicon'),'waterspouts-night');
        setToClass(getElement('bkg-cont'), 'watersp-n-bkg');
      }
      else {
        setToClass(getElement('wicon'),'unknown');
        setToClass(getElement('bkg-cont'), 'unknown-bkg');
      }
    }  
  }
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
