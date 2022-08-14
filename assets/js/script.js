// var lat = 0;
// var lon = 0;

var city = "San Diego";

function displayToday(data) {
  console.log(moment.unix(data.current.dt).format("MM/DD/YYYY"));
  console.log(data.current.weather[0].icon);
  weatherIcon =
    "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
  console.log(data.current.temp);
  console.log(data.current.wind_speed);
  console.log(data.current.humidity);
  console.log(data.current.uvi);

  $("#dayInfo").children().empty();

  $("#dayInfo")
    .children(".nameDateWeather")
    .html(city + moment.unix(data.current.dt).format(" (M/DD/YYYY) "));

  var img = $('<img id="weather">');
  img.attr("src", weatherIcon);
  img.attr("title", data.current.weather[0].description);
  img.attr("alt", data.current.weather[0].description);
  img.appendTo($("#dayInfo").children(".nameDateWeather"));

  $("#dayInfo")
    .children(".temp")
    .html("Temp: " + data.current.temp + "&deg;F");
  $("#dayInfo")
    .children(".wind")
    .html("Wind: " + data.current.wind_speed + " MPH");
  $("#dayInfo")
    .children(".humid")
    .html("Humidity: " + data.current.humidity + " &percnt;");
  $("#dayInfo")
    .children(".uvi")
    .html("UV Index: " + data.current.uvi);
}

function displayForecast(data) {
  for (let index = 0; index < 5; index++) {
    console.log(moment.unix(data.daily[index].dt).format("MM/DD/YYYY"));
    console.log(data.daily[index].weather[0].icon);
    weatherIcon =
      "http://openweathermap.org/img/wn/" +
      data.daily[index].weather[0].icon +
      ".png";
    console.log(data.daily[index].temp.day);
    console.log(data.daily[index].wind_speed);
    console.log(data.daily[index].humidity);
    console.log(`.fore${index + 1}`);
    $(`.fore${index + 1}`)
      .children()
      .empty();

    $(`.fore${index + 1}`)
      .children(".date")
      .html(moment.unix(data.daily[index].dt).format("M/DD/YYYY"));

    var img = $('<img id="weather">');
    img.attr("src", weatherIcon);
    img.attr("title", data.daily[index].weather[0].description);
    img.attr("alt", data.daily[index].weather[0].description);
    img.addClass("py-0");
    img.appendTo($(`.fore${index + 1}`).children(".weather"));

    $(`.fore${index + 1}`)
      .children(".temp")
      .html("Temp: " + data.daily[index].temp.day + "&deg;F");
    $(`.fore${index + 1}`)
      .children(".wind")
      .html("Wind: " + data.daily[index].wind_speed + " MPH");
    $(`.fore${index + 1}`)
      .children(".humid")
      .html("Humidity: " + data.daily[index].humidity + " &percnt;");
    $(`.fore${index + 1}`)
      .children(".uvi")
      .html("UV Index: " + data.daily[index].uvi);
  }
}

function getInfo() {
  var locDataURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=1a14ca5cc491853ccfe45f332ddb1ec2";
    console.log(locDataURL);
  $.ajax({
    url: locDataURL,
  }).then(function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;

    $.ajax({
      url: (weatherURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=1a14ca5cc491853ccfe45f332ddb1ec2"),
    }).then(function (data) {
      displayToday(data);
      displayForecast(data);
      console.log(data);
    });
  });
}

$("#searchButton").click(function () {
  city = $("#citySearch").val();
  getInfo();
  // localStorage.setItem(
  //   $(this).siblings("div").html().replace(spaces, ""),
  //   $(this).siblings("textarea").val()
  // );
});

getInfo();