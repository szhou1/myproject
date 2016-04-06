// var data;

function getDataFromUrl() {
  console.log("getData() start");

  var query = "600%20Guererro%20st,%20San%20Francisco,%20CA";
  var clientId = 'GRNE1GQUI5DF4ISNN2FYQVQDCV55GLNJG0BQFGZT3MZ25HA3';
  var clientSecret = 'XT3OKVHWZXJSAGT52ISZQHONFWGPUDEFFCZHJU3SVL3HKKLO';
  var version = '20160322';
  var url = 'https://api.foursquare.com/v2/venues/search?near=' + query + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version;

  var req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.addEventListener("loadend", loadEndListener);
  req.open('GET', url, true);
  req.setRequestHeader('Content-Type', 'text/plain');
  req.send();

  console.log("getData() end");
}

function reqListener () {
  console.log("reqListener() start");
  // console.log("this: " + this);
  console.log("status: " + this.status)
  // console.log("response: " + this.responseText);
  // data = this.responseText;

  console.log("reqListener() end");
}

function loadEndListener(){
  console.log("loadEndListener start");
  // console.log(this.responseText);
  attachToElement(this.responseText);
  console.log("loadEndListener end")
}

function attachToElement(data){
  console.log("attachToElement() start");
  var element = document.getElementById("listings");

  var jsonData = JSON.parse(data);
  var response = jsonData.response;
  var venueList = response.venues.map(function(venue){
    return venue.name + "<br>";
  });

  console.log(Array.isArray(venueList))
  element.innerHTML = venueList;
  console.log("attachToElement() end");
}


window.onload = function(){
  console.log("onload() start");
  getDataFromUrl();
  console.log("onload() end");
};
