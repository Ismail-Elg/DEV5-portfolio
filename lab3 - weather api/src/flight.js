class Flight {
    constructor(where) {
        this.where = where;
    }
    async getFlight() {

        const response = await fetch(`https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/latest?destination=MAD&origin=BRU&period_type=year&one_way=%20&show_to_affiliates=true&trip_class=0&currency=EUR&page=1&sorting=price&limit=1`, {
            method: 'GET',
	headers: {
		'X-Access-Token': '9bb7a1b1eba1507b24e2c69c9509ddc2',
		'X-RapidAPI-Key': '85af616e74msh8565637bcff0afep1e7d54jsnb711aafc1cb1',
		'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
	}
        });
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    }
}
export default Flight;
