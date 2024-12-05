document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return alert('Você precisa digitar uma cidade...');
    }

    const apiKey = '080b31f3be9fb37443746d519f12c5f3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`
    

    const results = await fetch (apiUrl);
    const json = await results.json();

    console.log(json);

    if (json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.wind.humity,

        })
    }else {
        alert('Não foi possivel localizar...')
    }

});

function showInfo(json){
    document.querySelector('#title').innerHTML = `${json.city} , ${json.country} `;
    document.querySelector('#temp_value').innerHTML = `${json.temp .toFixed(1).toString().replace('.', ',')}  <sup>C°</sup>`;

}

   