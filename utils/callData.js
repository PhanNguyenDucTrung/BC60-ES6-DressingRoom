class Api {
    constructor() {
        this.filePath = '../data/Data.json';
    }

    async get() {
        try {
            const response = await axios.get(this.filePath);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Api;
