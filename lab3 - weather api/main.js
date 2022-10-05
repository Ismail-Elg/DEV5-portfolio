import './style.css'

import Weather from './src/weather';
import Pexel from './src/pexel';
import Flight from './src/flight';

let image = "";
let city = "";
let cityName = "";
let check = () =>{
  
    if (localStorage.getItem('time') == null) {
        localStorage.setItem('time', Date.now());
        navigator.geolocation.getCurrentPosition(success, error);
    
    } else {
        let time = localStorage.getItem('time');
        let timeNow = Date.now();
        let timeDiff = timeNow - time;
        let timeDiffHours = timeDiff / 1000 / 60 / 60;
        if (timeDiffHours > 1) {
            localStorage.setItem('time', Date.now());
            navigator.geolocation.getCurrentPosition(success, error);
         
        } else {
            console.log("You have already set your location in the last hour");
        }
    }
    addContent();

  }

check();

function success(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
    const weather = new Weather(lat, lon);
    weather.getWeather()
        .then(results => {
            console.log(results);
           
            const currentWeather = results.data[0].weather.description;
            const currentTemp = results.data[0].temp;
            console.log(currentWeather, currentTemp);
           
            localStorage.setItem('weather', JSON.stringify(results));
            
          })
}
function error() {
    alert('Unable to retrieve your location');
}

function addContent() {
  const weatherData = JSON.parse(localStorage.getItem('weather'));
  const currentWeather = weatherData.data[0].weather.description;
  const weatherCode = weatherData.data[0].weather.code;

  const currentTemp = weatherData.data[0].temp;
 
  const icon = weatherData.data[0].weather.icon;
  document.querySelector('.above').innerHTML = currentWeather + "<br> " + currentTemp + "°C";
  document.querySelector('.icon').innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${icon}.png" width="100px" alt="weather icon">`;

  switch(weatherCode) {
    case 200||201||202||230||231||232:
      image = "mountains";
      break;
    case 300||301||302||500||501||502||511||520||521||522:
      image = "hotel reception";
      break;
    case 600||601||602||610||611||612||621||622:
      image = "everest";
      break;
    case 700||711||721||731||741||751||761||762||771||781:
      image = "beach";
      break;
    case 800:
      image = "spain";
      break;
    case 801||802||803||804:
      image = "cloudy city";
      break;
    default:
      image = "clear sky";
  }

  const pexel = new Pexel(image);
  
  pexel.getCity()
      .then(results => {
          let random = Math.floor(Math.random() * 5);
          const image = results.photos[random].src.medium;
          document.querySelector('.ad').style.backgroundImage = `url(${image})`;

      }
  )

  const flight = new Flight(image);

  flight.getFlight()

  
}