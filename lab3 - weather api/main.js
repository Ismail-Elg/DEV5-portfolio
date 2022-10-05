import './style.css'

import Weather from './src/weather';


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