const input = document.getElementById("shaharInput");
const btn = document.getElementById("findbtn");
const natija = document.getElementById("natija");

let API_KEY = "2505efea596ebbab47d1ca3130aac59d";
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
  } catch (xato) {
    console.error(xato);
    natija.textContent = "Xatolik yuz berdi. Internetni tekshiring.";
  }
});