const weather = {
  apiKey: "48cc5fdd38a73a41ab463ef78ef9415b",
  getWeather: async function (cityName, stateCode, countryCode, limit = 1) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${this.apiKey}&units=$`
      );
      if (!response.ok) {
        throw new Error("Geo Fetch failed");
      }
      const result = await response.json();
      const { lat, lon } = result[0];

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`
      );
      if (!weatherResponse.ok) {
        throw new Error(
          `Something went wrong, got status: ${weatherResponse.status}`
        );
      }
      const weatherResult = await weatherResponse.json();
      console.log(weatherResult);
      this.showWeather(weatherResult);
    } catch (error) {
      console.error("The fetch is no good", error);
    }
  },
  showWeather: function (result) {
    const cityElement = document.querySelector(".city");
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
    const iconElement= document.querySelector(".icon")
    const weatherDiv = document.querySelector(".weather");
    const searchInput = document.getElementById("search");

    console.log(result);

    cityElement.textContent = `${result.name}`;
    temperatureElement.textContent = `${Math.round(result.main.temp)} °F`;
    descriptionElement.textContent = result.weather[0].description;
    humidityElement.textContent = `Humidity: ${result.main.humidity}%`;
    windElement.textContent = `Wind speed: ${result.wind.speed} m/s`;
    iconElement.src = iconUrl;
    weatherDiv.classList.remove("hidden");
 
    searchInput.value = "";
  },
};

function submit(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search");
  const searchTerm = searchInput.value.trim();
  weather.getWeather(searchTerm);
}
document.getElementById("weather-form").addEventListener("submit", submit);
