function geocodeAddress() {
  var searchterm = document.getElementById("searchquery").value;
  console.log("geocodeAddress() start: " + searchterm);

  sendGeoRequest(searchterm, function(req){
    console.log(req.responseText);


    var response = JSON.parse(req.responseText);
    // console.log(response.results[0].geometry.location.lat);
    // console.log(response.results[0].geometry.location.lng);
    var ll = {};
     ll = response.results[0].geometry.location;

    //  console.log("LAT: " + ll);
     var location = document.getElementById("location");
     location.innerHTML = ll.lat + ", " + ll.lng ;

     getLocalVenues(ll);
  });

}

function sendGeoRequest(address, process) {
  // console.log("sendRequest() start");
  var urlbase = "https://maps.googleapis.com/maps/api/geocode/json";
  var key = "AIzaSyDAmUaj9BXpUzsj9nPhwMMPwiUC9M6DMG0";
  var url = urlbase + "?address=" + address + '&key=' + key;
  // console.log(url);

  var req = new XMLHttpRequest();
  // req.addEventListener("loadend", loadEndListener);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
       if(req.status == 200)
        process(this);
       else
        alert("Error loading page\n");
    }
  };

  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'text/plain');
  req.send();

  // console.log("sendRequest() end");
}


function geoFindMe() {
  console.log("geoFindMe() start");

    navigator.geolocation.watchPosition(function(position) {
      console.log("i'm tracking you!");
      if (navigator.geolocation) {
          console.log("getting current position");
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
      }
    },
    function (error) {
      if (error.code == error.PERMISSION_DENIED)
          console.log("you denied me :-(");
          document.getElementById("location").innerHTML = "geolocation blocked";
    });
}

function showPosition(position) {
    document.getElementById("location").innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
