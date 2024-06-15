import axios from "axios";

class Cdek {
    async getAllRegion() {
        const account = 'EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI';
        const password = 'PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG';
        const url = 'https://api.edu.cdek.ru/v2/location/regions';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${account}:${password}`).toString('base64')}`
                }
            });

            return response.data; 

        } catch (error) {
            console.error('Error fetching data:', error.response.status, error.response.data); 
    // Логируем код состояния и данные ответа
    throw error;
        }
    }
}

export default new Cdek;