var weatherSearchHistory;

$(document).ready( function(){
    let storedData = weatherSearchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    if(storedData){
        weatherSearchHistory = storedData;
        populateSearchHistory();
    }else{
        weatherSearchHistory = [];
    }
});

var locationSearchInput = $('#location-input')
var weatherDisplayElement = $('#weather-info-section')
var searchButtonElement = $('.search-button')
var searchListElement = $('#search-history-list')

function populateSearchHistory(){
    searchListElement.html('');

    weatherSearchHistory.forEach(element => {
        let weatherCardElement = $('<div class="card" style="width: 100%;"><div class="card-body"><a class="card-title" href="#"><span>'+element+'</span></a></div></div>');
        searchListElement.append(weatherCardElement);
    });
}

function updateLocalStorage(){
    localStorage.setItem("weatherSearchHistory", JSON.stringify(weatherSearchHistory));
}

function getDataForCity(cityName){

    let requestUrl = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=0782912898e659b885fa952bd2602a61&units=metric";
    
    console.log(requestUrl)
    
    fetch(requestUrl, {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
        })
        .then(function (response) {
            if(response.ok){
                return response.json();  
            }else{
                console.error("Invalid City Name")
            }
            
        })
        .then(function (data) {
            displayWeatherForCity(data);
        });
    }

    



function displayWeatherForCity(data){
    //Reset content
    weatherDisplayElement.html('');

    //Get name of the city 
    let cityName = data.name;

    console.log(new Date(data.dt*1000+(data.timezone*1000)));

    //Update Search History Array and local storage if new search term
    if(!(weatherSearchHistory.includes(cityName))){
        weatherSearchHistory.push(cityName);
        populateSearchHistory();
        updateLocalStorage();  
    }
    //Create Date to Title
    let date = new Date(data.dt*1000+(data.timezone*1000)).toDateString();

    //Create Title
    let title = $('<h1 class="display-5">'+cityName+', '+date+'</h1>');

    weatherDisplayElement.append(title);

    //Create Temperature
    let temperature = $('<p class="lead">'+"Current Temperature: "+data["main"].temp+'°C'+'</p>')

    weatherDisplayElement.append(temperature);    
    
    //Create Humidity
    let humidity = $('<p class="lead">'+"Humidity: "+data["main"].humidity+'%'+'</p>')

    weatherDisplayElement.append(humidity); 

    //Create Wind Speed
    let windSpeed = $('<p class="lead">'+"Wind Speed: "+data["wind"].speed+'KPH'+'</p>')

    weatherDisplayElement.append(windSpeed); 

    //Create UV Index
    displayUvData();

    //Add 5-Day Forecast

    
}

function searchWeatherForCity(event){
    event.preventDefault();

    //Get value from search 
    let searchValue = locationSearchInput.val()

    if(!(searchValue.length===0)){
        getDataForCity(searchValue);
    }

}

searchButtonElement.on('click', searchWeatherForCity);


