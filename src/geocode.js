const request = require('request')

const geocode = (address, callback) => {
    const key = "pk.eyJ1IjoiMTkxMTYzMDQiLCJhIjoiY2p6ZHdvZnV5MDE0dTNnb2I2MjUyNmtuNiJ9.iPb5lW5GZwSP7YAfVDdl8A";
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + key;

    request ({uri:url, json:true}, (error, response, body) => {
        if (error) {
            callback('No mapbox connection', undefined)
        } else if (body.features.length===0) {
            callback('No search results', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })


};

module.exports = geocode;