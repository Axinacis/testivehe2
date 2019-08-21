const path = require('path');
const request = require('request');
const geocode = require('./geocode.js');
const forecast = require('./forecast.js');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send('Etusihvu')
});

app.get('/about', (req, res) => {
    res.send({
        forecast: 'Sataa lunta',
        location: 'Joensuu'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Virhelöinen tapahtunut on, paikkeloinen pitäisi ollak'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
});


app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});
