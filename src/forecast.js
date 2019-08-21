const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const key = 'ca72846581a6f6cbff12bcd7907bb079';
    const url = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + '?units=si&lang=fi';

    request({uri: url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to dsky', undefined)
        } else if (body.error) {
            callback('Unable to find loc', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' Ulkona on ' + body.currently.temperature + ' astetta. Sateen todennäköisyys on ' + body.currently.precipProbability * 100 + '%')
            /*let date = new Date(body.currently.time * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            const currentFcast = ('Ulkona on ' + body.currently.temperature + ' astetta. Sateen todennäköisyys on ' + body.currently.precipProbability * 100 + '%');
            const currentTime = ('Joensuun tiedot tänään kello ' + formattedTime);*/

            //callback(('Ulkona on ' + body.currently.temperature + ' astetta. Sateen todennäköisyys on ' + body.currently.precipProbability * 100 + '%'), undefined)


        }

    })
};
//"https://api.darksky.net/forecast/ca72846581a6f6cbff12bcd7907bb079/20,60?units=si&lang=fi"

module.exports = forecast;