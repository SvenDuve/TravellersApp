// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');
var path = require('path');

// Start up an instance of app

const app = express();


// Access the dist folder:

app.use(express.static('dist'))



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server

const port = 8000;
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});


// Route to send back latitude and longitude

positionData = {}

app.get('/getLatLon', sendLatLon);

function sendLatLon(req, res) {
    res.send(positionData);

}

app.post('/getLatLon', postLatLon);

function postLatLon(req, res) {
    
    positionData = req.body;
    res.sendStatus(200)

};


// Route to store and send back weather data

weatherData = {};

app.get('/weatherData', getWeather);

function getWeather(req, res) {
    res.send(weatherData);
}

app.post('/weatherData', postWeatherData);

function postWeatherData(req, res) {
    weatherData = req.body;
    res.sendStatus(200)
}



// Route to store and send back picture data

pictureData = {};

app.get('/pictureData', getPictureData);

function getPictureData(req, res) {
    res.send(pictureData);
}

app.post('/pictureData', postPictureData);

function postPictureData(req, res) {
    pictureData = req.body;
    res.sendStatus(200)
}





// Route to store and send back restcountries

restcountryData = {};

app.get('/restCountry', getCountryData);

function getCountryData(req, res) {
    res.send(restcountryData);
}

app.post('/restCountry', postCountryData);

function postCountryData(req, res) {
    restcountryData = req.body;
    res.sendStatus(200)
}

