var locationSearchInput = $('#location-input')
var weatherDisplayElement = $('#weather-info-section')
var searchButtonElement = $('.search-button')

searchButtonElement.on('click', searchWeatherForCity);

function getDataForCity(cityName){

    let returnData = null;

    let requestUrl = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=0782912898e659b885fa952bd2602a61";
    
    
    fetch(requestUrl, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
        })
        .then(function (response) {
            return response();
        })
        .then(function (data) {
            console/log(data);
            returnData = data;
    });

    return returnData;

}

function displayWeatherForCity(cityName){
   let cityData =  getDataForCity(cityName);

   if(cityData !== null){

   }
}

function searchWeatherForCity(event){
    event.preventDefault();

    //Get value from search 
    let searchValue = locationSearchInput.val()

    if(!(searchValue.length===0)){
        displayWeatherForCity(searchValue);
    }

}




