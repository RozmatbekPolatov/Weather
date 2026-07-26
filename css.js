const input = document.getElementById("shaharInput")
const btn = document.getElementById("findbtn")
const natija = document.getElementById("natija")

let API_KEY = "2505efea596ebbab47d1ca3130aac59d"

btn.addEventListener("click", async () => {
  const shahar = input.value.trim();
  // Bu yerda qod ishlaydi
  if (!shahar) {
    natija.textContent = "Iltimos, shahar nommini kiriting!";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(shahar)}&appid=${API_KEY}&units=metric&lang=uz`;
    const response = await fetch(url)

    if(!response.ok){
      natija.textContent = "Bunday shahr topilmadi yoki API kalitida xatolik bor.";
      return;
    }
    
    const data = await response.json();

    console.log(data);

    const harorat = data.main.temp;
    const namlik = data.main.humidity;
    const tavsif = data.weather[0].description;
    
    natija.textContent = `${data.name} shahrida:${harorat} *C, ${tavsif} namlik:${namlik}%`

  } catch (xato) {
  console.error(xato);
  natija.textContent = "Xatolik yuz berdi. Internetni tekshiring.";
  }
});