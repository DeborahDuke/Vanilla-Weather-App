function formatDate(timestamp){
    // going to calculate the date and return "friday 5:00"
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayTemperature(response){

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    celsiusTemp = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemp); //so this replaces the temperture displayed on the page with the temp of the city you typed in
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML  = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);// converting timestamp to milliseconds
    iconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description)
      
}



function search(city) {
    let apiKey = "d4972ed5b674c4f6f2dbcc08bf9b31cb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

  function displayFahrenheitTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove the active class on the celcius link
    celciusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
    let fahrenheitTemp = (celsiusTemp * 9)/5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp)
  }

  function displayCelciusTemp(event){
    event.preventDefault();
     celciusLink.classList.add("active");
     fahrenheitLink.classList.remove("active")
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp)

  }
  
  let celsiusTemp = null;

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let fahrenheitLink = document.querySelector("#fahrenheit-link")
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp)

  let celciusLink = document.querySelector("#celcius-link")
  celciusLink.addEventListener("click", displayCelciusTemp)

  search("New York" );
