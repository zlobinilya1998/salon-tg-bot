const {config} = require('dotenv')
config()

const axios = require('axios')
const Cookie = process.env.COOKIE

class SalonService {
    static baseUrl = 'https://profsalon.org/CRM/msc_persona_malaya_nikitskaya/desktop';
    static async loadEvents(forceToday = false){
        const today = new Date().toLocaleString('ru-Ru').split(',')[0];
        let tomorow = new Date()
        tomorow.setDate(tomorow.getDate() + 1);
        tomorow = tomorow.toLocaleString('ru-Ru').split(',')[0]

        const api_url = this.baseUrl + '/loadScheduleEvents';
        const { data } = await axios.post(api_url, {
            day: forceToday ? today : tomorow,
        }, {
            headers: {
                Cookie
            },
        })
        return data;
    }
    static async loadSpecificEvents(day,month){
        let date = new Date();

        if (day) date.setDate(day)
        if (month) date.setMonth(month - 1)

        date = date.toLocaleString('ru-Ru').split(',')[0]

        const api_url = this.baseUrl + '/loadScheduleEvents';
        const { data } = await axios.post(api_url, {
            day: date,
        }, {
            headers: {
                Cookie
            },
        })
        return data;
    }

}
module.exports = SalonService;
