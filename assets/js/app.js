// Creating map object
var map = L.map("map", {
    center: [31.91, -103.67],
    zoom: 10
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  
  var link = "https://quake-wells.herokuapp.com/data";
  var corsLink = "https://cors-anywhere.herokuapp.com/";
  
  // Grabbing our GeoJSON data..
  d3.json(corsLink+link).then(function(data) {
    // Creating a JSON layer with the retrieved data
     // Loop through data
     console.log(data.length);
  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var lat = data[i].Lat;
    var long = data[i].Long;
    var operator = data[i].Operator;
    var apiWellNumber = data[i].API;
    var oilProduction = data[i].Daily_Gas;
    var gasProduction = data[i].Daily_Oil;
    var dailyProduction = oilProduction + gasProduction/6;
    console.log(data[i].Daily_Gas);
    // Check for location property
    if (dailyProduction) {
    color = "red";
    L.circle([lat,long], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: dailyProduction*0.5
    
  }).bindPopup("<h5>" +"API Well Number : "+apiWellNumber+"</h5><hr><p>"+"Operator : " + operator +
  "</p><hr><p> Daily Oil Production : " + oilProduction + "(BBLS) </p><hr><p> Daily Gas Production : " + gasProduction + "(BBLS)").addTo(map);
}
  }

  });
  
