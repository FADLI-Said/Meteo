let key = "b0874e5027f098250f7cf0d404b5780a";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=havre&appid=${key}&lang=fr&units=metric`)
    .then(reponse => reponse.json())
    .then(météo =>{
        console.log(météo);
        
        document.getElementById("ville").innerText = météo.city.name
    })