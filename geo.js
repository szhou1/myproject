var x = document.getElementById("location");
function getLocation() {
  console.log("getLocation() start");
    if (navigator.geolocation) {
      console.log("getting current position");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
