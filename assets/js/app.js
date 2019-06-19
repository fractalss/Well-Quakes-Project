// Creating map object
var map = L.map("map", {
  center: [31.81, -103.67],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: API_KEY
}).addTo(map);

// var link = "https://quake-wells.herokuapp.com/data";
// var corsLink = "https://cors-anywhere.herokuapp.com/";
var link = "../data/data.json";

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  // Creating a JSON layer with the retrieved data
  // Loop through data
  console.log(data.length);
  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var lat = data[i].Lat;
    var long = data[i].Long;
    var operator = data[i].Operator;
    var apiWellNumber = data[i].API;
    var spudDate = data[i].Spud_Date;
    var prodType = data[i].Production_type;
    var oilProduction = data[i].Daily_Gas;
    var gasProduction = data[i].Daily_Oil;
    var dailyProduction = oilProduction + gasProduction / 6;
    // Color the well depending upon whether it is Oil or Gas

    let color = "";
    if (prodType === "OIL") {
      color = "blue";
    }
    else if (prodType === "GAS") {
      color = "red";
    }
    // Check for data
    if (dailyProduction) {
      L.circle([lat, long], {
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: dailyProduction * 0.5

      }).bindPopup("<h3>" + "API Well Number : " + apiWellNumber + "</h3><hr><p>" + "Operator : "
        + operator + "</p><hr><p> Daily Oil Production : " + oilProduction +
        "(BBLS) </p><hr><p> Daily Gas Production : " +
        gasProduction + "(BBLS) </p><hr><p> Spud Date : " + spudDate).addTo(map);
      console.log(prodType);
    }
  }

});

