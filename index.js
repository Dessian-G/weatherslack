async function getWeather() {
  const location = document.getElementById("location").value;
  const weatherDiv = document.getElementById("weather");
  const errorDiv = document.getElementById("error");
  const apiKey = "ce884eb144d016a253cc540cf4483987";
  const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

  // Clear previous results
  weatherDiv.style.display = "none";
  weatherDiv.innerHTML = "";
  errorDiv.innerText = "";

  if (!location) {
    errorDiv.innerText = "Please enter a location.";
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success === false) {
      errorDiv.innerText = data.error.info;
      return;
    }

    const { name, country } = data.location;
    const { temperature, weather_descriptions, humidity, wind_speed, weather_icons } = data.current;

    weatherDiv.style.display = "block";
    weatherDiv.innerHTML = `
      <h3>Weather in ${name}, ${country}</h3>
      <p>Temperature: ${temperature}°C</p>
      <p>Weather: ${weather_descriptions[0]}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${wind_speed} km/h</p>
      <img src="${weather_icons[0]}" alt="Weather icon" />
    `;
  } catch (err) {
    errorDiv.innerText = "An error occurred while fetching the weather data.";
  }
}
