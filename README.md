# Travellers App Project for Udacity's Front End Developer Degree

## Description

The App helps a traveller to plan his journey ahead. The user can enter a destination and a departure date, and can then retrieve information from the destination.

The app makes use of the following API:

- [Geonames API](http://www.geonames.org/) - gets latitude and longitude for the user input
- [Weatherbit API](https://www.weatherbit.io/) - gets weather forecast for the latitude and longitude
- [Pixabay API](https://pixabay.com/)  - gets photo for the location
- [REST Countries](https://restcountries.eu) - to get additional information about the destination


The project runs on node.js and express server.

## Prerequisites

It is required that node.js is installed. This can be downloaded at [node.js](https://nodejs.org/en/). API keys are required for the above webservices. 

These are hardcoded

The API key have to be entered in ```/src/client/js/app.js```

```
const userName = //your geonames API key
const weaKEY = //your weatherbit API key
const pixKEY = //your pixarbay API key
```


## Installation

Once node is installed, run the following command in the root folder of the project.

```
npm install
```

Once node is installed in you can start the service with the following commands,

```
npm run dev
```
runs the development folder with ```webpack-dev-server``` and one hot encoding activated.

```
npm run build
```
to build the production server, and

```
npm start
```

to start the service. The app now runs on http://localhost:8000.


## Some Instruction/ Information

The app requires two parameters to run:

1. In the destination field, the user can enter either a name for a place, or a zip code. If your entry is returning a place with the same name in a different country, you can add the country to the input box
2. In the date field, the user enters any date. If the date lies in the past, there will be a warning that no weather forecast is available. If the date is beyond 16 days in the future, the forecast will default to 16 days ahead.


Once the user submits, the app will display an image of the destination. In case pixabay does not return any picture, the user will be notified about that. The app layout adjusts for screens less wide than 700 pixel. As an add-on the RESTCountries API has been implemented to show information about the destination country.  

The app returns:

- An image of the location if possible.
- The native name of the country the user is travelling to, the global region where the country lies in, as well as the population size of the country.
- The High, Low Temperature and the Air Pressure for the day of departure.





You must have an API key for each of the 3 APIs above.

After you get your API keys, make a file called *.env* in the project root folder. File should contain:

```
GEONAMES_KEY = {your key here}
WEATHERBIT_KEY = {your key here}
PIXABAY_KEY = {your key here}
```
There is an included file called *.env-sample*. You may add your keys to this template file, then change its name to *.env*

