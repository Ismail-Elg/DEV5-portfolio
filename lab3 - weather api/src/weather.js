
class Weather {
    constructor(lat, lon) {
        this.apiKey = '2f99da652901489e979a349e91fb8464';
        this.lat = lat;
        this.lon = lon;
    }

    async getWeather() {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.lon}&key=${this.apiKey}`);
        const responseData = await response.json();
        return responseData;
    
    }


}

export default Weather;