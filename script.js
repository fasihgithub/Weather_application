
        const apiKey = '5c585338fea4e52e538cb726511e7527';

        function fetchWeatherData(city) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        updateWeatherUI(data);
                    } else {
                        document.getElementById("city").innerHTML= "Invalid";
                        // console.error("Unable to fetch weather data");
                    }
                }
            };
          
        }

        function fetchWeather() {
            const city = document.querySelector(".city-input").value;
            if (city !== "") {
                fetchWeatherData(city);
                 document.querySelector(".city-input").value = "";
            } else {
                document.getElementById("city").innerHTML = "Invalid";
            }
        }

        function updateWeatherUI(data) {
            const cityElement = document.getElementById("city");
            const temperature = document.querySelector(".temp");
            const windSpeed = document.querySelector(".wind-speed");
            const humidity = document.querySelector(".humidity");
            const visibility = document.querySelector(".visibility-distance");
            const descriptionText = document.querySelector(".description-text");
            const date = document.querySelector(".date");
            const descriptionIcon = document.querySelector(".description i");

            cityElement.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            windSpeed.textContent = `${data.wind.speed} km/h`;
            humidity.textContent = `${data.main.humidity}%`;
            visibility.textContent = `${data.visibility / 1000} km`;
            descriptionText.textContent = data.weather[0].description;
            const currentDate = new Date();
            date.textContent = currentDate.toDateString();
            const weatherIconName = getWeatherIconName(data.weather[0].main);
            descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
            const pressureElement = document.querySelector(".pressure");
            pressureElement.textContent = `${data.main.pressure} hPa`;
            const feelslikeElement = document.querySelector(".feelslike");
            feelslikeElement.textContent = `${data.main.feels_like}°C`;
            const cloudElement = document.querySelector(".cloud");
            cloudElement.textContent = `${data.clouds.all}%`;
        }

        function getWeatherIconName(weatherCondition) {
            const iconMap = {
                Clear: "wb_sunny",
                Clouds: "wb_cloudy",
                Rain: "umbrella",
                Thunderstorm: "flash_on",
                Drizzle: "grain",
                Snow: "ac_unit",
                Mist: "cloud",
                Smoke: "cloud",
                Haze: "cloud",
                Fog: "cloud",
            };

            return iconMap[weatherCondition] || "help";
        }
