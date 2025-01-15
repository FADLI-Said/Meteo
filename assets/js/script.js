let key = "b0874e5027f098250f7cf0d404b5780a";
let city = ""
city = "havre"

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=fr&units=metric`)
    .then(reponse => reponse.json())
    .then(météo => {
        console.log(météo);


        let country_name = new Intl.DisplayNames(['fr'], { type: 'region' });

        document.getElementById("liveMeteo").innerHTML = `
            <h1 class="fs-3 mt-3" id="ville">${météo.city.name}, ${country_name.of(météo["city"].country)}</h1>
            <h2 class="fs-1"><img src="http://openweathermap.org/img/w/${météo.list[0].weather[0].icon}.png" alt="icon ${météo.list[0].weather[0].description}" >${Math.round(10 * météo.list[0].main.temp) / 10}°c</h2>
            <p class="m-0 text-capitalize">${météo.list[0].weather[0].description}</p>
            <p><i class="fa-solid fa-arrow-up"></i> ${Math.round(10 * météo.list[0].main.temp_max) / 10}°c <i class="fa-solid fa-arrow-down"></i> ${Math.round(10 * météo.list[0].main.temp_min) / 10}°c</p>
            `

        document.getElementById("hour").innerHTML = ""
        for (i = 0; i < 10; i++) {
            document.getElementById("hour").innerHTML += `
                <div class="p-2">
                    <p class="m-0">${moment(météo.list[i].dt_txt).format("HH[h]")}</p>
                    <img src="http://openweathermap.org/img/w/${météo.list[i].weather[0].icon}.png" alt="">
                    <p>${Math.round(10 * météo.list[i].main.temp) / 10}°c</p>
                </div>
            `
        }

        document.getElementById("double").innerHTML = `
         <div class="border border-white rounded text-start px-3" id="gray">
            <p class="pt-2"><i class="fa-solid fa-temperature-half"></i> RESSENTI</p>
            <p>${Math.round(10 * météo.list[0].main.feels_like) / 10}°c</p>
            <p class="petit">${(météo.list[0].main.feels_like) > (météo.list[0].main.temp) ? 'Le ressenti est plus élévé que la température réelle' : 'Le ressenti est moins élévé que la température réelle'}</p>
        </div >
            <div class="border border-white rounded text-start px-3" id="graySecond">
                <p class="pt-2"><i class="fa-solid fa-water"></i> HUMIDITÉ</p>
                <p>${météo.list[0].main.humidity}%</p>
                <p class="petit">Le point de rosé est de ${Math.round(météo.list[0].main.temp - ((100 - météo.list[0].main.humidity) / 5))}° </p>
            </div>
        `

        let deg = ""

        if (météo.list[0].wind.deg < 90) {
            deg = "NE"
        } else if ((météo.list[0].wind.deg) > 90 & (météo.list[0].wind.deg) < 180) {
            deg = "SE"
        } else if ((météo.list[0].wind.deg) > 180 & (météo.list[0].wind.deg) < 270) {
            deg = "SO"
        } else {
            deg = "NO"
        }

        const windspeed = Math.round(10 * (météo.list[0].wind['speed'] * 3600 / 1000) / 10)
        const windgust = Math.round(10 * (météo.list[0].wind['gust'] * 3600 / 1000) / 10)


        document.getElementById("wind").innerHTML = `
        <p class="pt-2 text-start"><i class="fa-solid fa-wind"></i> VENT</p>
        <div class="row">
            <p class="col-6 text-start">Vent</p>
            <p class="col-6 text-end">${windspeed} km/h</p>
        </div>
        <div class="row">
            <p class="col-6 text-start">Rafales</p>
            <p class="col-6 text-end">${windgust} km/h</p>
        </div>
        <div class="row">
            <p class="col-6 text-start">Direction</p>
            <p class="col-6 text-end">${météo.list[0].wind.deg}° ${deg}</p>
        </div>
        `

        const sunrise = new Date(météo.city.sunrise * 1000);
        const sunset = new Date(météo.city.sunset * 1000);

        moment.locale("fr")

        document.getElementById("riseAndSet").innerHTML = `
       <div class="border border-white rounded text-start px-3" id="gray">
            <p class="pt-2"><i class="fa-solid fa-sun"></i> Lever SOLEIL</p>
            <p>${sunrise}</p>
        </div>
            <div class="border border-white rounded text-start px-3" id="graySecond">
                <p class="pt-2"><i class="fa-solid fa-moon"></i> Coucher SOLEIL</p>
                <p>${sunset}</p>
            </div>
        `


        console.log(météo.list[0].weather[0].main);


        if (météo.list[0].weather[0].main == "Clouds") {
            document.getElementById("body").style.backgroundImage = "url(assets/images/cloud.png)";
            document.getElementById("nav").style.background = "rgb(179, 226, 238)";
            document.getElementById("hour").style.background = "rgba(179, 226, 238,0.7)"
            document.getElementById("wind").style.background = "rgba(179, 226, 238,0.7)"
            document.getElementById("gray").style.background = "rgba(179, 226, 238,0.7)"
            document.getElementById("graySecond").style.background = "rgba(179, 226, 238,0.7)"
        }

        if (météo.list[0].weather[0].main == "Clear") {
            document.getElementById("body").style.backgroundImage = "url(assets/images/sun.png)";
            document.getElementById("nav").style.background = "rgba(255, 245, 225, 0.7)";
            document.getElementById("hour").style.background = "rgba(255, 245, 225, 0.7)"
            document.getElementById("wind").style.background = "rgba(255, 245, 225, 0.7)"
            document.getElementById("gray").style.background = "rgba(255, 245, 225, 0.7)"
            document.getElementById("graySecond").style.background = "rgba(255, 245, 225, 0.7)"
        }

        if (météo.list[0].weather[0].main == "Rain") {
            document.getElementById("body").style.backgroundImage = "url(assets/images/rain.png)";
            document.getElementById("nav").style.background = "rgb(129, 129, 127)";
            document.getElementById("hour").style.background = "rgba(129, 129, 127, 0.7)"
            document.getElementById("wind").style.background = "rgba(129, 129, 127, 0.7)"
            document.getElementById("gray").style.background = "rgba(129, 129, 127, 0.7)"
            document.getElementById("graySecond").style.background = "rgba(129, 129, 127, 0.7)"
        }

        console.log(city);

    })


function search_by_name(city_name) {
    console.log(city_name);


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${key}&lang=fr&units=metric`)
        .then(reponse => reponse.json())
        .then(data => {
            console.log(data);


            let country_name = new Intl.DisplayNames(['fr'], { type: 'region' });

            document.getElementById("liveMeteo").innerHTML = `
            <h1 class="fs-3 mt-3" id="ville">${data.city.name}, ${country_name.of(data["city"].country)}</h1>
            <h2 class="fs-1"><img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" alt="icon ${data.list[0].weather[0].description}" >${Math.round(10 * data.list[0].main.temp) / 10}°c</h2>
            <p class="m-0 text-capitalize">${data.list[0].weather[0].description}</p>
            <p><i class="fa-solid fa-arrow-up"></i> ${Math.round(10 * data.list[0].main.temp_max) / 10}°c <i class="fa-solid fa-arrow-down"></i> ${Math.round(10 * data.list[0].main.temp_min) / 10}°c</p>
            `

            document.getElementById("hour").innerHTML = ""
            for (i = 0; i < 10; i++) {
                document.getElementById("hour").innerHTML += `
                <div class="p-2">
                    <p class="m-0">${moment(data.list[i].dt_txt).format("HH[h]")}</p>
                    <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="">
                    <p>${Math.round(10 * data.list[i].main.temp) / 10}°c</p>
                </div>
            `
            }

            document.getElementById("double").innerHTML = `
         <div class="border border-white rounded text-start px-3" id="gray">
            <p class="pt-2"><i class="fa-solid fa-temperature-half"></i> RESSENTI</p>
            <p>${Math.round(10 * data.list[0].main.feels_like) / 10}°c</p>
            <p class="petit">${(data.list[0].main.feels_like) > (data.list[0].main.temp) ? 'Le ressenti est plus élévé que la température réelle' : 'Le ressenti est moins élévé que la température réelle'}</p>
        </div >
            <div class="border border-white rounded text-start px-3" id="graySecond">
                <p class="pt-2"><i class="fa-solid fa-water"></i> HUMIDITÉ</p>
                <p>${data.list[0].main.humidity}%</p>
                <p class="petit">Le point de rosé est de ${Math.round(data.list[0].main.temp - ((100 - data.list[0].main.humidity) / 5))}° </p>
            </div>
        `

            let deg = ""

            if (data.list[0].wind.deg < 90) {
                deg = "NE"
            } else if ((data.list[0].wind.deg) > 90 & (data.list[0].wind.deg) < 180) {
                deg = "SE"
            } else if ((data.list[0].wind.deg) > 180 & (data.list[0].wind.deg) < 270) {
                deg = "SO"
            } else {
                deg = "NO"
            }

            const windspeed = Math.round(10 * (data.list[0].wind['speed'] * 3600 / 1000) / 10)
            const windgust = Math.round(10 * (data.list[0].wind['gust'] * 3600 / 1000) / 10)

            document.getElementById("wind").innerHTML = `
        <p class="pt-2 text-start"><i class="fa-solid fa-wind"></i> VENT</p>
        <div class="row">
            <p class="col-6 text-start">Vent</p>
            <p class="col-6 text-end">${windspeed} km/h</p>
        </div>
        <div class="row">
            <p class="col-6 text-start">Rafales</p>
            <p class="col-6 text-end">${windgust} km/h</p>
        </div>
        <div class="row">
            <p class="col-6 text-start">Direction</p>
            <p class="col-6 text-end">${data.list[0].wind.deg}° ${deg}</p>
        </div>
        `

            console.log(data.list[0].weather[0].main);


            if (data.list[0].weather[0].main == "Clouds") {
                document.getElementById("body").style.backgroundImage = "url(assets/images/cloud.png)";
                document.getElementById("nav").style.background = "rgb(179, 226, 238)";
                document.getElementById("hour").style.background = "rgba(179, 226, 238,0.7)"
                document.getElementById("wind").style.background = "rgba(179, 226, 238,0.7)"
                document.getElementById("gray").style.background = "rgba(179, 226, 238,0.7)"
                document.getElementById("graySecond").style.background = "rgba(179, 226, 238,0.7)"
            }

            if (data.list[0].weather[0].main == "Clear") {
                document.getElementById("body").style.backgroundImage = "url(assets/images/sun.png)";
                document.getElementById("nav").style.background = "rgba(255, 245, 225, 0.7)";
                document.getElementById("hour").style.background = "rgba(255, 245, 225, 0.7)"
                document.getElementById("wind").style.background = "rgba(255, 245, 225, 0.7)"
                document.getElementById("gray").style.background = "rgba(255, 245, 225, 0.7)"
                document.getElementById("graySecond").style.background = "rgba(255, 245, 225, 0.7)"
            }

            if (data.list[0].weather[0].main == "Rain") {
                document.getElementById("body").style.backgroundImage = "url(assets/images/rain.png)";
                document.getElementById("nav").style.background = "rgb(129, 129, 127)";
                document.getElementById("hour").style.background = "rgba(129, 129, 127, 0.7)"
                document.getElementById("wind").style.background = "rgba(129, 129, 127, 0.7)"
                document.getElementById("gray").style.background = "rgba(129, 129, 127, 0.7)"
                document.getElementById("graySecond").style.background = "rgba(129, 129, 127, 0.7)"
            }



            console.log(city);

        })
}


document.getElementById("validation").addEventListener("click", function () {
    search_by_name(document.getElementById("search").value)
    document.getElementById("search").value = ""
})

document.querySelector('#search').addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.querySelector("#validation").click();
    }
})

const timestamp = 1736926716;
const date = new Date(timestamp * 1000);
console.log(date.toISOString());