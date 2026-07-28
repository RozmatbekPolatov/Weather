const input = document.getElementById("shaharInput");
const btn = document.getElementById("findbtn");
const natija = document.getElementById("natija");
const forecast = document.getElementById("forecast");

const API_KEY = "2505efea596ebbab47d1ca3130aac59d";

async function getForecast(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    forecast.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {
      const day = data.list[i];
      forecast.innerHTML += `
        <div class="day">
          <p>${new Date(day.dt_txt).toLocaleDateString("uz-UZ", { weekday: "short" })}</p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
          <h4>${Math.round(day.main.temp)}°C</h4>
        </div>
      `;
    }
  } catch (xato) {
    console.error(xato);
  }
}

btn.addEventListener("click", async () => {
  const shahar = input.value.trim();
  if (!shahar) {
    natija.textContent = "Please enter the city name!";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(shahar)}&appid=${API_KEY}&units=metric&lang=uz`;
    const response = await fetch(url);

    if (!response.ok) {
      natija.textContent = "Did not find please check your word or API key.";
      return;
    }

    const data = await response.json();
    console.log(data);

    const bugun = new Date();
    const sana = bugun.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const harorat = Math.round(data.main.temp);
    const tavsif = data.weather[0].description;

    natija.innerHTML = `
      <div class="temp">
        <h1 class="cityname">${data.name}</h1>
        <p class="day">${sana}</p>
        <div class="sundata">
          <img src="./imgs/sun.png" alt="ob-havo">
          <div class="num">
            <p id="harorat">${harorat}</p>
            <h4 class="tempre">°C</h4>
          </div>
        </div>
        <p class="weather-desc">${tavsif}</p>
      </div>
    `;

    getForecast(data.coord.lat, data.coord.lon);

  } catch (xato) {
    console.error(xato);
    natija.textContent = "Error! Please check your Internet.";
  }
});