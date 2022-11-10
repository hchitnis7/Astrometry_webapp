let loc = document.getElementById("city");
let tempval = document.getElementById("tempVal");
let climate = document.getElementById("climate");
const search_Input = document.getElementById("searchInput");
const search_Button = document.getElementById("searchButton");

search_Button.addEventListener("click", (e)=>
{
    //e.preventDefault();
    getWeather(search_Input.value);
    search_Input.value = '';
});

const getWeather = async (city)=>
{
    try{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fce3b50fb2b74cb2294fb3aef264c372`, {mode: 'cors'})
        .then(data => data.json())
        .then((res) => {
            weatherData = res;
            const {name} = weatherData;
            console.log(name);
            const {feels_like} = weatherData.main;
            const {id, main} = weatherData.weather[0];
            loc.textContent = name;
            climate.textContent = main;
            temp = Math.round(feels_like-273.15)
            tempval.innerHTML = temp + '<span>&#176</span>C';
        })
    }
    catch(error)
    {
        //console.log(error);
        alert('City not found')
    }
}

window.addEventListener("load", ()=>{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat,long);
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fce3b50fb2b74cb2294fb3aef264c372`
            fetch(api).then((response)=>
            {
                return response.json();
            })
            .then(data =>
                {
                    console.log(data);
                    const {name} = data;
                    const {feels_like} = data.main;
                    const {id,main} = data.weather[0];
                    climate.innerHTML = main;
                    loc.textContent = name;
                    temp = Math.round(feels_like-273.15)
                    tempval.innerHTML = temp + '<span>&#176</span>C';
                })
        }
    )}
})
