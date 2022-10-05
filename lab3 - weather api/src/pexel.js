class Pexel {
    constructor(type) {
        this.type = type;
    }
    async getCity() {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${this.type}`, {
            "headers": {
                'Authorization': '563492ad6f917000010000013ac6b1670442418e90619b903057d604',
            },
        });
        const responseData = await response.json();
        return responseData;
    }
}
export default Pexel;
