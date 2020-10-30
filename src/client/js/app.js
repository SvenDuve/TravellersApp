/* Global Variables */
// Username for geonames
const userName = ''

// API Key for weatherbit 
const weaKEY = ''

// API Key for pixarbay
const pixKEY ''


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
let days = 0
document.getElementById('submit').addEventListener('click', submit);



// set up variables for the api url and the api key

const geo = 'http://api.geonames.org/postalCodeSearchJSON?';
const postalCode = 'postalcode='
const placeName = '&placename='
const geoUsername = '&maxRows=10&username='
let geoURL = ''

// '<YOUR_API_KEY>&units=imperial';




function getUserInput() {
    const x = document.getElementById('city').value;


    if (x != '') {
        if (isNaN(parseInt(x))) {
    
            geoURL = geo + postalCode + placeName + x + geoUsername + userName
        }
        else {

            geoURL = geo + postalCode + x + placeName + geoUsername + userName
        }

    }

    let depDate = document.getElementById('date').value;

    days = Math.ceil((Date.parse(depDate) - Date.parse(d)) / 86400000)
    if (days > 16) {
        days = 16        
    }
};



// Weatherbit
const weabit = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='
const lon = '&lon='
const city = '&city='
const weabitAPIKEY = '&key='
let wbURL = ''


async function getWeatBit(){

    const data = await getData('/getLatLon')
    wbURL = weabit + data.postalCodes[0].lat + lon + data.postalCodes[0].lng + city + weabitAPIKEY + weaKEY; 
    const weData = await getData(wbURL)
    postData('/weatherData', weData)

}



// pixarbay

const pixarbay = 'https://pixabay.com/api/?key='
const place = '&q='
const imType = '&image_type=photo'
let pixURL = ''

async function getImage(){

    let data = await getData('/getLatLon')
    pixURL = pixarbay + pixKEY + place + data.postalCodes[0].placeName + imType
    let picData = await getData(pixURL)
    postData('/pictureData', picData)

}



// restCountries

const rest = 'https://restcountries.eu/rest/v2/alpha/'
let restURL = ''

async function getCountry(){

    const data = await getData('/getLatLon')
    restURL = rest + data.postalCodes[0].countryCode
    let counData = await getData(restURL)
    postData('/restCountry', counData)

}





// function to be called by the event listener for the button with id generate
async function submit(){
    
    // pull in values form the user inputs on the webpage
    getUserInput()
    
    // get the location data
    
    let data = await getData(geoURL)
    
    postData('/getLatLon', data);
    // let x = await postData('/getLatLon', data);
    // console.log(x)    

    // update user interface with another async call
    //    updateUI();
    
    // let imData = await getImage()
    await getImage()

    await getWeatBit()
    
    await getCountry()

    await updateUI()

};




// async call for the user update
const updateUI = async () => {
    
    const request = await fetch('/weatherData');
    
    try{

        const userData = await request.json();
        if (days >= 0) {

            // update the fields from the weather api call and the user input in the holder entry
            document.getElementById('HiTemperature').innerHTML = 'The High Temperature will be ' + userData.data[days].high_temp + ' degree celsius';
            document.getElementById('LoTemperature').innerHTML = 'The Low Temperature will be ' + userData.data[days].app_min_temp + ' degree celsius';
            document.getElementById('pressure').innerHTML = 'The humidity will be ' + userData.data[days].rh + ' %'
            
        } else  {
            
            document.getElementById('HiTemperature').innerHTML = 'Apologies, your departure date is in the past, we do not provide historical weather data';
            
        }
        
    } catch(error){

        console.log("error", error);
    
    }

    
    const countryReq = await fetch('/restCountry');
    
    try {
        
        const countryData = await countryReq.json();
        document.getElementById('fullName').innerHTML = 'Native Name: ' + countryData.altSpellings[2]
        document.getElementById('subregion').innerHTML = countryData.name + ' is part of ' + countryData.subregion
        document.getElementById('population').innerHTML = 'Fact, ' + countryData.name + ' has a population of ' + countryData.population
    } catch (error) {
        
        console.log("error", error)
        
    }
    
    const imagReq = await fetch('/pictureData');

    try{

        const imagData = await imagReq.json();

        if (imagData.total != 0) {

            document.getElementById("warningBox").innerHTML = ''
            document.getElementById("pict").src = imagData.hits[0].webformatURL;
            
        } else {
            
            document.getElementById("warningBox").innerHTML = 'We apologise, there is no actual image of your location'
            document.getElementById("pict").src = ''
        
        }        

    } catch(error){
        console.log("error", error)
    }

    document.getElementById('hereIcome').innerHTML = 'Wow, in ' + days + ' day(s) you are going here:'
    
};



// get Data from url
const getData = async (url) => {
    
    const res = await fetch(url);
    
    try {

        const data = res.json();
        return data;

    } catch (error) {

        console.log("error", error);

    }
};


// post data to url/ route using an object
const postData = async ( url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },

        body: JSON.stringify(data),

    });

    try {

        //const newData = await response.json();
        const newData = await response;
        return newData;

    } catch(error) {

        console.log("error", error);
    
    }
};





export { submit }