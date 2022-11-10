
    window.addEventListener('load', ()=>{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;    
            var newName = document.getElementById("cityInput");
            var cityName = document.getElementById("cityName");
            
            const api_for = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=d1d21e51ced4e4c1025c29ccd2a1df43`
            fetch(api_for).then((response) => {
                return response.json();
            })
            .then(data => {
                
                //Getting the min and max values for each day
                for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ '<span>&#176</span>C';
                //Number(1.3450001).toFixed(2); // 1.35
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2)+ '<span>&#176</span>C' ;
            }
            //------------------------------------------------------------
            
            //Getting Weather Icons
            //for (i = 0; i < 5; i++) {
            //   document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            //}
            //------------------------------------------------------------
            console.log(data)


        
        })
    })

}
  })

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}