var lat = 0;
var lon = 0;

var city = "London";
var locDataURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1&appid=1a14ca5cc491853ccfe45f332ddb1ec2";

$.ajax({
  url: locDataURL,
}).then(function (data) {
  lat = data[0].lat;
  lon = data[0].lon;

  $.ajax({
    url: (weatherURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=1a14ca5cc491853ccfe45f332ddb1ec2"),
  }).then(function (data) {
    // today
    console.log(data);
    console.log(city);
    console.log(moment.unix(data.current.dt).format("MM/DD/YYYY"));
    console.log(data.current.weather[0].icon);
    weatherIcon = "http://openweathermap.org/img/wn/"+data.current.weather[0].icon+".png";
    console.log(data.current.temp);
    console.log(data.current.wind_speed);
    console.log(data.current.humidity);
    console.log(data.current.uvi);

    // forecast
    for (let index = 0; index < 5; index++) {
        console.log(moment.unix(data.daily[index].dt).format("MM/DD/YYYY"));
        console.log(data.daily[index].weather[0].icon);
        weatherIcon = "http://openweathermap.org/img/wn/"+data.daily[index].weather[0].icon+".png";
        console.log(data.daily[index].temp.day);
        console.log(data.daily[index].wind_speed);
        console.log(data.daily[index].humidity);       
    }
  });
});
