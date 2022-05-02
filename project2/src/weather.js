import * as map from "./map.js";
import * as ajax from "./ajax.js";

let weatherInfo;

//let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;

function loadWeather(lat, lon) {

    let weatherApiKey = "b23ff1965ebd159d0f2bd8ad3a00af8d";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;

    let main;

    // callback function when data shows up
    function weatherLoaded(jsonString) {
        weatherInfo = JSON.parse(jsonString);

        //map.addMarker(coordinates, title, description, className)
        if (weatherInfo.weather[0].main == "Mist" ||
            weatherInfo.weather[0].main == "Smoke" ||
            weatherInfo.weather[0].main == "Haze" ||
            weatherInfo.weather[0].main == "Dust" ||
            weatherInfo.weather[0].main == "Fog" ||
            weatherInfo.weather[0].main == "Sand" ||
            weatherInfo.weather[0].main == "Ash" ||
            weatherInfo.weather[0].main == "Squall") {
            main = "other";
        } else {
            main = weatherInfo.weather[0].main;
        }

        map.addMarker([weatherInfo.coord.lon, weatherInfo.coord.lat], weatherInfo.weather[0].main, weatherInfo.weather[0].description, main);

        // write out weather condition
        outputWeather.innerHTML = `Weather: ${weatherInfo.weather[0].description}`;
        outputTemp.innerHTML = `Temperature: ${weatherInfo.main.temp}°F`;

        //image selection - placeholders until I gather images
        if (weatherInfo.weather[0].main == "Thunderstorm") {
            document.querySelector("#image").src = "images/thunderstorm.jpg";
        }
        else if (weatherInfo.weather[0].main == "Drizzle") {
            document.querySelector("#image").src = "images/drizzle.jpg";
        }
        else if (weatherInfo.weather[0].main == "Rain") {
            document.querySelector("#image").src = "images/rain.jpg";
        }
        else if (weatherInfo.weather[0].main == "Snow") {
            document.querySelector("#image").src = "images/snow.jpeg";
        }
        else if (weatherInfo.weather[0].main == "Clear") {
            document.querySelector("#image").src = "images/clear.jpg";
        }
        else if (weatherInfo.weather[0].main == "Clouds") {
            document.querySelector("#image").src = "images/clouds.jpg";
        }
        else if (weatherInfo.weather[0].main == "Tornado") {
            document.querySelector("#image").src = "images/tornado.jpg";
        }
        else if (weatherInfo.weather[0].main == "Mist" ||
            weatherInfo.weather[0].main == "Smoke" ||
            weatherInfo.weather[0].main == "Haze" ||
            weatherInfo.weather[0].main == "Dust" ||
            weatherInfo.weather[0].main == "Fog" ||
            weatherInfo.weather[0].main == "Sand" ||
            weatherInfo.weather[0].main == "Ash" ||
            weatherInfo.weather[0].main == "Squall") {
            document.querySelector("#image").src = "images/fog.jpg";
        }
        else {
            document.querySelector("#image").src = "images/startImage.jpeg";
        }

        return main;
    }

    // start download
    ajax.downloadFile(weatherUrl, weatherLoaded);
}

export { loadWeather };