let key = "b0874e5027f098250f7cf0d404b5780a";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=havre&appid=${key}&lang=fr&units=metric`)
    .then(reponse => reponse.json())
    .then(météo => {
        console.log(météo);

        document.getElementById("liveMeteo").innerHTML = `
            <h1 class="fs-3 mt-3" id="ville">${météo.city.name}</h1>
            <h2 class="fs-1"><img src="http://openweathermap.org/img/w/${météo.list[0].weather[0].icon}.png" alt="icon ${météo.list[0].weather[0].description}" >${Math.round(10 * météo.list[0].main.temp) / 10}°c</h2>
            <p class="m-0 text-capitalize">${météo.list[0].weather[0].description}</p>
            <p><i class="fa-solid fa-arrow-up"></i> ${Math.round(10 * météo.list[0].main.temp_min) / 10}°c <i class="fa-solid fa-arrow-down"></i> ${Math.round(10 * météo.list[0].main.temp_max) / 10}°c</p>
            `

        document.getElementById("hour").innerHTML = ""
        for (i = 0; i < 9; i++) {
            document.getElementById("hour").innerHTML += `
                <div class="p-2">
                    <p class="m-0">${moment(météo.list[i].dt_txt).format("HH[h]")}</p>
                    <img src="http://openweathermap.org/img/w/${météo.list[i].weather[0].icon}.png" alt="">
                    <p>${Math.round(10 * météo.list[i].main.temp) / 10}°c</p>
                </div>
            `
        }

        document.getElementById("double").innerHTML = `
         <div class="border rounded text-start px-3">
            <p class="pt-2"><i class="fa-solid fa-temperature-half"></i> RESSENTI</p>
            <p>${Math.round(10 * météo.list[0].main.feels_like) / 10}°c</p>
            <p class="petit">${(météo.list[0].main.feels_like) > (météo.list[0].main.temp) ? 'Le ressenti est plus élévé que la température réelle' : 'Le ressenti est moins élévé que la température réelle'}</p>
        </div >
            <div class="border rounded text-start px-3">
                <p class="pt-2"><i class="fa-solid fa-water"></i> HUMIDITÉ</p>
                <p>${météo.list[0].main.humidity}%</p>
                <p class="petit">Le point de rosé est de ${Math.round(météo.list[0].main.temp - ((100 - météo.list[0].main.humidity) / 5))}° </p>
            </div>
        `

        fetch(`https://api.openweathermap.org/data/2.5/forecast/climate?q=havre&appid=${key}&lang=fr&units=metric`)
            .then(reponse => reponse.json())
            .then(day => {
                console.log(day);
                
                let day
                let temp = 0;
                let i = 0
                document.getElementById("tenDay").innerHTML = `<p class="pt-2 text-start"><i class="fa-solid fa-calendar-days"></i> Prévision sur 10 jours</p>`
                while (i < 5) {
                    
                    day = météo.list[i].dt_txt.split(" ")[0]

                    if (day = météo.list[i].dt_txt.split(" ")[0]) {
                        i++
                        temp += météo.list[i].main.temp
                    }
  
                    document.getElementById("tenDay").innerHTML += `
                        <div class="row">
                            <p class="col-5 text-start">${moment(day).format("ddd")}</p>
                            <img src="http://openweathermap.org/img/w/03d.png" class="col-2 text-center" alt="">
                            <p class="col-5 text-end"><i class="fa-solid fa-arrow-up"></i> 3.47° <i class="fa-solid fa-arrow-down"></i> 1.87</p>
                        </div>
                        `

                        i++
                }
            })
    })

// Td = T - ((100-HR)/5)